import React from 'react';
import formatDate from '../../../utils/formatDate';
import roundTo from '../../../utils/roundTo';
const LocInfoAvgJscore = ({ locInfoAvgJscoreReportData, loading }) => {

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!locInfoAvgJscoreReportData) {
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

    const { city_name, district_name, sub_district_name, sub_district_id, ref_date, weighted_avg_val } = locInfoAvgJscoreReportData;
    console.log(sub_district_id)
    const formattedDate = formatDate(ref_date);

    return (
        <div className='p-4 bg-[#0D161F] rounded-md tracking-tight shadow-md shadow-black-500'>
            <div className="py-4">
                <p className='text-white text-3xl pb-1'>입지분석: <span className='text-[#5BAB84] text-3xl font-extrabold'>{roundTo(weighted_avg_val, 1)}p</span></p>
                <p className='text-white text-md  pb-1'>{city_name} {district_name} {sub_district_name}</p>
                <p className='text-gray-400 text-xs  pb-1  font-thin'>'전자정부 상권정보' {formattedDate}</p>
                <p className='text-white text-xs  pb-2  font-thin'>ex) 전반적으로 사업하기 용이한 좋은 입지 조건을 지니고 있습니다.</p>
                <p className='text-gray-400 text-xs font-thin'>ex )전국기준 = <span className='text-green-800'>100% </span> 참고) 서초4동(강남역) = 9.03 / 10</p>
            </div>
        </div>
    );
};

export default LocInfoAvgJscore;