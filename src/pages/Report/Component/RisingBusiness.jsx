import React from 'react';

const RisingBusiness = ({ risingReportData, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!risingReportData || !risingReportData.nationwide_top5 || !risingReportData.sub_district_top3_data) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

    const { nationwide_top5, sub_district_top3_data } = risingReportData;
    const date = new Date(nationwide_top5[0].y_m);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return (
        <div className='bg-white p-4 rounded-md tracking-tight shadow-md shadow-black-500'>
            <h2 className="text-xl font-bold mb-4">최근 뜨는 점포업종은?</h2>
            
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{year}년 {month}월 전국 매출 증가 업종 TOP5</h3>
                {nationwide_top5.map((item, index) => (
                    <div key={item.rising_business_id} className="mb-2">
                        <p>
                            <span className="font-bold">{index + 1}. </span>
                            <span>{item.district_name} {item.sub_district_name} | </span>
                            <span>{item.biz_detail_category_name} </span>
                            <span className="font-bold text-red-500">{item.growth_rate.toFixed(1)}%</span>
                        </p>
                    </div>
                ))}
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">{year}년 {month}월 {sub_district_top3_data[0].sub_district_name} 매출 증가 업종 TOP3</h3>
                {sub_district_top3_data.map((item, index) => (
                    <div key={item.rising_business_id} className="mb-2">
                        <p>
                            <span className="font-bold">{index + 1}. </span>
                            <span>{item.biz_detail_category_name} </span>
                            <span className="font-bold text-red-500">{item.growth_rate.toFixed(1)}%</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RisingBusiness;