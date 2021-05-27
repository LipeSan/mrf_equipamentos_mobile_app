import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//PAGES
import Equipments from '../pages/Equipments';
import Settings from '../pages/Settings';
import EquipmentDetails from '../pages/EquipmentDetails';
import TabBar from '../components/TabBar';

const Tabs = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tabs.Navigator tabBar={props => <TabBar {...props} />}>
            <Tabs.Screen
                name='Equipments'
                component={Equipments}
                options={{ unmountOnBlur: true }}/>
            <Tabs.Screen
                name='EquipmentDetails'
                component={EquipmentDetails}
                 
                options={{ unmountOnBlur: true }}/>
            <Tabs.Screen
                name='Settings'
                component={Settings} />
        </Tabs.Navigator>
    )
}

export default MainTab;