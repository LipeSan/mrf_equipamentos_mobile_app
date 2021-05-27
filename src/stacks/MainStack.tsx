import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//PAGES
import Preload from '../pages/Preload';
import MainTab from '../stacks/MainTab';

const Stack = createStackNavigator();

const MainStack = () => {
    return (

        <Stack.Navigator
            initialRouteName="Preload"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Preload' component={Preload}></Stack.Screen>
            <Stack.Screen name='MainTab' component={MainTab}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default MainStack;