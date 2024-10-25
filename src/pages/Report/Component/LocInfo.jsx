import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import formatDate from '../../../utils/formatDate';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const LocInfo = ({ locInfoReportData, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!locInfoReportData) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

    const { loc_info, data_ref } = locInfoReportData;

    const {
        mz_population_jscore,
        shop_jscore,
        move_pop_jscore,
        resident_jscore,
        house_jscore,
        income_jscore,
        spend_jscore,
        sales_jscore
    } = loc_info;

    const { sub_district_name, reference_date } = data_ref;

    const labels = ['MZ 인구', '업소 수', '유동인구', '주거인구', '세대 수', '평균 소득', '평균 소비', '매장평균매출'];
    const scores = [
        mz_population_jscore,
        shop_jscore,
        move_pop_jscore,
        resident_jscore,
        house_jscore,
        income_jscore,
        spend_jscore,
        sales_jscore
    ];

    // 5.0 기준으로 낮고 높은 항목 나누기
    const lowScores = labels.filter((_, i) => scores[i] < 5.0);
    const highScores = labels.filter((_, i) => scores[i] >= 5.0);

    const data = {
        labels,
        datasets: [
            {
                label: '입지 분석 점수',
                data: scores,
                backgroundColor: 'rgba(232, 193, 160, 0.2)',
                borderColor: 'rgba(232, 193, 160, 0.5)',
                borderWidth: 1,
                pointRadius: 4, // 각 데이터 포인트에 점을 표시
                pointBackgroundColor: 'rgba(232, 193, 160, 1)', // 점 색상 설정
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 0,
                suggestedMax: 10,
                pointLabels: {
                    display: true,
                },

                ticks: {
                    display: false,
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                display: false // 데이터 라벨 비활성화
            }
        }
    };

    const formattedDate = formatDate(reference_date);

    return (
        <div className='bg-white p-6 rounded-lg shadow-md space-y-6'>
            <div className="pb-10">
                <p className="text-md font-extrabold">{sub_district_name} 입지분석({formattedDate} 기준)</p>
                <div>
                    {lowScores.length > 0 && highScores.length > 0 ? (
                        <p className="text-sm font-medium text-gray-700">
                            {sub_district_name}은 {lowScores.join(', ')}이 적고 {highScores.join(', ')}가 비교적 높은 편입니다.
                        </p>
                    ) : lowScores.length > 0 ? (
                        <p className="text-sm font-medium text-gray-700">{sub_district_name}은 {lowScores.join(', ')}이 낮습니다.</p>
                    ) : highScores.length > 0 ? (
                        <p className="text-sm font-medium text-gray-700">{sub_district_name}은 {highScores.join(', ')}이 비교적 높습니다.</p>
                    ) : (
                        <p>점수 정보가 부족합니다.</p>
                    )}
                </div>
                <div className="w-full h-80 div-underline">
                    <Radar data={data} options={options} />
                </div>
                <div className="text-sm text-gray-500 py-4">
                    <p className=''>분석 및 조언</p>
                    <p>AI 조언.....</p>
                </div>
            </div>


        </div>
    );
};

export default LocInfo;
