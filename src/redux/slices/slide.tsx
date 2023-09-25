import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface slideModel {
  loading?: boolean;
  homepage?: any;
}

const initialState: slideModel = {
  loading: false,
  homepage: [],
};

const slideSlice = createSlice({
  name: 'slide',
  initialState,
  reducers: {
    setSlideData: (state, action: PayloadAction<slideModel>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {setSlideData} = slideSlice.actions;

export default slideSlice.reducer;
