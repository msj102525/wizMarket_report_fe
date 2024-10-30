import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import formatDate from '../../../utils/formatDate';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const LocInfoJScore = ({ locInfoReportData, storeInfoRedux }) => {
    if (!locInfoReportData) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">locInfoReportData 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const {
        loc_info_resident_j_score,
        loc_info_move_pop_j_score,
        loc_info_shop_j_score,
        loc_info_income_j_score,
        loc_info_average_spend_j_score,
        loc_info_average_sales_j_score,
        loc_info_house_j_score,
        population_mz_population_j_score,
    } = locInfoReportData;

    const labels = ['MZ 인구', '업소 수', '유동인구', '주거인구', '세대 수', '평균 소득', '평균 소비', '매장평균매출'];
    const scores = [
        population_mz_population_j_score,
        loc_info_shop_j_score,
        loc_info_move_pop_j_score,
        loc_info_resident_j_score,
        loc_info_house_j_score,
        loc_info_income_j_score,
        loc_info_average_spend_j_score,
        loc_info_average_sales_j_score,
    ];

    // 낮은 점수와 높은 점수를 나누기
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
                pointRadius: 4,
                pointBackgroundColor: 'rgba(232, 193, 160, 1)',
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
                display: false
            }
        }
    };

    const formattedDate = formatDate(storeInfoRedux.loc_info_data_ref_date);

    return (
        <div className='bg-white p-6 rounded-lg shadow-md space-y-6'>
            <div className="pb-10">
                <p className="text-md font-semibold">{storeInfoRedux.sub_district_name} 입지분석 ({formattedDate} 기준)</p>
                <div>
                    {lowScores.length > 0 && highScores.length > 0 ? (
                        <p className="text-sm font-medium text-gray-700">
                            {storeInfoRedux.sub_district_name}은 {lowScores.join(', ')}이 적고 {highScores.join(', ')}가 비교적 높은 편입니다.
                        </p>
                    ) : lowScores.length > 0 ? (
                        <p className="text-sm font-medium text-gray-700">{storeInfoRedux.sub_district_name}은 {lowScores.join(', ')}이 낮습니다.</p>
                    ) : highScores.length > 0 ? (
                        <p className="text-sm font-medium text-gray-700">{storeInfoRedux.sub_district_name}은 {highScores.join(', ')}이 비교적 높습니다.</p>
                    ) : (
                        <p>점수 정보가 부족합니다.</p>
                    )}
                </div>
                <div className="w-full h-80 div-underline">
                    <Radar data={data} options={options} />
                </div>
                <div className="text-sm text-gray-500 py-4">
                    <p>분석 및 조언</p>
                    <p>AI 조언.....</p>
                </div>
            </div>
        </div>
    );
};

export default LocInfoJScore;
