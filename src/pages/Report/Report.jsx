import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommonInformation from "./Component/CommonInformation";
import StoreInfo from "./Component/StoreInfo";
import RisingBusiness from "./Component/RisingBusiness";
import LocInfoAvgJscore from "./Component/LocInfoAvgJscore";
import LocInfo from "./Component/LocInfo";
import Population from "./Component/Population";
import CommercialDistrictJscore from "./Component/CommercialDistrictJscore";
import LocInfoResidentWork from "./Component/LocInfoResidentWork";
import LocInfoMovePop from "./Component/LocInfoMovePop";
import LocInfoStrategy from "./Component/LocInfoStrategy";
import CommercialDistirct from "./Component/CommercialDistirct";
import CommercialDistrictProfitPerDay from "./Component/CommercialDistrictProfitPerDay";
import CommercialDistrictProfitPerTime from "./Component/CommercialDistrictProfitPerTime";

const Report = () => {
    const { store_business_id } = useParams();
    const [commonReportData, setCommonReportData] = useState(null);
    const [risingReportData, setRisingReportData] = useState(null);
    const [populationReportData, setPopulationReportData] = useState(null);
    const [locInfoReportData, setLocInfoReportData] = useState(null);
    const [locInfoAvgJscoreReportData, setLocInfoAvgJscoreReportData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [
                    risingResponse,
                    commonResponse,
                    populationResponse,
                    locInfoResponse,
                    locInfoAvgJscoreResponse,
                ] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/report/rising`, { params: { store_business_id } }),
                    axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/report/info/common`),
                    axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/report/population`, { params: { store_business_id } }),
                    axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/info`, { params: { store_business_id } }),
                    axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/report/location/average/jscore`, { params: { store_business_id } }),
                ]);

                setRisingReportData(risingResponse.data);
                setCommonReportData(commonResponse.data);
                setPopulationReportData(populationResponse.data);
                setLocInfoReportData(locInfoResponse.data);
                setLocInfoAvgJscoreReportData(locInfoAvgJscoreResponse.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [store_business_id]);

    const renderSection = (Component, data, loading, error, componentName, additionalProps = {}) => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
                </div>
            );
        }
        if (error) {
            return (
                <div className="p-4 bg-white">
                    <p className="text-red-500">'{componentName}' 에서 데이터를 불러오는 중 오류가 발생했습니다: {error}</p>
                </div>
            );
        }
        return <Component {...data} {...additionalProps} />;
    };

    return (
        <main className="report bg-gray-100 max-w-[394px] flex justify-center">
            <div className="w-full">
                <section className="pb-4">
                    <StoreInfo store_business_id={store_business_id} />
                </section>
                <section className="p-2 pb-4">
                    {renderSection(RisingBusiness, { risingReportData }, loading, error, 'RisingBusiness')}
                </section>
                <section className="p-2">
                    {!error && !loading && commonReportData.map((commonReport) => (
                        <div className="py-2" key={commonReport.common_information_id}>
                            {renderSection(CommonInformation, { commonReport }, false, null, 'CommonInformation')}
                        </div>
                    ))}
                    {(loading || error) && renderSection(CommonInformation, {}, loading, error, 'CommonInformation')}
                </section>
                <section className="p-2 pb-4">
                    {renderSection(LocInfoAvgJscore, { locInfoAvgJscoreReportData }, loading, error, 'LocInfoAvgJscore')}
                </section>
                <section className="p-2 pb-4">
                    {renderSection(Population, { populationReportData }, loading, error, 'Population')}
                </section>
                <section className="p-2 pb-4">
                    {renderSection(LocInfo, { locInfoReportData }, loading, error, 'LocInfo')}
                </section>
                <section className="p-2 pb-4">
                    <LocInfoResidentWork />
                </section>
                <section className="p-2 pb-4">
                    <LocInfoMovePop />
                </section>
                <section className="p-2 pb-4">
                    <LocInfoStrategy />
                </section>
                <section className="p-2 pb-4">
                    <CommercialDistrictJscore />
                </section>
                <section className="p-2 pb-4">
                    <CommercialDistirct />
                </section>
                <section className="p-2 pb-4">
                    <CommercialDistrictProfitPerDay />
                </section>
                <section className="p-2 pb-4">
                    <CommercialDistrictProfitPerTime />
                </section>
            </div>
        </main>
    );
};

export default Report;
