import { useDispatch, useSelector } from "@lib/index";
import axios from "@lib/axios";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { setConfigData, setUserData } from "@redux/actions";
import { RootState } from "@redux/index";
import { setToken, setUsername, toaster } from "@utils/helper";
import { useState } from "react";

const useAuth = () => {
  const config = useSelector((state: RootState) => state.config);
  const userData = useSelector((state: RootState) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleRegistration = (data) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("auth/register", data)
      .then(({ data }) => {
        const { user } = data.data;

        dispatch(setUserData(user));

        navigation.navigate("OtpVerification", {
          verificationType: "REGISTER",
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toaster(error.response.data.message, "danger");
        } else {
          console.log(error);
        }
      })
      .finally(() => dispatch(setConfigData({ isBtnLoading: false })));
  };

  const resendOtp = () => {
    axios
      .post("auth/resend-otp", {
        email: userData.email,
      })
      .then(({ data }) => {
        toaster(data.message);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toaster(error.response.data.message, "danger");
        } else {
          console.log(error);
        }
      });
  };

  const handleSendPasswordResetToken = (params) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("auth/send-password-reset", params)
      .then(({ data }) => {
        navigation.navigate("OtpVerification", {
          verificationType: "FORGOT_PASSWORD",
          email: params.email,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toaster(error.response.data.message, "danger");
        } else {
          console.log(error);
        }
      })
      .finally(() => dispatch(setConfigData({ isBtnLoading: false })));
  };

  const handlePasswordReset = (params) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("auth/reset-password", {
        ...params,
        email: userData.email,
        temporary_token: userData.temporary_token,
      })
      .then(({ data }) => {
        toaster(data.message);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toaster(error.response.data.message, "danger");
        } else {
          console.log(error);
        }
      })
      .finally(() => dispatch(setConfigData({ isBtnLoading: false })));
  };

  const handleLogin = (data) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("auth/login", data)
      .then(async ({ data }) => {
        const { token, user } = data.data;

        dispatch(setUserData(user));
        if (user.is_verified && user.username && user.is_pin_set) {
          await setToken(token);
          await setUsername(user.username);

          toaster("Login Successful");

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "BottomTab" }],
            })
          );
        } else if (user.is_verified && !user.username && !user.is_pin_set) {
          await setToken("");
          await setUsername("");

          navigation.navigate("CreateUsername");
        } else if (user.is_verified && user.username && !user.is_pin_set) {
          await setToken("");
          await setUsername("");

          navigation.navigate("PinSetup");
        } else {
          await setToken("");
          await setUsername("");

          navigation.navigate("OtpVerification", {
            verificationType: "REGISTER",
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toaster(error.response.data.message, "danger");
        } else {
          console.log(error);
        }
      })
      .finally(() => dispatch(setConfigData({ isBtnLoading: false })));
  };

  const handleOTPVerification = (params, type) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("auth/otp-verification", params)
      .then(({ data }) => {
        toaster(data.message);
        if (type === "REGISTER") {
          dispatch(setUserData(data.data));
          navigation.navigate("CreateUsername");
        } else if (type === "RESET_SECURITY_PIN") {
          navigation.navigate("ResetSecurityPin");
        } else if (type === "FORGOT_PASSWORD") {
          dispatch(
            setUserData({
              email: data.data.email,
              temporary_token: data.data.temporary_token,
            })
          );

          navigation.navigate("ResetPassword");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toaster(error.response.data.message, "danger");
        } else {
          console.log(error);
        }
      })
      .finally(() => dispatch(setConfigData({ isBtnLoading: false })));
  };

  const handleCreateUsername = (data) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("auth/create-username", {
        ...data,
        temporary_token: userData.temporary_token,
      })
      .then(({ data }) => {
        toaster(data.message);
        dispatch(setUserData(data.data));
        navigation.navigate("PinSetup");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toaster(error.response.data.message, "danger");
        } else {
          console.log(error);
        }
      })
      .finally(() => dispatch(setConfigData({ isBtnLoading: false })));
  };

  const handleCreateSecurityPin = (data) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("auth/create-security-pin", {
        ...data,
        temporary_token: userData.temporary_token,
      })
      .then(async ({ data }) => {
        await setToken(data.data.token);
        await setUsername(data.data.user.username);

        dispatch(setUserData(data.data.user));

        toaster("Login Successful");

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "BottomTab" }],
          })
        );
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toaster(error.response.data.message, "danger");
        } else {
          console.log(error);
        }
      })
      .finally(() => dispatch(setConfigData({ isBtnLoading: false })));
  };

  const handlePinVerification = (data) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("auth/pin-verification", data)
      .then(async ({ data }) => {
        toaster("Successful!");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "BottomTab" }],
          })
        );
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toaster(error.response.data.message, "danger");
        } else {
          console.log(error);
        }
      })
      .finally(() => dispatch(setConfigData({ isBtnLoading: false })));
  };

  const initializeUser = () => {
    axios
      .get("auth/user")
      .then(async ({ data }) => {
        if (data.status) {
          dispatch(setUserData({ ...data.data, is_login: true }));
        }
      })
      .catch(console.log)
      .finally(() => dispatch(setConfigData({ isFullyInitialized: true })));
  };

  return {
    handleLogin,
    handleRegistration,
    handleTogglePassword,
    showPassword,
    config,
    userData,
    handleOTPVerification,
    handleCreateUsername,
    handleCreateSecurityPin,
    initializeUser,
    handlePinVerification,
    resendOtp,
    handleSendPasswordResetToken,
    handlePasswordReset,
  };
};

export default useAuth;
