import React, { useEffect, useState } from 'react';
import { Modal, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import {Picker} from 'react-native-wheel-pick';
import {messages} from '../../shares/messages';
import {Color} from '../../shares/data'

interface ObjectPros {
    isVisible: boolean,
    itemList?: any,
    item?:any,
    showDialog: any,
    setValueModal?:any,
    placeholder:string
}

const ObjectPickerModal = (objectProps: ObjectPros) => {
    const [isVisible, setIsVisible] = useState(objectProps.isVisible);
    const [selectedValue, setSelectedValue] = useState(objectProps.item?objectProps.item:objectProps.itemList[0].value);

    const hideDialog = () => {
        setIsVisible(false);
        objectProps.showDialog(false)
    }

    const onPressDone = () => {
        if(selectedValue){
            objectProps.setValueModal(selectedValue);
            hideDialog();
        }
    }

    useEffect(() => {
        setIsVisible(objectProps.isVisible);
        setSelectedValue(objectProps.item ? objectProps.item : objectProps.itemList[0].value)
    },[objectProps])

    return (
        <Modal
            transparent={true}
            animationType={'slide'}
            visible={isVisible}
            onRequestClose={() => hideDialog}>
            <TouchableWithoutFeedback
                onPress={() => hideDialog}>
                <View
                    style={{
                        backgroundColor: Color.secondary,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        paddingLeft: 8,
                        paddingRight: 8,
                        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
                    }}>
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={() => {hideDialog()}}
                        activeOpacity={0.7}>
                        <View style={{flex: 1}} />
                    </TouchableOpacity>
                    <View style={{ 
                        zIndex: 5000,
                        flexDirection: 'row',
                        backgroundColor: Color.white,
                        borderRadius: 12,
                        paddingVertical: 10,
                        alignItems:'center',
                        justifyContent:'center',
                        }}>
                            <Picker
                                style={{ backgroundColor: Color.white, width: 300, height: 215 }}
                                pickerData={objectProps.itemList}
                                selectedValue={selectedValue}
                                onValueChange={(value:any) => {
                                    setSelectedValue(value);
                                }}
                                itemSpace={30}
                            />
                    </View>
                    <View
                        style={[{ 
                            zIndex: 5000, 
                            backgroundColor: Color.white,
                            borderRadius: 12,
                            marginTop: 10,
                            }]}>
                        <TouchableOpacity
                            style={{width: '100%'}}
                            onPress={onPressDone}
                            activeOpacity={0.7}>
                            <View style={{width: '100%'}}>
                                <Text style={{
                                    color: Color.primary,
                                    fontSize: 20,
                                    textAlign: 'center',
                                    padding: 13,
                                    width: '100%',
                                    textTransform:'uppercase'
                                }}>
                                    {messages.BUTTON_DONE}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            height: 1,
                            backgroundColor:'#d3d3d3',
                            marginHorizontal:15
                        }} />
                        <TouchableOpacity
                            style={{width: '100%'}}
                            onPress={hideDialog}
                            activeOpacity={0.7}>
                            <View style={{width: '100%'}}>
                                <Text style={{
                                    color: Color.primary,
                                    fontSize: 20,
                                    textAlign: 'center',
                                    padding: 13,
                                    width: '100%',
                                    textTransform:'uppercase'
                                }}>
                                    {messages.BUTTON_CANCEL}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {Platform.OS === 'ios' ? null : (
                        <Modal
                            transparent={true}
                            visible={isVisible}
                            animationType={'fade'}
                            onRequestClose={hideDialog}>
                        </Modal>
                    )}
                </View>
            </TouchableWithoutFeedback>

        </Modal>
    )
}

export default ObjectPickerModal;