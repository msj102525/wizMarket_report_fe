import { configureStore } from '@reduxjs/toolkit';
import addressReducer from './addressSlice';

const store = configureStore({
    reducer: {
        address: addressReducer,
    },
});

export default store;
