import React from 'react';

const RisingMenu = ({ risingMenuGPTData }) => {
    return (
        <div className='bg-white p-6 rounded-lg shadow-md space-y-6'>
            <div className=" pb-10">
                {/* <p className='text-blue-500 font-semibold'>1위</p>
                <p className='text-blue-500 font-semibold'>2위</p>
                <p className='text-blue-500 font-semibold'>3위</p>
                <p className='text-blue-500 font-semibold'>4위</p>
                <p className='text-blue-500 font-semibold'>5위</p> */}
                <div className="">
                    <p className='font-bold'>백쉐프의 조언 들어보세요~</p>
                    <p>{risingMenuGPTData}</p>
                </div>
            </div>
        </div>
    );
};

export default RisingMenu;