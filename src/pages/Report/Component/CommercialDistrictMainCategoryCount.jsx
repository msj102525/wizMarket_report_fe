import React from 'react';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';
import formatDate from '../../../utils/formatDate';

ChartJS.register(ArcElement, ChartDataLabels);

const CommercialDistrictMainCategoryCount = ({ commercialDistrictMainCategoryCountData, storeInfoRedux }) => {
    if (!commercialDistrictMainCategoryCountData) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">storeInfo 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const {
        commercial_district_food_business_count,
        commercial_district_healthcare_business_count,
        commercial_district_education_business_count,
        commercial_district_entertainment_business_count,
        commercial_district_lifestyle_business_count,
        commercial_district_retail_business_count
    } = commercialDistrictMainCategoryCountData;

    const dataValues = [
        commercial_district_food_business_count,
        commercial_district_healthcare_business_count,
        commercial_district_education_business_count,
        commercial_district_entertainment_business_count,
        commercial_district_lifestyle_business_count,
        commercial_district_retail_business_count
    ];

    const dataLabels = ['음식점', '의료/건강', '학문/교육', '여가/오락', '생활서비스', '소매/유통'];
    
    const maxIndex = dataValues.indexOf(Math.max(...dataValues));
    const minIndex = dataValues.indexOf(Math.min(...dataValues));

    const mostCommonCategory = dataLabels[maxIndex];
    const leastCommonCategory = dataLabels[minIndex];

    const data = {
        labels: dataLabels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: [
                    '#FFF5EB',
                    '#F16913',
                    '#FD8D3C',
                    '#FDA26B',
                    '#FDD0A2',
                    '#FEE6C2'
                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            datalabels: {
                formatter: (value) => value,
                color: '#000',
                font: {
                    weight: '',
                    size: 14
                },
                align: 'center',
                anchor: 'center',
                offset: 0,
                display: true
            }
        },
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 40,
                bottom: 40,
                left: 40,
                right: 40
            }
        }
    };

    const secondPlugin = {
        id: 'second-datalabels',
        afterDatasetsDraw: (chart) => {
            const { ctx, data } = chart;
            const meta = chart.getDatasetMeta(0);

            ctx.save();
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';

            meta.data.forEach((arc, index) => {
                const model = arc;
                const angle = Math.PI / 2 - model.startAngle - (model.endAngle - model.startAngle) / 2;
                const radius = model.outerRadius + 20;

                const x = model.x + Math.cos(angle - 1.6) * radius;
                const y = model.y - Math.sin(angle - 1.6) * radius;

                ctx.fillStyle = '#333';
                ctx.fillText(data.labels[index], x, y);
            });

            ctx.restore();
        }
    };

    const plugins = [secondPlugin];

    const formattedDate = formatDate(storeInfoRedux.nice_biz_map_data_ref_date);

    return (
        <div className='bg-white p-4 rounded-lg shadow-md space-y-6'>
            <div>
                <p className="text-md font-semibold mb-4">{storeInfoRedux.sub_district_name} 업종별 분포 ({formattedDate} 기준)</p>
                <p className='text-sm text-gray-800'>
                    {storeInfoRedux.sub_district_name}은 {mostCommonCategory} 업종이 가장 많고 {leastCommonCategory} 업종이 가장 적게 분포합니다.
                </p>
            </div>
            <div className="h-64">
                <Pie data={data} options={options} plugins={plugins} />
            </div>
        </div>
    );
};

export default CommercialDistrictMainCategoryCount;
