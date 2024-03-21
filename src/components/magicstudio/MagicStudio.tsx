import Breadcrumb from '@/components/shared/breadcrumbs/Breadcrumb';
import { Avatar, Button, Card, CardBody, CircularProgress } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PlusIcon } from '@/components/shared/icons/PlusIcon';
import CreateProjectModal from '@/components/magicstudio/modals/CreateProjectModal';
import { formatDateWithTime } from '@/helpers/dateHelpers';
import { fetchMagicStudioProjects } from '@/lib/services/magicstudio/magicStudioService';
import { MagicStudioProjectResponse } from '@/boundary/interfaces/magicStudio';
import Link from 'next/link';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';
import { MagicStudioQueryParameters } from '@/boundary/parameters/magicStudioQueryParameters';

export default function MagicStudio() {
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(true);
  const [magicProjects, setMagicProjects] = useState<MagicStudioProjectResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchProjects(new MagicStudioQueryParameters());
  };

  const fetchProjects = async (queryParameters: MagicStudioQueryParameters) => {
    setIsLoadingProjects(true);
    await fetchMagicStudioProjects(queryParameters)
      .then((response) => {
        if (response.statusCode === 200) {
          const projects = response.data;
          setMagicProjects(projects);
        }
      })
      .catch((error) => {
        toast.error(`Error fetching your projects: ${error}`);
      })
      .finally(() => {
        setIsLoadingProjects(false);
      });
  };

  useEffect(() => {
    fetchProjects(new MagicStudioQueryParameters());
  }, []);

  return (
    <>
      <Breadcrumb pageName='Magic Studio' />

      <div className='flex flex-col gap-4 m-2'>
        <div className='flex justify-between gap-3 items-end'>

          <div className='gap-3 hidden lg:block'>
            {!isLoadingProjects && magicProjects.length > 0 && (
              <>
                <Button
                  onPress={handleOpenModal}
                  startContent={<PlusIcon />}
                  color='primary'
                  variant='shadow'
                >
                  Create A Project
                </Button>
                {isModalOpen && (
                  <CreateProjectModal isOpen={isModalOpen} onClose={handleCloseModal} />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {isLoadingProjects ? (
        <div className='flex items-center justify-center'>
          <CircularProgress color={'primary'} className={'p-4'} label='Loading your projects...' />
        </div>
      ) : (
        <>
          {magicProjects.length < 1 ? (
            <div className='flex items-center justify-center'>
              <p className='text-danger-400'>No projects were found!
                Please add some diary entries under
                <span className="font-bold text-primary">
                  <Link href={NAVIGATION_LINKS.DIARY_ENTRIES}> Diary Entries</Link>
                </span> to proceed
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
              {magicProjects.map((project) => (
                <Link key={project.id}
                      href={`${NAVIGATION_LINKS.MAGIC_STUDIO}/${project.slug}`}>
                  <Card
                    key={project.id}
                    isBlurred
                    className='border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]'
                    shadow='sm'
                  >
                    <CardBody>
                      <div
                        className='grid grid-cols-6 md:grid-cols-12 sm:grid-cols-12 lg:gap-6 md:gap-4 items-center justify-center'>
                        <div
                          className='relative col-span-1 md:col-span-1 sm:col-span-6 mb-2 md:mb-0'>
                          <Avatar
                            name={project.title}
                            radius='sm'
                            isBordered
                            color='primary'
                          />
                        </div>

                        <div
                          className='flex flex-col col-span-5 md:col-span-11 md:ml-3 sm:col-span-6'>
                          <div className='flex flex-col gap-0'>
                            <h3 className='font-semibold text-foreground/90'>{project.title}</h3>
                            <p className='text-small text-foreground/80'>
                              {formatDateWithTime(project.createdAt)} | <span
                              className='text-small'>from {project.periodFrom} to {project.periodTo}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}