import React from 'react';
import {CardHeader, Chip} from "@nextui-org/react";
import {formatDate} from "@/helpers/dateHelpers";
import {ColorName, getMoodColorClass, getMoodColorClassList} from "@/helpers/stylingHelpers";

interface RenderJournalHeaderProps {
    title: string;
    createdAt: string;
    mood: string;
    tags: string;
    pets: string[];
}

const renderListWithColors = (data: string)=> {
    const dataArray = data.split(',').map((item) => item.trim());
    const colorArray = getMoodColorClassList(dataArray);

    return (
        <>
            <div className="flex">
                {dataArray.map((item, index) => (
                    <Chip
                        key={item}
                        variant={"solid"}
                        color={colorArray[index]}
                        className={`font-bold text-medium ${colorArray[index]}`}
                    >
                        {item}
                    </Chip>
                ))}
            </div>
        </>
    );
};

const RenderJournalHeader: React.FC<RenderJournalHeaderProps> = ({title, createdAt, mood, tags,pets}) => {
    return (
        <div className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">{title}</p>
            <small className="text-default-500">{formatDate(createdAt)}</small>
            <div className="flex flex-col mt-1">
                {renderListWithColors(mood)}
            </div>
            <div className="flex flex-col mt-2">
                {renderListWithColors(tags)}
            </div>
        </div>
    );
};

export default RenderJournalHeader;
