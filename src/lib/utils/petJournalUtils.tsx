import {CreateJournalEntryRequest} from "@/boundary/interfaces/journal";
import {CheckboxGroup} from "@nextui-org/react";
import {journalTags, moodTags} from "@/boundary/constants/petConstants";
import {CustomCheckbox} from "@/components/shared/formelements/CustomCheckbox";
import React from "react";

export function JournalMoodsAndTagsComponent(selectedMoodTags: any[], setInputErrors: (value: (((prevState: CreateJournalEntryRequest) => CreateJournalEntryRequest) | CreateJournalEntryRequest)) => void, inputErrors: CreateJournalEntryRequest, setSelectedMoodTags: (value: (((prevState: any[]) => any[]) | any[])) => void, selectedJournalTags: any[], setSelectedJournalTags: (value: (((prevState: any[]) => any[]) | any[])) => void) {
    return <div className="grid md:grid-cols-2 md:gap-6">
        <div className="flex flex-col gap-1 w-full">
            <CheckboxGroup
                className="gap-1"
                label="Select mood"
                orientation="horizontal"
                value={selectedMoodTags}
                onChange={(keys: any) => {
                    setInputErrors({...inputErrors, mood: ""});
                    setSelectedMoodTags(keys);
                }}
                errorMessage={inputErrors.mood}
            >
                {moodTags.map((tag) => (
                    <CustomCheckbox key={tag.key} value={tag.key}>
                        {tag.label}
                    </CustomCheckbox>
                ))}
            </CheckboxGroup>
        </div>

        <div className="flex flex-col gap-1 w-full">
            <CheckboxGroup
                className="gap-1"
                label="Select tags"
                orientation="horizontal"
                value={selectedJournalTags}
                onChange={(keys: any) => {
                    setInputErrors({...inputErrors, tags: ""});
                    setSelectedJournalTags(keys);
                }}
                errorMessage={inputErrors.tags}
            >
                {journalTags.map((tag) => (
                    <CustomCheckbox key={tag.key} value={tag.key}>
                        {tag.label}
                    </CustomCheckbox>
                ))}
            </CheckboxGroup>
        </div>
    </div>;
}
