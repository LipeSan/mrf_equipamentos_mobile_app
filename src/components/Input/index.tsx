import React, {useEffect} from 'react';
import { View } from 'react-native';
import Style from './styles';

//Images
import ErrorIcon from '../../assets/icons/error.svg';
import { Color } from '../../shares/data';

export interface InputProps {
    placeholder: string,
    label: string,
    secureTextEntry?: boolean,
    onChangeText?: any,
    value?:string,
    isErrorMessageAvailable?: boolean,
    errorMessage?: string,
    keyboardType?: string
}

export const InputCustom = (inputProps: InputProps) => {
    const secureTextEntryField = inputProps.secureTextEntry ? inputProps.secureTextEntry : false;

    useEffect(() => {
    },[inputProps])
    return (
        <Style.Content>
            <Style.Label labelColor={inputProps.isErrorMessageAvailable ? Color.red : Color.gray}>{inputProps.label}</Style.Label>
            <Style.Input
                borderColor={inputProps.isErrorMessageAvailable ? Color.red : Color.gray}
                secureTextEntry={secureTextEntryField}
                placeholder={inputProps.placeholder}
                onChangeText={inputProps.onChangeText}
                value={inputProps.value}
                keyboardType={inputProps.keyboardType ? inputProps.keyboardType : null}>
            </Style.Input>
            {inputProps.isErrorMessageAvailable ? (
                <View style={{ flexDirection: 'row', marginLeft: 5, marginTop: 7, alignItems:'center'}}>
                    <ErrorIcon width='18' height='18'/>
                    <Style.ErrorText>
                        {inputProps.errorMessage}
                    </Style.ErrorText>
                </View>
            ) : null}
        </Style.Content >
    )
}

export default InputCustom;