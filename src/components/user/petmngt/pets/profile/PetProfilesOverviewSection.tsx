import React, { useEffect, useState } from 'react';
import { PetProfileResponse } from '@/boundary/interfaces/pet';
import { Avatar, Card, CardBody, CardHeader, CircularProgress, Image } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';
import Breadcrumb from '@/components/shared/breadcrumbs/Breadcrumb';
import { PlusIcon } from '@/components/shared/icons/PlusIcon';
import CreateNewPetModal from '@/components/user/petmngt/pets/modals/CreateNewPetModal';
import { getUserPets } from '@/lib/utils/petUtils';
import { AddRecordFab } from '@/components/common/dashboard/AddRecordFab';
import { getSpeciesColor } from '@/helpers/stylingHelpers';

export default function PetProfilesOverviewSection() {
  const [petProfiles, setPetProfiles] = useState<PetProfileResponse[]>([]);
  const [isLoadingPetProfiles, setIsLoadingPetProfiles] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchPetProfiles();
  };

  const fetchPetProfiles = getUserPets(setIsLoadingPetProfiles, setPetProfiles);

  useEffect(() => {
    fetchPetProfiles();
  }, []);

  return (
    <>
      {isLoadingPetProfiles ? (
        <div className={'grid place-items-center'}>
          <CircularProgress color={'primary'} className={'p-4'} label='Loading your pets...' />
        </div>
      ) : (
        <>
          <Breadcrumb pageName='Pet Profiles' />

          <div className='flex flex-col gap-4 m-2'>
            <div className='flex justify-between gap-3 items-end'>
              <div className='gap-3 hidden lg:block'>
                <Button onPress={handleOpenModal}
                        startContent={<PlusIcon />}
                        color='primary'
                        variant='shadow'>
                  Add Pet
                </Button>
                {isModalOpen && (
                  <CreateNewPetModal isOpen={isModalOpen} onClose={handleCloseModal} />
                )}
              </div>
            </div>
          </div>
          {petProfiles.length < 1 ? (
            <>
              <div className='text-center'>
                <p className='text-danger-400'>No pet profile found!</p>
              </div>
            </>
          ) : (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-0 sm:gap-2 m-2'>
                {petProfiles.map((profile) => (
                  <Link key={profile.id} href={`${NAVIGATION_LINKS.PET_PROFILES}/${profile.slug}`}>
                    <Card
                      isBlurred
                      key={profile.id}
                      shadow='sm'>
                      <CardHeader className='justify-between'>
                        <div className='flex gap-5'>
                          <Avatar isBordered
                                  color={getSpeciesColor(profile.species)}
                                  radius='full' size='md' name={profile.name} />
                          <div className='flex flex-col gap-1 items-start justify-center'>
                            <h4 className='uppercase font-bold leading-none text-default-600'>
                              {profile.name}
                            </h4>
                            <h5 className='text-small tracking-tight text-default-400'>{profile.nickname}</h5>
                          </div>
                        </div>

                        <Button
                          variant='bordered'
                          color={getSpeciesColor(profile.species)}
                          radius='sm'
                          size='sm'>
                          Profile
                        </Button>
                      </CardHeader>
                      <CardBody
                        className='overflow-visible p-2 lg:max-h-[400px] xl:max-h-[450px]'>
                        <Image
                          alt='Card background'
                          className='rounded-xl lg:h-[300px] xl:h-[350px] w-full'
                          src={profile.profileUrl}
                        />
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </>
      )}

      <AddRecordFab onClick={(e: any) => {
        e.stopPropagation();
        handleOpenModal();
      }} />
    </>
  );
}