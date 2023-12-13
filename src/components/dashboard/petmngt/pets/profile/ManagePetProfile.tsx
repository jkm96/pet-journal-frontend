import {useEffect, useState} from "react";
import {AddPetTraitRequest, PetProfileResponse, Trait} from "@/boundary/interfaces/pet";
import {addPetTraits, createPetProfile, getPetProfileDetails} from "@/lib/services/pet/petProfileService";
import {toast} from "react-toastify";
import {Card, CardBody, Slider, Button, Image, CircularProgress, Input, Select, SelectItem} from "@nextui-org/react";
import CreateNewPetModal from "@/components/dashboard/petmngt/pets/modals/CreateNewPetModal";
import Breadcrumb from "@/components/shared/breadcrumbs/Breadcrumb";
import {toTitleCase} from "@/lib/utils/pdfUtils";
import {EditIcon} from "@nextui-org/shared-icons";
import {PetProfileCard} from "@/components/dashboard/petmngt/pets/profile/PetProfileCard";
import Spinner from "@/components/shared/icons/Spinner";

export default function ManagePetProfile({slug}: { slug: string }) {
    const [petProfileDetails, setPetProfileDetails] = useState<PetProfileResponse>({} as PetProfileResponse);
    const [isLoadingPetDetails, setIsLoadingPetDetails] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTrait, setCurrentTrait] = useState<Trait>({trait: '', type: ''});
    const [traits, setTraits] = useState<Trait[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const fetchPetProfileInfo = async (petSlug: string) => {
        setIsLoadingPetDetails(true);
        try {
            const response = await getPetProfileDetails(petSlug);
            if (response.statusCode === 200) {
                const petProfiles = response.data;
                setPetProfileDetails(petProfiles)
            } else {
                toast.error(`Error fetching your pet profile details ${response.message}`)
            }
        } catch (error) {
            toast.error(`Error fetching pet your profile details: ${error}`);
        } finally {
            setIsLoadingPetDetails(false);
        }
    };

    useEffect(() => {
        fetchPetProfileInfo(slug);
    }, [slug]);

    const handleInputChange = (key: keyof Trait, value: string) => {
        setCurrentTrait((prevTrait) => ({...prevTrait, [key]: value}));
    };

    const addTrait = () => {
        if (currentTrait.trait.trim() === '' || currentTrait.type === '') {
            toast.error('Trait name and type are required.');
            return;
        }
        setTraits((prevTraits) => [...prevTraits, currentTrait]);
        setCurrentTrait({trait: '', type: ''});
    };

    const removeTrait = (index: number) => {
        setTraits((prevTraits) => {
            const updatedTraits = [...prevTraits];
            updatedTraits.splice(index, 1);
            return updatedTraits;
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log('Submitted Traits:', traits);
        const addTrait: AddPetTraitRequest = {
            petId: petProfileDetails.id,
            traits: traits
        }
        let response = await addPetTraits(addTrait);
        if (response.statusCode === 200) {
            toast.success(response.message ?? "Pet traits added successfully")
            setIsSubmitting(false);
            setTraits([]);
        } else {
            setIsSubmitting(false);
            toast.error(response.message ?? "Unknown error occurred")
        }
    };

    return (
        <>
            {isLoadingPetDetails ? (
                <div className={"grid place-items-center"}>
                    <CircularProgress color={"primary"} className={"p-4"} label="Loading your pet details...."/>
                </div>
            ) : (
                <>
                    <Breadcrumb pageName={`${toTitleCase(petProfileDetails.name)}'s Profile`}/>

                    <div className="flex flex-col gap-4 m-2">
                        <div className="flex justify-between gap-3 items-end">
                            <div className="flex gap-3">
                                <Button onPress={handleOpenModal}
                                        startContent={<EditIcon/>}
                                        color="primary"
                                        variant="shadow">
                                    Edit Pet
                                </Button>
                                {isModalOpen && (
                                    <CreateNewPetModal
                                        isOpen={isModalOpen}
                                        onClose={handleCloseModal}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <PetProfileCard petProfileDetails={petProfileDetails}/>

                    <div>
                        <div className="grid md:grid-cols-3 md:gap-6">
                            <div className={"col-6"}>
                                <Input
                                    aria-label={"Trait"}
                                    type="text"
                                    size={"sm"}
                                    variant="bordered"
                                    radius={"sm"}
                                    placeholder="Enter trait"
                                    value={currentTrait.trait}
                                    onChange={(e) => handleInputChange('trait', e.target.value)}
                                />
                            </div>

                            <div className={"col-5"}>
                                <Select
                                    aria-label={"Type"}
                                    variant="bordered"
                                    name="type"
                                    size={"sm"}
                                    placeholder="Select type"
                                    value={currentTrait.type}
                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                >
                                    <SelectItem key={"like"} value="like">Like</SelectItem>
                                    <SelectItem key={"dislike"} value="dislike">Dislike</SelectItem>
                                </Select>
                            </div>

                            <div className={"col-1"}>
                                <Button type="button"
                                        onPress={addTrait}
                                        color="primary"
                                        variant="shadow"
                                        className="text-white">
                                    Add Trait
                                </Button>
                            </div>
                        </div>

                        {traits.map((trait, index) => (
                            <div key={index} className="m-2">
                                {trait.trait} - {trait.type}
                                <Button type="button"
                                        onPress={() => removeTrait(index)}
                                        color={"danger"}>
                                  Remove
                                </Button>
                            </div>
                        ))}

                        {traits.length > 0 && (
                            <Button color="primary"
                                    type="submit"
                                    isLoading={isSubmitting}
                                    spinner={<Spinner/>}
                                    onClick={handleSubmit}>
                                {isSubmitting ? "Submitting..." : "Submit Trait"}
                            </Button>
                        )}
                    </div>
                </>
            )}
        </>

    )
}
