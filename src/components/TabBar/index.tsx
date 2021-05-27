import React from 'react';
import Style from './styles';

//const FeedsIcon = require('../../assets/icons/feeds.svg');
import FeedsIcon from '../../assets/icons/feeds.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import LogoIcon from '../../assets/icons/add.svg';

const TabBar = ({state, navigation}:any) => {
    
    const goTo = (page:string) => {
        console.log("======== DATA ========",page);
        if(page === 'EquipmentDetails'){
            navigation.navigate(page, {equipmentId: undefined});
        } else {
            navigation.navigate(page);
        }
    }

    return (
        <Style.TabArea>
            <Style.TabItem onPress={() => goTo('Equipments')}>
                <FeedsIcon width='26' height='26' fill={state.index === 0 ? '#CC7F56' : '#C0C0C0'} />
            </Style.TabItem>
            <Style.TabItemCenter onPress={() => goTo('EquipmentDetails')}>
                <LogoIcon width='60' height='60' fill='#000' />
            </Style.TabItemCenter>
            <Style.TabItem onPress={() => goTo('Settings')}>
                <SettingsIcon width='30' height='30' fill={state.index === 2 ? '#CC7F56' : '#C0C0C0'} />
            </Style.TabItem>
        </Style.TabArea>
    )
}

export default TabBar;
