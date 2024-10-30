import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const CommercialDistrictWeekdaySales = ({ commercialDistrictWeekdaySales }) => {
    if (!commercialDistrictWeekdaySales) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">commercialDistrictWeekdaySales 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const {
        commercial_district_average_sales_percent_mon,
        commercial_district_average_sales_percent_tue,
        commercial_district_average_sales_percent_wed,
        commercial_district_average_sales_percent_thu,
        commercial_district_average_sales_percent_fri,
        commercial_district_average_sales_percent_sat,
        commercial_district_average_sales_percent_sun
    } = commercialDistrictWeekdaySales;

    const weekdayValues = [
        commercial_district_average_sales_percent_mon,
        commercial_district_average_sales_percent_tue,
        commercial_district_average_sales_percent_wed,
        commercial_district_average_sales_percent_thu,
        commercial_district_average_sales_percent_fri,
        commercial_district_average_sales_percent_sat,
        commercial_district_average_sales_percent_sun
    ];

    const maxValue = Math.max(...weekdayValues);
    const minValue = Math.min(...weekdayValues);
    const maxIndex = weekdayValues.indexOf(maxValue);
    const minIndex = weekdayValues.indexOf(minValue);

    const weekdayLabels = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

    const data = {
        labels: weekdayLabels,
        datasets: [
            {
                label: '요일별 매출',
                data: weekdayValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(199, 199, 199, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
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
                <p className="text-md font-bold pb-2">요일별 매출 현황은 어떤가요?</p>
                <p className="text-sm text-gray-600">
                    {weekdayLabels[maxIndex]}의 매출이 {maxValue.toFixed(1)}%로 가장 높고,{' '}
                    {weekdayLabels[minIndex]}의 매출이 {minValue.toFixed(1)}%로 가장 낮습니다.
                </p>
                <div className="py-4 h-80">
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default CommercialDistrictWeekdaySales;