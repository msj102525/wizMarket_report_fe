import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommonInformation from "./Component/CommonInformation";
import StoreInfo from "./Component/StoreInfo";
import RisingBusiness from "./Component/RisingBusiness";
import LocInfo from "./Component/LocInfo";
import Population from "./Component/Population";

const Report = () => {
    const { store_business_id } = useParams();
    const [commonReportData, setCommonReportData] = useState([]);
    const [risingReportData, setRisingReportData] = useState(null);
    const [populationReportData, setPopulationReportData] = useState(null);

    const [loadingCommon, setLoadingCommon] = useState(true);
    const [loadingRising, setLoadingRising] = useState(true);
    const [loadingPopulation, setLoadingPopulation] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const commonInfoResponse = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/report/info/common`);
                // console.log(commonInfoResponse.data)
                setCommonReportData(commonInfoResponse.data);
                setLoadingCommon(false);

                const risingBusinessResponse = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/report/rising`, {
                    params: {
                        store_business_id: store_business_id
                    }
                });
                // console.log(risingBusinessResponse.data);
                setRisingReportData(risingBusinessResponse.data);
                setLoadingRising(false);

                const populationReportData = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/report/population`, {
                    params: {
                        store_business_id: store_business_id
                    }
                });
                console.log(populationReportData.data);
                setPopulationReportData(populationReportData.data);
                setLoadingPopulation(false);

            } catch (err) {
                setError(err);
                setLoadingCommon(false);
                setLoadingPopulation(false);
            }
        };

        fetchReportData();
    }, [store_business_id]);

    if (error) {
        return <p>보고서 데이터를 가져오는 중 오류가 발생했습니다: {error.message}</p>;
    }

    return (
        <main className="report bg-gray-100 max-w-[394px] flex justify-center">
            <div className="w-full">
                <section className="mb-4">
                    <StoreInfo store_business_id={store_business_id} />
                </section>
                <section className="p-2 mb-4">
                    <RisingBusiness risingReportData={risingReportData} loading={loadingRising} />
                </section>
                <section className="p-2">
                    {loadingCommon ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        commonReportData.map((commonReport) => (
                            <div className="py-2" key={commonReport.common_information_id}>
                                <CommonInformation commonReport={commonReport} />
                            </div>
                        ))
                    )}
                </section>
                <section className="p-2 mb-4">
                    <LocInfo store_business_id={store_business_id} />
                </section>
                <section className="p-2 mb-4">
                    <Population populationReportData={populationReportData} loading={loadingPopulation} />
                </section>
            </div>
        </main>
    );
};

export default Report;