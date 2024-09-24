import { useEffect, useState } from 'react';
import axios from 'axios';

export const useCategories = () => {
    const [reference, setReference] = useState('출처');
    const [references, setReferences] = useState([]);
    const [mainCategory, setMainCategory] = useState('대분류');
    const [mainCategories, setMainCategories] = useState([]);
    const [subCategory, setSubCategory] = useState('중분류');
    const [subCategories, setSubCategories] = useState([]);
    const [detailCategory, setDetailCategory] = useState('소분류');
    const [detailCategories, setDetailCategories] = useState([]);

    useEffect(() => {
        const fetchReferences = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/reference`);
                setReferences(response.data);
            } catch (error) {
                console.error('Failed to fetch references:', error);
            }
        };
        fetchReferences();
    }, []);

    // 대분류
    useEffect(() => {
        if (reference === '출처' || reference === '0') return;

        const fetchBizMainCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/biz_main_category?reference_id=${reference}`);
                setMainCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch main categories:', error);
            }
        };

        const fetchClassificationMainCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/classification?reference_id=${reference}`);
                setMainCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch main categories:', error);
            }
        };

        const fetchBacMainCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/business_area_category?reference_id=${reference}`);
                setMainCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch main categories:', error);
            }
        };

        switch (reference) {
            case 1:
                fetchBizMainCategories();
                break;
            case 2:
                fetchClassificationMainCategories();
                break;
            case 3:
                fetchBacMainCategories();
                break;
            default:
                return;
        }
    }, [reference]);

    // 중분류
    useEffect(() => {
        if (reference === '출처' || mainCategory === '대분류' || mainCategory === '0') return;

        setSubCategories([]);

        const fetchBizSubCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/biz_sub_category?biz_main_category_id=${mainCategory}`);
                setSubCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch subcategories:', error);
            }
        };

        const fetchClassificationSubCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/classification/sub/?main_category_code=${mainCategory}`);
                setSubCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch subcategories:', error);
            }
        };

        const fetchBacSubCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/business_area_category/sub?main_category_code=${mainCategory}`);
                setSubCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch subcategories:', error);
            }
        };

        switch (reference) {
            case 1:
                fetchBizSubCategories();
                break;
            case 2:
                fetchClassificationSubCategories();
                break;
            case 3:
                fetchBacSubCategories();
                break;
            default:
                return;
        }
    }, [mainCategory, reference]);

    // 소분류
    useEffect(() => {
        if (reference === '출처' || subCategory === '중분류' || subCategory === '0') return;

        setDetailCategories([]);

        const fetchBizDetailCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/biz_detail_category?biz_sub_category_id=${subCategory}`);
                setDetailCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch detail categories:', error);
            }
        };

        const fetchClassificationDetailCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/classification/detail?sub_category_code=${subCategory}`);
                setDetailCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch detail categories:', error);
            }
        };

        const fetchBacDetailCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/business_area_category/detail?sub_category_code=${subCategory}`);
                setDetailCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch detail categories:', error);
            }
        };

        switch (reference) {
            case 1:
                fetchBizDetailCategories();
                break;
            case 2:
                fetchClassificationDetailCategories();
                break;
            case 3:
                fetchBacDetailCategories();
                break;
            default:
                return;
        }
    }, [subCategory, reference]);

    return {
        reference, setReference, references,
        mainCategory, setMainCategory, mainCategories,
        subCategory, setSubCategory, subCategories,
        detailCategory, setDetailCategory, detailCategories
    };
};
