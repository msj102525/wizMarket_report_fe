import React from 'react';
const LocInfoAvgJscore = ({ locInfoAvgJscore, storeInfoRedux }) => {

    if (!locInfoAvgJscore) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">locInfoAvgJscore 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }


    const { city_name, district_name, sub_district_name, loc_info_data_ref_date } = storeInfoRedux;

    return (
        <div className='p-4 bg-[#0D161F] rounded-md tracking-tight shadow-md shadow-black-500'>
            <div className="py-2">
                <p className='text-white text-4xl pb-1 font-semibold'>입지분석: <span className='text-[#5BAB84] text-4xl font-extrabold'>{locInfoAvgJscore.loc_info_j_score_average}p</span></p>
                <p className='text-white text-md  pb-1'>{city_name} {district_name} {sub_district_name}</p>
                <p className='text-gray-400 text-xs  pb-1  font-thin'>'전자정부 상권정보' {loc_info_data_ref_date}</p>
                <p className='text-white text-xs  pb-2  font-thin'>ex) 전반적으로 사업하기 용이한 좋은 입지 조건을 지니고 있습니다.</p>
                <p className='text-gray-400 text-xs font-thin'>ex )전국기준 = <span className='text-green-800'>100% </span> 참고) 서초4동(강남역) = 9.03 / 10</p>
            </div>
        </div>
    );
};

export default LocInfoAvgJscore;