import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import Spinner from '@/components/shared/icons/Spinner';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { areFilesValid } from '@/helpers/validationHelpers';
import { DragDropSection } from '@/components/user/journalmngt/journalentries/modals/CreateJournalEntryModal';
import { UpdatePetProfileImageRequest } from '@/boundary/interfaces/pet';
import { updateProfileImage } from '@/lib/services/pet/petProfileService';

const initialFormState: UpdatePetProfileImageRequest = {
  profilePicture: null, petId: 0,
};

export default function UpdateProfilePictureModal({ petId, isOpen, onClose }: {
  petId: number,
  isOpen: boolean,
  onClose: () => void
}) {
  const [uploadProfileImageFormData, setUploadProfileImageFormData] = useState<UpdatePetProfileImageRequest>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewFile, setPreviewFile] = useState<any[]>([]);

  const handleFileChange = (e: any) => {
    const uploadedFiles = e.target.files;

    if (!areFilesValid(uploadedFiles)) {
      toast.error('Please select only PNG or JPG files.');
      e.target.files = null;
    } else {
      setPreviewFile(prevFiles => [...prevFiles, ...uploadedFiles]);
      setUploadProfileImageFormData({
        ...uploadProfileImageFormData,
        profilePicture: uploadedFiles,
      });
    }
  };

  const removeImage = (fileName: any) => {
    setPreviewFile(prevFiles => prevFiles.filter(file => file.name !== fileName));

    setUploadProfileImageFormData((prevFormData: any) => {
      const updatedAttachments = Array.from(prevFormData.attachments as File[]).filter((file) => file.name !== fileName);
      return {
        ...prevFormData,
        profilePicture: updatedAttachments,
      };
    });
  };

  const handleImageUpload = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    uploadProfileImageFormData.petId = petId;
    if (uploadProfileImageFormData.profilePicture === null) {
      setIsSubmitting(false);
      toast.error('Please upload at least one file.');
      return;
    }

    if (!areFilesValid(uploadProfileImageFormData.profilePicture)) {
      setIsSubmitting(false);
      toast.error('Please upload only PNG or JPG files.');
      return;
    }

    const response = await updateProfileImage(uploadProfileImageFormData);
    if (response.statusCode === 200) {
      toast.success(response.message ?? 'Attachments uploaded successfully');
      setIsSubmitting(false);
      setUploadProfileImageFormData(initialFormState);
      onClose();
    } else {
      setIsSubmitting(false);
      toast.error(response.message ?? 'Unknown error occurred');
    }
  };

  const handleCloseModal = () => {
    setUploadProfileImageFormData(initialFormState);
  };

  return (<>
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onClose();
        handleCloseModal();
      }}
      onClose={onClose}
      size='5xl'
      placement='center'
      scrollBehavior='inside'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Change Profile Picture</ModalHeader>
            <ModalBody>
              <form onSubmit={handleImageUpload}>
                <div className='flex justify-center items-center bg-gray-900 px-2'>
                  <div className='w-full rounded-md'>
                    {DragDropSection(handleFileChange, previewFile, removeImage, 1)}
                  </div>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' onPress={onClose}>
                Close
              </Button>
              <Button color='primary'
                      type='submit'
                      isLoading={isSubmitting}
                      spinner={<Spinner />}
                      onClick={handleImageUpload}>
                {isSubmitting ? 'Submitting...' : 'Upload Profile'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>

  </>);
}