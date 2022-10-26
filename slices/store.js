import { configureStore } from '@reduxjs/toolkit'
import walletSlice from "./WalletSlice";

export default configureStore({
    reducer: {
        wallet: walletSlice
    },
})