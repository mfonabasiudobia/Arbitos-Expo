import { NavigationContainer } from "@react-navigation/native";
import { setConfigData } from "@redux/slices/config";
import { RootState } from "@src/redux";
import { theme } from "@theme";
import {
  colorModeManager,
  requestUserPermission,
  notificationListener,
} from "@utils/helper";
import { NativeBaseProvider, Text } from "native-base";
import React, { useEffect, useMemo } from "react";
import { KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MainNavigator from "./src/Navigation/MainNavigation";
import { PageLoader } from "@components";
import useConfig from "@hooks/useConfig";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();

  const { getConfigData, config } = useConfig();

  useEffect(() => {
    requestUserPermission();

    notificationListener();

    getConfigData();
  }, []);

  useEffect(() => {
    const getDataFromAsyncStorage = async () => {
      try {
        const storedData = await colorModeManager.get();
        dispatch(
          setConfigData({ isDarkMode: storedData === "dark" ? true : false })
        );
        setIsLoading(false);
      } catch (e) {
        console.log("Error retrieving data from AsyncStorage: ", e);
      }
    };

    getDataFromAsyncStorage();
  }, []);

  const newTheme = useMemo(() => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        background: config.isDarkMode ? "#333333" : "#fff",
      },
      config: {
        ...theme.config,
        initialColorMode: config.isDarkMode ? "dark" : "light",
      },
    };
  }, [config.isDarkMode]);

  if (isLoading) return null;

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={config.isDarkMode ? "#333333" : "#fff"}
        translucent={false}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled={true}
        style={{ flex: 1 }}
      >
        <NativeBaseProvider theme={newTheme}>
          <NavigationContainer theme={newTheme}>
            <PageLoader isOpen={config.isPageLoading} />
            <MainNavigator />
          </NavigationContainer>
        </NativeBaseProvider>
      </KeyboardAvoidingView>
    </>
  );
};

export default React.memo(App);
