import React from 'react';

const CommercialDistrict = ({ commercialDistrictReport, storeInfoRedux }) => {

    if (!commercialDistrictReport) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">commercialDistrictReport 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }



    return (
        <div className='bg-white p-4 rounded-lg shadow-md space-y-6'>
            <p className='text-md font-semibold'> 업종 상권분석</p>

        </div>
    );
};

export default CommercialDistrict;