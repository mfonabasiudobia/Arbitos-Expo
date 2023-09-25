import axios_form from "@lib/axios_form";
import { useDispatch, useSelector } from "@lib/index";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { setConfigData } from "@redux/actions";
import { RootState } from "@redux/index";
import { toaster } from "@utils/helper";

const useMarketing = () => {
  const config = useSelector((state: RootState) => state.config);

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleSubmitProposal = (payload) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    const formData = new FormData();

    formData.append("identification_image", {
      uri: payload.identification_image,
      type: "image/jpeg", // Adjust the image type based on your needs
      name: "profile.jpg", // Adjust the file name based on your needs
    });

    formData.append("state", payload.state);
    formData.append("address", payload.address);
    formData.append("mobile_number", payload.mobile_number);
    formData.append("identification_type", payload.identification_type);

    axios_form
      .post("marketing/submit-proposal", formData)
      .then(({ data }) => {
        toaster(data.message);

        navigation.navigate("Home");
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

  return {
    config,
    handleSubmitProposal,
  };
};

export default useMarketing;
