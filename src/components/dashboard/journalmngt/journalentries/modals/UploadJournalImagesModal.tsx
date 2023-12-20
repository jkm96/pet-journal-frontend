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
    const [previewFile, setPreviewFile] = useState<any[]>([]);
    const [message, setMessage] = useState("");

    const handleFileChange = (e: any) => {
        const uploadedFiles = e.target.files;
        console.log('FileList:', uploadedFiles);

        if (!areFilesValid(uploadedFiles)) {
            toast.error('Please select only PNG or JPG files.');
            e.target.files = null;
        } else {
            // Use a functional update to correctly update state with multiple files
            setPreviewFile(prevFiles => [...prevFiles, ...uploadedFiles]);
            setUploadImageFormData({
                ...uploadImageFormData,
                attachments: uploadedFiles,
            });
        }
    };

    const removeImage = (fileName:any) => {
        setPreviewFile(prevFiles => prevFiles.filter(file => file.name !== fileName));

        setUploadImageFormData((prevFormData:any) => {
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
                                <div className="flex justify-center items-center bg-gray-900 px-2">
                                    <div className="p-3 w-full rounded-md">
                                        <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">{message}</span>
                                        <div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer   border-gray-400 border-dotted">
                                            <input type="file" onChange={handleFileChange} className="h-full w-full opacity-0 z-10 absolute" name="files[]" multiple/>
                                            <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
                                                <div className="flex flex-col">
                                                    <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                                                    <span className="text-[12px]">{`Drag and Drop a file`}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {previewFile.map((file, key) => {
                                                return (

                                                    <div key={key} className='w-full h-16 flex items-center justify-between rounded p-3 bg-white'>
                                                        <div className="flex flex-row items-center gap-2">
                                                            <div className="h-12 w-12 ">
                                                                <img className="w-full h-full rounded" src={URL.createObjectURL(file)} />
                                                            </div>
                                                            <span className="truncate w-44">{file.name}</span>
                                                        </div>
                                                        <div onClick={() => { removeImage(file.name) }}
                                                             className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm">
                                                            <i className="mdi mdi-trash-can text-white text-[14px]"></i>Delete
                                                        </div>
                                                    </div>

                                                )
                                            })}
                                        </div>
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