import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Header from '../src/components/Header';
import SendUrl from '../src/components/SendUrl';

import axios from 'axios'

const Service = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = () => {
//             const key = `${import.meta.env.VITE_API_KEY}reviews`;
//             axios.get(key)
//                 .then(response => {
//                     if (JSON.stringify(data) !== JSON.stringify(response.data)) {
//                         setData(response.data);
//                     }
//                 })
//                 .catch(error => {
//                     console.error("Error fetching data:", error);
//                 });
//         };
    
//         fetchData();
//         const intervalId = setInterval(fetchData, 120000);
//         return () => clearInterval(intervalId);
//     }, []);///

    return (
        <div>
            <Header />
            <ContentWrapper>
                <SendUrl />
            </ContentWrapper>

        </div>
    );
}

export default Service;

const ContentWrapper = styled.div`
    margin-top: 20px;
`;

