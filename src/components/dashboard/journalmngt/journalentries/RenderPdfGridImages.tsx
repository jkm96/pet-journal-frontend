import {View, Image} from "@react-pdf/renderer";
import React from "react";
import {JournalImageBuffer} from "@/boundary/interfaces/journal";

export default function RenderPdfGridImages({imageBuffers}: {
    imageBuffers: JournalImageBuffer[];
}) {
    if (!imageBuffers || imageBuffers.length === 0) {
        return null;
    }

    return (

        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 3}}>
            {imageBuffers.length <= 4 ? (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: 0
                }}>
                    {imageBuffers.map((image, index) => (
                        <View key={index} style={{width: imageBuffers.length === 1 ? '100%':'50%', marginTop: 2, padding: 5}}>
                            <Image
                                style={{height: imageBuffers.length === 1 ? 200: 130, maxHeight: imageBuffers.length === 1 ? 200: 150}}
                                src={`data:image/${image.imageType};base64,${image.imageBuffer}`}
                            />
                        </View>
                    ))}
                </View>
            ) : (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: 0
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        width: imageBuffers.length <= 3 ? '100%' : '50%',
                        flexWrap: 'wrap',
                        marginBottom: 0
                    }}>
                        {imageBuffers.slice(0, 3).map((image, index) => (
                            <View key={index} style={{width: index === 2 ? '100%' : '50%', marginTop: 2, padding: 5}}>
                                <Image
                                    style={{height: 130, maxHeight: 150}}
                                    src={`data:image/${image.imageType};base64,${image.imageBuffer}`}
                                />
                            </View>
                        ))}
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', width: '50%', flexWrap: 'wrap', marginBottom: 0}}>
                        {imageBuffers.slice(3).map((image, index) => (
                            <View key={index} style={{
                                width: index === 0 ? '100%' : '50%',
                                padding: 5,
                                maxHeight: '100%',
                                marginTop: 2,
                                objectFit: 'cover'
                            }}>
                                <Image
                                    style={{height: 130, maxHeight: 150}}
                                    src={`data:image/${image.imageType};base64,${image.imageBuffer}`}
                                />
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}
