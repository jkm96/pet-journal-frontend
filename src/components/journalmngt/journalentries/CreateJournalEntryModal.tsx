import {useEffect, useState} from "react";
import {getPetProfiles} from "@/lib/services/pet/petProfileService";
import {toast} from "react-toastify";
import {PetProfileResponse} from "@/boundary/interfaces/pet";
import {CreateJournalEntryRequest} from "@/boundary/interfaces/journal";
import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import Spinner from "@/components/shared/icons/Spinner";

const initialFormState: CreateJournalEntryRequest = {
    content: "", event: "", location: "", mood: "", petIds: [], profilePictures: [], tags: "", title: ""
};

export default function CreateJournalEntryModal({isOpen, onClose}: {
    isOpen: boolean,
    onClose: () => void
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pets, setPets] = useState<PetProfileResponse[]>([]);
    const [createJournalFormData, setCreateJournalFormData] = useState<CreateJournalEntryRequest>(initialFormState);
    const [inputErrors, setInputErrors] = useState({
        content: "", event: "", location: "", mood: "", petIds: [], profilePictures: [], tags: "", title: ""
    });
    const fetchUserPets = async () => {
        setIsLoading(true);
        await getPetProfiles()
            .then((response) => {
                if (response.statusCode === 200) {
                    const pets: PetProfileResponse[] = response.data;
                    setPets(pets)
                }
            })
            .catch((error) => {
                toast.error(`Error fetching your pets: ${error}`)
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if (isOpen) {
            fetchUserPets();
        }
    }, [isOpen]);

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setCreateJournalFormData({...createJournalFormData, [name]: value});
    }

    const handleJournalCreation = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true)
    }
    const handleCloseModal = () => {
        setCreateJournalFormData(initialFormState);
        setIsSubmitting(false)
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={() => {
                    onClose();
                    handleCloseModal();
                }}
                onClose={onClose}
                size="5xl"
                placement="top-center"
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create Journal Entry</ModalHeader>
                            <ModalBody>
                                {isLoading ? (
                                    <div className="text-center">Loading your pets...</div>
                                ) : (
                                    <form onSubmit={handleJournalCreation}>
                                        <h3>Journal Details</h3>
                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            <Input type="text"
                                                   className="mt-2 mb-1 "
                                                   onChange={handleChange}
                                                   value={createJournalFormData.title}
                                                   label="Title"
                                                   radius={"sm"}
                                                   labelPlacement={"outside"}
                                                   name="title"
                                                   variant={"bordered"}
                                                   placeholder="Enter title"
                                                   onInput={() => {
                                                       setInputErrors({...inputErrors, title: ""});
                                                   }}
                                                   isInvalid={inputErrors.title !== ""}
                                                   errorMessage={inputErrors.title}/>

                                        </div>

                                    </form>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary"
                                        type="submit"
                                        isLoading={isSubmitting}
                                        spinner={<Spinner/>}
                                        onClick={handleJournalCreation}>
                                    {isSubmitting ? "Submitting..." : "Create Journal"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}