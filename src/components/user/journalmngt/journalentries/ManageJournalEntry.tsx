import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import {
  JournalEntryResponse,
  JournalImageBuffer,
  PrintJournalEntryRequest,
  UpdateJournalEntryRequest,
} from '@/boundary/interfaces/journal';
import {
  getJournalEntryAttachmentBuffers,
  getJournalEntryDetails,
} from '@/lib/services/journalentries/journalEntryService';
import { Card, CardBody, CircularProgress, Input } from '@nextui-org/react';
import RenderJournalHeader from '@/components/user/journalmngt/journalentries/RenderJournalHeader';
import { Button } from '@nextui-org/button';
import PreviewAndPrintJournalEntryModal, {
  getJournalEntryPdfDocument,
} from '@/components/user/journalmngt/journalentries/modals/PreviewAndPrintJournalEntryModal';
import UploadJournalImagesModal from '@/components/user/journalmngt/journalentries/modals/UploadJournalImagesModal';
import UpdateJournalEntryModal from '@/components/user/journalmngt/journalentries/modals/UpdateJournalEntryModal';
import { CloseIcon, EditIcon, PlusFilledIcon } from '@nextui-org/shared-icons';
import DeleteJournalEntryModal from '@/components/user/journalmngt/journalentries/modals/DeleteJournalEntryModal';
import UploadIcon from '@/components/shared/icons/UploadIcon';
import TrashIcon from '@/components/shared/icons/TrashIcon';
import FileEyeIcon from '@/components/shared/icons/FileEyeIcon';
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';
import DownloadIcon from '@/components/shared/icons/DownloadIcon';
import { useAuth } from '@/hooks/useAuth';
import { PdfPreviewStyle } from '@/lib/utils/pdfUtils';
import { GoBackButton } from '@/components/common/navigation/GoBackButton';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@/components/shared/icons/PlusIcon';
import Font = ReactPDF.Font;
import { SearchIcon } from '@/components/shared/icons/SearchIcon';
import { getDocument } from '@/components/user/journalmngt/myjournal/PreviewMyJournal';
import Spinner from '@/components/shared/icons/Spinner';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = PdfPreviewStyle();

export default function ManageJournalEntry({ slug }: { slug: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const [journalEntryDetails, setJournalEntryDetails] = useState<JournalEntryResponse>({} as JournalEntryResponse);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [pets, setPets] = useState<string[]>([]);
  const [journalImages, setJournalImages] = useState<string[]>([]);
  const [printJournalRequest, setPrintJournalRequest] = useState<PrintJournalEntryRequest>({} as PrintJournalEntryRequest);
  const [editJournalRequest, setEditJournalRequest] = useState<UpdateJournalEntryRequest>({} as UpdateJournalEntryRequest);
  const [imageBuffers, setImageBuffers] = useState<JournalImageBuffer[]>([]);
  const [modals, setModals] = useState({
    editJournal: false,
    deleteJournal: false,
    uploadAttachments: false,
    previewAndPrintEntry: false,
  });
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const toggleButtons = () => {
    setButtonsVisible(!buttonsVisible);
  };
  const openModal = (modalName: string) => {
    setModals({ ...modals, [modalName]: true });
  };

  const closeModal = (modalName: string) => {
    setModals({ ...modals, [modalName]: false });
    fetchJournalEntryDetails(slug);
  };

  const fetchJournalEntryDetails = async (journalSlug: any) => {
    setIsLoadingDetails(true);
    await getJournalEntryDetails(journalSlug)
      .then((response) => {
        if (response.statusCode === 200) {
          const journals: JournalEntryResponse = response.data;
          const journalImages = journals.journalAttachments ?
            journals.journalAttachments.map((item) => item.sourceUrl) : [];
          setJournalEntryDetails(journals);
          setJournalImages(journalImages);
          createRecords(journals);
        }
      })
      .catch((error) => {
        toast.error(`Error fetching your diary entry details: ${error}`);
      })
      .finally(() => {
        setIsLoadingDetails(false);
      });
  };

  useEffect(() => {
    fetchJournalEntryDetails(slug);
  }, [slug]);

  const getImageBuffers = async (journalId: number) => {
    await getJournalEntryAttachmentBuffers(journalId)
      .then((response) => {
        if (response.statusCode === 200) {
          const journalBuffers: JournalImageBuffer[] = response.data;
          setImageBuffers(journalBuffers);
        }
      })
      .catch((error) => {
        toast.error(`Error fetching your diary entry image buffers: ${error}`);
      });
  };

  useEffect(() => {
    if (journalEntryDetails){
      getImageBuffers(journalEntryDetails.id);
    }
  }, [journalEntryDetails.id]);

  const createRecords = (journals: JournalEntryResponse) => {
    const petNames = journals.pets ? journals.pets.map((pet) => pet.name) : [];
    const attachments = journals.journalAttachments ? journals.journalAttachments.map((attachment) => attachment.sourceUrl) : [];
    const moods: string[] = journals.mood.split(',').map(item => item.trim());
    const tags: string[] = journals.tags.split(',').map(item => item.trim());
    const printJournalRequest: PrintJournalEntryRequest = {
      id: journals.id,
      slug: journals.slug,
      title: journals.title,
      createdAt: journals.createdAt,
      event: journals.event,
      content: journals.content,
      journalAttachments: attachments,
      location: journals.location,
      moods: moods,
      pets: petNames,
      tags: tags,
    };

    const editJournal: UpdateJournalEntryRequest = {
      journalId: journals.id,
      content: journals.content,
      event: journals.event,
      location: journals.location,
      mood: journals.mood,
      tags: journals.tags,
      title: journals.title,
      petIds: journals.pets.map((item) => item.id),
    };

    setPets(petNames);
    setPrintJournalRequest(printJournalRequest);
    setEditJournalRequest(editJournal);
  };

  return (
    <>
      {isLoadingDetails ? (
        <div className={'grid place-items-center'}>
          <CircularProgress color={'primary'} className={'p-4'}
                            label='Loading your diary entry details....' />
        </div>
      ) : (
        <>
          <div className='flex flex-col gap-4 m-2'>
            <div className='md:flex justify-between gap-3 items-end'>
              <div className='md:grid md:grid-cols-5 md:gap-4'>
                <div className='relative flex flex-1'>

                  <GoBackButton onPress={() => router.back()} />

                  <span className='hidden md:block lg:block'>
                    <Button onPress={() => openModal('editJournal')}
                            startContent={<EditIcon />}
                            color='success'
                            className='mr-2'
                            size='sm'
                            variant='shadow'>
                      Edit Entry
                    </Button>
                  </span>

                  {modals.editJournal && (
                    <UpdateJournalEntryModal
                      editJournalRequest={editJournalRequest}
                      userPets={journalEntryDetails.pets}
                      isOpen={modals.editJournal}
                      onClose={() => closeModal('editJournal')}
                    />
                  )}

                  <span className='hidden md:block lg:block'>
                    <Button onPress={() => openModal('uploadAttachments')}
                            startContent={<UploadIcon color='#ffffff' />}
                            color='warning'
                            size='sm'
                            variant='shadow'>
                      Upload Attachment
                    </Button>
                  </span>

                  {modals.uploadAttachments && (
                    <UploadJournalImagesModal
                      journalId={journalEntryDetails.id}
                      isOpen={modals.uploadAttachments}
                      onClose={() => closeModal('uploadAttachments')}
                    />
                  )}

                  <span className='hidden md:block lg:block'>
                    <Button onPress={() => openModal('deleteJournal')}
                            startContent={<TrashIcon color='#ffffff' />}
                            color='danger'
                            className='ml-2'
                            size='sm'
                            variant='shadow'>
                      Delete Entry
                    </Button>
                  </span>

                  {modals.deleteJournal && (
                    <DeleteJournalEntryModal
                      journalId={editJournalRequest.journalId}
                      isOpen={modals.deleteJournal}
                      onClose={() => closeModal('deleteJournal')}
                    />
                  )}

                </div>
              </div>

              <div className='flex gap-3'>
                <div className='hidden lg:block'>
                  <Button onPress={() => openModal('previewAndPrintEntry')}
                          startContent={<FileEyeIcon color='#ffffff' />}
                          color='primary'
                          size='sm'
                          variant='shadow'>
                    Preview and Print
                  </Button>

                  {modals.previewAndPrintEntry && (
                    <PreviewAndPrintJournalEntryModal
                      printJournalRequest={printJournalRequest}
                      isOpen={modals.previewAndPrintEntry}
                      onClose={() => closeModal('previewAndPrintEntry')}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <Card className='py-4'>
            <RenderJournalHeader title={journalEntryDetails.title}
                                 createdAt={journalEntryDetails.createdAt}
                                 mood={journalEntryDetails.mood}
                                 tags={journalEntryDetails.tags}
                                 pets={pets} />
            <CardBody className='overflow-visible py-2'>
              <div className='mt-1 mb-1'>
                {journalEntryDetails.content}
              </div>

              <div className='flex flex-wrap md:-m-2 mt-3'>

                <>
                  <div className={`flex ${journalImages.length <= 3 ? 'w-full' : 'w-1/2'} flex-wrap`}>
                    {journalImages.slice(0, 3).map((image, index) => (
                      <div key={index}
                           className={`w-${index === 2 || journalImages.length <= 1 ? 'full' : '1/2'} p-1 md:p-2`}>
                        <img
                          alt={`gallery-${index + 1}`}
                          className='block h-full w-full rounded-lg object-cover object-center'
                          src={image}
                        />
                      </div>
                    ))}
                  </div>

                  <div className='flex w-1/2 flex-wrap'>
                    {journalImages.slice(3,7).map((image, index) => (
                      <div key={index} className={`w-${index === 0 ? 'full' : '1/2'} p-1 md:p-2`}>
                        <img
                          alt={`gallery-${index + 4}`}
                          className='block h-full w-full rounded-lg object-cover object-center'
                          src={image}
                        />
                      </div>
                    ))}
                  </div>

                  <div className={`flex ${journalImages.length <= 3 ? 'w-full' : 'w-1/2'} flex-wrap`}>
                    {journalImages.slice(7,10).map((image, index) => (
                      <div key={index}
                           className={`w-${index === 2 || journalImages.length <= 1 ? 'full' : '1/2'} p-1 md:p-2`}>
                        <img
                          alt={`gallery-${index + 1}`}
                          className='block h-full w-full rounded-lg object-cover object-center'
                          src={image}
                        />
                      </div>
                    ))}
                  </div>

                  <div className='flex w-1/2 flex-wrap'>
                    {journalImages.slice(10,12).map((image, index) => (
                      <div key={index} className={`w-${index === 0 ? 'full' : '1/2'} p-1 md:p-2`}>
                        <img
                          alt={`gallery-${index + 4}`}
                          className='block h-full w-full rounded-lg object-cover object-center'
                          src={image}
                        />
                      </div>
                    ))}
                  </div>
                </>

              </div>
            </CardBody>
          </Card>

          {buttonsVisible && (
            <>
              <div className='fixed bottom-52 right-4 md:hidden'>
                <Button onClick={(e) => {
                  e.stopPropagation();
                  openModal('editJournal');
                }}
                        isIconOnly
                        color='success'
                        radius='full'
                        variant='shadow'>
                  <EditIcon color={'#fff'} />
                </Button>
              </div>

              <div className='fixed bottom-40 right-4 md:hidden'>
                <Button onClick={(e) => {
                  e.stopPropagation();
                  openModal('uploadAttachments');
                }}
                        isIconOnly
                        color='warning'
                        radius='full'
                        variant='shadow'>
                  <UploadIcon color={'#fff'} />
                </Button>
              </div>

              <div className='fixed bottom-28 right-4 md:hidden'>
                {imageBuffers && (
                  <PDFDownloadLink
                    document={getJournalEntryPdfDocument(printJournalRequest, imageBuffers, styles, user?.username)}
                    fileName={`${journalEntryDetails.slug.toLowerCase()}.pdf`}>
                    {({ blob, url, loading, error }) =>
                      <Button color='primary'
                              type='submit'
                              radius='full'
                              isIconOnly>
                        <DownloadIcon />
                      </Button>
                    }
                  </PDFDownloadLink>
                )}
              </div>

              <div className='fixed bottom-16 right-4 md:hidden'>
                <Button onClick={(e) => {
                  e.stopPropagation();
                  openModal('deleteJournal');
                }}
                        isIconOnly
                        color='danger'
                        radius='full'
                        variant='shadow'>
                  <TrashIcon color={'#fff'} />
                </Button>
              </div>
            </>
          )}

          <div className='fixed bottom-4 right-4 md:hidden'>
            <Button onPress={toggleButtons}
                    isIconOnly
                    color={buttonsVisible ? 'danger' : 'primary'}
                    radius='full'
                    variant='shadow'>
              {buttonsVisible ? <CloseIcon /> : <PlusIcon />}
            </Button>

          </div>
        </>
      )}
    </>
  );
}