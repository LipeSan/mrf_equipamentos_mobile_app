import React from 'react';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
    background-color: #EAEEFF!important;
    flex: 1;
`;

const Header = styled.View`
    width: 100%;
    height:100px;
    background-color: red;
    position: absolute;
    top:0
`;

export default {
    Container,
    Header
}