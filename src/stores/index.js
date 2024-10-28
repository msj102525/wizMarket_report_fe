import { configureStore } from '@reduxjs/toolkit';
import addressReducer from './addressSlice';
import storeInfoReducer from './storeInfoSlice';

const store = configureStore({
    reducer: {
        address: addressReducer,
        storeInfo: storeInfoReducer,
    },
});

export default store;
