import {PetProfileResponse} from "@/boundary/interfaces/pet";
import {Image} from "@nextui-org/react";
import {toTitleCase} from "@/lib/utils/pdfUtils";
import {formatDate} from "@/helpers/dateHelpers";

export function PetProfileCard({petProfileDetails}: { petProfileDetails: PetProfileResponse }) {
    return (
        <>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 m-2 bg-white rounded-md">
                    <Image
                        alt="Album cover"
                        className="object-cover"
                        radius={"sm"}
                        shadow="md"
                        isZoomed
                        src={petProfileDetails.profileUrl}
                        width="100%"
                    />
                </div>

                <div className="md:w-1/2 m-2 bg-white rounded-md">
                    <div className={"p-2"}>
                        <div className="mb-4">
                            <h4 className="font-bold">{toTitleCase(petProfileDetails.name)}</h4>

                            {petProfileDetails.nickname && (
                                <p className="text-gray-600">Nickname: {petProfileDetails.nickname}</p>
                            )}

                            <p className="text-gray-700">Species: {petProfileDetails.species}</p>
                            <p className="text-gray-700">Breed: {petProfileDetails.breed}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-700">Description:</p>
                            <p className="text-gray-600">
                                {petProfileDetails.description}
                            </p>
                        </div>

                        {petProfileDetails.dateOfBirth && (
                            <div className="mb-4">
                                <p className="text-gray-700">Date of Birth: {petProfileDetails.dateOfBirth}</p>
                            </div>
                        )}

                        <div className="mb-4">
                            <p className="text-gray-700">Created At: {formatDate(petProfileDetails.createdAt)}</p>
                            <p className="text-gray-700">Updated At: {formatDate(petProfileDetails.updatedAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}