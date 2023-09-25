import axios from "@lib/axios";
import { useDispatch, useSelector } from "@lib/index";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { setConfigData, setInvestmentData } from "@redux/actions";
import { RootState } from "@redux/index";
import { toaster } from "@utils/helper";

const useInvestment = () => {
  const config = useSelector((state: RootState) => state.config);
  const investmentData = useSelector((state: RootState) => state.investment);

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const getActiveInvestments = () => {
    dispatch(setInvestmentData({ loading: true }));

    axios
      .get("active-investments")
      .then(({ data }) => {
        dispatch(setInvestmentData({ investments: data.data }));
      })
      .catch(console.log)
      .finally(() => dispatch(setInvestmentData({ loading: false })));
  };

  const handleInvestmentRequest = (payload) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("invest", payload)
      .then(({ data }) => {
        toaster(data.message);

        navigation.navigate("Invest", {
          active: 1,
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

  const getInvestmentHistory = () => {
    dispatch(setInvestmentData({ loading: true }));

    axios
      .get("user-investments")
      .then(({ data }) => {
        dispatch(setInvestmentData({ history: data.data }));
      })
      .catch(console.log)
      .finally(() => dispatch(setInvestmentData({ loading: false })));
  };

  return {
    config,
    investmentData,
    getActiveInvestments,
    handleInvestmentRequest,
    getInvestmentHistory,
  };
};

export default useInvestment;
