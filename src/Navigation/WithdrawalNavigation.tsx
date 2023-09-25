import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WithdrawalScreen from '@screens/Dashboard/Withdrawal';
import AuthorizeTransactionScreen from '@screens/Dashboard/Withdrawal/AuthorizeTransaction';
import TransactionStatusScreen from '@screens/Dashboard/Withdrawal/TransactionStatus';

const Stack = createNativeStackNavigator();

const WithdrawalNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="WithdrawalHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="WithdrawalHome" component={WithdrawalScreen} />
      <Stack.Screen
        name="AuthorizeTransaction"
        component={AuthorizeTransactionScreen}
      />
      <Stack.Screen
        name="TransactionStatus"
        component={TransactionStatusScreen}
      />
    </Stack.Navigator>
  );
};

export default React.memo(WithdrawalNavigator);
