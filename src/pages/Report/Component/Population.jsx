import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import PopulationMetric from './PopulationMetric'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Population = ({ populationReportData, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!populationReportData) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

    const {
        sub_district_name,
        total_population,
        reference_date,
        age_under_10,
        age_10s,
        age_20s,
        age_30s,
        age_40s,
        age_50s,
        age_60_plus,
        male_population_percent,
        female_population_percent
    } = populationReportData.population_data;

    const {
        resident_jscore,
        work_pop_jscore,
        house_jscore,
        shop_jscore,
        income_jscore
    } = populationReportData.j_score_data;

    const {
        resident,
        work_pop,
        house,
        shop,
        income
    } = populationReportData.loc_info_data;

    const ageValues = [age_under_10, age_10s, age_20s, age_30s, age_40s, age_50s, age_60_plus];
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

    const date = new Date(reference_date);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}월`;

    const genderComparison = female_population_percent > male_population_percent
        ? '여성 인구가 더 많습니다.'
        : female_population_percent < male_population_percent
            ? '남성 인구가 더 많습니다.'
            : '여성과 남성 인구가 동일합니다.';


    return (
        <div className='bg-white px-2 py-6 rounded-lg shadow-md space-y-6'>
            <div>
                <p className="text-md">{sub_district_name} 인구분포({formattedDate} 기준)</p>
                <p className='text-sm text-gray-600'>
                    {sub_district_name}에는 총 인구 수 {total_population.toLocaleString()}명 중
                    여성 {female_population_percent}%, 남성 {male_population_percent}%로
                    {genderComparison}
                    또한 {ageLabels[maxIndex]}가 가장 많고 {ageLabels[minIndex]} 인구가 가장 적습니다.
                </p>
            </div>

            <div className="py-4 h-80">
                <Bar data={ageData} options={options} />
            </div>

            <div className="">
                <div className="flex justify-between text-center">
                    <PopulationMetric label="주거인구" value={resident} jScore={resident_jscore} />
                    <PopulationMetric label="직장인구" value={work_pop} jScore={work_pop_jscore} />
                    <PopulationMetric label="세대수" value={house} jScore={house_jscore} />
                    <PopulationMetric label="업소수" value={shop} jScore={shop_jscore} />
                    <PopulationMetric label="소득(만원)" value={Math.floor(income / 10000)} jScore={income_jscore} />
                </div>
            </div>
        </div>
    );
};

export default Population;
