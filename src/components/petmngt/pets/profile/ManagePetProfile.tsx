import {useEffect, useState} from "react";
import {PetProfileResponse} from "@/boundary/interfaces/pet";
import {getPetProfileDetails} from "@/lib/services/pet/petProfileService";
import {toast} from "react-toastify";
import {Card, CardBody, Slider, Button, Image, CircularProgress} from "@nextui-org/react";
import {PencilIcon} from "@/components/shared/icons/PencilIcon";

export default function ManagePetProfile({slug}: { slug: string }) {
    const [petProfileDetails, setPetProfileDetails] = useState<PetProfileResponse>({} as PetProfileResponse);
    const [isLoadingPetDetails, setIsLoadingPetDetails] = useState(true);

    const fetchPetProfileInfo = async (petSlug: string) => {
        setIsLoadingPetDetails(true);
        try {
            const response = await getPetProfileDetails(petSlug);
            if (response.statusCode === 200) {
                const petProfiles = response.data;
                console.log("petmngt profile", petProfiles)
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


    return (
        <>
            {isLoadingPetDetails ? (
                <div className={"grid place-items-center"}>
                    <CircularProgress color={"primary"} className={"p-4"} label="Loading your pet details...."/>
                </div>
            ) : (
                <>
                    <Card
                        isBlurred
                        radius={"none"}
                        className="border-none m-1 bg-background/60 dark:bg-default-100/50"
                        shadow="sm"
                    >
                        <CardBody>
                            <div
                                className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                                <div className="relative col-span-6 md:col-span-4">
                                    <Image
                                        alt="Album cover"
                                        className="object-cover"
                                        radius={"sm"}
                                        height={200}
                                        shadow="md"
                                        isZoomed
                                        src={petProfileDetails.profileUrl}
                                        width="100%"
                                    />
                                </div>

                                <div className="flex flex-col col-span-6 md:col-span-8">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col gap-0">
                                            <h3 className="font-semibold text-foreground/90">{petProfileDetails.name}</h3>
                                            <p className="text-small text-foreground/80">{petProfileDetails.nickname}</p>
                                            <h1 className="text-large font-medium mt-2">{petProfileDetails.breed}</h1>
                                        </div>
                                        <Button
                                            className="data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                            radius="sm"
                                            color={petProfileDetails.species == "dog" ? "success" : "secondary"}
                                            variant="bordered"
                                            startContent={<PencilIcon/>}
                                        >
                                            Edit Profile
                                        </Button>
                                    </div>

                                    <div className="flex flex-col mt-3 gap-1">
                                        {petProfileDetails.description}
                                    </div>

                                    <div className="flex w-full items-center justify-center">

                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </>
            )}
        </>

    )
}
