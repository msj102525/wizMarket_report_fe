import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 비동기 thunk 생성
export const fetchStoreInfo = createAsyncThunk(
    'storeInfo/fetchStoreInfo',
    async (store_business_id, thunkAPI) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_FASTAPI_BASE_URL}/report/store/info/redux`,
                { params: { store_business_id } }
            );
            return response.data; // 성공 시 데이터 반환
        } catch (error) {
            // 에러가 발생하면 상태 코드와 메시지를 사용하여 에러를 반환
            return thunkAPI.rejectWithValue({
                message: error.response?.data?.message || 'Error occurred while fetching data.',
                status: error.response?.status || 500,
            });
        }
    }
);

// slice 생성
const storeInfoSlice = createSlice({
    name: 'storeInfo',
    initialState: {
        city_name: '',
        district_name: '',
        sub_district_name: '',
        detail_category_name: '',
        loc_info_data_ref_date: '',
        nice_biz_map_data_ref_date: '',
        population_data_ref_date: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStoreInfo.fulfilled, (state, action) => {
                state.loading = false; // 로딩 종료
                // 응답 데이터가 비어있지 않은지 확인 후 상태를 업데이트
                const {
                    city_name = '',
                    district_name = '',
                    sub_district_name = '',
                    detail_category_name = '',
                    loc_info_data_ref_date = '',
                    nice_biz_map_data_ref_date = '',
                    population_data_ref_date = ''
                } = action.payload || {};

                state.city_name = city_name;
                state.district_name = district_name;
                state.sub_district_name = sub_district_name;
                state.detail_category_name = detail_category_name;
                state.loc_info_data_ref_date = loc_info_data_ref_date;
                state.nice_biz_map_data_ref_date = nice_biz_map_data_ref_date;
                state.population_data_ref_date = population_data_ref_date;
            })
            .addCase(fetchStoreInfo.rejected, (state, action) => {
                state.loading = false; // 로딩 종료
                // 에러 메시지와 상태 코드를 상태에 설정
                state.error = action.payload.message || 'An error occurred.';
            });
    },
});

export default storeInfoSlice.reducer;
