import {PetProfileResponse} from "@/boundary/interfaces/pet";
import {Image} from "@nextui-org/react";
import {toTitleCase} from "@/lib/utils/pdfUtils";
import {formatDate} from "@/helpers/dateHelpers";

export function PetProfileCard(props: { petProfileDetails: PetProfileResponse }) {
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
                        src={props.petProfileDetails.profileUrl}
                        width="100%"
                    />
                </div>

                <div className="md:w-1/2 m-2 bg-white rounded-md">
                    <div className={"p-2"}>
                        <div className="mb-4">
                            <h4 className="font-bold">{toTitleCase(props.petProfileDetails.name)}</h4>

                            {props.petProfileDetails.nickname && (
                                <p className="text-gray-600">Nickname: {props.petProfileDetails.nickname}</p>
                            )}

                            <p className="text-gray-700">Species: {props.petProfileDetails.species}</p>
                            <p className="text-gray-700">Breed: {props.petProfileDetails.breed}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-700">Description:</p>
                            <p className="text-gray-600">
                                {props.petProfileDetails.description}
                            </p>
                        </div>

                        {props.petProfileDetails.dateOfBirth && (
                            <div className="mb-4">
                                <p className="text-gray-700">Date of Birth: {props.petProfileDetails.dateOfBirth}</p>
                            </div>
                        )}

                        <div className="mb-4">
                            <p className="text-gray-700">Created At: {formatDate(props.petProfileDetails.createdAt)}</p>
                            <p className="text-gray-700">Updated At: {formatDate(props.petProfileDetails.updatedAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}