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

    const { resident, work_pop, resident_percentage, work_pop_percentage,
        //  city_name, district_name,
        sub_district_name } = populationResidentWorkPopReportData;

    // 도넛 차트 데이터 및 옵션 설정
    const data = {
        labels: ['주거인구', '근무인구'],
        datasets: [
            {
                label: '인구 분포',
                data: [resident, work_pop],
                backgroundColor: ['#1F77B4', '#FF7F0E'],
                borderColor: ['rgba(31, 119, 180, 1)', 'rgba(255, 127, 14, 1)'],
                borderWidth: 1,
                cutout: '80%', // 도넛의 중앙 원의 크기 (80%로 설정하여 얇게 보이게 함)
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // 레전드를 보이지 않게 설정
            },
            title: {
                display: false, // 타이틀을 보이지 않게 설정
            },
            labels: {
                display: false // 라벨을 보이지 않게 설정
            },
            datalabels: { // 데이터 레이블 스타일 설정
                color: '#000000', // 폰트 색상
                font: {
                    size: 20, // 폰트 크기
                    weight: 'bold', // 폰트 두께
                },
                formatter: (value) => {
                    return value; // 데이터 값을 표시
                },
                anchor: 'end', // 데이터 레이블의 기준점을 끝쪽으로 설정
                align: 'end',
            },
        },
    };

    // 주거인구와 근무인구의 비율에 따라 텍스트 결정
    const focusAreaText = resident_percentage > work_pop_percentage
        ? `${sub_district_name} 주거인구 중심지역입니다.`
        : `${sub_district_name} 직장인구 중심지역입니다.`;

    return (
        <div className='bg-white p-6 rounded-lg shadow-md space-y-6'>
            <div className="flex flex-col items-center">
                <div className="w-full">
                    <p className="text-md">{`${sub_district_name} 주거환경`}</p>
                    <p className="text-sm">{focusAreaText}</p>
                </div>
                <div className="w-full flex justify-center ">
                    <div className="w-full py-12">
                        <Doughnut data={data} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopulationResidentWork;
