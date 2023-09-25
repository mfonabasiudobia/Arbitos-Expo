import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface withdrawModel {
  banks?: any;
  loading?: boolean;
  allLoading?: boolean;
  history?: any;
  account?: {
    account_name: string;
    account_number: number;
    bank_id: string;
    amount: number;
    is_save: boolean;
  };
  current_page?: any;
  last_page?: any;
}

const initialState: withdrawModel = {
  banks: [],
  loading: false,
  history: [],
  account: {
    account_name: '',
    account_number: 0,
    bank_id: '',
    amount: 0,
    is_save: false,
  },
  current_page: 1,
  last_page: 0,
  allLoading: false,
};

const withdrawSlice = createSlice({
  name: 'withdraw',
  initialState,
  reducers: {
    setWithdrawData: (state, action: PayloadAction<withdrawModel>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {setWithdrawData} = withdrawSlice.actions;

export default withdrawSlice.reducer;
