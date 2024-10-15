import React from 'react';

const RisingBusiness = ({ risingReportData, loading }) => {

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }


    if (!risingReportData) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

    const { nationwide_top5 = [], sub_district_top3_data = [] } = risingReportData;
    const date = nationwide_top5.length > 0 ? new Date(nationwide_top5[0].y_m) : null;
    const year = date ? date.getFullYear() : null;
    const month = date ? date.getMonth() + 1 : null;

    return (
        <div className='bg-white p-4 rounded-md tracking-tight shadow-md shadow-black-500'>
            <div className="pb-10">
                <h2 className="text-xl font-bold mb-4">최근 뜨는 점포업종은?</h2>
                {nationwide_top5.length > 0 ? (
                    <div className="mb-6">
                        <p className='text-sm text-gray-500'>{year}년 {month}월</p>
                        <h3 className="text-lg font-semibold pb-2">전국 매출 증가 업종 TOP5</h3>
                        {nationwide_top5.map((item, index) => (
                            <div key={item.rising_business_id} className="pb-2 flex justify-between gap-4">
                                <p className='text-md truncate'>
                                    <span className="font-bold text-blue-500">{index + 1}. </span>
                                    <span>{item.district_name} {item.sub_district_name} | </span>
                                    <span>{item.biz_detail_category_name}</span>
                                </p>
                                <p>
                                    <span className="font-bold text-blue-500">{item.growth_rate.toFixed(1)}%</span>
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="">Top5 데이터 오류</div>
                )}

                {sub_district_top3_data.length > 0 ? (
                    <div className='div-underline'>
                        <p className='text-sm text-gray-500'>{year}년 {month}월</p>
                        <h3 className="text-lg font-semibold pb-2">
                            {sub_district_top3_data[0].sub_district_name} 매출 증가 업종 TOP3
                        </h3>
                        {sub_district_top3_data.map((item, index) => (
                            <div key={item.rising_business_id} className="pb-2 flex justify-between">
                                <p className='text-md'>
                                    <span className="font-bold text-blue-500">{index + 1}. </span>
                                    <span>{item.biz_detail_category_name === "소분류없음" ? '뜨는 업종이 없습니다.' : item.biz_detail_category_name}</span>
                                </p>
                                <p>
                                    <span className="font-bold text-blue-500">{item.growth_rate.toFixed(1)}%</span>
                                </p>
                            </div>
                        ))}
                    </div>
                ): (
                    <div className="">Top3 데이터 오류</div>
                )}

            </div>
            <div className="text-sm text-gray-500">
                <p className='pb-5'>분석 및 조언</p>
                <p>AI 조언.....</p>
            </div>
        </div>
    );
};

export default RisingBusiness;
