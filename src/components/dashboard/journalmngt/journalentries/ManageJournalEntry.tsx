import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {JournalEntryResponse, PrintJournalEntryRequest} from "@/boundary/interfaces/journal";
import {getJournalEntryDetails} from "@/lib/services/journal-entries/journalEntryService";
import {Card, CardBody, CardHeader, CircularProgress, Image} from "@nextui-org/react";
import RenderJournalHeader from "@/components/dashboard/journalmngt/journalentries/RenderJournalHeader";
import SearchComponent from "@/components/common/filter/SearchComponent";
import {Button} from "@nextui-org/button";
import {PlusIcon} from "@/components/shared/icons/PlusIcon";
import PreviewAndPrintJournalEntryModal
    from "@/components/dashboard/journalmngt/journalentries/Modals/PreviewAndPrintJournalEntryModal";
import {SearchIcon} from "@/components/shared/icons/SearchIcon";
import UploadJournalImagesModal
    from "@/components/dashboard/journalmngt/journalentries/Modals/UploadJournalImagesModal";

export default function ManageJournalEntry({slug}: { slug: string }) {
    const [journalEntryDetails, setJournalEntryDetails] = useState<JournalEntryResponse>({} as JournalEntryResponse);
    const [isLoadingDetails, setIsLoadingDetails] = useState(true);
    const [pets, setPets] = useState<string[]>([]);
    const [journalImages, setJournalImages] = useState<string[]>([]);
    const [printJournalRequest, setPrintJournalRequest] = useState<PrintJournalEntryRequest>({} as PrintJournalEntryRequest);
    const [modals, setModals] = useState({
        uploadAttachments: false,
        previewAndPrintEntry: false,
    });

    const openModal = (modalName: string) => {
        setModals({...modals, [modalName]: true});
    };

    const closeModal = (modalName: string) => {
        setModals({...modals, [modalName]: false});
        fetchJournalEntryDetails(slug);
    };

    const fetchJournalEntryDetails = async (journalSlug: any) => {
        setIsLoadingDetails(true);
        await getJournalEntryDetails(journalSlug)
            .then((response) => {
                if (response.statusCode === 200) {
                    const journals: JournalEntryResponse = response.data;
                    const journalImages = journals.journalAttachments ?
                        journals.journalAttachments.map((item) => item.sourceUrl) : [];
                    setJournalEntryDetails(journals)
                    setJournalImages(journalImages)
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
            id: journals.id,
            slug: journals.slug,
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
                            <div className="w-full sm:max-w-[44%]">
                                <div className="relative flex flex-1 flex-shrink-0">
                                    <Button onPress={() => openModal("uploadAttachments")}
                                            startContent={<PlusIcon/>}
                                            color="primary"
                                            variant="shadow">
                                        Upload Attachments
                                    </Button>

                                    {modals.uploadAttachments && (
                                        <UploadJournalImagesModal
                                            journalId={journalEntryDetails.id}
                                            isOpen={modals.uploadAttachments}
                                            onClose={() => closeModal("uploadAttachments")}
                                        />
                                    )}

                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button onPress={() => openModal("previewAndPrintEntry")}
                                        startContent={<PlusIcon/>}
                                        color="primary"
                                        variant="shadow">
                                    Preview and Print
                                </Button>

                                {modals.previewAndPrintEntry &&(
                                    <PreviewAndPrintJournalEntryModal
                                        printJournalRequest={printJournalRequest}
                                        isOpen={modals.previewAndPrintEntry}
                                        onClose={() => closeModal("previewAndPrintEntry")}
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

                            <div className="-m-1 flex flex-wrap md:-m-2 mt-3">
                                <div className={`flex ${journalImages.length <= 3 ? 'w-full' : 'w-1/2'} flex-wrap`}>
                                    {journalImages.slice(0, 3).map((image, index) => (
                                        <div key={index} className={`w-${index === 2 ? 'full' : '1/2'} p-1 md:p-2`}>
                                            <img
                                                alt={`gallery-${index + 1}`}
                                                className="block h-full w-full rounded-lg object-cover object-center"
                                                src={image}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex w-1/2 flex-wrap">
                                    {journalImages.slice(3).map((image, index) => (
                                        <div key={index} className={`w-${index === 0 ? 'full' : '1/2'} p-1 md:p-2`}>
                                            <img
                                                alt={`gallery-${index + 4}`}
                                                className="block h-full w-full rounded-lg object-cover object-center"
                                                src={image}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </>
            )}
        </>
    )
}