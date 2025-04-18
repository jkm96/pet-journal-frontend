import React, { useState } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import RenderJournalHeader from '@/components/user/journalmngt/journalentries/RenderJournalHeader';
import { JournalEntryResponse } from '@/boundary/interfaces/journal';
import { groupEntriesByMonth } from '@/lib/utils/journalUtils';

interface JournalEntriesGridProps {
  journalEntries: JournalEntryResponse[];
}

const JournalEntriesGrid: React.FC<JournalEntriesGridProps> = ({ journalEntries }) => {
  const [showFullContent, setShowFullContent] = useState<number | null>(null);

  const toggleShowFullContent = (index: number) => {
    setShowFullContent((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      {Object.keys(groupEntriesByMonth(journalEntries)).map((monthYear) => (
        <div className='m-2' key={monthYear}>

          <h2 className='text-xl mt-4'>{monthYear}</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4'>
            {groupEntriesByMonth(journalEntries)[monthYear].map((journal, index) => (
              <Card key={journal.id} className='py-4'>
                <RenderJournalHeader
                  title={journal.title}
                  createdAt={journal.createdAt}
                  mood={journal.mood}
                  tags={journal.tags}
                  pets={journal.pets.map((pet) => pet.name)}
                  diarySlug={journal.slug} />
                <CardBody className='overflow-visible py-2'>
                  <div className='mt-1 mb-1'>
                    {showFullContent === index ? `${journal.content}...` : `${journal.content.slice(0, 180)}...`}
                    <button className='dark:text-meta-8 text-success'
                            onClick={() => toggleShowFullContent(index)}>
                      {showFullContent === index ? 'Read Less' : 'Read More'}
                    </button>
                  </div>

                  <div className='flex flex-wrap md:-m-2 mt-3'>
                    {journal.journalAttachments.length <= 1 ?
                      (
                        <div className='p-1'>
                          {journal.journalAttachments.map((image, imgIndex) => (
                            <img
                              key={imgIndex}
                              alt={`gallery-${imgIndex}`}
                              className='block w-full rounded-lg object-center'
                              src={image.sourceUrl}
                            />
                          ))}
                        </div>
                      ) :
                      (
                        <>
                          <div
                            className={`flex ${
                              journal.journalAttachments.length <= 3 ? 'w-full' : 'w-1/2'
                            } flex-wrap`}
                          >
                            {journal.journalAttachments.slice(0, 3).map((image, imgIndex) => (
                              <div
                                key={imgIndex}
                                className={`w-${imgIndex === 2 || journal.journalAttachments.length <= 1 ? 'full' : '1/2'} p-1 md:p-2`}
                              >
                                {journal.journalAttachments.length === 2 ? (
                                  <img
                                    alt={`gallery-${imgIndex + 1}`}
                                    className='block w-full rounded-lg object-center sm:h-200'
                                    // style={{ height: 200 }}
                                    src={image.sourceUrl}
                                  />
                                ) : (
                                  <img
                                    alt={`gallery-${imgIndex + 1}`}
                                    className='block w-full rounded-lg object-center'
                                    style={{ height: journal.journalAttachments.length === 3 ? 150 : 100 }}
                                    src={image.sourceUrl}
                                  />
                                )}

                              </div>
                            ))}
                          </div>
                        </>
                      )}

                    <div className='flex w-1/2 flex-wrap'>
                      {journal.journalAttachments.slice(3,6).map((image, imgIndex) => (
                        <div key={imgIndex}
                             className={`w-${imgIndex === 0 ? 'full' : '1/2'} p-1 md:p-2`}>
                          <img
                            alt={`gallery-${imgIndex + 4}`}
                            className='block w-full rounded-lg object-center'
                            style={{ height: 100, maxHeight: 150 }}
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
      ))}
    </>
  );
};

export default JournalEntriesGrid;
