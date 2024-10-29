import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';  // 플러그인 추가
import PopulationMetric from './PopulationMetric';
import formatDate from '../../../utils/formatDate';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);  // 플러그인 등록

const Population = ({ populationReportData, storeInfoRedux }) => {
    if (!populationReportData) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">populationReportData 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    if (!populationReportData) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

    const {
        population_total,
        population_male_percent,
        population_female_percent,
        population_age_10_under,
        population_age_10s,
        population_age_20s,
        population_age_30s,
        population_age_40s,
        population_age_50s,
        population_age_60_over,
        loc_info_resident_k,
        loc_info_work_pop_k,
        loc_info_move_pop_k,
        loc_info_shop_k,
        loc_info_income_won,
        loc_info_resident_j_score,
        loc_info_work_pop_j_score,
        loc_info_move_pop_j_score,
        loc_info_shop_j_score,
        loc_info_income_j_score
    } = populationReportData;

    const ageValues = [
        population_age_10_under,
        population_age_10s,
        population_age_20s,
        population_age_30s,
        population_age_40s,
        population_age_50s,
        population_age_60_over
    ];
    const maxValue = Math.max(...ageValues);
    const minValue = Math.min(...ageValues);
    const maxIndex = ageValues.indexOf(maxValue);
    const minIndex = ageValues.indexOf(minValue);

    const ageLabels = ['10세 미만', '10대', '20대', '30대', '40대', '50대', '60세 이상'];

    const ageData = {
        labels: ageLabels,
        datasets: [
            {
                label: '연령대별 인구',
                data: ageValues,
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
                formatter: (value) => value.toLocaleString(),
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
                        return value.toLocaleString();
                    }
                }
            }
        }
    };

    const genderComparison = population_female_percent > population_male_percent
        ? '여성 인구가 더 많습니다.'
        : population_female_percent < population_male_percent
            ? '남성 인구가 더 많습니다.'
            : '여성과 남성 인구가 동일합니다.';

    return (
        <div className='bg-white px-2 py-6 rounded-lg shadow-md space-y-6'>
            <div>
                <p className="text-md font-bold">{storeInfoRedux.sub_district_name} 인구분포 ({formatDate(storeInfoRedux.population_data_ref_date)} 기준)</p>
                <p className='text-sm text-gray-600'>
                    총 인구 수 {population_total.toLocaleString()}명 중 여성 {population_female_percent}%, 남성 {population_male_percent}%로 {genderComparison}
                    또한 {ageLabels[maxIndex]}가 가장 많고 {ageLabels[minIndex]} 인구가 가장 적습니다.
                </p>
            </div>

            <div className="py-4 h-80">
                <Bar data={ageData} options={options} />
            </div>

            <div className="">
                <div className="flex justify-between text-center">
                    <PopulationMetric label="주거인구" value={loc_info_resident_k} jScore={loc_info_resident_j_score} />
                    <PopulationMetric label="직장인구" value={loc_info_work_pop_k} jScore={loc_info_work_pop_j_score} />
                    <PopulationMetric label="유동인구" value={loc_info_move_pop_k} jScore={loc_info_move_pop_j_score} />
                    <PopulationMetric label="업소수" value={loc_info_shop_k} jScore={loc_info_shop_j_score} />
                    <PopulationMetric label="소득(만원)" value={loc_info_income_won} jScore={loc_info_income_j_score} />
                </div>
            </div>
        </div>
    );
};

export default Population;
