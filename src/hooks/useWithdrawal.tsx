import axios from "@lib/axios";
import { useDispatch, useSelector } from "@lib/index";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { setConfigData, setWithdrawData } from "@redux/actions";
import { RootState } from "@redux/index";
import { toaster } from "@utils/helper";

const useWithdrawal = () => {
  const config = useSelector((state: RootState) => state.config);
  const withdrawData = useSelector((state: RootState) => state.withdraw);

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const getAllbanks = () => {
    axios
      .get("banks")
      .then(({ data }) => {
        dispatch(setWithdrawData({ banks: data.data }));
      })
      .catch(console.log);
  };

  const handleWithdrawalRequest = (data) => {
    dispatch(setConfigData({ isPageLoading: true }));

    axios
      .post("withdraw/withdrawal-request", data)
      .then(({ data }) => {
        toaster(data.message);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "TransactionStatus" }],
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
      .finally(() => dispatch(setConfigData({ isPageLoading: false })));
  };

  const handleCapitalWithdraw = () => {
    dispatch(setConfigData({ isPageLoading: true }));

    axios
      .post("withdraw/capital-withdraw")
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

  const getWithdrawalHistory = (payload, canClear = false) => {
    dispatch(setWithdrawData({ loading: true, allLoading: canClear }));

    axios
      .get("withdrawal-history", {
        params: {
          page: payload.page,
          status: payload.status,
        },
      })
      .then(({ data }) => {
        dispatch(
          setWithdrawData({
            history: canClear
              ? data.data
              : [...withdrawData.history, ...data.data],
            current_page: data.data.current_page,
            last_page: data.data.last_page,
          })
        );
      })
      .catch(console.log)
      .finally(() =>
        dispatch(setWithdrawData({ loading: false, allLoading: false }))
      );
  };

  const clearHistory = () => {
    dispatch(
      setWithdrawData({
        history: [],
        current_page: 1,
        last_page: 0,
      })
    );
  };

  return {
    config,
    withdrawData,
    getAllbanks,
    handleWithdrawalRequest,
    getWithdrawalHistory,
    handleCapitalWithdraw,
    clearHistory,
  };
};

export default useWithdrawal;
