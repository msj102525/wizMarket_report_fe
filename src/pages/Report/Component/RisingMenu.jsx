import React from 'react';

const RisingMenu = ({ risingMenu, storeInfoRedux }) => {

    if (!risingMenu) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">risingMenu 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    const { local_store_top5_orderd_menu, rising_menu_advice } = risingMenu;

    console.log(risingMenu);


    return (
        <div className='bg-white p-4 rounded-lg shadow-md space-y-6'>
            <p className='text-md font-semibold'>{storeInfoRedux.detail_category_name} 매장에서 가장 많이 주문하는 메뉴?</p>
            <div className="">
                <p className='text-blue-600 text-md font-semibold py-1'>1위
                    <span className='text-black text-md font-semibold'> {local_store_top5_orderd_menu.detail_category_top1_ordered_menu}</span>
                </p>
                <p className='text-blue-600 text-md font-semibold py-1'>2위
                    <span className='text-black text-md font-semibold'> {local_store_top5_orderd_menu.detail_category_top2_ordered_menu}</span>
                </p>
                <p className='text-blue-600 text-md font-semibold py-1'>3위
                    <span className='text-black text-md font-semibold'> {local_store_top5_orderd_menu.detail_category_top3_ordered_menu}</span>
                </p>
                <p className='text-blue-600 text-md font-semibold py-1'>4위
                    <span className='text-black text-md font-semibold'> {local_store_top5_orderd_menu.detail_category_top4_ordered_menu}</span>
                </p>
                <p className='text-blue-600 text-md font-semibold py-1'>5위
                    <span className='text-black text-md font-semibold'> {local_store_top5_orderd_menu.detail_category_top5_ordered_menu}</span>
                </p>

                <div className="">
                    <p className='font-bold py-2'>백쉐프의 조언 들어보세요~</p>
                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: rising_menu_advice.replace(/\n/g, "<br />") }}></p>
                </div>
            </div>
        </div>
    );
};

export default RisingMenu;