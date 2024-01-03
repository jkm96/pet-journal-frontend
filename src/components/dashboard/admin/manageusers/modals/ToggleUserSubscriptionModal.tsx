import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import Spinner from "@/components/shared/icons/Spinner";
import React, {useState} from "react";
import {toast} from "react-toastify";
import {toggleUserSubscription} from "@/lib/services/admin/manageUserService";

export default function ToggleUserSubscriptionModal({userId, currentStatus, isOpen, onClose}: {
    userId: number,
    currentStatus: string,
    isOpen: boolean,
    onClose: () => void
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleSubscription = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);

        const response = await toggleUserSubscription(userId);
        if (response.statusCode === 200) {
            toast.success(response.message ?? "User subscription toggled successfully")
            setIsSubmitting(false);
            onClose()
        } else {
            setIsSubmitting(false);
            toast.error(response.message ?? "Unknown error occurred")
        }
    }

    return (
        <>
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
                            <ModalHeader className="flex flex-col gap-1">{currentStatus} user</ModalHeader>
                            <ModalBody>
                                <form onSubmit={toggleSubscription}>
                                    <div className="mt-2">
                                        Are you sure you want to {currentStatus} this user?
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
                                        onClick={toggleSubscription}>
                                    {isSubmitting ? currentStatus : "Yes"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}