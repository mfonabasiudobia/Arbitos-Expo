import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {boolean} from 'yup';

interface orderModel {
  loading?: boolean;
  allLoading?: boolean;
  addresses?: any;
  selected_address?: any;
  order_status?: boolean;
  ordered_response?: any;
  orders?: any;
  current_page?: any;
  last_page?: any;
}

const initialState: orderModel = {
  addresses: [],
  orders: [],
  loading: false,
  selected_address: {
    id: '',
    state_name: '',
    city_name: '',
    lga: '',
    postal_code: '',
    mobile_number: '',
    address: '',
  },
  order_status: false,
  ordered_response: {
    total_amount: 0,
    sub_total: 0,
    discount_amount: 0,
    delivery_fee: 0,
    tax_amount: 0,
    payment_status: '',
    order_status: '',
    items: [],
  },
  current_page: 1,
  last_page: 0,
  allLoading: false,
};

const orderSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setOrderData: (state, action: PayloadAction<orderModel>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {setOrderData} = orderSlice.actions;

export default orderSlice.reducer;
