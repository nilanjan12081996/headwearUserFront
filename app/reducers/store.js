'use client';

import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../reducers/AuthSlice';
import PwgnsSlice from '../reducers/PwgnsSlice';
import BlueConnectsSlice from '../reducers/BlueConnectsSlice';
import PlanSlice from '../reducers/PlanSlice'
import CoinSlice from '../reducers/CoinSlice'
import ProfileSlice from '../reducers/ProfileSlice'
import SearchHistroySlice from '../reducers/SearchHistroySlice'
import chatSlice from '../reducers/chatSlice'
import SupplierSlice from '../reducers/SupplierSlice'
import ProductSlice  from '../reducers/ProductSlice'
import HatBrandSlice  from '../reducers/HatBrandSlice'
import CartSlice from '../reducers/CartSlice'
import ArtWorkSlice from '../reducers/ArtWorkSlice'
import CheckoutSlice from '../reducers/CheckoutSlice'
import HatSearchSlice from '../reducers/CheckoutSlice'

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        pwg: PwgnsSlice,
        blueConnects: BlueConnectsSlice,
        planst: PlanSlice,
        coinData: CoinSlice,
        profile: ProfileSlice,
        his: SearchHistroySlice,
        cht:chatSlice,
        suppliers:SupplierSlice,
        prod:ProductSlice,
        hatBrand:HatBrandSlice,
        cart:CartSlice,
        art:ArtWorkSlice,
        check:CheckoutSlice,
        hatSearch: HatSearchSlice
    },
    devTools: process.env.NODE_ENV,
});

export default store;
