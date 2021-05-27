import styled from 'styled-components/native';

const ButtonCustom = styled.TouchableOpacity`
    height: 45px;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    width:100%;
    flex-direction:row;
`;

const ButtonText = styled.Text`
    font-size: 16px;
    color: #ffffff;
    text-transform: uppercase;
`;

export default {
    ButtonText,
    ButtonCustom
};