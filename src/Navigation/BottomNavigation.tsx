import HomeScreen from '@screens/Dashboard/Home';
import InvestmentScreen from '@screens/Dashboard/Investment';
import OtherScreen from '@screens/Dashboard/Others';
import StoreScreen from '@screens/Dashboard/Store';
import React from 'react';
import FuelHomeScreen from '@screens/Dashboard/Fuel';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import HomeDarkIcon from '/assets/svg/home-dark.svg';
import HomeLightIcon from '/assets/svg/home-light.svg';

import GasDarkIcon from '/assets/svg/gas-dark.svg';
import GasLightIcon from '/assets/svg/gas-light.svg';

import StoreDarkIcon from '/assets/svg/store-dark.svg';
import StoreLightIcon from '/assets/svg/store-light.svg';

import InvestDarkIcon from '/assets/svg/invest-dark.svg';
import InvestLightIcon from '/assets/svg/invest-light.svg';

import MoreDarkIcon from '/assets/svg/more-dark.svg';
import MoreLightIcon from '/assets/svg/more-light.svg';

import {useTheme, useColorMode} from 'native-base';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = () => {
  const theme = useTheme();
  const {colorMode} = useColorMode();

  return (
    <Tab.Navigator
      activeColor={colorMode === 'dark' ? '#9DB2CE' : '#010E0E'}
      inactiveColor="#9DB2CE"
      shifting={false}
      barStyle={{
        backgroundColor:
          colorMode === 'dark' ? theme.colors.trueGray[700] : '#fff',
        borderTopWidth: 1,
        borderTopColor: colorMode === 'dark' ? '#9DB2CE' : '#eee',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <HomeDarkIcon color={color} />
            ) : (
              <HomeLightIcon color={color} />
            ),
        }}
      />

      <Tab.Screen
        name="Buy Oil"
        component={FuelHomeScreen}
        options={{
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <GasDarkIcon color={color} />
            ) : (
              <GasLightIcon color={color} />
            ),
        }}
      />

      <Tab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <StoreDarkIcon color={color} />
            ) : (
              <StoreLightIcon color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Invest"
        component={InvestmentScreen}
        options={{
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <InvestDarkIcon color={color} />
            ) : (
              <InvestLightIcon color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="More"
        component={OtherScreen}
        options={{
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <MoreDarkIcon color={color} />
            ) : (
              <MoreLightIcon color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default React.memo(BottomNavigator);
