import React from 'react';

const CommercialDistirctJScore = ({ commercialDistrictJscore, storeInfoRedux }) => {
    if (!commercialDistrictJscore) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">commercialDistrictJscore 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }


    return (
        <div className='bg-white p-6 rounded-lg shadow-md space-y-6'>
            <div className=" pb-10">
                <p>상권분석</p>
                <p>레이더 그래프</p>
            </div>
        </div>
    );
};

export default CommercialDistirctJScore;