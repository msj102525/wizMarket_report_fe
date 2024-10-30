import React from 'react';

const CommercialDistrictRisingSales = ({ commercialRisingSales, storeInfoRedux }) => {
    if (!commercialRisingSales) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">commercialRisingSales 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const { nice_biz_map_data_ref_date, detail_category_name, sub_district_name } = storeInfoRedux;
    const date = new Date(nice_biz_map_data_ref_date);
    const month = date.getMonth() + 1;

    const salesData = [
        { rank: 1, data: commercialRisingSales.commercial_district_detail_category_average_sales_top1_info },
        { rank: 2, data: commercialRisingSales.commercial_district_detail_category_average_sales_top2_info },
        { rank: 3, data: commercialRisingSales.commercial_district_detail_category_average_sales_top3_info },
        { rank: 4, data: commercialRisingSales.commercial_district_detail_category_average_sales_top4_info },
        { rank: 5, data: commercialRisingSales.commercial_district_detail_category_average_sales_top5_info },
    ];

    const [rank1District] = salesData[0].data ? salesData[0].data.split(",") : ["정보없음"];
    const [rank2District] = salesData[1].data ? salesData[1].data.split(",") : ["정보없음"];
    const [rank3District] = salesData[2].data ? salesData[2].data.split(",") : ["정보없음"];

    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-6">
            <div className="flex flex-col gap-4">
                <h2 className="text-sm text-black text-opacity-80">
                    {month}월 우리지역에서 {detail_category_name} 가장 잘 되는 곳은?
                </h2>
                <p className="text-2xl font-semibold">{rank1District}, {rank2District}, {rank3District}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <p className="text-gray-700 text-sm">순위</p>
                <p className="text-gray-700 text-sm">지역</p>
                <p className="text-gray-700 text-sm">매출</p>
            </div>
            <div className="divide-y divide-gray-200">
                {salesData.map((item, index) => {
                    const [districtName, sales] = item.data ? item.data.split(",") : ["정보없음", "0"];
                    const formattedSales = (parseInt(sales, 10) / 10000).toFixed(0);

                    // 해당 행을 sub_district_name과 비교하여 bold 처리
                    const isHighlighted = districtName === sub_district_name;
                    const textStyle = isHighlighted ? "text-gray-700 text-sm font-semibold" : "text-gray-700 text-sm";

                    return (
                        <div key={index} className="grid grid-cols-3 gap-4 py-2">
                            <p className={textStyle}>{item.rank}</p>
                            <p className={textStyle}>{districtName}</p>
                            <p className={textStyle}>{formattedSales}만원</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CommercialDistrictRisingSales;
