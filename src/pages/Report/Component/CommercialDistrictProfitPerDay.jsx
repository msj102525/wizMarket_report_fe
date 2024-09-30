import React from 'react';

const CommercialDistrictProfitPerDay = ({ locInfoReportData, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // if (!locInfoReportData) {
    //     return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    // }


    return (
        <div className='bg-white p-6 rounded-lg shadow-md space-y-6'>
            <div className=" pb-10">
                <p>읍/면/동 소분류 요일별 매출 현황</p>
                <p>막대 그래프</p>
            </div>
        </div>
    );
};

export default CommercialDistrictProfitPerDay;