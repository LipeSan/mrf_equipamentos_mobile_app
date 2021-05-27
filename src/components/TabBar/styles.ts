import styled from "styled-components/native";
import {Platform} from 'react-native';

const TabArea = styled.SafeAreaView`
    flex-direction: row;
    background-color: white;
`;

const TabItem = styled.TouchableOpacity`
    flex:1;
    justify-content: center;
    align-items: center;
    margin-top:8px;
`;

const TabItemCenter = styled.TouchableOpacity`
    width: 80px;
    height: 80px;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    background-color: white;
    border: 3px solid black;
    margin-top: -40px;


`;

export default {
    TabArea,
    TabItem,
    TabItemCenter,
};