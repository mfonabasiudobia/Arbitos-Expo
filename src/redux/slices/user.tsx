import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface userModel {
  company_name: any;
  company_email: any;
  company_address: any;
  wallet_balance?: any;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  password?: string;
  pin?: string;
  profile_image?: string;
  is_verified?: boolean;
  is_login?: boolean;
  user_virtual_banks?: any;
  beneficiary_accounts?: any;
  capital_balance?: any;
  fcm_token?: string;
  push_notification?: boolean;
  email_notification?: boolean;
  sms_notification?: boolean;
  temporary_token?: string;
}

const initialState: userModel = {
  first_name: '',
  last_name: '',
  username: '',
  company_name: '',
  company_address: '',
  company_email: '',
  fcm_token: '',
  email: '',
  password: '',
  profile_image: '',
  temporary_token: '',
  pin: '',
  is_verified: false,
  is_login: false,
  wallet_balance: 0,
  capital_balance: 0,
  user_virtual_banks: [],
  beneficiary_accounts: [],
  push_notification: true,
  email_notification: true,
  sms_notification: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<userModel>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {setUserData} = userSlice.actions;

export default userSlice.reducer;
