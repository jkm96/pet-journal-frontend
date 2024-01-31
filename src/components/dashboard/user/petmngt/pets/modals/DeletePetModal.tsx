import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import Spinner from '@/components/shared/icons/Spinner';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';
import { useRouter } from 'next/navigation';
import { deletePetProfile } from '@/lib/services/pet/petProfileService';

export default function DeletePetModal({petId, isOpen, onClose}: {
    petId: number,
    isOpen: boolean,
    onClose: () => void
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()

    const deletePet = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);

        const response = await deletePetProfile(petId);
        if (response.statusCode === 200) {
            toast.success(response.message ?? "Pet deleted successfully")
            setIsSubmitting(false);
            router.push(NAVIGATION_LINKS.PET_PROFILES)
        } else {
            setIsSubmitting(false);
            toast.error(response.message ?? "Unknown error occurred")
        }
    }

    return (<>
        <Modal
            isOpen={isOpen}
            onOpenChange={() => {
                onClose();
            }}
            onClose={onClose}
            size="sm"
            placement="center"
            scrollBehavior="inside"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Delete Pet</ModalHeader>
                        <ModalBody>
                            <form onSubmit={deletePet}>
                                <div className="mt-2">
                                    Are you sure you want to delete this pet profile?
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onPress={onClose}>
                                No
                            </Button>
                            <Button color="danger"
                                    type="submit"
                                    isLoading={isSubmitting}
                                    spinner={<Spinner/>}
                                    onClick={deletePet}>
                                {isSubmitting ? "Deleting..." : "Yes"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>

    </>)
}