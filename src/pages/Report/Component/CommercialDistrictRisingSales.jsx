import React from 'react';


const CommercialDistrictRisingSales = ({ commercialRisingSales, storeInfoRedux }) => {
    if (!commercialRisingSales) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">commercialRisingSales 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-6">
            <div className="pb-10">
                <h2 className="text-xl font-bold mb-4">최근 뜨는 점포업종은?</h2>
            </div>
        </div>
    );
};

export default CommercialDistrictRisingSales;
