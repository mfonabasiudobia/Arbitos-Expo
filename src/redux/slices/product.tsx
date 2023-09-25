import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {boolean} from 'yup';

interface productModel {
  products?: any;
  fuel_products?: any;
  featured_products?: any;
  loading?: boolean;
  details?: any;
  cart?: any;
}

const initialState: productModel = {
  products: [],
  fuel_products: [],
  featured_products: [],
  cart: [],
  loading: false,
  details: {
    id: '',
    ratings: [],
    price: 0,
    sale_price: 0,
    name: '',
    description: '',
    quantity: 0,
    ratings_avg_rate: null,
    ratings_count: 0,
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductData: (state, action: PayloadAction<productModel>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {setProductData} = productSlice.actions;

export default productSlice.reducer;
