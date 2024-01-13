import {getJournalEntries} from "@/lib/services/journal-entries/journalEntryService";
import {toast} from "react-toastify";
import React, {useEffect, useState} from "react";
import {JournalEntryResponse} from "@/boundary/interfaces/journal";
import Breadcrumb from "@/components/shared/breadcrumbs/Breadcrumb";
import {CircularProgress, Input} from "@nextui-org/react";
import {JournalQueryParameters} from "@/boundary/parameters/journalQueryParameters";
import {Button} from "@nextui-org/button";
import {PlusFilledIcon} from "@nextui-org/shared-icons";
import JournalEntriesGrid from "@/components/dashboard/user/journalmngt/myjournal/JournalEntriesGrid";
import PreviewMyJournal, {getDocument} from "@/components/dashboard/user/journalmngt/myjournal/PreviewMyJournal";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {useAuth} from "@/hooks/useAuth";
import Spinner from "@/components/shared/icons/Spinner";
import {SearchIcon} from "@/components/shared/icons/SearchIcon";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import PrintJournalModal from "@/components/dashboard/user/journalmngt/myjournal/modals/PrintJournalModal";
import DownloadIcon from "@/components/shared/icons/DownloadIcon";

export default function MyJournalOverview() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {user} = useAuth();
    const [journalEntries, setJournalEntries] = useState<JournalEntryResponse[]>([]);
    const [isLoadingEntries, setIsLoadingEntries] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [journalTitle, setJournalTitle] = useState('');
    const [queryParams, setQueryParams] = useState<JournalQueryParameters>(new JournalQueryParameters());
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [disabled, setDisabled] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [periodFrom, setPeriodFrom] = useState<string>('');
    const [periodTo, setPeriodTo] = useState<string>('');
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJournalTitle(e.target.value);
    };
    const fetchAllJournalEntries = async (queryParams: JournalQueryParameters) => {
        setIsLoadingEntries(true)
        await getJournalEntries(queryParams)
            .then((response) => {
                if (response.statusCode === 200) {
                    const entries = response.data;
                    setJournalEntries(entries)
                }
            })
            .catch((error) => {
                toast.error(`Error fetching journal entries: ${error}`)
            })
            .finally(() => {
                setIsLoadingEntries(false);
            });
    };

    useEffect(() => {
        const {search} = window.location;
        const searchParams = new URLSearchParams(search);
        queryParams.searchTerm = searchParams.get('searchTerm') ?? ''
        queryParams.periodFrom = searchParams.get('periodFrom') ?? ''
        queryParams.periodTo = searchParams.get('periodTo') ?? ''
        queryParams.fetch = 'all';
        setSearchTerm(searchParams.get('searchTerm') ?? '')
        setPeriodFrom(searchParams.get('periodFrom') ?? '')
        setPeriodTo(searchParams.get('periodTo') ?? '')
        fetchAllJournalEntries(queryParams);
    }, []);

    useEffect(() => {
        setDisabled(searchTerm === '' && periodTo === '' && periodFrom === '');
    }, [searchTerm, periodFrom, periodTo]);

    const handleFilterSearch = () => {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
            params.set('searchTerm', searchTerm);
        } else {
            params.delete('searchTerm');
        }

        if (periodFrom) {
            params.set('periodFrom', periodFrom);
        } else {
            params.delete('periodFrom');
        }

        if (periodTo) {
            params.set('periodTo', periodTo);
        } else {
            params.delete('periodTo');
        }

        replace(`${pathname}?${params.toString()}`);
        setQueryParams((prevParams) => ({
            ...prevParams,
            searchTerm: searchTerm,
            periodFrom: periodFrom,
            periodTo: periodTo,
            fetch: "all",
        }));
    };

    useEffect(() => {
        if (!isInitialLoad) {
            fetchAllJournalEntries(queryParams);
        } else {
            setIsInitialLoad(false);
        }
    }, [queryParams]); // Fetch data only when queryParams change

    const handlePreviewClick = () => {
        setShowPreview(true);
    };

    const handleGoBackClick = () => {
        setShowPreview(false);
    };

    return (
        <>
            <Breadcrumb pageName="My Journal"/>

            <div className="flex flex-col gap-4 m-2">
                <div className="md:flex justify-between gap-3 items-end">
                    {showPreview && journalEntries.length >= 1 ? (
                        <>
                            <div className="flex gap-1 w-1/5">
                                <Input
                                    type="text"
                                    variant={"bordered"}
                                    size="sm"
                                    value={journalTitle}
                                    onChange={handleTitleChange}
                                    placeholder="Enter your journal title here"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="md:grid md:grid-cols-5 md:gap-4">
                                <div className="relative flex flex-1 lg:flex-shrink-0">
                                    <Input
                                        placeholder="Search for journal entries"
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                        }}
                                        value={searchTerm}
                                        size="sm"
                                        variant="bordered"
                                        startContent={<SearchIcon/>}
                                    />
                                </div>

                                <div className="grid grid-cols-2 md:mt-0 mt-2">
                                    <div className="relative flex flex-1 flex-shrink-0">
                                        <Input
                                            type="date"
                                            size="sm"
                                            placeholder="Period From"
                                            onChange={(e) => {
                                                setPeriodFrom(e.target.value);
                                            }}
                                            variant="bordered"
                                            value={periodFrom}
                                        />
                                    </div>

                                    <div className="relative flex flex-1 flex-shrink-0 ml-2">
                                        <Input
                                            type="date"
                                            size="sm"
                                            placeholder="Period To"
                                            onChange={(e) => {
                                                setPeriodTo(e.target.value);
                                            }}
                                            variant="bordered"
                                            value={periodTo}
                                        />
                                    </div>
                                </div>

                                <div className="relative flex flex-1 flex-shrink-0">
                                    <Button
                                        className="mt-1"
                                        disabled={disabled}
                                        color="primary"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleFilterSearch();
                                        }}
                                    >
                                        Filter
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="flex gap-3">
                        {showPreview ? (
                            <>
                                <PDFDownloadLink
                                    document={getDocument(journalTitle, user, journalEntries)}
                                    fileName={`${journalTitle.toLowerCase() ?? user?.username}.pdf`}>
                                    {({blob, url, loading, error}) =>
                                        loading ? 'Loading document...' : <Button color="primary"
                                                                                  type="submit"
                                                                                  isLoading={isSubmitting}
                                                                                  spinner={<Spinner/>}>
                                            Download Journal
                                        </Button>
                                    }
                                </PDFDownloadLink>

                                <Button onPress={handleGoBackClick}
                                        startContent={<PlusFilledIcon/>}
                                        color="danger"
                                        variant="shadow">
                                    End Preview
                                </Button>
                            </>
                        ) : (
                            <div className="hidden lg:block">
                                <Button onPress={handlePreviewClick}
                                        startContent={<PlusFilledIcon/>}
                                        color="primary"
                                        variant="shadow">
                                    Preview
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isLoadingEntries ? (
                <div className={"grid place-items-center"}>
                    <CircularProgress color={"primary"} className={"p-4"} label="Loading your journal entries...."/>
                </div>
            ) : (
                <>
                    {journalEntries.length < 1 ? (
                        <>
                            <div className="text-center">
                                <p className="text-danger-400">No journal entries found!</p>
                            </div>
                        </>
                    ) : (
                        <>
                            {showPreview ? (
                                <PreviewMyJournal
                                    journalEntries={journalEntries}
                                    journalTitle={journalTitle}/>
                            ) : (
                                <>
                                    <JournalEntriesGrid journalEntries={journalEntries}/>
                                    <div className="fixed bottom-4 right-4 md:hidden">
                                        <Button onPress={handleOpenModal}
                                                isIconOnly
                                                radius="full"
                                                color="primary"
                                                variant="shadow">
                                            <DownloadIcon/>
                                        </Button>
                                        <PrintJournalModal
                                            journalEntries={journalEntries}
                                                           isOpen={isModalOpen}
                                                           onClose={handleCloseModal}/>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    )
}