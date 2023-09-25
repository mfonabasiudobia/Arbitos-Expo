import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface notificationModel {
  loading?: boolean;
  history?: any;
}

const initialState: notificationModel = {
  loading: false,
  history: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationData: (state, action: PayloadAction<notificationModel>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {setNotificationData} = notificationSlice.actions;

export default notificationSlice.reducer;
