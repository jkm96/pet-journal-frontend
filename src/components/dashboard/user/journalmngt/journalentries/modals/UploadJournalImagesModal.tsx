import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import Spinner from "@/components/shared/icons/Spinner";
import React, {useState} from "react";
import {toast} from "react-toastify";
import {UploadJournalImageRequest} from "@/boundary/interfaces/journal";
import {areFilesValid} from "@/helpers/validationHelpers";
import {uploadJournalAttachments} from "@/lib/services/journal-entries/journalEntryService";
import {DragDropSection} from "@/components/dashboard/user/journalmngt/journalentries/modals/CreateJournalEntryModal";

const initialFormState: UploadJournalImageRequest = {
    attachments: null, journalId: 0
}

export default function UploadJournalImagesModal({journalId, isOpen, onClose}: {
    journalId: number,
    isOpen: boolean,
    onClose: () => void
}) {
    const [uploadImageFormData, setUploadImageFormData] = useState<UploadJournalImageRequest>(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewFile, setPreviewFile] = useState<any[]>([]);

    const handleFileChange = (e: any) => {
        const uploadedFiles = e.target.files;
        console.log('FileList:', uploadedFiles);

        if (!areFilesValid(uploadedFiles)) {
            toast.error('Please select only PNG or JPG files.');
            e.target.files = null;
        } else {
            setPreviewFile(prevFiles => [...prevFiles, ...uploadedFiles]);
            setUploadImageFormData({
                ...uploadImageFormData,
                attachments: uploadedFiles,
            });
        }
    };

    const removeImage = (fileName: any) => {
        setPreviewFile(prevFiles => prevFiles.filter(file => file.name !== fileName));

        setUploadImageFormData((prevFormData: any) => {
            const updatedAttachments = Array.from(prevFormData.attachments as File[]).filter((file) => file.name !== fileName);
            return {
                ...prevFormData,
                attachments: updatedAttachments,
            };
        });
    }

    const handleImageUpload = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        uploadImageFormData.journalId = journalId;
        if (uploadImageFormData.attachments === null) {
            setIsSubmitting(false);
            toast.error('Please upload at least one file.');
            return;
        }

        if (!areFilesValid(uploadImageFormData.attachments)) {
            setIsSubmitting(false);
            toast.error('Please upload only PNG or JPG files.');
            return;
        }
        console.log("uploadImageFormData", uploadImageFormData)
        const response = await uploadJournalAttachments(uploadImageFormData);
        if (response.statusCode === 200) {
            toast.success(response.message ?? "Attachments uploaded successfully")
            setIsSubmitting(false);
            setUploadImageFormData(initialFormState)
            onClose()
        } else {
            setIsSubmitting(false);
            toast.error(response.message ?? "Unknown error occurred")
        }
    }

    const handleCloseModal = () => {
        setUploadImageFormData(initialFormState)
    };

    return (<>
        <Modal
            isOpen={isOpen}
            onOpenChange={() => {
                onClose();
                handleCloseModal();
            }}
            onClose={onClose}
            size="5xl"
            placement="center"
            scrollBehavior="inside"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Upload Journal Entry Attachments</ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleImageUpload}>
                                <div className="flex justify-center items-center bg-gray-900 px-2">
                                    <div className="w-full rounded-md">
                                        {DragDropSection(handleFileChange, previewFile, removeImage)}
                                    </div>
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary"
                                    type="submit"
                                    isLoading={isSubmitting}
                                    spinner={<Spinner/>}
                                    onClick={handleImageUpload}>
                                {isSubmitting ? "Submitting..." : "Upload Attachments"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>

    </>)
}