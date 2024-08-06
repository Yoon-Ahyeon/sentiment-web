import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Service() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = () => {
        const apiUrl = import.meta.env.VITE_API_KEY; // Ensure this matches your Flask server URL

        axios.post(apiUrl)
            .then(response => {
                const ranks = response.data.RD_RANK;
                const rankCounts = countRanks(ranks); // Count occurrences of each rank
                setData(rankCounts);
                setError(null);
            })
            .catch(error => {
                console.error('There was an error making the POST request!', error);
                setError('An error occurred while fetching data. Please try again later.');
            });
    };

    // Function to count occurrences of each rank
    const countRanks = (ranks) => {
        const count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        ranks.forEach(rank => {
            if (count[rank] !== undefined) {
                count[rank]++;
            }
        });
        return count;
    };

    // Prepare data for the chart
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
        }
    };

    return (
        <div>
            <button onClick={handleSubmit}>Submit</button>
            {data && (
                <div>
                    <h3>Ranking Distribution:</h3>
                    <Bar data={chartData} options={options} />
                </div>
            )}
            {error && (
                <div>
                    <h3>Error:</h3>
                    <pre>{error}</pre>
                </div>
            )}
        </div>
    );
}

export default Service;



