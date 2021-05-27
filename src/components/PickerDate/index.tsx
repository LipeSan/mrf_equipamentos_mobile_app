import React, { useEffect, useState } from 'react';
import { Modal, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Color} from '../../shares/data'

interface DatePros {
    isVisible: boolean,
    date?: Date,
    showDialog: any,
    maximumDate?: any,
    setDateModal?:any
}

const DatePickerModal = (dateProps: DatePros) => {
    const [isVisible, setIsVisible] = useState(dateProps.isVisible);
    const [selectedDate, setSelectedDate] = useState(dateProps.date ? dateProps.date : new Date);

    const hideDialog = () => {
        setIsVisible(false);
        dateProps.showDialog(false)
    }

    const onPressDone = () => {
        if(selectedDate){
            dateProps.setDateModal(selectedDate);
            hideDialog();
        }
    }

    useEffect(() => {
        setIsVisible(dateProps.isVisible);
        setSelectedDate(dateProps.date ? dateProps.date : new Date)
    },[dateProps])

    return (
        <Modal
            transparent={true}
            
            animationType={'slide'}
            visible={isVisible}
            onRequestClose={() => hideDialog}>
            <TouchableWithoutFeedback
                onPress={() => hideDialog}>
                <View
                    style={
                        Platform.OS === 'ios'
                            ? {
                                backgroundColor: Color.secondary,
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                paddingLeft: 8,
                                paddingRight: 8,
                                paddingBottom: Platform.OS === 'ios' ? 20 : 10,
                            }
                            : {
                                backgroundColor: '#00000000',
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                paddingLeft: 8,
                                paddingRight: 8,
                                //paddingBottom: Platform.OS == 'ios' ? 20 : 10,
                            }
                    }>
                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={() => {hideDialog()}}
                        activeOpacity={0.7}>
                        <View style={{flex: 1}} />
                    </TouchableOpacity>
                    <View style={[{ 
                        zIndex: 5000, 
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderRadius: 12,
                        paddingVertical: 10,
                        alignItems:'center',
                        justifyContent:'center'
                        }]}>
                            <DatePicker
                                mode="date"
                                date={selectedDate}
                                locale={'en'}
                                maximumDate={dateProps.maximumDate ? dateProps.maximumDate : null}
                                onDateChange={(date:any) => {
                                    setSelectedDate(date);
                                }}
                            />
                    </View>
                    <View
                        style={[{ 
                            zIndex: 5000, 
                            backgroundColor: 'white',
                            borderRadius: 12,
                            marginTop: 10,
                            }]}>
                        <TouchableOpacity
                            style={{width: '100%'}}
                            onPress={onPressDone}
                            activeOpacity={0.7}>
                            <View style={{width: '100%'}}>
                                <Text style={{
                                    color: '#F54D71',
                                    fontSize: 20,
                                    //fontFamily: 'OpenSans-Semibold',
                                    textAlign: 'center',
                                    padding: 13,
                                    width: '100%',
                                }}>
                                    {"DONE"}
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
                                    color: '#F54D71',
                                    fontSize: 20,
                                    //fontFamily: 'OpenSans-Semibold',
                                    textAlign: 'center',
                                    padding: 13,
                                    width: '100%',
                                }}>
                                    {"CANCEL"}
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

export default DatePickerModal;