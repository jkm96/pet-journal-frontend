import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem
} from "@nextui-org/react";
import {species} from "@/boundary/constants/petConstants";
import {Textarea} from "@nextui-org/input";
import Spinner from "@/components/shared/icons/Spinner";
import React, {useState} from "react";
import {toast} from "react-toastify";
import {CreateJournalEntryRequest, UploadJournalImageRequest} from "@/boundary/interfaces/journal";
import {areFilesValid} from "@/helpers/validationHelpers";
import {createJournalEntry, uploadJournalAttachments} from "@/lib/services/journal-entries/journalEntryService";

const initialFormState : UploadJournalImageRequest ={
    attachments: null, journalId: 0
}
export default function UploadJournalImagesModal({journalId,isOpen, onClose}: {
    journalId: number,
    isOpen: boolean,
    onClose: () => void
}) {
    const [uploadImageFormData, setUploadImageFormData] = useState<UploadJournalImageRequest>(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        console.log('FileList:', files);

        if (!areFilesValid(files)) {
            toast.error('Please select only PNG or JPG files.');
            e.target.files = null;
        } else {
            setUploadImageFormData({
                ...uploadImageFormData,
                attachments: files,
            });
        }
    };

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
        console.log("uploadImageFormData",uploadImageFormData)
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


                                    <div className="mt-2">
                                        <label
                                            className="block text-sm font-medium text-gray-900 dark:text-white"
                                            htmlFor="multiple_files">Attach profile picture</label>
                                        <input
                                            onChange={handleFileChange}
                                            name={"profilePicture"}
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                                                bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600
                                                dark:placeholder-gray-400"
                                            id="multiple_files" type="file" multiple>
                                        </input>
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