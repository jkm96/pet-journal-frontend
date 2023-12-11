import {useEffect, useState} from "react";
import {getPetProfiles} from "@/lib/services/pet/petProfileService";
import {toast} from "react-toastify";
import {PetProfileResponse} from "@/boundary/interfaces/pet";
import {Avatar, Card, CardBody, CardHeader, CircularProgress, Image} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import Link from "next/link";
import {NAVIGATION_LINKS} from "@/boundary/configs/navigationConfig";
import Breadcrumb from "@/components/shared/breadcrumbs/Breadcrumb";

export default function PetProfilesOverviewSection() {
    const [petProfiles, setPetProfiles] = useState<PetProfileResponse[]>([]);
    const [isLoadingPetProfiles, setIsLoadingPetProfiles] = useState(true);

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
                    <Breadcrumb pageName="Pet Profiles" />
                    {petProfiles.length < 1 ? (
                        <>
                            <div className="text-center">
                                <p className="text-danger-400">No pet profile found!</p>
                            </div>
                        </>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                            {petProfiles.map((profile) => (
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
                                        <Link href={`${NAVIGATION_LINKS.PET_PROFILE}/${profile.slug}`}>
                                            <Button
                                                variant="bordered"
                                                color={profile.species == "dog" ? "success" : "secondary"}
                                                radius="sm"
                                                size="sm">
                                                Profile
                                            </Button>
                                        </Link>
                                    </CardHeader>
                                    <CardBody className="overflow-visible py-2">
                                        <Image
                                            alt="Card background"
                                            className="object-cover rounded-xl"
                                            src={profile.profileUrl}
                                        />
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    )
}