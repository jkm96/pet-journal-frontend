import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {JournalEntryResponse, PrintJournalEntryRequest} from "@/boundary/interfaces/journal";
import {getJournalEntryDetails} from "@/lib/services/journal-entries/journalEntryService";
import {Card, CardBody, CardHeader, CircularProgress, Image} from "@nextui-org/react";
import RenderJournalHeader from "@/components/journalmngt/journalentries/RenderJournalHeader";
import SearchComponent from "@/components/common/filter/SearchComponent";
import {Button} from "@nextui-org/button";
import {PlusIcon} from "@/components/shared/icons/PlusIcon";
import PreviewAndPrintJournalEntryModal from "@/components/journalmngt/journalentries/PreviewAndPrintJournalEntryModal";

export default function ManageJournalEntry({slug}: { slug: string }) {
    const [journalEntryDetails, setJournalEntryDetails] = useState<JournalEntryResponse>({} as JournalEntryResponse);
    const [isLoadingDetails, setIsLoadingDetails] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pets, setPets] = useState<string[]>([]);
    const [printJournalRequest, setPrintJournalRequest] = useState<PrintJournalEntryRequest>({} as PrintJournalEntryRequest);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const fetchJournalEntryDetails = async (journalSlug: any) => {
        setIsLoadingDetails(true);
        await getJournalEntryDetails(journalSlug)
            .then((response) => {
                if (response.statusCode === 200) {
                    console.log("journal entry", response.data)
                    const journals: JournalEntryResponse = response.data;
                    setJournalEntryDetails(journals)
                    createRecords(journals)
                }
            })
            .catch((error) => {
                console.error("Error fetching your journal entry details:", error);

                toast.error(`Error fetching your journal entry details: ${error}`)
            })
            .finally(() => {
                setIsLoadingDetails(false);
            });
    }

    useEffect(() => {
        fetchJournalEntryDetails(slug);
    }, [slug]);

    const createRecords = (journals: JournalEntryResponse) => {
        const petNames = journals.pets ? journals.pets.map((pet) => pet.name) : [];
        const attachments = journals.journalAttachments ? journals.journalAttachments.map((attachment) => attachment.sourceUrl) : [];
        const moods: string[] = journals.mood.split(',').map(item => item.trim());
        const tags: string[] = journals.tags.split(',').map(item => item.trim());
        const printJournalRequest: PrintJournalEntryRequest = {
            id:journals.id,
            slug:journals.slug,
            title: journals.title,
            createdAt: journals.createdAt,
            event: journals.event,
            content: journals.content,
            journalAttachments: attachments,
            location: journals.location,
            moods: moods,
            pets: petNames,
            tags: tags,
        };

        setPets(petNames);
        setPrintJournalRequest(printJournalRequest);
    };

    return (
        <>
            {isLoadingDetails ? (
                <div className={"grid place-items-center"}>
                    <CircularProgress color={"primary"} className={"p-4"}
                                      label="Loading your journal entry details...."/>
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
                                    Preview and Print
                                </Button>
                                {isModalOpen && (
                                    <PreviewAndPrintJournalEntryModal
                                        printJournalRequest={printJournalRequest}
                                        isOpen={isModalOpen}
                                        onClose={handleCloseModal}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <Card className="py-4">
                        <RenderJournalHeader title={journalEntryDetails.title}
                                             createdAt={journalEntryDetails.createdAt}
                                             mood={journalEntryDetails.mood}
                                             tags={journalEntryDetails.tags}
                                             pets={pets}/>
                        <CardBody className="overflow-visible py-2">
                            <div className="mt-1 mb-1">
                                {journalEntryDetails.content}
                            </div>
                            <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 mt-1">
                                {journalEntryDetails.journalAttachments.map((journalAttachment) => (
                                    <Image
                                        key={journalAttachment.id}
                                        alt="Card background"
                                        className="object-cover rounded-xl"
                                        src={journalAttachment.sourceUrl}
                                        width={270}
                                    />
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </>
            )}
        </>
    )
}