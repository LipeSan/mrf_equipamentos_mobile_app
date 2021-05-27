import styled from "styled-components/native";

const Content = styled.View`
    background-color: white;
    width: 100%;
    min-height: 100px;
    margin-bottom: 10px;
    border-radius: 25px;
    padding: 15px;
    
`;

const TypeText = styled.Text`
    font-size:16px;
`;

const ModelText = styled.Text`
    font-size:12px;
`;

export default {
    Content,
    ModelText,
    TypeText
};