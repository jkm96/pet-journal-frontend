import React from 'react';
import {Card, CardBody} from '@nextui-org/react';
import RenderJournalHeader from '@/components/dashboard/journalmngt/journalentries/RenderJournalHeader';
import {JournalEntryResponse} from '@/boundary/interfaces/journal';

interface JournalEntriesGridProps {
    journalEntries: JournalEntryResponse[];
}

const JournalEntriesGrid: React.FC<JournalEntriesGridProps> = ({journalEntries}) => (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {journalEntries.map((journal) => (
                <Card key={journal.id} className="py-4">
                    <RenderJournalHeader
                        title={journal.title}
                        createdAt={journal.createdAt}
                        mood={journal.mood}
                        tags={journal.tags}
                        pets={journal.pets.map((pet) => pet.name)}
                    />
                    <CardBody className="overflow-visible py-2">
                        <div className="mt-1 mb-1">{journal.content}</div>

                        <div className="flex flex-wrap md:-m-2 mt-3">
                            <div
                                className={`flex ${
                                    journal.journalAttachments.length <= 3 ? 'w-full' : 'w-1/2'
                                } flex-wrap`}
                            >
                                {journal.journalAttachments.slice(0, 3).map((image, index) => (
                                    <div key={index} className={`w-${index === 2 ||  journal.journalAttachments.length <=1 ? 'full' : '1/2'} p-1 md:p-2`}>
                                        <img
                                            alt={`gallery-${index + 1}`}
                                            className="block h-full w-full rounded-lg object-cover object-center"
                                            src={image.sourceUrl}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex w-1/2 flex-wrap">
                                {journal.journalAttachments.slice(3).map((image, index) => (
                                    <div key={index} className={`w-${index === 0 ? 'full' : '1/2'} p-1 md:p-2`}>
                                        <img
                                            alt={`gallery-${index + 4}`}
                                            className="block h-full w-full rounded-lg object-cover object-center"
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
    </>
);

export default JournalEntriesGrid;
