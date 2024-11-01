import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, ChartDataLabels);

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
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const value = tooltipItem.raw;
                        const percentage = tooltipItem.label === '주거인구' ? loc_info_resident_percent : loc_info_work_pop_percent;
                        return `${tooltipItem.label}: ${value.toLocaleString()} (${percentage}%)`;
                    },
                },
            },
            datalabels: {
                color: '#222',
                font: {
                    size: 16, // 내부 라벨 크기 줄임
                    weight: '600',
                },
                formatter: (value, context) => {
                    const percentage = context.dataIndex === 0 ? loc_info_resident_percent : loc_info_work_pop_percent;
                    return `    ${percentage}%\n(${value.toLocaleString()})`;
                },
                anchor: 'start', // 내부 라벨 위치
                align: 'start',
            },
        },
        layout: {
            padding: {
                top: 16,
                bottom: 16,
                left: 16,
                right: 16
            }
        }
    };

    const externalLabelsPlugin = {
        id: 'external-labels',
        afterDatasetsDraw: (chart) => {
            const { ctx, data } = chart;
            const meta = chart.getDatasetMeta(0);
            ctx.save();
            ctx.font = 'bold 14px Arial'; // 외부 라벨 크기 줄임
            ctx.fillStyle = '#333';
            ctx.textAlign = 'center';

            meta.data.forEach((arc, index) => {
                const angle = Math.PI / 2 - arc.startAngle - (arc.endAngle - arc.startAngle) / 2;
                const radius = arc.outerRadius + 15; // 외부 라벨 위치 조정

                const x = arc.x + Math.cos(angle) * radius;
                const y = arc.y + Math.sin(angle) * radius;

                ctx.fillText(data.labels[index], x, y); // 외부 라벨 텍스트
            });

            ctx.restore();
        },
    };

    const plugins = [externalLabelsPlugin];

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
                {/* 도넛 차트 */}
                <div className="flex justify-center">
                    <div className="">
                        <Doughnut data={data} options={options} plugins={plugins} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopulationResidentWork;
