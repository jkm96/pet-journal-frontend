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
import CreateJournalEntryModal from "@/components/journalmngt/journalentries/CreateJournalEntryModal";

export default function JournalEntriesOverview() {
    const [journalEntries, setJournalEntries] = useState<JournalEntryResponse[]>([]);
    const [isLoadingJournalEntries, setIsLoadingJournalEntries] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const fetchJournalEntries = async () => {
        setIsLoadingJournalEntries(true)
        await getJournalEntries()
            .then((response) => {
                if (response.statusCode === 200) {
                    const entries = response.data;
                    console.log("journal entries", entries)
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
        fetchJournalEntries();
    }, []);

    return (
        <>
            {isLoadingJournalEntries ? (
                <div className={"grid place-items-center"}>
                    <CircularProgress color={"primary"} className={"p-4"} label="Loading your journal entries...."/>
                </div>
            ) : (
                <>
                    <Breadcrumb pageName="Journal Entries" />
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
                                <Card
                                    isBlurred
                                    key={journal.id}
                                    shadow="sm"
                                    className="py-4">
                                    {journal.content}
                                </Card>
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    )
}