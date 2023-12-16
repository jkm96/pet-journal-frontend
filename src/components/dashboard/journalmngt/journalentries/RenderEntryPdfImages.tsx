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

        <View style={{flexDirection: 'row', flexWrap: 'wrap',marginTop: 3}}>
            <View style={{flex: 1,flexDirection: 'row',width: imageBuffers.length <= 3 ? '100%' : '50%', flexWrap: 'wrap', marginBottom: 0}}>
                {imageBuffers.slice(0, 3).map((image, index) => (
                    <View key={index} style={{width: index === 2 ? '100%' : '50%',marginTop:2, padding: 5}}>
                        <Image
                            style={{objectFit:'cover'}}
                            src={`data:image/${image.imageType};base64,${image.imageBuffer}`}
                        />
                    </View>
                ))}
            </View>

            <View debug={true} style={{flex: 1,flexDirection: 'row', width:'50%', flexWrap: 'wrap', marginBottom: 0}}>
                {imageBuffers.slice(3).map((image, index) => (
                    <View debug={true} key={index} style={{width: index === 0 ? '100%' : '50%',padding: 5,maxHeight: '100%',objectFit:'cover'}}>
                        <Image
                            style={{objectFit:'cover'}}
                            src={`data:image/${image.imageType};base64,${image.imageBuffer}`}
                        />
                    </View>
                ))}
            </View>
        </View>


    );
}
