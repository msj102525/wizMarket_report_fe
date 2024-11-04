import React from 'react';

const StoreDescription = ({ storeDescription }) => {
    const storeDescriptionDummy = [
        {
            storeDescriptionTitle: 'Dummy 제철 보리새우 오도리 회 드디어 나왔습니다!',
            storeDescriptionContent: '횟감으로 치는 최고의 새우...? \n 정말 감히 우리 집에만 있다고 자부하는 제철 보리새우입니다. 저희 농장에서 정성들여 기른 최상품의 새우입니다. 팔딱팔딱 뛰어노는 신선함을 식당에서 맛보실 수 있습니다. 새우한테 미안한 맘 마저 들지만.. 너무 맛있어서 어쩔 수 없습니다!',
            storeDescriptionImgUrl: `${process.env.REACT_APP_FASTAPI_BASE_URL}/static/images/content/js001_00.png`
        },
        {
            storeDescriptionTitle: 'Dummy 가을 횟집 꼭 먹어야 하는 별미는?',
            storeDescriptionContent: null,
            storeDescriptionImgUrl: `${process.env.REACT_APP_FASTAPI_BASE_URL}/static/images/content/js001_01.png`
        },
        {
            storeDescriptionTitle: 'Dummy 백종원도 인정한 안면도 최고의 맛집',
            storeDescriptionContent: '안면도 횟집 털보선장 횟집.. \n 진짜 이곳의 해산물을 책임지는 선장님인 동시에 털보 선장의 횟집의 대표님이신 털보 선장.이곳은 JTBC양식의 양식이라는 프로그램에서 백종원 대표님이 간장게장의 전통을 연구하시면서 들렀던 곳 중 하나인데요, 염장 음식의 대표격인 젓갈 또한 맛깔나게 만드셔서 미식가들의 극찬을 받았던 바로 그곳입니다.',
            storeDescriptionImgUrl: null
        }
    ];

    return (
        <div className='bg-white p-4 shadow-md shadow-black-500'>
            {storeDescriptionDummy.map((item, index) => (
                <div key={index} className="pb-4 flex gap-2">
                    <div className="py-2.5 flex flex-col items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-[#7864F9] rounded-[50%]"></div>
                        <div className="w-[1px] h-full bg-[#EEE9FE]"></div>
                    </div>
                    <div className="">
                        <h2 className="text-lg font-bold mb-2">{item.storeDescriptionTitle}</h2>
                        {item.storeDescriptionContent && (
                            <p
                                className={` ${item.storeDescriptionImgUrl ? 'bg-[#7864F9] text-white px-2 py-4 text-sm rounded-xl' : 'py-2 font-medium'}`}
                                dangerouslySetInnerHTML={{
                                    __html: item.storeDescriptionContent.replace(/\n/g, '<br />')
                                }}
                            />
                        )}
                        {item.storeDescriptionImgUrl && (
                            <div className="rounded-xl overflow-hidden mt-2">
                                <img
                                    src={item.storeDescriptionImgUrl}
                                    alt={item.storeDescriptionTitle}
                                    className="block w-full h-auto"
                                />
                            </div>
                        )}
                    </div>

                </div>
            ))}
        </div>
    );
};

export default StoreDescription;
