import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Remove from '../../assets/icons/remove.svg';

interface ObjectProps {
    image: any,
    removeImage?: any,
    openImage?: any
}

const ImageAux = (objProps: ObjectProps) => {
    console.log("++ DATA ++",objProps.image.path);
    console.log("== DATA ==",objProps.image.url);
    return (
        <View>
            <View style={{ position: 'absolute', width: 25, height: 25, right: 0, top: 0, zIndex: 1 }}>
                <TouchableOpacity onPress={() => {objProps.removeImage(objProps.image)}}>
                    <Remove width='24' height='24' />
                </TouchableOpacity>
            </View>
            <Image style={{ height: 150, width: 150, margin: 5 }} source={{ uri: objProps.image.path ? objProps.image.path: objProps.image.url }} />
        </View>
    )
}


export default ImageAux;