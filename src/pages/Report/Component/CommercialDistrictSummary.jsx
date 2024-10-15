import React from 'react';

const CommercialDistrictSummary = ({ commercialDistrictSummaryData }) => {

    if (!commercialDistrictSummaryData) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }
    return (
        <div className='bg-white p-6 rounded-lg shadow-md space-y-6'>
            <div className=" pb-10">
                <p>{commercialDistrictSummaryData}</p>
            </div>
        </div>
    );
};

export default CommercialDistrictSummary;