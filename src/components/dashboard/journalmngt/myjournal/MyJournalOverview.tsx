import {getJournalEntries} from "@/lib/services/journal-entries/journalEntryService";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {JournalEntryResponse} from "@/boundary/interfaces/journal";
import Breadcrumb from "@/components/shared/breadcrumbs/Breadcrumb";
import {Avatar, Card, CardBody, CircularProgress} from "@nextui-org/react";
import RenderJournalHeader from "@/components/dashboard/journalmngt/journalentries/RenderJournalHeader";
import FilterComponent from "@/components/common/filter/FilterComponent";
import {JournalQueryParameters} from "@/boundary/parameters/JournalQueryParameters";

interface MyJournalOverviewProps {
    searchParams?: { query?: string; periodFrom?: Date; periodTo?: Date; };
}

export default function MyJournalOverview({ searchParams }: MyJournalOverviewProps) {
    console.log("search params",searchParams)
    const [journalEntries, setJournalEntries] = useState<JournalEntryResponse[]>([]);
    const [isLoadingEntries, setIsLoadingEntries] = useState(true);
    const fetchAllJournalEntries = async (queryParams: JournalQueryParameters) => {
        setIsLoadingEntries(true)
        await getJournalEntries(queryParams)
            .then((response) => {
                if (response.statusCode === 200) {
                    const entries = response.data;
                    setJournalEntries(entries)
                }
            })
            .catch((error) => {
                toast.error(`Error fetching journal entries: ${error}`)
            })
            .finally(() => {
                setIsLoadingEntries(false);
            });
    };

    useEffect(() => {
        const queryParams: JournalQueryParameters = new JournalQueryParameters();
        queryParams.searchTerm = searchParams?.query;
        queryParams.periodFrom = searchParams?.periodFrom;
        queryParams.periodTo = searchParams?.periodTo;
        fetchAllJournalEntries(queryParams);
    }, []);

    return (
        <>
            <Breadcrumb pageName="My Journal"/>

            {isLoadingEntries ? (
                <div className={"grid place-items-center"}>
                    <CircularProgress color={"primary"} className={"p-4"} label="Loading your journal entries...."/>
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-4 mb-2">
                        <div className="flex justify-between gap-3 items-end">
                            <FilterComponent placeholder="Search for journal entries"/>
                            {/*<div className="flex gap-3">*/}
                            {/*    <Button onPress={handleOpenModal}*/}
                            {/*            startContent={<PlusIcon/>}*/}
                            {/*            color="primary"*/}
                            {/*            variant="shadow">*/}
                            {/*        Add New*/}
                            {/*    </Button>*/}
                            {/*    <CreateJournalEntryModal isOpen={isModalOpen} onClose={handleCloseModal}/>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    {journalEntries.length < 1 ? (
                        <>
                            <div className="text-center">
                                <p className="text-danger-400">No journal entries found!</p>
                            </div>
                        </>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

                            {journalEntries.map((journal) => (
                                <Card key={journal.id} className="py-4">
                                    <RenderJournalHeader title={journal.title}
                                                         createdAt={journal.createdAt}
                                                         mood={journal.mood}
                                                         tags={journal.tags}
                                                         pets={journal.pets.map((pet)=>pet.name)}/>
                                    <CardBody className="overflow-visible py-2">
                                        <div className="mt-1 mb-1">
                                            {journal.content}
                                        </div>

                                        <div className="flex flex-wrap md:-m-2 mt-3">
                                            <div className={`flex ${journal.journalAttachments.length <= 3 ? 'w-full' : 'w-1/2'} flex-wrap`}>
                                                {journal.journalAttachments.slice(0, 3).map((image, index) => (
                                                    <div key={index} className={`w-${index === 2 ? 'full' : '1/2'} p-1 md:p-2`}>
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
                    )}
                </>
            )}
        </>
    )
}