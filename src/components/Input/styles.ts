import styled from 'styled-components/native';

const Content = styled.View`
    width: 100%;
    padding-bottom: 15px;
`;

const Label = styled.Text`
    font-size: 16px;
    color: ${(props:any) => props.labelColor};
    margin-bottom: 3px;
    margin-left: 3px;
`;

const Input = styled.TextInput`
    width: 100%;
    height: 46px;
    background: white;
    border-radius: 10px;
    padding:10px;
    font-size: 20px;
    border: 1px;
    border-color: ${(props:any) => props.borderColor};
`;

const ErrorText = styled.Text`
    color: red;
    font-size:14;
    padding-left:5;
`;

export default {
    Label,
    Content,
    Input,
    ErrorText
}