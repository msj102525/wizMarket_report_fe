import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const CommercialDistrictTimeSales = ({ commercialDistrictTimeSales }) => {
    if (!commercialDistrictTimeSales) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">commercialDistrictTimeSales 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const {
        commercial_district_average_sales_percent_06_09,
        commercial_district_average_sales_percent_09_12,
        commercial_district_average_sales_percent_12_15,
        commercial_district_average_sales_percent_15_18,
        commercial_district_average_sales_percent_18_21,
        commercial_district_average_sales_percent_21_24
    } = commercialDistrictTimeSales;

    const timeValues = [
        commercial_district_average_sales_percent_06_09 || 0.0,
        commercial_district_average_sales_percent_09_12 || 0.0,
        commercial_district_average_sales_percent_12_15 || 0.0,
        commercial_district_average_sales_percent_15_18 || 0.0,
        commercial_district_average_sales_percent_18_21 || 0.0,
        commercial_district_average_sales_percent_21_24 || 0.0
    ];

    const maxValue = Math.max(...timeValues);
    const minValue = Math.min(...timeValues);
    const maxIndex = timeValues.indexOf(maxValue);
    const minIndex = timeValues.indexOf(minValue);

    const timeLabels = ['06-09시', '09-12시', '12-15시', '15-18시', '18-21시', '21-24시'];

    const data = {
        labels: timeLabels,
        datasets: [
            {
                label: '시간대별 매출',
                data: timeValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            datalabels: {
                color: 'black',
                anchor: 'center',
                align: 'center',
                formatter: (value) => value.toFixed(1) + '%',
                font: {
                    size: 12,
                    weight: 'bold',
                },
                clamp: true,
            }
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0
                }
            },
            y: {
                beginAtZero: true,
                max: maxValue,
                ticks: {
                    callback: function (value) {
                        return value.toFixed(1) + '%';
                    }
                }
            }
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-6">
            <div className="">
                <p className="text-md font-bold pb-2">손님이 많이 방문하는 시간은요?</p>
                <p className="text-sm text-gray-600">
                    {timeLabels[maxIndex]}의 매출이 {maxValue.toFixed(1)}%로 가장 높고,{' '}
                    {timeLabels[minIndex]}의 매출이 {minValue.toFixed(1)}%로 가장 낮습니다.
                </p>
                <div className="py-4 h-80">
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default CommercialDistrictTimeSales;
