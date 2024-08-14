import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios'

const SendUrl = () => {
    
    const [url, setUrl] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = () => {
        const key = import.meta.env.VITE_API_KEY;
        const endpoint = `${key}/urls`; 
        
        if (!url) {
            setError("URL을 입력해주세요.");
            return;
        }

        console.log("Sending request to:", endpoint);
        console.log("URL:", url);

        axios.post(endpoint, { url }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        .then(response => {
            console.log(response.data);
            setError("URL 전송 완료!")
        })

        .catch(error => {
            console.error("There has been a problem with you axios operation:", error);
            setError("데이터 전송 중에 에러가 발생하였습니다 - " + error.message);
        });
        
    };

    return (
        <div>
            
            <Info> 
                ※ 분석할 링크 URL을 입력하세요 : 
            </Info>

            <UrlContainer>
                <UrlInput
                    name = "url"
                    value = {url}
                    onChange={(e) => {setUrl(e.target.value)}}
                />
                <UrlButton onClick={handleSubmit}>send</UrlButton>
                {error && <Message style={{ color: 'red' }}>INFO : {error}</Message>}
            </UrlContainer>

        </div>

    );
};

export default SendUrl;

const Info = styled.div`
    margin : 30px 20px 10px 25px;
    font-size: 18px;
    color: #333;
    text-align: left;
    font-weight: bold;
`;

const UrlContainer = styled.div`
    margin-top: 20px;
`;

const UrlInput = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border: 2px solid #18A8F1;
    border-radius: 4px;
    font-size: 17px;
    width: 700px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s ease;
    
    &:focus {
        border-color: #1187CF;
        outline: none;
    }
`;

const UrlButton = styled.button`
    padding: 10px 20px;
    margin-left: 20px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #9FA9D8;
    }

    &:active {
        background-color: #5D6DBE;
    }
`;

const Message = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 10px;
`;

