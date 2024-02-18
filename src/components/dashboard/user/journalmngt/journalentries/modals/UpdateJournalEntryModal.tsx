import {
  Button,
  CheckboxGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { CustomCheckbox } from '@/components/shared/formelements/CustomCheckbox';
import { Textarea } from '@nextui-org/input';
import { journalTags, moodTags } from '@/boundary/constants/petConstants';
import Spinner from '@/components/shared/icons/Spinner';
import React, { useEffect, useState } from 'react';
import { UpdateJournalEntryRequest } from '@/boundary/interfaces/journal';
import { validateEditJournalFormInputErrors } from '@/helpers/validationHelpers';
import { toast } from 'react-toastify';
import { updateJournalEntry } from '@/lib/services/journalentries/journalEntryService';
import { PetProfileResponse } from '@/boundary/interfaces/pet';
import { getUserPets } from '@/lib/utils/petUtils';

const initialFormState: UpdateJournalEntryRequest = {
    journalId: 0, petIds: [], content: "", event: "", location: "", mood: "", tags: "", title: ""
};
export default function UpdateJournalEntryModal({editJournalRequest, userPets, isOpen, onClose}: {
    editJournalRequest: UpdateJournalEntryRequest,
    userPets: PetProfileResponse[],
    isOpen: boolean,
    onClose: () => void
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updateJournalEntryRequest, setUpdateJournalEntryRequest] = useState<UpdateJournalEntryRequest>(editJournalRequest);
    const [inputErrors, setInputErrors] = useState(initialFormState);
    const [selectedMoodTags, setSelectedMoodTags] = useState<string[]>([]);
    const [selectedJournalTags, setSelectedJournalTags] = useState<string[]>([]);
    const [selectedUserPets, setSelectedUserPets] = useState<string[]>(userPets.map((pet) => pet.name));
    const [pets, setPets] = useState<PetProfileResponse[]>([]);

    const fetchUserPets = getUserPets(setIsLoading, setPets);

    useEffect(() => {
        if (isOpen) {
            fetchUserPets();
        }
    }, [isOpen]);

    useEffect(() => {
        const moods: string[] = editJournalRequest.mood.split(',').map(item => item.trim());
        const tags: string[] = editJournalRequest.tags.split(',').map(item => item.trim());
        setSelectedMoodTags(moods)
        setSelectedJournalTags(tags)
    }, [isOpen, editJournalRequest, userPets]);

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setUpdateJournalEntryRequest({...updateJournalEntryRequest, [name]: value});
    }

    const handleJournalUpdate = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true)

        const inputErrors = validateEditJournalFormInputErrors(updateJournalEntryRequest);
        if (inputErrors && Object.keys(inputErrors).length > 0) {
            setInputErrors(inputErrors);
            setIsSubmitting(false);
            return;
        }

        updateJournalEntryRequest.petIds = selectedUserPets.map((petName, index) => {
            const pet = pets.find((profile) => profile.name === petName);
            return pet ? pet.id : editJournalRequest.petIds[index];
        });
        updateJournalEntryRequest.tags = selectedJournalTags.join(', ')
        updateJournalEntryRequest.mood = selectedMoodTags.join(', ')

        if (
            updateJournalEntryRequest.title.trim() === "" ||
            updateJournalEntryRequest.content.trim() === "" ||
            updateJournalEntryRequest.tags.trim() === "" ||
            updateJournalEntryRequest.mood.trim() === ""
        ) {
            setIsSubmitting(false);
            return;
        }

        if (selectedMoodTags.length === 0 || selectedJournalTags.length === 0) {
            setInputErrors({
                ...inputErrors,
                mood: "Select at least one mood",
                content: "",
                event: "",
                location: "",
                title: "",
                petIds: [],
                journalId: 0,
                tags: "Select at least one tag"
            });
            setIsSubmitting(false);
            return;
        }

        const response = await updateJournalEntry(updateJournalEntryRequest);
        if (response.statusCode === 200) {
            toast.success("Journal entry updated successfully")
            setIsSubmitting(false);
            onClose()
        } else {
            setIsSubmitting(false);
            toast.error(response.message ?? "Unknown error occurred")
        }
    }
    const handleCloseModal = () => {

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
                size="5xl"
                placement="center"
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Update Journal Entry</ModalHeader>
                            <ModalBody>
                                {isLoading ? (
                                    <div className="text-center">Loading your pets...</div>
                                ) : (
                                    <form onSubmit={handleJournalUpdate}>
                                        <h3>Journal Details</h3>

                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            <Input type="text"
                                                   className="mt-2 mb-1 "
                                                   onChange={handleChange}
                                                   value={updateJournalEntryRequest.title}
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
                                                   value={updateJournalEntryRequest.event}
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
                                                        <CustomCheckbox key={pet.id} value={pet.name}>
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
                                                      value={updateJournalEntryRequest.content}
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
                                        onClick={handleJournalUpdate}>
                                    {isSubmitting ? "Submitting..." : "Update Journal"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}