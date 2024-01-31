import { getPdfMoodColorClassList } from '@/helpers/stylingHelpers';
import React from 'react';
import { Text } from '@react-pdf/renderer';

export default function RenderMoodTagsWithColors(dataArray: string[]) {
    const colorArray = getPdfMoodColorClassList(dataArray);
    return (
        <>
            {dataArray.map((item, index) => (
                <Text key={index}>
                    <Text key={index} style={{color: `${colorArray[index]}`}}>
                        {item}
                    </Text>
                    <Text> </Text>
                </Text>
            ))}
        </>
    );
};
