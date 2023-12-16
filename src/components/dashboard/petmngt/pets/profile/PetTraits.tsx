import {Chip} from "@nextui-org/react";
import {PetTraitModel} from "@/boundary/interfaces/pet";

export default function PetTraits({petTraits}: { petTraits: PetTraitModel[] | null }) {
    const likesTraits = petTraits?.filter(petTrait => petTrait.type === 'like') || [];
    const dislikesTraits = petTraits?.filter(petTrait => petTrait.type === 'dislike') || [];

    return (
        <>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 m-2 rounded-md shadow-md">
                    <h3 className={"m-1"}>Likes</h3>
                    {likesTraits.map((petTrait) => (
                        <Chip className={"m-1"} key={petTrait.id} color="success">
                            {petTrait.trait}
                        </Chip>
                    ))}
                </div>

                <div className="md:w-1/2 m-2 rounded-md shadow-md">
                    <h3 className={"m-1"}>Dislikes</h3>
                    {dislikesTraits.map((petTrait) => (
                        <Chip className={"m-1"} key={petTrait.id} color="secondary">
                            {petTrait.trait}
                        </Chip>
                    ))}
                </div>
            </div>
        </>
    );

}