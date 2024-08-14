import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Sentiment = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [totalReviews, setTotalReviews] = useState(0); 

    const fetchData = () => {
        const key = import.meta.env.VITE_API_KEY;
        const endpoint = `${key}/reviews`; 

        axios.post(endpoint)
            .then(response => {
                const ranks = response.data.RD_RANK;
                if (ranks && Array.isArray(ranks)) {
                    const rankCounts = countRanks(ranks);
                    setData(rankCounts);
                    setTotalReviews(ranks.length);
                    setError(null);
                } else {
                    setError("Unexpected data format received.");
                }
            })
            .catch(error => {
                console.error('There was an error making the POST request!', error);
                setError('An error occurred while fetching data. Please try again later.');
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const countRanks = (ranks) => {
        const count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        ranks.forEach(rank => {
            if (count[rank] !== undefined) {
                count[rank]++;
            }
        });
        return count;
    };

    const chartData = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
            {
                label: 'Number of Reviews',
                data: data ? Object.values(data) : [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `Count: ${tooltipItem.raw}`;
                    }
                }
            }
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const rank = chartData.labels[index];
                const count = chartData.datasets[0].data[index];
                setMessage(`Rank ${rank}: ${count} reviews, And Total reviews: ${totalReviews}.`);
            }
        }
    };

    return (
        <div>
            <Info> 
                    ※ 분석결과를 확인하세요.
            </Info>
            <SentimentContainer>
                {data && (
                    <ChartWrapper>
                        <h3>Ranking Distribution:</h3>
                        <Bar data={chartData} options={options} />
                    </ChartWrapper>
                )}
                {message && (
                    <Message>{message}</Message>
                )}
                {error && (
                    <div>
                        <h3>Error:</h3>
                        <pre>{error}</pre>
                    </div>
                )}
            </SentimentContainer>
        </div>
    );
}

export default Sentiment;

const Info = styled.div`
    margin :20px 0 30px 25px;
    font-size: 18px;
    color: #333;
    text-align: left;
    font-weight: bold;
`;

const SentimentContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 750px;
    margin-left: 70px;
`;

const ChartWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
`;

const Message = styled.div`
    margin-top: 20px;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    color: red;
`;