import {useEffect, useState} from "react";
import {getPetProfiles} from "@/lib/services/pet/petProfileService";
import {toast} from "react-toastify";
import {PetProfileResponse} from "@/boundary/interfaces/pet";
import {Avatar, Card, CardBody, CardHeader, CircularProgress, Image} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import Link from "next/link";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import Breadcrumb from "@/components/shared/breadcrumbs/Breadcrumb";
import SearchComponent from "@/components/common/filter/SearchComponent";
import {PlusIcon} from "@/components/shared/icons/PlusIcon";
import CreateNewPetModal from "@/components/dashboard/petmngt/pets/Modals/CreateNewPetModal";

export default function PetProfilesOverviewSection() {
    const [petProfiles, setPetProfiles] = useState<PetProfileResponse[]>([]);
    const [isLoadingPetProfiles, setIsLoadingPetProfiles] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        fetchPetProfiles();
    };

    const fetchPetProfiles = async () => {
        setIsLoadingPetProfiles(true);
        try {
            const response = await getPetProfiles();
            if (response.statusCode === 200) {
                const petProfiles = response.data;
                setPetProfiles(petProfiles)
            } else {
                toast.error(`Error fetching pet profiles ${response.message}`)
            }
        } catch (error) {
            toast.error(`Error fetching pet profiles: ${error}`);
        } finally {
            setIsLoadingPetProfiles(false);
        }
    };

    useEffect(() => {
        fetchPetProfiles();
    }, []);

    return (
        <>
            {isLoadingPetProfiles ? (
                <div className={"grid place-items-center"}>
                    <CircularProgress color={"primary"} className={"p-4"} label="Loading your pet profiles...."/>
                </div>
            ) : (
                <>
                    <Breadcrumb pageName="Pet Profiles"/>
                    {petProfiles.length < 1 ? (
                        <>
                            <div className="text-center">
                                <p className="text-danger-400">No pet profile found!</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col gap-4 mb-2">
                                <div className="flex justify-between gap-3 items-end">
                                    <SearchComponent placeholder="Search for pet profiles"/>
                                    <div className="flex gap-3">
                                        <Button onPress={handleOpenModal}
                                                startContent={<PlusIcon/>}
                                                color="primary"
                                                variant="shadow">
                                            Add Pet
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

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pl-0">
                                {petProfiles.map((profile) => (
                                    <Link key={profile.id} href={`${NAVIGATION_LINKS.PET_PROFILES}/${profile.slug}`}>
                                        <Card
                                            isBlurred
                                            key={profile.id}
                                            shadow="sm"
                                            className="py-4">
                                            <CardHeader className="justify-between">
                                                <div className="flex gap-5">
                                                    <Avatar isBordered
                                                            color={profile.species == "dog" ? "success" : "secondary"}
                                                            radius="full" size="md" name={profile.name}/>
                                                    <div className="flex flex-col gap-1 items-start justify-center">
                                                        <h4 className="uppercase font-bold leading-none text-default-600">
                                                            {profile.name}
                                                        </h4>
                                                        <h5 className="text-small tracking-tight text-default-400">{profile.nickname}</h5>
                                                    </div>
                                                </div>

                                                    <Button
                                                        variant="bordered"
                                                        color={profile.species == "dog" ? "success" : "secondary"}
                                                        radius="sm"
                                                        size="sm">
                                                        Profile
                                                    </Button>

                                            </CardHeader>
                                            <CardBody className="overflow-visible py-2 h-[300px] mb-3">
                                                <Image
                                                    alt="Card background"
                                                    className="object-cover rounded-xl h-full w-full mb-2"
                                                    src={profile.profileUrl}
                                                />
                                                <div className={"mb-2"}></div>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    )
}