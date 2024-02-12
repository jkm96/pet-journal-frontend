import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getJournalEntries } from '@/lib/services/journal-entries/journalEntryService';
import { JournalEntryResponse } from '@/boundary/interfaces/journal';
import { Avatar, Card, CardBody, CircularProgress } from '@nextui-org/react';
import Breadcrumb from '@/components/shared/breadcrumbs/Breadcrumb';
import Link from 'next/link';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';
import { Button } from '@nextui-org/button';
import { PlusIcon } from '@/components/shared/icons/PlusIcon';
import CreateJournalEntryModal
  from '@/components/dashboard/user/journalmngt/journalentries/modals/CreateJournalEntryModal';
import { formatDate } from '@/helpers/dateHelpers';
import { getRandomColorClass } from '@/helpers/stylingHelpers';
import { JournalQueryParameters } from '@/boundary/parameters/journalQueryParameters';
import { SearchIcon } from '@/components/shared/icons/SearchIcon';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AddRecordFab } from '@/components/common/dashboard/AddRecordFab';
import { groupEntriesByMonth } from '@/lib/utils/journalUtils';

export default function JournalEntriesOverview() {
    const [queryParams, setQueryParams] = useState<JournalQueryParameters>(new JournalQueryParameters());
    const [journalEntries, setJournalEntries] = useState<JournalEntryResponse[]>([]);
    const [isLoadingJournalEntries, setIsLoadingJournalEntries] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        fetchJournalEntries(queryParams);
    };

    const fetchJournalEntries = async (queryParams: JournalQueryParameters) => {
        setIsLoadingJournalEntries(true)
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
                setIsLoadingJournalEntries(false);
            });
    };

    useEffect(() => {
        const {search} = window.location;
        const searchParams = new URLSearchParams(search);
        const searchTerm = searchParams.get('searchTerm') ?? ''
        queryParams.searchTerm = searchTerm
        setSearchTerm(searchTerm)
        fetchJournalEntries(queryParams);
    }, []); // Empty dependency array to ensure it runs only on mount

    useEffect(() => {
        if (!isInitialLoad) {
            fetchJournalEntries(queryParams);
        } else {
            setIsInitialLoad(false);
        }
    }, [queryParams]); // Fetch data only when queryParams change

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const searchTerm = e.target.value;
        const params = new URLSearchParams(searchParams);

        if (searchTerm) {
            params.set('searchTerm', searchTerm);
        } else {
            params.delete('searchTerm');
        }

        replace(`${pathname}?${params.toString()}`);

        if (searchTerm.length >= 3 || searchTerm === '') {
            setQueryParams((prevParams) => ({...prevParams, searchTerm: searchTerm}));
        }
    };

    return (
        <>
            <Breadcrumb pageName="Diary Entries"/>

            <div className="flex flex-col gap-4 m-2">
                <div className="flex justify-between gap-3 items-end">
                    <div className="w-full sm:max-w-[44%]">
                        <div className="relative flex flex-1 flex-shrink-0">
                            <label htmlFor="search" className="sr-only">
                                Search
                            </label>
                            <input
                                className="peer block w-full rounded-md border border-gray-200
                                py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Search for journal entries"
                                onChange={handleSearch}
                                defaultValue={searchTerm}
                            />
                            <SearchIcon
                                className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div className="gap-3 hidden lg:block">
                        <Button onPress={handleOpenModal}
                                startContent={<PlusIcon/>}
                                color="primary"
                                variant="shadow">
                            Add Journal
                        </Button>
                        <CreateJournalEntryModal isOpen={isModalOpen} onClose={handleCloseModal}/>
                    </div>
                </div>
            </div>

            {isLoadingJournalEntries ? (
                <div className={"grid place-items-center"}>
                    <CircularProgress color={"primary"} className={"p-4"} label="Loading your diary entries...."/>
                </div>
            ) : (
                <>
                    {journalEntries.length < 1 ? (
                        <>
                            <div className="text-center">
                                <p className="text-danger-400">No diary entries found!</p>
                            </div>
                        </>
                    ) : (
                        <>
                            {Object.keys(groupEntriesByMonth(journalEntries)).map((monthYear) => (
                                <div key={monthYear}>
                                    <h2 className="text-2xl mt-4">{monthYear}</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                        {groupEntriesByMonth(journalEntries)[monthYear].map((journal) => (
                                            <Link key={journal.id}
                                                  href={`${NAVIGATION_LINKS.DIARY_ENTRIES}/${journal.slug}`}>
                                                <Card
                                                    key={journal.id}
                                                    isBlurred
                                                    className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                                                    shadow="sm"
                                                >
                                                    <CardBody>
                                                        <div
                                                            className="grid grid-cols-6 md:grid-cols-12 sm:grid-cols-12 lg:gap-6 md:gap-4 items-center justify-center">
                                                            <div
                                                                className="relative col-span-1 md:col-span-1 sm:col-span-6 mb-2 md:mb-0">
                                                                <Avatar
                                                                    name={journal.title}
                                                                    radius={"sm"}
                                                                    isBordered
                                                                    color={getRandomColorClass(journal.mood)}
                                                                />
                                                            </div>

                                                            <div
                                                                className="flex flex-col col-span-5 md:col-span-11 md:ml-3 sm:col-span-6">
                                                                <div className="flex flex-col gap-0">
                                                                    <h3 className="font-semibold text-foreground/90">{journal.title}</h3>
                                                                    <p className="text-small text-foreground/80">
                                                                        {formatDate(journal.createdAt)} | {journal.event}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </>
            )}

            <AddRecordFab onPress={handleOpenModal}/>
        </>
    )
}