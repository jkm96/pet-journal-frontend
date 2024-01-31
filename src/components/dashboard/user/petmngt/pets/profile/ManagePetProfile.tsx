import { useEffect, useState } from 'react';
import { AddPetTraitRequest, EditPetRequest, PetProfileResponse, Trait } from '@/boundary/interfaces/pet';
import { addPetTraits, getPetProfileDetails } from '@/lib/services/pet/petProfileService';
import { toast } from 'react-toastify';
import { Button, CircularProgress, Input, Select, SelectItem } from '@nextui-org/react';
import Breadcrumb from '@/components/shared/breadcrumbs/Breadcrumb';
import { toTitleCase } from '@/lib/utils/pdfUtils';
import { EditIcon } from '@nextui-org/shared-icons';
import { PetProfileCard } from '@/components/dashboard/user/petmngt/pets/profile/PetProfileCard';
import Spinner from '@/components/shared/icons/Spinner';
import PetTraits from '@/components/dashboard/user/petmngt/pets/profile/PetTraits';
import UpdateProfilePictureModal from '@/components/dashboard/user/petmngt/pets/modals/UpdateProfilePictureModal';
import EditPetModal from '@/components/dashboard/user/petmngt/pets/modals/EditPetModal';
import CameraIcon from '@/components/shared/icons/CameraIcon';
import TrashIcon from '@/components/shared/icons/TrashIcon';
import DeletePetModal from '@/components/dashboard/user/petmngt/pets/modals/DeletePetModal';

export default function ManagePetProfile({slug}: { slug: string }) {
    const [petProfileDetails, setPetProfileDetails] = useState<PetProfileResponse>({} as PetProfileResponse);
    const [isLoadingPetDetails, setIsLoadingPetDetails] = useState(true);
    const [currentTrait, setCurrentTrait] = useState<Trait>({trait: '', type: ''});
    const [traits, setTraits] = useState<Trait[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modals, setModals] = useState({
        editPet: false,
        deletePet: false,
        updateProfileImage: false,
    });

    const openModal = (modalName: string) => {
        setModals({...modals, [modalName]: true});
    };

    const closeModal = (modalName: string) => {
        setModals({...modals, [modalName]: false});
        fetchPetProfileInfo(slug);
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

        const addTrait: AddPetTraitRequest = {
            petId: petProfileDetails.id,
            traits: traits
        }
        let response = await addPetTraits(addTrait);
        if (response.statusCode === 200) {
            toast.success(response.message ?? "Pet traits added successfully")
            setIsSubmitting(false);
            setTraits([]);
            fetchPetProfileInfo(slug);
        } else {
            setIsSubmitting(false);
            toast.error(response.message ?? "Unknown error occurred")
        }
    };

    const editPetRequest: EditPetRequest = {
        petId: petProfileDetails.id,
        breed: petProfileDetails.breed,
        description: petProfileDetails.description,
        name: petProfileDetails.name,
        nickname: petProfileDetails.nickname,
        species: petProfileDetails.species
    }

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
                                <Button onPress={() => openModal("editPet")}
                                        startContent={<EditIcon/>}
                                        color="primary"
                                        className="mr-2"
                                        variant="shadow">
                                    Edit Pet
                                </Button>

                                {modals.editPet && (
                                    <EditPetModal
                                        editPetRequest={editPetRequest}
                                        isOpen={modals.editPet}
                                        onClose={() => closeModal("editPet")}
                                    />
                                )}

                               <Button onPress={() => openModal("deletePet")}
                                        startContent={<TrashIcon color="#ffffff"/>}
                                        color="danger"
                                        className="mr-2"
                                        variant="shadow">
                                    Delete Pet
                                </Button>

                                {modals.deletePet && (
                                    <DeletePetModal
                                        petId={petProfileDetails.id}
                                        isOpen={modals.deletePet}
                                        onClose={() => closeModal("deletePet")}
                                    />
                                )}

                                {modals.updateProfileImage && (
                                    <UpdateProfilePictureModal
                                        petId={petProfileDetails.id}
                                        isOpen={modals.updateProfileImage}
                                        onClose={() => closeModal("updateProfileImage")}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 m-2 bg-white rounded-md">
                            <div className="relative">
                                <img
                                    className="w-full"
                                    src={petProfileDetails.profileUrl}
                                    alt={petProfileDetails.slug}/>
                                <Button onPress={() => openModal("updateProfileImage")}
                                        startContent={<CameraIcon/>}
                                        color="primary"
                                        size="sm"
                                        className="absolute top-5 right-5"
                                        variant="shadow">
                                    Edit
                                </Button>
                            </div>
                        </div>
                    <PetProfileCard petProfileDetails={petProfileDetails}/>
                    </div>

                    <PetTraits petTraits={petProfileDetails?.petTraits}/>

                    <div className="py-4 m-4">
                        <h3>Add Pet Trait(s)</h3>
                        <div className="grid md:grid-cols-3 md:gap-6">
                            <div className="col-6 mt-2">
                                <Input
                                    aria-label="Trait"
                                    type="text"
                                    size="sm"
                                    variant="bordered"
                                    radius="sm"
                                    placeholder="Enter trait"
                                    value={currentTrait.trait}
                                    onChange={(e) => handleInputChange('trait', e.target.value)}
                                />
                            </div>

                            <div className="col-5 mt-2">
                                <Select
                                    aria-label="Type"
                                    variant="bordered"
                                    name="type"
                                    size="sm"
                                    placeholder="Select type"
                                    value={currentTrait.type}
                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                >
                                    <SelectItem key={"like"} value="like">Like</SelectItem>
                                    <SelectItem key={"dislike"} value="dislike">Dislike</SelectItem>
                                </Select>
                            </div>

                            <div className="col-1 mt-2">
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
                                <span className="">
                                    {trait.trait} - {trait.type}
                                </span>
                                <Button
                                    onPress={() => removeTrait(index)}
                                    className="p-0"
                                    size="sm"
                                    isIconOnly
                                    style={{padding: 0, fontSize: "larger"}}
                                    color="danger">
                                    x
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
