import {getJournalEntries} from "@/lib/services/journal-entries/journalEntryService";
import {toast} from "react-toastify";
import React, {useEffect, useState} from "react";
import {FilterProps, JournalEntryResponse} from "@/boundary/interfaces/journal";
import Breadcrumb from "@/components/shared/breadcrumbs/Breadcrumb";
import {CircularProgress, Input} from "@nextui-org/react";
import FilterComponent from "@/components/common/filter/FilterComponent";
import {JournalQueryParameters} from "@/boundary/parameters/journalQueryParameters";
import {Button} from "@nextui-org/button";
import {PlusFilledIcon} from "@nextui-org/shared-icons";
import JournalEntriesGrid from "@/components/dashboard/user/journalmngt/myjournal/JournalEntriesGrid";
import PreviewMyJournal, {getDocument} from "@/components/dashboard/user/journalmngt/myjournal/PreviewMyJournal";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {useAuth} from "@/hooks/useAuth";
import Spinner from "@/components/shared/icons/Spinner";

export default function MyJournalOverview({searchParams}: FilterProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {user} = useAuth();
    const [journalEntries, setJournalEntries] = useState<JournalEntryResponse[]>([]);
    const [isLoadingEntries, setIsLoadingEntries] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [journalTitle, setJournalTitle] = useState('');
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
        const queryParams: JournalQueryParameters = new JournalQueryParameters();
        queryParams.searchTerm = searchParams?.searchTerm ?? '';
        queryParams.periodFrom = searchParams?.periodFrom ?? '';
        queryParams.periodTo = searchParams?.periodTo ?? '';
        queryParams.fetch = 'all';
        fetchAllJournalEntries(queryParams);
    }, [searchParams?.periodFrom, searchParams?.periodTo, searchParams?.searchTerm]);

    const handlePreviewClick = () => {
        setShowPreview(true);
    };

    const handleGoBackClick = () => {
        setShowPreview(false);
    };

    const DownloadButton = () => {
        return (
            <Button color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                    spinner={<Spinner/>}>
                Download Entry
            </Button>
        )
    }

    return (
        <>
            <Breadcrumb pageName="My Journal"/>

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
                            <div className="flex flex-col gap-4 mb-2">
                                <div className="flex justify-between gap-3 items-end">
                                    {showPreview ? (
                                        <>
                                            <div className="flex gap-1">
                                                <Input
                                                    type="text"
                                                    variant={"bordered"}
                                                    size="sm"
                                                    value={journalTitle}
                                                    onChange={handleTitleChange}
                                                    placeholder="Enter your journal title here"
                                                />

                                                <Button onPress={handleGoBackClick}
                                                        startContent={<PlusFilledIcon/>}
                                                        color="default"
                                                        variant="shadow">
                                                    Title
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <FilterComponent placeholder="Search for journal entries"/>
                                    )}
                                    <div className="flex gap-3">
                                        {showPreview ? (
                                            <>
                                                <PDFDownloadLink
                                                    document={getDocument(journalTitle, user, journalEntries)}
                                                    fileName={`${journalTitle.toLowerCase() ?? user?.username}.pdf`}>
                                                    {({blob, url, loading, error}) =>
                                                        loading ? 'Loading document...' : <DownloadButton/>
                                                    }
                                                </PDFDownloadLink>

                                                <Button onPress={handleGoBackClick}
                                                        startContent={<PlusFilledIcon/>}
                                                        color="default"
                                                        variant="shadow">
                                                    End Preview
                                                </Button>
                                            </>
                                        ) : (
                                            <Button onPress={handlePreviewClick}
                                                    startContent={<PlusFilledIcon/>}
                                                    color="primary"
                                                    variant="shadow">
                                                Preview And Print
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {showPreview ? (
                                <PreviewMyJournal
                                    journalEntries={journalEntries}
                                    journalTitle={journalTitle}/>
                            ) : (
                                <JournalEntriesGrid journalEntries={journalEntries}/>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    )
}