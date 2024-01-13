import React, {useEffect, useState} from "react";
import {validateCreatePetFormInputErrors} from "@/helpers/validationHelpers";
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
import {toast} from "react-toastify";
import Spinner from "@/components/shared/icons/Spinner";
import {CreatePetRequest} from "@/boundary/interfaces/pet";
import {Textarea} from "@nextui-org/input";
import {createPetProfile} from "@/lib/services/pet/petProfileService";
import {species} from "@/boundary/constants/petConstants";

const initialFormState: CreatePetRequest = {
    breed: "",
    dateOfBirth: "",
    description: "",
    name: "",
    nickname: "",
    petTraits: null,
    profilePicture: null,
    species: ""
};

export default function CreateNewPetModal({isOpen, onClose}: {
    isOpen: boolean,
    onClose: () => void
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createPetFormData, setCreatePetFormData] = useState(initialFormState);
    const [inputErrors, setInputErrors] = useState(initialFormState);

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setCreatePetFormData({...createPetFormData, [name]: value});
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        setCreatePetFormData({
            ...createPetFormData,
            profilePicture: files !== null ? files : null,
        });
    };

    const handlePetCreation = async (e: any) => {
        console.log("handling pet creation")
        e.preventDefault();
        setIsSubmitting(true);

        const inputErrors = validateCreatePetFormInputErrors(createPetFormData);
        if (inputErrors && Object.keys(inputErrors).length > 0) {
            setInputErrors(inputErrors);
            setIsSubmitting(false);
            return;
        }

        if (!createPetFormData.profilePicture) {
            toast.error("Profile picture is required.")
            setIsSubmitting(false);
            return;
        }

        if (
            createPetFormData.name.trim() === "" ||
            createPetFormData.description.trim() === "" ||
            createPetFormData.species.trim() === ""
        ) {
            setIsSubmitting(false);
            return;
        }

        let response = await createPetProfile(createPetFormData);
        if (response.statusCode === 200) {
            toast.success(response.message ?? "Pet profile created successfully")
            setIsSubmitting(false);
            setInputErrors(initialFormState);
            setCreatePetFormData(initialFormState)
            onClose()
        } else {
            setIsSubmitting(false);
            toast.error(response.message ?? "Unknown error occurred")
        }
    };

    const handleCloseModal = () => {
        setCreatePetFormData(initialFormState)
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
                            <ModalHeader className="flex flex-col gap-1">Create Pet Profile</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handlePetCreation}>
                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <Input type="text"
                                               color="default"
                                               onChange={handleChange}
                                               value={createPetFormData.name}
                                               label="Name"
                                               labelPlacement={"outside"}
                                               name="name"
                                               variant={"bordered"}
                                               placeholder="Enter pet name"
                                               onInput={() => {
                                                   setInputErrors({...inputErrors, name: ""});
                                               }}
                                               isInvalid={inputErrors.name !== ""}
                                               errorMessage={inputErrors.name}/>

                                        <Input type="text"
                                               className="mt-2 mb-1 "
                                               onChange={handleChange}
                                               value={createPetFormData.nickname || ""}
                                               label="nickname"
                                               radius={"sm"}
                                               labelPlacement={"outside"}
                                               name="nickname"
                                               variant={"bordered"}
                                               placeholder="Enter nickname"
                                               onInput={() => {
                                                   setInputErrors({...inputErrors, nickname: ""});
                                               }}
                                               isInvalid={inputErrors.nickname !== ""}
                                               errorMessage={inputErrors.nickname}/>
                                    </div>

                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <Select
                                            items={species}
                                            label="Pet Species"
                                            labelPlacement={"outside"}
                                            variant="bordered"
                                            name="species"
                                            placeholder="Select pet species"
                                            onChange={handleChange}
                                            onSelectionChange={() => {
                                                setInputErrors({...inputErrors, species: ""});
                                            }}
                                            isInvalid={inputErrors.species !== ""}
                                            errorMessage={inputErrors.species}
                                        >
                                            {(animal) =>
                                                <SelectItem key={animal.value}>
                                                    {animal.label}
                                                </SelectItem>
                                            }
                                        </Select>

                                        <Input type="text"
                                               className="mt-2 mb-1 "
                                               onChange={handleChange}
                                               value={createPetFormData.breed || ""}
                                               label="breed"
                                               radius={"sm"}
                                               labelPlacement={"outside"}
                                               name="breed"
                                               variant={"bordered"}
                                               placeholder="Enter breed"
                                               onInput={() => {
                                                   setInputErrors({...inputErrors, breed: ""});
                                               }}
                                               isInvalid={inputErrors.breed !== ""}
                                               errorMessage={inputErrors.breed}/>
                                    </div>

                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <Input type="text"
                                               color="default"
                                               className="mt-2 mb-1 "
                                               onChange={handleChange}
                                               value={createPetFormData.dateOfBirth || ""}
                                               label="dateOfBirth"
                                               labelPlacement={"outside"}
                                               name="dateOfBirth"
                                               variant={"bordered"}
                                               placeholder="Enter pet dateOfBirth"
                                               onInput={() => {
                                                   setInputErrors({...inputErrors, dateOfBirth: ""});
                                               }}
                                               isInvalid={inputErrors.dateOfBirth !== ""}
                                               errorMessage={inputErrors.dateOfBirth}/>

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
                                                id="multiple_files" type="file">
                                            </input>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-1 md:gap-6">
                                        <Textarea type="text"
                                                  className="mt-2 mb-1 "
                                                  onChange={handleChange}
                                                  value={createPetFormData.description}
                                                  label="Description"
                                                  minRows={4}
                                                  radius={"sm"}
                                                  labelPlacement={"outside"}
                                                  name="description"
                                                  variant={"bordered"}
                                                  placeholder="Write a brief description"
                                                  onInput={() => {
                                                      setInputErrors({...inputErrors, description: ""});
                                                  }}
                                                  isInvalid={inputErrors.description !== ""}
                                                  errorMessage={inputErrors.description}/>
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
                                        onClick={handlePetCreation}
                                        disabled={
                                            !isOpen ||
                                            !(
                                                createPetFormData.name.trim() !== "" &&
                                                createPetFormData.description.trim() !== "" &&
                                                createPetFormData.species.trim() !== ""
                                            )
                                        }
                                    >
                                    {isSubmitting ? "Submitting..." : "Create Pet"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    );
}