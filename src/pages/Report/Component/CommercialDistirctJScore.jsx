import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const CommercialDistrictJScore = ({ commercialDistrictJscore, storeInfoRedux }) => {
    if (!commercialDistrictJscore) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">commercialDistrictJscore 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const {
        commercial_district_market_size_j_socre,
        commercial_district_average_sales_j_socre,
        commercial_district_usage_count_j_socre,
        commercial_district_sub_district_density_j_socre,
        commercial_district_sub_average_payment_j_socre
    } = commercialDistrictJscore;

    const labels = ['시장규모', '평균매출', '이용건수', '점포밀도', '평균결제금액'];
    const scores = [
        commercial_district_market_size_j_socre,
        commercial_district_average_sales_j_socre,
        commercial_district_usage_count_j_socre,
        commercial_district_sub_district_density_j_socre,
        commercial_district_sub_average_payment_j_socre
    ];

    // 낮은 점수와 높은 점수를 나누기
    const lowScores = labels.filter((_, i) => scores[i] < 3.0);
    const highScores = labels.filter((_, i) => scores[i] >= 3.0);

    const data = {
        labels,
        datasets: [
            {
                label: '상권 분석 점수',
                data: scores,
                backgroundColor: 'rgba(244, 117, 96, 0.25)',
                borderColor: 'rgba(244, 117, 96, 1)',
                borderWidth: 1,
                pointRadius: 4,
                pointBackgroundColor: 'rgba(244, 117, 96, 1)',
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                grid: {
                    circular: true,
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 10,
                pointLabels: {
                    display: true,
                    font: {
                        size: 12
                    },
                    padding: 20
                },
                ticks: {
                    display: false,
                    stepSize: 2
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
        },
    };


    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-6">
            <div className="pb-10">
                <p className="text-md font-semibold py-4">{storeInfoRedux.sub_district_name} {storeInfoRedux.biz_detail_category_rep_name} 상권분석</p>
                <div>
                    {lowScores.length > 0 && highScores.length > 0 ? (
                        <p className="text-lg text-opacity-70">
                            {storeInfoRedux.sub_district_name}은 {lowScores.join(', ')}이 적고 {highScores.join(', ')}가 비교적 높은 편입니다.
                        </p>
                    ) : lowScores.length > 0 ? (
                        <p className="text-lg text-opacity-70">{storeInfoRedux.sub_district_name}은 {lowScores.join(', ')}이 낮습니다.</p>
                    ) : highScores.length > 0 ? (
                        <p className="text-lg text-opacity-70">{storeInfoRedux.sub_district_name}은 {highScores.join(', ')}이 비교적 높습니다.</p>
                    ) : (
                        <p>점수 정보가 부족합니다.</p>
                    )}
                </div>
                <div className="w-full h-80">
                    <Radar data={data} options={options} />
                </div>
                {/* <div className="text-sm text-gray-500 pt-4">
                    <div className="flex justify-center">
                        <div className="w-6 h-auto">
                            <img src={require('../../../assets/component/advice_icon.png')} alt="Wiz-advice_icon" className='block w-full h-auto' />
                        </div>
                    </div>
                    <p className='text-md font-bold py-2'>분석 및 조언</p>
                    <p className="text-lg">AI 조언.....</p>
                </div> */}
            </div>
        </div>
    );
};

export default CommercialDistrictJScore;