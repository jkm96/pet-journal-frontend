import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {getJournalEntries} from "@/lib/services/journal-entries/journalEntryService";
import {JournalEntryResponse} from "@/boundary/interfaces/journal";
import {Avatar, Card, CardBody, CardHeader, CircularProgress, Image} from "@nextui-org/react";
import Breadcrumb from "@/components/shared/breadcrumbs/Breadcrumb";
import Link from "next/link";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import {Button} from "@nextui-org/button";
import {PlusIcon} from "@/components/shared/icons/PlusIcon";
import SearchComponent from "@/components/common/filter/SearchComponent";
import CreateJournalEntryModal from "@/components/dashboard/journalmngt/journalentries/modals/CreateJournalEntryModal";
import {formatDate} from "@/helpers/dateHelpers";
import {getMoodColorClass} from "@/helpers/stylingHelpers";
import {JournalQueryParameters} from "@/boundary/parameters/JournalQueryParameters";

export default function JournalEntriesOverview() {
    const [journalEntries, setJournalEntries] = useState<JournalEntryResponse[]>([]);
    const [isLoadingJournalEntries, setIsLoadingJournalEntries] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        const queryParams: JournalQueryParameters = new JournalQueryParameters();
        fetchJournalEntries(queryParams);
    };

    const fetchJournalEntries = async (queryParams:JournalQueryParameters) => {
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
        const queryParams: JournalQueryParameters = new JournalQueryParameters();
        fetchJournalEntries(queryParams);
    }, []);

    return (
        <>
            <Breadcrumb pageName="Journal Entries"/>

            {isLoadingJournalEntries ? (
                <div className={"grid place-items-center"}>
                    <CircularProgress color={"primary"} className={"p-4"} label="Loading your journal entries...."/>
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-4 mb-2">
                        <div className="flex justify-between gap-3 items-end">
                            <SearchComponent placeholder="Search for journal entries"/>
                            <div className="flex gap-3">
                                <Button onPress={handleOpenModal}
                                        startContent={<PlusIcon/>}
                                        color="primary"
                                        variant="shadow">
                                    Add New
                                </Button>
                                <CreateJournalEntryModal isOpen={isModalOpen} onClose={handleCloseModal}/>
                            </div>
                        </div>
                    </div>
                    {journalEntries.length < 1 ? (
                        <>
                            <div className="text-center">
                                <p className="text-danger-400">No journal entries found!</p>
                            </div>
                        </>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

                            {journalEntries.map((journal) => (
                                <Link key={journal.id} href={`${NAVIGATION_LINKS.JOURNAL_ENTRIES}/${journal.slug}`}>
                                    <Card
                                        key={journal.id}
                                        isBlurred
                                        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                                        shadow="sm"
                                    >
                                        <CardBody>
                                            <div
                                                className="grid grid-cols-6 md:grid-cols-12 sm:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                                <div className="relative col-span-1 md:col-span-1">
                                                    <Avatar
                                                        name={journal.title}
                                                        radius={"sm"}
                                                        isBordered
                                                        color={getMoodColorClass(journal.mood)}
                                                    />
                                                </div>

                                                <div className="flex flex-col col-span-11 md:col-span-11 ml-2">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex flex-col gap-0">
                                                            <h3 className="font-semibold text-foreground/90">{journal.title}</h3>
                                                            <p className="text-small text-foreground/80">{formatDate(journal.createdAt)} | {journal.event}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    )
}