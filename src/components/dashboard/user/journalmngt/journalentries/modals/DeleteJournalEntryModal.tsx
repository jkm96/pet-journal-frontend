import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import Spinner from '@/components/shared/icons/Spinner';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { deleteJournal } from '@/lib/services/journalentries/journalEntryService';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';
import { useRouter } from 'next/navigation';

export default function DeleteJournalEntryModal({journalId, isOpen, onClose}: {
    journalId: number,
    isOpen: boolean,
    onClose: () => void
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()

    const deleteJournalEntry = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);

        const response = await deleteJournal(journalId);
        if (response.statusCode === 200) {
            toast.success(response.message ?? "Journal deleted successfully")
            setIsSubmitting(false);
            router.push(NAVIGATION_LINKS.DIARY_ENTRIES)
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
                        <ModalHeader className="flex flex-col gap-1">Delete Journal Entry</ModalHeader>
                        <ModalBody>
                            <form onSubmit={deleteJournalEntry}>
                                <div className="mt-2">
                                    Are you sure you want to delete this journal entry?
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
                                    onClick={deleteJournalEntry}>
                                {isSubmitting ? "Deleting..." : "Yes"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>

    </>)
}