import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Header from '../src/components/Header';
import SendUrl from '../src/components/SendUrl';
import Sentiment from '../src/components/Sentiment';

import axios from 'axios'

const Service = () => {

    return (
        <div>
            <Header />
            <ContentWrapper>
                <SendUrl />
                <Sentiment />
            </ContentWrapper>

        </div>
    );
}

export default Service;

const ContentWrapper = styled.div`
    margin-top: 0;
`;

