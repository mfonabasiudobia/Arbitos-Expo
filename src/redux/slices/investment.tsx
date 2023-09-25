import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface withdrawModel {
  investments?: any;
  loading?: boolean;
  history?: any;
}

const initialState: withdrawModel = {
  investments: [],
  loading: false,
  history: [],
};

const investmentSlice = createSlice({
  name: 'withdraw',
  initialState,
  reducers: {
    setInvestmentData: (state, action: PayloadAction<withdrawModel>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {setInvestmentData} = investmentSlice.actions;

export default investmentSlice.reducer;
