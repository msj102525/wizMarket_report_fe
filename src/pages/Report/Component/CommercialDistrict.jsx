import React from 'react';
import formatDate from '../../../utils/formatDate';

const CommercialDistrict = ({ commercialDistrict, storeInfoRedux }) => {
    if (!commercialDistrict) {
        return (
            <div className="p-4 bg-white">
                <p className="text-red-500">commercialDistrict 데이터를 불러오는 중 오류가 발생했습니다</p>
            </div>
        );
    }

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

    const { district_name, sub_district_name, biz_detail_category_rep_name, nice_biz_map_data_ref_date } = storeInfoRedux;

    // 주요고객 섹션 표시 여부
    const showMainCustomers = commercial_district_average_sales_max_percent_client_top1 !== "-" && 
        commercial_district_average_sales_max_percent_client_top2 !== "-";

    // 매출비중 섹션 표시 여부
    const showSalesDistribution = commercial_district_average_sales_max_percent_weekday !== "-" && 
        commercial_district_average_sales_max_percent_time !== "-" && 
        commercial_district_average_sales_min_percent_weekday !== "-";

    // 점포당 매출규모 섹션 표시 여부
    const showSalesScale = commercial_district_national_average_sales !== 0 && 
        commercial_district_sub_district_average_sales !== 0 && 
        district_name;

    // 평균 결제단가/이용건수 섹션 표시 여부
    const showPaymentAndUsage = commercial_district_sub_district_average_payment !== 0 && 
        commercial_district_sub_district_usage_count !== 0;

    // 밀집도 섹션 표시 여부
    const showDensity = commercial_district_sub_district_density_average !== 0 && 
        commercial_district_national_density_average !== 0;

    // 모든 섹션이 숨겨진 경우 체크
    const noDataAvailable = !showMainCustomers && !showSalesDistribution && 
        !showSalesScale && !showPaymentAndUsage && !showDensity;

    if (noDataAvailable) {
        return (
            <div className="p-4 bg-white">
                <p className='text-md text-opacity-80 pb-4'>내 점포 사업 요약</p>
                <p className="text-center text-gray-500">상권분석 데이터가 없습니다.</p>
            </div>
        );
    }

    return (
        <div className='bg-white p-4'>
            <p className='text-md text-opacity-80 pb-4'>내 점포 사업 요약 <span className='text-xs text-opacity-80'>{formatDate(nice_biz_map_data_ref_date)}</span></p>

            {showMainCustomers && (
                <div className="py-4 text-right">
                    <p className='text-md font-semibold text-black text-opacity-70'>{sub_district_name} {biz_detail_category_rep_name} 주요고객</p>
                    <p className='text-2xl font-bold text-black text-opacity-70'>
                        {commercial_district_average_sales_max_percent_client_top1}, {commercial_district_average_sales_max_percent_client_top2}
                    </p>
                </div>
            )}

            {showSalesDistribution && (
                <div className="py-4 text-right">
                    <p className='text-md font-semibold text-black text-opacity-70'>{sub_district_name} {biz_detail_category_rep_name} 매출비중</p>
                    <p className='text-2xl font-bold text-black text-opacity-70'>
                        {`${commercial_district_average_sales_max_percent_weekday} ${commercial_district_average_sales_max_percent_time} `}
                        <span className='font-normal text-black text-opacity-70'>에 매출이 가장 높고</span>
                    </p>
                    <p className='text-2xl font-bold text-black text-opacity-70'>
                        {` ${commercial_district_average_sales_min_percent_weekday}`}
                        <span className='font-normal text-black text-opacity-70'> 매출이 가장 낮아요</span>
                    </p>
                </div>
            )}

            {showSalesScale && (
                <div className="py-4 text-right">
                    <p className='text-md font-semibold text-opacity-80 text-nowrap'>{sub_district_name} {biz_detail_category_rep_name} 점포당 매출규모</p>
                    <p className='text-xs font-normal text-black text-opacity-70'>
                        {commercial_district_national_average_sales > commercial_district_sub_district_average_sales
                            ? ` ${Math.round((commercial_district_national_average_sales - commercial_district_sub_district_average_sales) / 10000).toLocaleString()}만원 감소`
                            : ` ${Math.round((commercial_district_sub_district_average_sales - commercial_district_national_average_sales) / 10000).toLocaleString()}만원 증가`}
                    </p>
                    <p className='text-[2.5rem] font-bold text-black text-opacity-70'>{Math.round(commercial_district_sub_district_average_sales / 10000).toLocaleString()}만원</p>
                    <p className='text-sm text-black text-opacity-70'>
                        우리 동네는 {district_name} 다른 곳에 비해</p>
                    <p className='text-sm text-black text-opacity-70'>{commercial_district_sub_district_average_sales > commercial_district_national_average_sales
                        ? "장사가 잘되는 편입니다."
                        : "장사가 안되는 편입니다."}
                    </p>
                </div>
            )}

            {showPaymentAndUsage && (
                <div className="py-4 text-right">
                    <p className='text-md font-semibold text-opacity-80 whitespace-nowrap'>{sub_district_name} {biz_detail_category_rep_name} 평균 결제단가/이용건수</p>
                    <p className='text-xs font-normal text-black text-opacity-70'>
                        {commercial_district_national_average_payment > commercial_district_national_usage_count
                            ? ` 감소추세`
                            : ` 증가추세`}
                    </p>
                    <p className='text-[2.5rem] font-bold text-black text-opacity-70 '>{commercial_district_sub_district_average_payment.toLocaleString()}원</p>
                    <p className='text-xs text-black text-opacity-70'>우리 동네는 {district_name} 다른 동네에 비해
                        {commercial_district_national_average_payment > commercial_district_sub_district_average_payment
                            ? ` 객단가가 낮은 편입니다.`
                            : ` 객단가가 높은 편입니다.`}
                    </p>

                    <p className='text-sm text-black text-opacity-70'> 이용건수는 {commercial_district_sub_district_usage_count.toLocaleString()}건으로
                        {commercial_district_national_usage_count > 0 ? (
                            commercial_district_national_usage_count > commercial_district_sub_district_usage_count ? (
                                ` ${((commercial_district_national_usage_count - commercial_district_sub_district_usage_count) / commercial_district_national_usage_count * 100).toFixed(2)}% 감소하였습니다`
                            ) : (
                                ` ${((commercial_district_sub_district_usage_count - commercial_district_national_usage_count) / commercial_district_national_usage_count * 100).toFixed(2)}% 증가하였습니다`
                            )
                        ) : (
                            " 전국 평균 이용건수가 없습니다."
                        )}</p>
                </div>
            )}

            {showDensity && (
                <div className="py-4 text-right">
                    <p className='text-md font-semibold text-opacity-80'>{sub_district_name} {biz_detail_category_rep_name} 밀집도</p>
                    <p className='text-[2.5rem] font-bold text-black text-opacity-70'>{commercial_district_sub_district_density_average}%</p>
                    <p className='text-sm text-black text-opacity-70'>전국 평균 수치보다 {commercial_district_sub_district_density_average > commercial_district_national_density_average ? "높습니다." : "낮습니다."}</p>
                </div>
            )}
        </div>
    );
};

export default CommercialDistrict;