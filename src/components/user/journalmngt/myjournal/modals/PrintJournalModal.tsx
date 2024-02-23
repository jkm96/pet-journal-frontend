import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import Spinner from '@/components/shared/icons/Spinner';
import React, { useState } from 'react';
import { getDocument } from '@/components/user/journalmngt/myjournal/PreviewMyJournal';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { JournalEntryResponse } from '@/boundary/interfaces/journal';
import { useAuth } from '@/hooks/useAuth';
import { toSlug } from '@/lib/utils/pdfUtils';

export default function PrintJournalModal({journalEntries, isOpen, onClose}: {
    journalEntries: JournalEntryResponse[],
    isOpen: boolean,
    onClose: () => void
}) {
    const {user} = useAuth();
    const [journalTitle, setJournalTitle] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                            <ModalHeader className="flex flex-col gap-1">Download Journal</ModalHeader>
                            <ModalBody>
                                <form>
                                    <Input type="text"
                                           className="mt-2 mb-1 "
                                           onChange={(e) => {
                                               setJournalTitle(e.target.value);
                                           }}
                                           value={journalTitle}
                                           label="Journal Title"
                                           radius={"sm"}
                                           labelPlacement={"outside"}
                                           name="title"
                                           variant={"bordered"}
                                           placeholder="Enter title"/>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Cancel
                                </Button>
                                <PDFDownloadLink
                                    document={getDocument(journalTitle, user, journalEntries)}
                                    fileName={`${toSlug(journalTitle) ?? user?.username}.pdf`}>
                                    {({blob, url, loading, error}) =>
                                        <Button color="primary"
                                                type="submit"
                                                disabled={journalTitle === ''}
                                                isLoading={isSubmitting}
                                                spinner={<Spinner/>}>
                                            Download
                                        </Button>
                                    }
                                </PDFDownloadLink>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>)
}