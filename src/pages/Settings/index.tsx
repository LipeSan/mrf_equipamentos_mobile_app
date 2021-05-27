import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';

const SettingsPage = () => {

    const navigation = useNavigation();

    useEffect(() => {
    },[])
    
    return (
        <Container>
            <Text>Settings</Text>
        </Container>
    )
} 

export default SettingsPage;