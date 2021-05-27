import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Container } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

const PreloadPage = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            //GO TO LOGIN PAGE
            if(!token){
                //return navigation.navigate('SignIn');
            }
            return navigation.navigate('MainTab');
        }
        checkToken();
    },[])
    
    return (
        <Container>
            <Text>Preload</Text>
        </Container>
    )
} 

export default PreloadPage;