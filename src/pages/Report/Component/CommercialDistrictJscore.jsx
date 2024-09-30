import React from 'react';

const CommercialDistrictJscore = () => {
    return (
        <div className='p-4 bg-[#0D161F] rounded-md tracking-tight shadow-md shadow-black-500'>
            <div className="py-4">
                <p className='text-white text-3xl pb-1'>동네 상권은?: <span className='text-green-800'>0.0p</span></p>
                <p className='text-white text-md  pb-1'>시/도 시/군/구 읍/면/동</p>
                <p className='text-gray-400 text-xs  pb-1  font-thin'>'전자정부 상권정보' 2024년 1월</p>
                <p className='text-white text-xs  pb-2  font-thin'>전반적으로 사업하기 용이한 좋은 입지 조건을 지니고 있습니다.</p>
                <p className='text-gray-400 text-xs font-thin'>전국기준 = <span className='text-green-800'>100% </span> 참고) 서초4동(강남역) = 9.03 / 10</p>
            </div>
        </div>
    );
};

export default CommercialDistrictJscore;