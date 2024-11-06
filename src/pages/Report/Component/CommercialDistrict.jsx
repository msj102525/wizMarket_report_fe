import React from 'react';

const CommercialDistrict = ({ commercialDistrict, storeInfoRedux }) => {
    if (!commercialDistrict) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">commercialDistrict 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

    // 필요한 데이터 추출
    const {
        commercial_district_national_density_average,
        commercial_district_sub_district_density_average,
        commercial_district_national_average_sales,
        commercial_district_sub_district_average_sales,
        commercial_district_national_average_payment,
        commercial_district_sub_district_average_payment,
        commercial_district_national_usage_count,
        commercial_district_sub_district_usage_count,
        commercial_district_average_sales_max_percent_weekday,
        commercial_district_average_sales_min_percent_weekday,
        commercial_district_average_sales_max_percent_time,
        commercial_district_average_sales_max_percent_client_top1,
        commercial_district_average_sales_max_percent_client_top2,
    } = commercialDistrict;

    const { district_name, sub_district_name, detail_category_name, nice_biz_map_data_ref_date } = storeInfoRedux;
    const date = new Date(nice_biz_map_data_ref_date);
    const month = date.getMonth() + 1;

    // 밀집도 비교 메시지 생성
    let densityMessage;
    if (commercial_district_sub_district_density_average > commercial_district_national_density_average) {
        densityMessage = "매장 개수는 많음";
    } else if (commercial_district_sub_district_density_average < commercial_district_national_density_average) {
        densityMessage = "매장 개수는 적음";
    } else {
        densityMessage = "매장 개수는 평균";
    }

    return (
        <div className='bg-white p-4'>
            <p className='text-sm text-opacity-80 pb-4'>{sub_district_name} {detail_category_name} 업종 상권분석</p>
            <p>틈나시면 우리 동네 상권분석 자료를 검토해보세요. 동네를 알면 장사를 잘 하실 수 있을겁니다.</p>

            <div className="py-4">
                <p className='text-md font-semibold text-opacity-80'>{sub_district_name} {detail_category_name} 밀집도</p>
                <p className='text-2xl font-semibold whitespace-nowrap'>{commercial_district_sub_district_density_average}%로 지역내 {densityMessage}</p>
                <p className='text-sm text-opacity-70'>전국 평균 수치보다 {commercial_district_sub_district_density_average > commercial_district_national_density_average ? "높습니다." : "낮습니다."}</p>
            </div>

            <div className="py-4">
                <p className='text-md font-semibold text-opacity-80'>{sub_district_name} {detail_category_name} 점포당 매출규모
                    <span className='text-xs font-normal text-opacity-70'>
                        {commercial_district_national_average_sales > commercial_district_sub_district_average_sales
                            ? ` ${Math.round((commercial_district_national_average_sales - commercial_district_sub_district_average_sales) / 10000).toLocaleString()}만원 감소`
                            : ` ${Math.round((commercial_district_sub_district_average_sales - commercial_district_national_average_sales) / 10000).toLocaleString()}만원 증가`}
                    </span>
                </p>
                <p className='text-2xl font-semibold'>{Math.round(commercial_district_sub_district_average_sales / 10000).toLocaleString()}만원</p>
                <p className='text-sm text-opacity-70'>
                    우리 동네는 {district_name} 다른 곳에 비해
                    {commercial_district_sub_district_average_sales > commercial_district_national_average_sales
                        ? "장사가 잘되는 편입니다."
                        : "장사가 안되는 편입니다."}
                </p>
            </div>

            <div className="py-4 ">
                <p className='text-md font-semibold text-opacity-80 whitespace-nowrap'>{sub_district_name} {detail_category_name} /평균 결제단가/이용건수
                    <span className='text-xs font-normal text-opacity-70'>
                        {commercial_district_national_average_payment > commercial_district_national_usage_count
                            ? ` 감소추세`
                            : ` 증가추세`}
                    </span>
                </p>
                <p className='text-2xl font-semibold'>{commercial_district_sub_district_average_payment.toLocaleString()}원</p>
                <p className='text-xs text-opacity-70'>
                    {month}월 이용건수는 {commercial_district_sub_district_usage_count.toLocaleString()}건으로
                    {commercial_district_national_usage_count > 0 ? (
                        commercial_district_national_usage_count > commercial_district_sub_district_usage_count ? (
                            ` ${((commercial_district_national_usage_count - commercial_district_sub_district_usage_count) / commercial_district_national_usage_count * 100).toFixed(2)}% 감소하였습니다`
                        ) : (
                            ` ${((commercial_district_sub_district_usage_count - commercial_district_national_usage_count) / commercial_district_national_usage_count * 100).toFixed(2)}% 증가하였습니다`
                        )
                    ) : (
                        " 전국 평균 이용건수가 없습니다."
                    )}
                </p>
            </div>
            {/*  */}

            <div className="py-4">
                <p className='text-md font-semibold text-opacity-80'>{sub_district_name} {detail_category_name} 매출비중</p>
                <p className='text-2xl font-bold text-opacity-70'>
                    {`${commercial_district_average_sales_max_percent_weekday} ${commercial_district_average_sales_max_percent_time}에
                    매출이 가장 높고 ${commercial_district_average_sales_min_percent_weekday}이 매출이 가장 낮아요.`}
                </p>
            </div>

            <div className="py-4">
                <p className='text-md font-semibold text-opacity-80'>{sub_district_name} {detail_category_name} 주요고객</p>
                <p className='text-2xl font-bold'>
                    {commercial_district_average_sales_max_percent_client_top1}, {commercial_district_average_sales_max_percent_client_top2}
                </p>
            </div>
        </div>
    );
};

export default CommercialDistrict;
