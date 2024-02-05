import Breadcrumb from '@/components/shared/breadcrumbs/Breadcrumb';
import TextIcon from '@/components/shared/icons/TextIcon';
import { Button, Card, CardBody, Chip, CircularProgress, Input } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react';
import BGColorIcon from '@/components/shared/icons/BGColorIcon';
import {
  backgroundColorOptions,
  textColorOptions,
  textFontFamilyOptions,
  textFontWeightOptions,
} from '@/lib/utils/magicStudioUtils';
import { JournalQueryParameters } from '@/boundary/parameters/journalQueryParameters';
import { getJournalEntries } from '@/lib/services/journal-entries/journalEntryService';
import { toast } from 'react-toastify';
import { PlusIcon } from '@/components/shared/icons/PlusIcon';
import CreateProjectModal from '@/components/magicstudio/modals/CreateProjectModal';
import ReactPDF, { Document, Page, pdf, PDFDownloadLink, Text, usePDF, View } from '@react-pdf/renderer';
import { MagicStudioPdfStyle, PdfPreviewStyle, toTitleCase } from '@/lib/utils/pdfUtils';
import Font = ReactPDF.Font;
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/boundary/interfaces/user';
import { JournalEntryResponse } from '@/boundary/interfaces/journal';
import { formatDate } from '@/helpers/dateHelpers';
import RenderMoodTagsWithColors from '@/components/dashboard/user/journalmngt/journalentries/RenderMoodTagsWithColors';
import RenderPdfGridImages from '@/components/dashboard/user/journalmngt/journalentries/RenderPdfGridImages';
import { SearchIcon } from '@/components/shared/icons/SearchIcon';
import Spinner from '@/components/shared/icons/Spinner';
import { PlusFilledIcon } from '@nextui-org/shared-icons';
import { getProjectDetails, savePdfDocToDatabase } from '@/lib/services/magicstudio/magicStudioService';
import { PdfContent, ProjectDetailsResponse, SavePdfRequest } from '@/boundary/interfaces/magicStudio';
import { saveAs } from 'file-saver';
import RenderJournalHeader from '@/components/dashboard/user/journalmngt/journalentries/RenderJournalHeader';

type SectionVisibility = {
  textSection: boolean;
  backgroundSection: boolean;
};

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});
const styles = MagicStudioPdfStyle();

export default function MagicStudioEditor({ slug }: { slug: string }) {
  const { user } = useAuth();
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(true);
  const [magicProjectDetails, setMagicProjectDetails] = useState<ProjectDetailsResponse>({} as ProjectDetailsResponse);
  const [activeSection, setActiveSection] = useState<keyof SectionVisibility>('textSection');
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>({
    textSection: true,
    backgroundSection: false,
  });
  const [backgroundColor, setBackgroundColor] = useState<string>('white');
  const [textColor, setTextColor] = useState<string>('black');
  const [textFontFamily, setTextFontFamily] = useState<string>('Times-Roman');
  const [textFontWeight, setTextFontWeight] = useState(300);
  const fetchProjectDetails = async (slug: string) => {
    setIsLoadingDetails(true);
    await getProjectDetails(slug)
      .then((response) => {
        if (response.statusCode === 200) {
          const details: ProjectDetailsResponse = response.data;
          setMagicProjectDetails(details);
        }
      })
      .catch((error) => {
        toast.error(`Error fetching project details: ${error}`);
      })
      .finally(() => {
        setIsLoadingDetails(false);
      });
  };

  useEffect(() => {
    fetchProjectDetails(slug);
  }, []);

  const handleElementsButtonClick = (sectionName: keyof SectionVisibility) => {
    setSectionVisibility({
      textSection: sectionName === 'textSection',
      backgroundSection: sectionName === 'backgroundSection',
    });
    setActiveSection(sectionName);
  };

  const handleColorButtonClick = (color: string) => {
    setLatestValues((prevValues) => ({
      ...prevValues,
      textColor: color,
    }));
    setTextColor(color);
  };

  const handleFontFamilyButtonClick = (fontFamily: string) => {
    setLatestValues((prevValues) => ({
      ...prevValues,
      textFontFamily: fontFamily,
    }));
    setTextFontFamily(fontFamily);
  };

  const handleFontWeightButtonClick = (fontWeight: number) => {
    setLatestValues((prevValues) => ({
      ...prevValues,
      textFontWeight: fontWeight,
    }));
    setTextFontWeight(fontWeight);
  };

  const handleBackgroundColorButtonClick = (bgColor: string) => {
    setLatestValues((prevValues) => ({
      ...prevValues,
      backgroundColor: bgColor,
    }));
    setBackgroundColor(bgColor);
  };

  const [latestValues, setLatestValues] = useState({
    textColor: '',
    textFontFamily: '',
    textFontWeight: 0,
    backgroundColor: '',
  });

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savePdfElements = async () => {
      try {
        const request: SavePdfRequest = {
          projectId: magicProjectDetails ? magicProjectDetails.project.id : 10,
          pdfContent: JSON.stringify({
            textColor: latestValues.textColor,
            textFontFamily: latestValues.textFontFamily,
            textFontWeight: latestValues.textFontWeight,
            backgroundColor: latestValues.backgroundColor,
          }),
        };
        await saveDocumentToDatabase(request);
      } catch (error) {
        console.error('Error generating PDF or saving to database:', error);
      }
    };

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      savePdfElements();
    }, 10000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [latestValues, magicProjectDetails]);

  const saveDocumentToDatabase = async (request: SavePdfRequest) => {
    await savePdfDocToDatabase(request)
      .then((response) => {
        if (response.statusCode === 200) {
          console.log('save pdf response', response.data.pdfContent);
          const pdfContent = response.data.pdfContent;
          const elements: PdfContent = JSON.parse(pdfContent);
          console.log('elements', elements);
        }
      })
      .catch((error) => {
        console.error(`Error saving pdf document: ${error}`);
      })
      .finally(() => {
        setIsLoadingDetails(false);
      });
  };
  const projectPdfDocument = () => {
    if (magicProjectDetails.projectEntries === undefined) {
      return <Document></Document>;
    } else {
      return (
        <Document style={styles.document}>
          <Page size='A4' orientation={'portrait'} style={styles.body} wrap>
            <Text style={styles.header} fixed>
              ~ Made with love for pet lovers ~
            </Text>
            <Text style={styles.title}>Test Title</Text>
            <Text style={{ textAlign: 'center' }}>{user?.username}</Text>
          </Page>
          {magicProjectDetails.projectEntries.map((journalEntry) => (
            <Page key={journalEntry.id} size='A4' orientation={'portrait'}
                  style={[styles.body, { backgroundColor: backgroundColor }]} wrap>
              <Text style={styles.header} fixed>
                ~ Made with love for pet lovers ~
              </Text>
              <Text style={styles.subtitle}>{toTitleCase(journalEntry.title)}</Text>
              <Text
                style={styles.author}>{formatDate(journalEntry.createdAt)}</Text>

              <Text style={styles.moodtags}>
                {RenderMoodTagsWithColors(journalEntry.mood.split(',').map(item => item.trim()))}
                {RenderMoodTagsWithColors(journalEntry.tags.split(',').map(item => item.trim()))}
              </Text>

              <View>
                <Text style={[styles.content, {
                  color: textColor,
                  fontFamily: textFontFamily,
                  fontWeight: textFontWeight,
                }]}>
                  {journalEntry.content}
                </Text>
                <RenderPdfGridImages imageBuffers={journalEntry.journalAttachments.map((attachment) => {
                  return attachment.buffer;
                })} />
              </View>
            </Page>
          ))}
        </Document>
      );
    }
  };

  const handleDownload = async () => {
    const pdfContent = projectPdfDocument();
    const blob = await pdf(pdfContent).toBlob();
    saveAs(blob, `${magicProjectDetails.project.slug}.pdf`);
  };

  return (
    <>
      <Breadcrumb pageName='Magic Studio' />

      {isLoadingDetails ? (
        <div className='flex h-screen items-center justify-center'>
          <CircularProgress color={'primary'} className={'p-4'} label='Loading your projects...' />
        </div>
      ) : (
        <>
          <div className='flex flex-col gap-4 m-2'>
            <div className='md:flex justify-between gap-3 items-end'>
              <div className='flex gap-3'>
                {magicProjectDetails && (
                  <>
                    <Button onPress={handleDownload}
                            color="primary"
                            size="sm">
                      Download
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-12 gap-4'>
            {/* First Column */}
            <div className='col-span-12 md:col-span-1 lg:col-span-1 bg-column-100 p-4'>
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
            <div className='col-span-12 md:col-span-2 lg:col-span-2 p-4'>

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
            <div className='col-span-12 md:col-span-9 lg:col-span-9 p-4' style={{ maxHeight: '700px', overflowY: 'auto' }}>
            {magicProjectDetails.projectEntries.map((journalEntry) => (
                  <Card key={journalEntry.id}>
                    <RenderJournalHeader title={journalEntry.title}
                                         createdAt={journalEntry.createdAt}
                                         mood={journalEntry.mood}
                                         tags={journalEntry.tags}
                                         pets={journalEntry.pets.map(pet => pet.name)}
                                         showChips={false} />
                    <CardBody className='overflow-visible py-2'>
                      <div className='mt-1 mb-1'>
                        {journalEntry.content}
                      </div>

                      <div className='flex flex-wrap md:-m-2 mt-3'>
                        <div
                          className={`flex ${journalEntry.journalAttachments.length <= 3 ? 'w-full' : 'w-1/2'} flex-wrap`}>
                          {journalEntry.journalAttachments.slice(0, 3).map((image, index) => (
                            <div key={index}
                                 className={`w-${index === 2 || journalEntry.journalAttachments.length <= 1 ? 'full' : '1/2'} p-1 md:p-2`}>
                              <img
                                alt={`gallery-${index + 1}`}
                                className='block h-full w-full rounded-lg object-cover object-center'
                                src={image.sourceUrl}
                              />
                            </div>
                          ))}
                        </div>

                        <div className='flex w-1/2 flex-wrap'>
                          {journalEntry.journalAttachments.slice(3).map((image, index) => (
                            <div key={index} className={`w-${index === 0 ? 'full' : '1/2'} p-1 md:p-2`}>
                              <img
                                alt={`gallery-${index + 4}`}
                                className='block h-full w-full rounded-lg object-cover object-center'
                                src={image.sourceUrl}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}