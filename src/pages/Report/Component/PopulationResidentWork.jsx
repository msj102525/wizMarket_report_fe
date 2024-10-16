import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PopulationResidentWork = ({ populationResidentWorkPopReportData, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!populationResidentWorkPopReportData) {
        return (
            <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
        );
    }

    const { resident, work_pop, resident_percentage, work_pop_percentage, sub_district_name } = populationResidentWorkPopReportData;

    const total = resident + work_pop; // 총합 계산

    const data = {
        labels: ['주거인구', '직장인구'],
        datasets: [
            {
                label: '인구 분포',
                data: [resident, work_pop],
                backgroundColor: ['#1F77B4', '#FF7F0E'],
                borderColor: ['rgba(31, 119, 180, 1)', 'rgba(255, 127, 14, 1)'],
                borderWidth: 1,
                cutout: '80%',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            labels: {
                display: false,
            },
            datalabels: {
                color: '#222',
                font: {
                    size: 14,
                    weight: 'bold',
                },
                formatter: (value, context) => {
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `  ${percentage}%\n(${value})`;
                },
                anchor: 'start',
                align: 'start',
            },
        },
    };

    const focusAreaText = resident_percentage > work_pop_percentage
        ? `${sub_district_name}은 주거인구가 ${resident_percentage}%를 차지하는 주거중심지역입니다.`
        : `${sub_district_name}은 직장인구가 ${work_pop_percentage}%를 차지하는 직장중심지역입니다.`;

        return (
            <div className='bg-white p-6 rounded-lg shadow-md space-y-6'>
                <div className="flex flex-col items-center">
                    <div className="w-full">
                        <p className="text-md pb-2">{`${sub_district_name} 주거환경`}</p>
                        <p className="text-[12px]">{focusAreaText}</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        {/* 왼쪽 직장인구 텍스트 */}
                        <div className="text-center">
                            <p className="text-sm">직장인구</p>
                        </div>
                        {/* 도넛 차트 */}
                        <div className="w-2/3 flex justify-center">
                            <div className="w-full py-12">
                                <Doughnut data={data} options={options} />
                            </div>
                        </div>
                        {/* 오른쪽 주거인구 텍스트 */}
                        <div className="text-center">
                            <p className="text-sm">주거인구</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
    export default PopulationResidentWork;
