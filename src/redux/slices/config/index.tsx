import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface configModel {
  isDarkMode?: boolean;
  hideWallet?: boolean;
  isBtnLoading?: boolean;
  isFullyInitialized?: boolean;
  isPageLoading?: boolean;
  data?: any;
}

const initialState: configModel = {
  isDarkMode: false,
  hideWallet: false,
  isBtnLoading: false,
  isFullyInitialized: false,
  isPageLoading: false,
  data: {
    banners: [],
    config: {
      app_url_android: '',
      app_url_ios: '',
      app_minimum_version_android: '',
      app_minimum_version_ios: '',
      terms_and_condition_url: '',
      privacy_policy_url: '',
      about_us_url: '',
      help_and_support_url: '',
    },
    cylinders: [],
  },
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfigData: (state, action: PayloadAction<configModel>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {setConfigData} = configSlice.actions;

export default configSlice.reducer;
