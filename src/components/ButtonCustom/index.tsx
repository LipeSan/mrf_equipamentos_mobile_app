import React from 'react';
import { View } from 'react-native';
import Style from './styles';

export interface ButtonProps {
    text?:string,
    onPress: any,
    backgroundColor?:string,
    textColor?:string,
    icon?:any,
    opacity?:number,
}

const ButtonCustom = (buttonProps:ButtonProps) => {
    const buttonBackgroundColor = buttonProps.backgroundColor ? buttonProps.backgroundColor : "#f5f5f5f";
    const buttonTextColor = buttonProps.textColor ? buttonProps.textColor : "#f5f5f5f";
    return (
        <Style.ButtonCustom style={{backgroundColor:buttonBackgroundColor}} onPress={buttonProps.onPress}>
            {buttonProps.icon ? <View style={{marginRight:10}}>{buttonProps.icon}</View> : null}
            <Style.ButtonText style={{color:buttonTextColor}}>{buttonProps.text}</Style.ButtonText>
        </Style.ButtonCustom>
    )
}

export default ButtonCustom;