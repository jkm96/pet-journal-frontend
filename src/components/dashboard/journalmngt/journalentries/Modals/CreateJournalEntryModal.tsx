import React, {useEffect, useState} from "react";
import {getPetProfiles} from "@/lib/services/pet/petProfileService";
import {toast} from "react-toastify";
import {PetProfileResponse} from "@/boundary/interfaces/pet";
import {CreateJournalEntryRequest} from "@/boundary/interfaces/journal";
import {
    Button, CheckboxGroup, Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@nextui-org/react";
import Spinner from "@/components/shared/icons/Spinner";
import {journalTags, moodTags} from "@/boundary/constants/petConstants";
import {CustomCheckbox} from "@/components/shared/formelements/CustomCheckbox";
import {Textarea} from "@nextui-org/input";
import {createJournalEntry} from "@/lib/services/journal-entries/journalEntryService";
import {areFilesValid, validateCreateJournalFormInputErrors, validateCreatePetFormInputErrors} from "@/helpers/validationHelpers";


const initialFormState: CreateJournalEntryRequest = {
    content: "", event: "", location: "", mood: "", petIds: [], attachments: null, tags: "", title: ""
};

function resetForm(setCreateJournalFormData: any,
                   setSelectedUserPets: any,
                   setSelectedJournalTags: any,
                   setSelectedMoodTags: any,
                   setIsSubmitting: any) {
    setCreateJournalFormData(initialFormState);
    setSelectedUserPets([])
    setSelectedJournalTags([])
    setSelectedMoodTags([])
    setIsSubmitting(false)
}

export default function CreateJournalEntryModal({isOpen, onClose}: {
    isOpen: boolean,
    onClose: () => void
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pets, setPets] = useState<PetProfileResponse[]>([]);
    const [createJournalFormData, setCreateJournalFormData] = useState<CreateJournalEntryRequest>(initialFormState);
    const [inputErrors, setInputErrors] = useState(initialFormState);
    const [selectedUserPets, setSelectedUserPets] = useState([]);
    const [selectedMoodTags, setSelectedMoodTags] = useState([]);
    const [selectedJournalTags, setSelectedJournalTags] = useState([]);
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        console.log('FileList:', files);

        if (!areFilesValid(files)) {
            toast.error('Please select only PNG or JPG files.');
            e.target.files = null;
        } else {
            setCreateJournalFormData({
                ...createJournalFormData,
                attachments: files,
            });
        }
    };

    const handleJournalCreation = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true)

        const inputErrors = validateCreateJournalFormInputErrors(createJournalFormData);
        console.log("input errors", inputErrors)
        if (inputErrors && Object.keys(inputErrors).length > 0) {
            setInputErrors(inputErrors);
            setIsSubmitting(false);
            return;
        }
        createJournalFormData.petIds = selectedUserPets
        createJournalFormData.tags = selectedJournalTags.join(', ')
        createJournalFormData.mood = selectedMoodTags.join(', ')

        if (createJournalFormData.petIds.length === 0) {
            setIsSubmitting(false);
            toast.error("Please select at least one pet")
            return;
        }

        if (!areFilesValid(createJournalFormData.attachments)) {
            setIsSubmitting(false);
            toast.error('Please select only PNG or JPG files.');
            return;
        }

        if (
            createJournalFormData.title.trim() === "" ||
            createJournalFormData.content.trim() === "" ||
            createJournalFormData.tags.trim() === "" ||
            createJournalFormData.mood.trim() === ""
        ) {
            setIsSubmitting(false);
            return;
        }

        if (selectedMoodTags.length === 0 || selectedJournalTags.length === 0) {
            setInputErrors({
                ...inputErrors,
                mood: "Select at least one mood", attachments: null, content: "", event: "", location: "", petIds: [], title: "",
                tags: "Select at least one tag"
            });
            setIsSubmitting(false);
            return;
        }

        const response = await createJournalEntry(createJournalFormData);
        if (response.statusCode === 200) {
            toast.success("Journal entry created successfully")
            setIsSubmitting(false);
            resetForm(setCreateJournalFormData, setSelectedUserPets, setSelectedJournalTags, setSelectedMoodTags, setIsSubmitting);
            onClose()
        } else {
            setIsSubmitting(false);
            toast.error(response.message ?? "Unknown error occurred")
        }
    }
    const handleCloseModal = () => {
        resetForm(setCreateJournalFormData, setSelectedUserPets, setSelectedJournalTags, setSelectedMoodTags, setIsSubmitting);
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
                placement="center"
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

                                            <Input type="text"
                                                   className="mt-2 mb-1 "
                                                   onChange={handleChange}
                                                   value={createJournalFormData.event}
                                                   label="Event"
                                                   radius={"sm"}
                                                   labelPlacement={"outside"}
                                                   name="event"
                                                   variant={"bordered"}
                                                   placeholder="Enter event"
                                                   onInput={() => {
                                                       setInputErrors({...inputErrors, event: ""});
                                                   }}
                                                   isInvalid={inputErrors.event !== ""}
                                                   errorMessage={inputErrors.event}/>
                                        </div>

                                        <div className="grid md:grid-cols-1 md:gap-6">
                                            <div className="flex flex-col gap-1 w-full">
                                                <CheckboxGroup
                                                    className="gap-1"
                                                    name={"petIds"}
                                                    label="Select pets"
                                                    orientation="horizontal"
                                                    value={selectedUserPets}
                                                    onChange={(keys: any) => setSelectedUserPets(keys)}
                                                    errorMessage={inputErrors.petIds}
                                                >
                                                    {pets.map((pet) => (
                                                        <CustomCheckbox key={pet.id} value={pet.id}>
                                                            {pet.name}
                                                        </CustomCheckbox>
                                                    ))}
                                                </CheckboxGroup>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-1 md:gap-6">
                                            <Textarea type="text"
                                                      className="mt-2 mb-1 "
                                                      onChange={handleChange}
                                                      value={createJournalFormData.content}
                                                      label="Description"
                                                      minRows={4}
                                                      radius={"sm"}
                                                      labelPlacement={"outside"}
                                                      name="content"
                                                      variant={"bordered"}
                                                      placeholder="Write a brief description"
                                                      onInput={() => {
                                                          setInputErrors({...inputErrors, content: ""});
                                                      }}
                                                      isInvalid={inputErrors.content !== ""}
                                                      errorMessage={inputErrors.content}/>
                                        </div>

                                        <div className="grid md:grid-cols-1 md:gap-6">
                                            <label
                                                className="block text-sm font-medium text-gray-900 dark:text-white"
                                                htmlFor="multiple_files">Attach files</label>
                                            <input
                                                onChange={handleFileChange}
                                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                                                bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                id="multiple_files" type="file" multiple>
                                            </input>
                                        </div>

                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            <div className="flex flex-col gap-1 w-full">
                                                <CheckboxGroup
                                                    className="gap-1"
                                                    label="Select mood"
                                                    orientation="horizontal"
                                                    value={selectedMoodTags}
                                                    onChange={(keys: any) => {
                                                        setInputErrors({...inputErrors, mood: ""});
                                                        setSelectedMoodTags(keys);
                                                    }}
                                                    errorMessage={inputErrors.mood}
                                                >
                                                    {moodTags.map((tag) => (
                                                        <CustomCheckbox key={tag.key} value={tag.key}>
                                                            {tag.label}
                                                        </CustomCheckbox>
                                                    ))}
                                                </CheckboxGroup>
                                            </div>

                                            <div className="flex flex-col gap-1 w-full">
                                                <CheckboxGroup
                                                    className="gap-1"
                                                    label="Select tags"
                                                    orientation="horizontal"
                                                    value={selectedJournalTags}
                                                    onChange={(keys: any) => {
                                                        setInputErrors({...inputErrors, tags: ""});
                                                        setSelectedJournalTags(keys);
                                                    }}
                                                    errorMessage={inputErrors.tags}
                                                >
                                                    {journalTags.map((tag) => (
                                                        <CustomCheckbox key={tag.key} value={tag.key}>
                                                            {tag.label}
                                                        </CustomCheckbox>
                                                    ))}
                                                </CheckboxGroup>
                                            </div>
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