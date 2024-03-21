import React, { useEffect, useState } from 'react';
import { validateEditPetFormInputErrors } from '@/helpers/validationHelpers';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import Spinner from '@/components/shared/icons/Spinner';
import { EditPetRequest } from '@/boundary/interfaces/pet';
import { Textarea } from '@nextui-org/input';
import { editPetProfile } from '@/lib/services/pet/petProfileService';
import { species } from '@/boundary/constants/petConstants';


const initialFormState: EditPetRequest = {
  petId: 0,
  breed: '',
  dateOfBirth: '',
  description: '',
  name: '',
  nickname: '',
  species: '',
};
export default function EditPetModal({ editPetRequest, isOpen, onClose }: {
  editPetRequest: EditPetRequest,
  isOpen: boolean,
  onClose: () => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editPetFormData, setEditPetFormData] = useState<EditPetRequest>({
    ...editPetRequest,
  });
  const [inputErrors, setInputErrors] = useState(initialFormState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditPetFormData({ ...editPetFormData, [name]: value });
  };

  const handlePetEdit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inputErrors = validateEditPetFormInputErrors(editPetFormData);

    if (inputErrors && Object.keys(inputErrors).length > 0) {
      setInputErrors(inputErrors);
      setIsSubmitting(false);
      return;
    }

    let response = await editPetProfile(editPetFormData);
    if (response.statusCode === 200) {
      toast.success(response.message ?? 'Pet profile update successfully');
      setIsSubmitting(false);
      setInputErrors(initialFormState);
      setEditPetFormData(editPetRequest);
      onClose();
    } else {
      setIsSubmitting(false);
      toast.error(response.message ?? 'Unknown error occurred');
    }
  };

  const handleCloseModal = () => {
    setEditPetFormData(editPetRequest);
  };

  return (
    <>
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
              <ModalHeader className='flex flex-col gap-1'>Edit Pet Profile</ModalHeader>
              <ModalBody>
                <form onSubmit={handlePetEdit}>
                  <div className='grid md:grid-cols-2 md:gap-6'>
                    <Input type='text'
                           color='default'
                           onChange={handleChange}
                           value={editPetFormData.name}
                           label='Name'
                           labelPlacement={'outside'}
                           name='name'
                           variant={'bordered'}
                           placeholder='Enter pet name'
                           onInput={() => {
                             setInputErrors({ ...inputErrors, name: '' });
                           }}
                           isInvalid={inputErrors.name !== ''}
                           errorMessage={inputErrors.name} />

                    <Input type='text'
                           className='mt-2 mb-1 '
                           onChange={handleChange}
                           value={editPetFormData.nickname || ''}
                           label='Nickname'
                           radius={'sm'}
                           labelPlacement={'outside'}
                           name='nickname'
                           variant={'bordered'}
                           placeholder='Enter nickname'
                           onInput={() => {
                             setInputErrors({ ...inputErrors, nickname: '' });
                           }}
                           isInvalid={inputErrors.nickname !== ''}
                           errorMessage={inputErrors.nickname} />
                  </div>

                  <div className='grid md:grid-cols-3 md:gap-6'>
                    <Select
                      items={species}
                      label='Pet Species'
                      labelPlacement={'outside'}
                      variant='bordered'
                      name='species'
                      className='mt-2 mb-1'
                      value={editPetFormData.species}
                      defaultSelectedKeys={[editPetFormData.species]}
                      placeholder='Select your favorite pet'
                      onChange={handleChange}
                      onSelectionChange={() => {
                        setInputErrors({ ...inputErrors, species: '' });
                      }}
                      isInvalid={inputErrors.species !== ''}
                      errorMessage={inputErrors.species}
                    >
                      {(animal) =>
                        <SelectItem key={animal.value} value={editPetFormData.species}>
                          {animal.label}
                        </SelectItem>
                      }
                    </Select>

                    <Input type='text'
                           className='mt-2 mb-1'
                           onChange={handleChange}
                           value={editPetFormData.breed || ''}
                           label='Breed'
                           radius={'sm'}
                           labelPlacement={'outside'}
                           name='breed'
                           variant={'bordered'}
                           placeholder='Enter breed'
                           onInput={() => {
                             setInputErrors({ ...inputErrors, breed: '' });
                           }}
                           isInvalid={inputErrors.breed !== ''}
                           errorMessage={inputErrors.breed} />

                    <Input type='text'
                           color='default'
                           className='mt-2 mb-1 '
                           onChange={handleChange}
                           value={editPetFormData.dateOfBirth || ''}
                           label='Date Of Birth'
                           labelPlacement={'outside'}
                           name='dateOfBirth'
                           variant={'bordered'}
                           placeholder='When was your pet born?'
                           onInput={() => {
                             setInputErrors({ ...inputErrors, dateOfBirth: '' });
                           }}
                           isInvalid={inputErrors.dateOfBirth !== ''}
                           errorMessage={inputErrors.dateOfBirth} />
                  </div>

                  <div className='grid md:grid-cols-1 md:gap-6'>
                    <Textarea type='text'
                              className='mt-2 mb-1 '
                              onChange={handleChange}
                              value={editPetFormData.description}
                              label='Description'
                              minRows={4}
                              radius={'sm'}
                              labelPlacement={'outside'}
                              name='description'
                              variant={'bordered'}
                              placeholder='Write a brief description'
                              onInput={() => {
                                setInputErrors({ ...inputErrors, description: '' });
                              }}
                              isInvalid={inputErrors.description !== ''}
                              errorMessage={inputErrors.description} />
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
                        onClick={handlePetEdit}>
                  {isSubmitting ? 'Submitting...' : 'Update Pet'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </>
  );
}