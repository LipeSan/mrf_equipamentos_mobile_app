import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Style from './styles';
import Common from '../../shares/common';
import {Status} from '../../shares/data';

import Success from '../../assets/icons/success.svg';
import Fail from '../../assets/icons/fail.svg';
import Alert from '../../assets/icons/alert.svg';


const EquipamentCard = ({ equipment, navigation, onPress }: any) => {

    const goTo = (page: string) => {
        navigation.navigate(page);
    }

    const getStatus = (status: any) => {
        switch (status) {
            case Status[0].value:
                return <Fail></Fail>
            case Status[1].value:
                return <Alert></Alert>
            case Status[2].value:
                return <Success></Success>
        }
    }

    return (
        <Style.Content>
            <TouchableOpacity onPress={() => onPress(equipment.equipmentId)}>
            <Style.TypeText>{equipment.equipmentType}</Style.TypeText>
            <Style.ModelText>{equipment.model}</Style.ModelText>
            <View style={{ marginTop: 10 }}>
                <Style.TypeText>{equipment.client}</Style.TypeText>
                <Style.TypeText>{Common.formateDate(equipment.collectionDate)}</Style.TypeText>
                <View style={{ width: 30, height: 30, position: 'absolute', right: 0, bottom: 0}}>
                    {getStatus(equipment.status)}
                </View>
            </View>
            </TouchableOpacity>
        </Style.Content>
    )
}

export default EquipamentCard;
