import React from 'react';

const LocInfoMovePop = ({ locInfoReportData, loading }) => {
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
                <p>매장 인근 (읍/면/동) 유동인구</p>
                <p>일 평균: ????명</p>
            </div>
        </div>
    );
};

export default LocInfoMovePop;