import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PopulationResidentWork = ({ populationResidentWorkPopReportData, storeInfoRedux }) => {
    if (!populationResidentWorkPopReportData) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">storeInfo 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const { sub_district_name } = storeInfoRedux;
    const { loc_info_resident, loc_info_work_pop, loc_info_resident_percent, loc_info_work_pop_percent } = populationResidentWorkPopReportData;

    const data = {
        labels: ['주거인구', '직장인구'],
        datasets: [
            {
                label: '인구 분포',
                data: [loc_info_resident, loc_info_work_pop],
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
                    const percentage = context.dataIndex === 0 ? loc_info_resident_percent : loc_info_work_pop_percent;
                    return `    ${percentage}%\n(${value.toLocaleString()})`;
                },
                anchor: 'start',
                align: 'start',
            },
        },
    };

    const focusAreaText = loc_info_resident_percent > loc_info_work_pop_percent
        ? `${sub_district_name}은 주거인구가 ${loc_info_resident_percent}%를 차지하는 주거중심지역입니다.`
        : `${sub_district_name}은 직장인구가 ${loc_info_work_pop_percent}%를 차지하는 직장중심지역입니다.`;

    return (
        <div className='bg-white p-4 rounded-lg shadow-md space-y-6'>
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
