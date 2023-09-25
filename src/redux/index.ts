import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import configReducer from './slices/config';
import userReducer from './slices/user';
import withdrawReducer from './slices/withdraw';
import productReducer from "./slices/product";
import orderReducer from "./slices/order";
import transactionReducer from "./slices/transaction";
import slideReducer from "./slices/slide";
import investmentReducer from "./slices/investment";
import notificationReducer from "./slices/notification";

const store = configureStore({
  reducer: {
    config : configReducer,
    user : userReducer,
    withdraw : withdrawReducer,
    product : productReducer,
    order : orderReducer,
    transaction : transactionReducer,
    slide : slideReducer,
    investment : investmentReducer,
    notification : notificationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>


export default store;