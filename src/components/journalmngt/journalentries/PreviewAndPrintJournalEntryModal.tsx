import {Button, CircularProgress, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import ReactPDF, {Document, Page, PDFDownloadLink, PDFViewer, StyleSheet, Text, View} from '@react-pdf/renderer';
import Spinner from "@/components/shared/icons/Spinner";
import React, {useEffect, useState} from "react";
import {JournalImageBuffer, PrintJournalEntryRequest} from "@/boundary/interfaces/journal";
import {useAuth} from "@/hooks/useAuth";
import RenderMoodTagsWithColors from "@/components/journalmngt/journalentries/RenderMoodTagsWithColors";
import {formatDate} from "@/helpers/dateHelpers";
import RenderEntryPdfImages from "@/components/journalmngt/journalentries/RenderEntryPdfImages";
import {toast} from "react-toastify";
import {getJournalEntryAttachmentBuffers} from "@/lib/services/journal-entries/journalEntryService";
import {PdfPreviewStyle, toTitleCase} from "@/lib/utils/pdfUtils";
import Font = ReactPDF.Font;

export default function PreviewAndPrintJournalEntryModal({printJournalRequest, isOpen, onClose}: {
    printJournalRequest: PrintJournalEntryRequest,
    isOpen: boolean,
    onClose: () => void
}) {
    const {user} = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageBuffers, setImageBuffers] = useState<JournalImageBuffer[]>([]);
    const [isLoadingBuffers, setIsLoadingBuffers] = useState(true);

    const fetchJournalImageBuffers = async () => {
        setIsLoadingBuffers(true);
        await getJournalEntryAttachmentBuffers(printJournalRequest.id)
            .then((response) => {
                if (response.statusCode === 200) {
                    console.log("journal image buffers", response.data)
                    const journalBuffers: JournalImageBuffer[] = response.data;
                    setImageBuffers(journalBuffers);
                }
            })
            .catch((error) => {
                console.error("Error fetching your journal entry image buffers:", error);
                toast.error(`Error fetching your journal entry image buffers: ${error}`)
            })
            .finally(() => {
                setIsLoadingBuffers(false);
            });
    }

    useEffect(() => {
        fetchJournalImageBuffers();
    }, [printJournalRequest.journalAttachments]);


    const handleJournalPrint = async (e: any) => {

    }
    const handleCloseModal = () => {

    };

    Font.register({
        family: 'Oswald',
        src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
    });

    const styles = PdfPreviewStyle();

    function getDocument() {
        return <Document style={styles.document}>
            <Page size="A4" orientation={"portrait"} style={styles.body} wrap>
                <Text style={styles.header} fixed>
                    ~ Made with love from pet lovers for pet lovers ~
                </Text>
                <Text style={styles.title}>{toTitleCase(printJournalRequest.title)}</Text>
                <Text style={styles.author}>{user?.username}</Text>
                <Text
                    style={styles.author}>{formatDate(printJournalRequest.createdAt)}</Text>

                <Text style={styles.moodtags}>
                    {RenderMoodTagsWithColors(printJournalRequest.moods)}
                    {RenderMoodTagsWithColors(printJournalRequest.tags)}
                </Text>
                <View>
                    <Text style={styles.content}>
                        {printJournalRequest.content}
                    </Text>
                    <RenderEntryPdfImages imageBuffers={imageBuffers}/>
                </View>
            </Page>
        </Document>;
    }

    function DownloadButton() {
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
            <Modal
                isOpen={isOpen}
                onOpenChange={() => {
                    onClose();
                    handleCloseModal();
                }}
                onClose={onClose}
                size={"5xl"}
                placement="auto"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader
                                className="flex flex-col gap-1">Preview {printJournalRequest.title}</ModalHeader>
                            <ModalBody>
                                {isLoadingBuffers ? (
                                    <div className={"grid place-items-center"}>
                                        <CircularProgress color={"primary"} className={"p-4"}
                                                          label="Preparing your preview..."/>
                                    </div>
                                ) : (
                                    <PDFViewer style={{width: "100%", height: "60vh"}}>
                                        {getDocument()}
                                    </PDFViewer>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Close
                                </Button>

                                <div>
                                    {!isLoadingBuffers && (
                                        <PDFDownloadLink document={getDocument()}
                                                         fileName={`${printJournalRequest.slug}.pdf`}>
                                            {({blob, url, loading, error}) =>
                                                loading ? 'Loading document...' : <DownloadButton/>
                                            }
                                        </PDFDownloadLink>
                                    )}
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}