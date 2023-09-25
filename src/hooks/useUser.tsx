import axios from "@lib/axios";
import axios_form from "@lib/axios_form";
import { useDispatch, useSelector } from "@lib/index";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { setConfigData, setUserData } from "@redux/actions";
import { RootState } from "@redux/index";
import { setToken, setUsername, toaster } from "@utils/helper";

const useUser = () => {
  const config = useSelector((state: RootState) => state.config);
  const userData = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleProfileUpdate = (data) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("update-profile", data)
      .then(({ data }) => {
        toaster(data.message);

        navigation.navigate("Profile");
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

  const handleCompanyInformationUpdate = (data) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("update-company-info", data)
      .then(({ data }) => {
        toaster(data.message);

        navigation.navigate("Profile");
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

  const handleNotificationUpdate = (payload) => {
    dispatch(setConfigData({ isPageLoading: true }));

    axios
      .post("update-notification-setting", payload)
      .then(({ data }) => {
        toaster(data.message);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toaster(error.response.data.message, "danger");
        } else {
          console.log(error);
        }
      })
      .finally(() => dispatch(setConfigData({ isPageLoading: false })));
  };

  const handleUploadProfileImage = (payload) => {
    dispatch(setConfigData({ isPageLoading: true }));
    const formData = new FormData();
    formData.append("profile_image", {
      uri: payload,
      type: "image/jpeg", // Adjust the image type based on your needs
      name: "profile.jpg", // Adjust the file name based on your needs
    });

    axios_form
      .post("upload-profile-image", formData)
      .then(({ data }) => {
        toaster(data.message);
        dispatch(setUserData(data.data));
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toaster(error.response.data.message, "danger");
        } else {
          console.log(error);
        }
      })
      .finally(() => dispatch(setConfigData({ isPageLoading: false })));
  };

  const handlePasswordReset = (data) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("reset-password", data)
      .then(({ data }) => {
        toaster(data.message);

        navigation.navigate("Profile");
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

  const handleDeleteAccount = () => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .delete("delete-account")
      .then(async ({ data }) => {
        await setToken("");
        await setUsername("");

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

  const handleLogout = () => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("auth/logout")
      .then(async ({ data }) => {
        await setToken("");
        await setUsername("");

        toaster(data.message, "success");

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      })
      .catch(async (error) => {
        toaster("You have logged out", "success");

        await setToken("");
        await setUsername("");

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      })
      .finally(() => dispatch(setConfigData({ isBtnLoading: false })));
  };

  return {
    config,
    userData,
    handleProfileUpdate,
    handleDeleteAccount,
    handleLogout,
    handlePasswordReset,
    handleUploadProfileImage,
    handleNotificationUpdate,
    handleCompanyInformationUpdate,
  };
};

export default useUser;
