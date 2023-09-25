import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface transactionModel {
  loading?: boolean;
  history?: any;
  current_page?: any;
  last_page?: any;
}

const initialState: transactionModel = {
  loading: false,
  history: [],
  current_page: 1,
  last_page: 0,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactionData: (state, action: PayloadAction<transactionModel>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {setTransactionData} = transactionSlice.actions;

export default transactionSlice.reducer;
