import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        kakaoAddressResult: '',
        roadAddress: '',
        administrativeAddress: '',
        cityName: '',
        districtName: '',
        subDistrictName: '',
    },
    reducers: {
        setKakaoAddressResult: (state, action) => {
            state.kakaoAddressResult = action.payload;
        },
        setRoadAddress: (state, action) => {
            state.roadAddress = action.payload;
        },
        setAdministrativeAddress: (state, action) => {
            state.administrativeAddress = action.payload;
        },
        setCitySel: (state, action) => {
            state.cityName = action.payload;
            state.districtName = '';
            state.subDistrictName = '';
        },
        setDistrictSel: (state, action) => {
            state.districtName = action.payload;
            state.subDistrictName = '';
        },
        setSubDistrictSel: (state, action) => {
            state.subDistrictName = action.payload;
        },
    },
});

export const {
    setRoadAddress,
    setAdministrativeAddress,
    setKakaoAddressResult,
    setCitySel,
    setDistrictSel,
    setSubDistrictSel
} = addressSlice.actions;

export default addressSlice.reducer;