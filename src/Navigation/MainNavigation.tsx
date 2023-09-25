import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPassword from '@screens/Auth/ForgotPassword';
import ResetPassword from '@screens/Auth/ForgotPassword/ResetPassword';
import LoginScreen from '@screens/Auth/Login';
import OtpVerification from '@screens/Auth/OtpVerification';
import RegisterScreen from '@screens/Auth/Register';
import CreateUsername from '@screens/Auth/Register/CreateUsername';
import PinConfirmation from '@screens/Auth/Register/PinConfirmation';
import PinSetup from '@screens/Auth/Register/PinSetup';
import WelcomeBackScreen from '@screens/Auth/WelcomeBack';
import VirtualAccounts from '@screens/Dashboard/Deposit/VirtualAccounts';
import OnboardingScreen from '@screens/Onboarding';
import React from 'react';
import BottomNavigation from './BottomNavigation';
import WithdrawalNavigation from './WithdrawalNavigation';

import CartScreen from '@screens/Dashboard/Orders/Cart';
import CheckoutScreen from '@screens/Dashboard/Orders/Checkout';
import OrderHistoryScreen from '@screens/Dashboard/Orders/OrderHistory';
import OrderReceiptScreen from '@screens/Dashboard/Orders/OrderReceipt';
import TransactionHistoryScreen from '@screens/Dashboard/Orders/TransactionHistory';
import WithdrawalHistoryScreen from '@screens/Dashboard/Orders/WithdrawalHistory';

import FuelBuyScreen from '@screens/Dashboard/Fuel/Buy';

import UserNotificationScreen from '@screens/Dashboard/Notification';

import AddAddressScreen from '@screens/Dashboard/Orders/AddAddress';

import AboutUsScreen from '@screens/Dashboard/Others/About';
import BecomeOurMarketerScreen from '@screens/Dashboard/Others/BecomeOurMarketer';
import MyCompanyInfoScreen from '@screens/Dashboard/Others/MyCompanyInfo';
import ProfileScreen from '@screens/Dashboard/Others/Profile';
import ReferralScreen from '@screens/Dashboard/Others/Referrals';

import AccountSecurityScreen from '@screens/Dashboard/Others/Profile/AccountSecurity';
import EditProfileScreen from '@screens/Dashboard/Others/Profile/EditProfile';
import SettingScreen from '@screens/Dashboard/Others/Profile/Settings';
import SupportScreen from '@screens/Dashboard/Others/Profile/Support';

import LegalScreen from '@screens/Dashboard/Others/Profile/Legal';
import PrivacyPolicyScreen from '@screens/Dashboard/Others/Profile/Legal/PrivacyPolicy';
import TermsScreen from '@screens/Dashboard/Others/Profile/Legal/Terms';

import ProductDescriptionScreen from '@screens/Dashboard/Store/ProductDescription';

import InvestmentPaymentScreen from '@screens/Dashboard/Investment/InvestmentPayment';
import FeaturedProductScreen from '@screens/Dashboard/Store/FeaturedProducts';

import useAuth from '@hooks/useAuth';
import ConfirmResetSecurityPinScreen from '@screens/Dashboard/Others/Profile/AccountSecurity/ConfirmResetSecurityPin';
import SecurityPinOtpVerificationScreen from '@screens/Dashboard/Others/Profile/AccountSecurity/OtpVerification';
import ResetPasswordScreen from '@screens/Dashboard/Others/Profile/AccountSecurity/ResetPassword';
import ResetSecurityPinScreen from '@screens/Dashboard/Others/Profile/AccountSecurity/ResetSecurityPin';
import DeleteAccountScreen from '@screens/Dashboard/Others/Profile/Settings/DeleteAccount';
import NotificationScreen from '@screens/Dashboard/Others/Profile/Settings/Notification';
import {getUsername, saveFCMToken} from '@utils/helper';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const {initializeUser, config} = useAuth();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);

  React.useLayoutEffect(() => {
    initializeUser();
  }, [config.isBtnLoading, config.isPageLoading]);

  React.useLayoutEffect(() => {
    const handleGetUsername = async () => {
      const username = await getUsername();

      setIsAuthenticated(username ? true : false);
      setIsInitialized(true);
    };

    handleGetUsername();
  }, []);

  React.useEffect(() => {
    saveFCMToken();
  }, []);

  if (!isInitialized) return null;

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'WelcomeBack' : 'Onboarding'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTab" component={BottomNavigation} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="WelcomeBack" component={WelcomeBackScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="CreateUsername" component={CreateUsername} />
      <Stack.Screen name="PinSetup" component={PinSetup} />
      <Stack.Screen name="PinConfirmation" component={PinConfirmation} />
      <Stack.Screen name="VirtualAccounts" component={VirtualAccounts} />
      <Stack.Screen
        name="WithdrawalNavigation"
        component={WithdrawalNavigation}
      />
      <Stack.Screen
        name="UserNotification"
        component={UserNotificationScreen}
      />

      <Stack.Screen name="BuyFuel" component={FuelBuyScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderReceipt" component={OrderReceiptScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistoryScreen}
      />
      <Stack.Screen
        name="WithdrawalHistory"
        component={WithdrawalHistoryScreen}
      />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
      <Stack.Screen
        name="BecomeOurMarketer"
        component={BecomeOurMarketerScreen}
      />
      <Stack.Screen name="MyCompanyInfo" component={MyCompanyInfoScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="Referral" component={ReferralScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="AccountSecurity" component={AccountSecurityScreen} />
      <Stack.Screen name="Legal" component={LegalScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen
        name="ProductDescription"
        component={ProductDescriptionScreen}
      />
      <Stack.Screen name="FeaturedProduct" component={FeaturedProductScreen} />
      <Stack.Screen
        name="InvestmentPayment"
        component={InvestmentPaymentScreen}
      />
      <Stack.Screen
        name="ResetPasswordSetting"
        component={ResetPasswordScreen}
      />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen
        name="SecurityPinOtpVerification"
        component={SecurityPinOtpVerificationScreen}
      />
      <Stack.Screen
        name="ResetSecurityPin"
        component={ResetSecurityPinScreen}
      />
      <Stack.Screen
        name="ConfirmResetSecurityPin"
        component={ConfirmResetSecurityPinScreen}
      />
    </Stack.Navigator>
  );
};

export default React.memo(MainNavigator);
