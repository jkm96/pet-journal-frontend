import React, { useState } from 'react';
import { validateCreateProjectFormInputErrors } from '@/helpers/validationHelpers';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { toast } from 'react-toastify';
import Spinner from '@/components/shared/icons/Spinner';
import { CreateMagicProjectRequest } from '@/boundary/interfaces/magicStudio';
import { createProject } from '@/lib/services/magicstudio/magicStudioService';

const initialFormState: CreateMagicProjectRequest = {
  pdf_content: 'Text Content',
  periodFrom: '', periodTo: '', title: ''
};

export default function CreateProjectModal({ isOpen, onClose }: {
  isOpen: boolean,
  onClose: () => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createProjectFormData, setCreateProjectFormData] = useState(initialFormState);
  const [inputErrors, setInputErrors] = useState(initialFormState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCreateProjectFormData({ ...createProjectFormData, [name]: value });
  };

  const handleProjectCreation = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inputErrors = validateCreateProjectFormInputErrors(createProjectFormData);
    if (inputErrors && Object.keys(inputErrors).length > 0) {
      setInputErrors(inputErrors);
      setIsSubmitting(false);
      return;
    }

    let response = await createProject(createProjectFormData);
    if (response.statusCode === 200) {
      toast.success(response.message ?? 'Project created successfully');
      setIsSubmitting(false);
      setInputErrors(initialFormState);
      setCreateProjectFormData(initialFormState);
      onClose();
    } else {
      setIsSubmitting(false);
      toast.error(response.message ?? 'Unknown error occurred');
    }
  };

  const handleCloseModal = () => {
    setCreateProjectFormData(initialFormState);
  };

  return (
    <>
      <Modal
        backdrop="blur"
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
              <ModalHeader className='flex flex-col gap-1'>Create Project</ModalHeader>
              <ModalBody>
                <p>
                  The period from and period to are optional. If unselected, the project created with use the current months diary entries.
                </p>
                <form onSubmit={handleProjectCreation}>
                  <div className='grid md:grid-cols-3 md:gap-6'>
                    <Input type='text'
                           color='default'
                           onChange={handleChange}
                           value={createProjectFormData.title}
                           label='Title'
                           labelPlacement={'outside'}
                           name='title'
                           variant={'bordered'}
                           placeholder='Enter project title'
                           onInput={() => {
                             setInputErrors({ ...inputErrors, title: '' });
                           }}
                           isInvalid={inputErrors.title !== ''}
                           errorMessage={inputErrors.title} />

                    <Input type='date'
                           color='default'
                           onChange={handleChange}
                           value={createProjectFormData.periodFrom}
                           label='Period From'
                           labelPlacement={'outside'}
                           name='periodFrom'
                           variant={'bordered'}
                           placeholder='Period From'
                           onInput={() => {
                             setInputErrors({ ...inputErrors, periodFrom: '' });
                           }}
                           isInvalid={inputErrors.periodFrom !== ''}
                           errorMessage={inputErrors.periodFrom} />

                    <Input type='date'
                           color='default'
                           onChange={handleChange}
                           value={createProjectFormData.periodTo}
                           label='Period To'
                           labelPlacement={'outside'}
                           name='periodTo'
                           variant={'bordered'}
                           placeholder='Period To'
                           onInput={() => {
                             setInputErrors({ ...inputErrors, periodTo: '' });
                           }}
                           isInvalid={inputErrors.periodTo !== ''}
                           errorMessage={inputErrors.periodTo} />

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
                        onClick={handleProjectCreation}
                        disabled={
                          !isOpen ||
                          !(createProjectFormData.title.trim() !== '')
                        }
                >
                  {isSubmitting ? 'Submitting...' : 'Create Project'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}