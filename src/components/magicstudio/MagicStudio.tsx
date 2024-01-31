import Breadcrumb from '@/components/shared/breadcrumbs/Breadcrumb';
import TextIcon from '@/components/shared/icons/TextIcon';
import { Button, Chip, CircularProgress } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import BGColorIcon from '@/components/shared/icons/BGColorIcon';
import {
  backgroundColorOptions,
  textColorOptions,
  textFontFamilyOptions,
  textFontWeightOptions,
} from '@/helpers/magicStudioHelper';
import { JournalQueryParameters } from '@/boundary/parameters/journalQueryParameters';
import { getJournalEntries } from '@/lib/services/journal-entries/journalEntryService';
import { toast } from 'react-toastify';
import { PlusIcon } from '@/components/shared/icons/PlusIcon';
import CreateProjectModal from '@/components/magicstudio/modals/CreateProjectModal';

type SectionVisibility = {
  textSection: boolean;
  backgroundSection: boolean;
};

export default function MagicStudio() {
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(true);
  const [magicProjects, setMagicProjects] = useState([]);
  const [activeSection, setActiveSection] = useState<keyof SectionVisibility>('textSection');
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>({
    textSection: true,
    backgroundSection: false,
  });
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const [textColor, setTextColor] = useState<string>('');
  const [textFontFamily, setTextFontFamily] = useState<string>('');
  const [textFontWeight, setTextFontWeight] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchProjects(new JournalQueryParameters());
  };
  const fetchProjects = async (queryParams: JournalQueryParameters) => {
    setIsLoadingProjects(true);
    await getJournalEntries(queryParams)
      .then((response) => {
        if (response.statusCode === 200) {
          const entries = response.data;
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
    fetchProjects(new JournalQueryParameters());
  }, []);

  const handleElementsButtonClick = (sectionName: keyof SectionVisibility) => {
    setSectionVisibility({
      textSection: sectionName === 'textSection',
      backgroundSection: sectionName === 'backgroundSection',
    });
    setActiveSection(sectionName);
  };

  const handleColorButtonClick = (color: string) => {
    setTextColor(color);
  };

  const handleFontFamilyButtonClick = (fontFamily: string) => {
    setTextFontFamily(fontFamily);
  };

  const handleFontWeightButtonClick = (fontWeight: string) => {
    setTextFontWeight(fontWeight);
  };

  const handleBackgroundColorButtonClick = (bgColor: string) => {
    setBackgroundColor(bgColor);
  };

  return (
    <>
      <Breadcrumb pageName='Magic Studio' />

      {isLoadingProjects ? (
        <div className="flex h-screen items-center justify-center">
          <CircularProgress color={'primary'} className={'p-4'} label='Loading your projects...' />
        </div>
      ) : (
        <>
          {magicProjects.length < 1 ? (
            <div className="flex h-screen items-center justify-center">
              <p className='text-danger-400'>No projects were found!</p>
              <Button
                onPress={handleOpenModal}
                startContent={<PlusIcon />}
                color='primary'
                variant="shadow"
              >
                Create A Project
              </Button>
                {isModalOpen && (
                  <CreateProjectModal isOpen={isModalOpen} onClose={handleCloseModal}/>
                )}
            </div>
          ) : (
            <div className='grid grid-cols-12 gap-4'>
              <div className='col-span-1 bg-column-100 p-4'>
                <h2>Elements</h2>

                <div className='text-center'>
                  <Button isIconOnly
                          color='primary'
                          aria-label='Toggle textSection'
                          onClick={() => handleElementsButtonClick('textSection')}
                  >
                    <TextIcon width={30} height={30} color='#fff' />
                  </Button>
                  <p>Text</p>
                </div>

                <div className='text-center mt-4'>
                  <Button
                    isIconOnly
                    aria-label='Toggle backgroundSection'
                    onClick={() => handleElementsButtonClick('backgroundSection')}
                  >
                    <BGColorIcon width={30} height={30} color='#fff' />
                  </Button>
                  <p>Background</p>
                </div>
              </div>

              {/* Second Column */}
              <div className='col-span-2 p-4'>
                {activeSection === 'textSection' && (
                  <div className=''>
                    <h3>Font Color</h3>
                    {textColorOptions.map((color, index) => (
                      <button
                        key={index}
                        className='m-1'
                        onClick={() => handleColorButtonClick(color)}
                      >
                        <Chip
                          radius='sm'
                          size='lg'
                          variant='bordered'
                          style={{ backgroundColor: color }}
                        />
                      </button>
                    ))}

                    <h3>Font Family</h3>
                    {textFontFamilyOptions.map((font, index) => (
                      <button
                        key={index}
                        className='m-1.5'
                        onClick={() => handleFontFamilyButtonClick(font)}
                      >
                        <Chip
                          radius='sm'
                          size='sm'
                          variant='solid'>
                          <p style={{ fontFamily: font }}>{font}</p>
                        </Chip>
                      </button>
                    ))}

                    <h3>Font Weight</h3>
                    {textFontWeightOptions.map((fontWeight, index) => (
                      <button
                        key={index}
                        className='m-1.5'
                        onClick={() => handleFontWeightButtonClick(fontWeight.value)}
                      >
                        <Chip
                          radius='sm'
                          size='sm'
                          variant='solid'>
                          <p style={{ fontWeight: fontWeight.value }}>{fontWeight.name}</p>
                        </Chip>
                      </button>
                    ))}
                  </div>
                )}

                {activeSection === 'backgroundSection' && (
                  <div>
                    <h3>Background Color</h3>
                    {backgroundColorOptions.map((bgColor, index) => (
                      <button
                        key={index}
                        className='m-1'
                        onClick={() => handleBackgroundColorButtonClick(bgColor)}
                      >
                        <Chip
                          radius='sm'
                          size='lg'
                          variant='bordered'
                          style={{ backgroundColor: bgColor }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Third Column */}
              <div className='col-span-9 bg-column-100 p-4'>
                <div style={{ backgroundColor: backgroundColor, padding: 10 }}>
                  <p style={{ color: textColor, fontFamily: textFontFamily, fontWeight: textFontWeight }}>
                    Dog owners enjoy numerous health and social benefits by walking their dog a few times a
                    week.
                    Benefits include improved cardiovascular fitness, lower blood pressure, stronger muscles and
                    bones (built up by walking regularly),
                    and decreased stress.
                  </p>
                  <p style={{ color: textColor, fontFamily: textFontFamily, fontWeight: textFontWeight }}>
                    A regular walk is vitally important for your pet`s health too. Obesity in pets is associated
                    with a number
                    of medical complaints including osteoarthritis, cardiovascular disease, liver disease and
                    insulin resistance.
                  </p>
                  <p style={{ color: textColor, fontFamily: textFontFamily, fontWeight: textFontWeight }}>
                    Most dogs need to be walked at least once each day, though some dogs, particularly very
                    active dogs,
                    may require more. The breed of dog you have, as well as its level of fitness and age, will
                    also
                    determine how long and how vigorous your walk should be.
                  </p>

                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}