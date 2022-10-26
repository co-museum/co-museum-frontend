import {createSlice} from "@reduxjs/toolkit";

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        address: ''
    },
    reducers: {
        changeAddressState: (state, action) => {
            state.address = action.payload

            if(localStorage) {
                localStorage.setItem('address', action.payload)
            }

        }
    }
});

export const { changeAddressState } = walletSlice.actions

export default walletSlice.reducer