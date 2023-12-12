import {View, Image} from "@react-pdf/renderer";
import React from "react";
import {JournalImageBuffer} from "@/boundary/interfaces/journal";

export default function RenderEntryPdfImages({imageBuffers, itemsPerRow = 2}: {
    imageBuffers: JournalImageBuffer[];
    itemsPerRow?: number;
}) {
    if (!imageBuffers || imageBuffers.length === 0) {
        return null;
    }

    return (
        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
            {imageBuffers.map((image, index) => (
                <View key={index} style={{width: `${100 / itemsPerRow}%`,paddingLeft:5}}>
                    <Image
                        src={`data:image/${image.imageType};base64,${image.imageBuffer}`}
                    />
                </View>
            ))}
        </View>
    );
}
