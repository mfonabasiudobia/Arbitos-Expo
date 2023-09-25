import axios from "@lib/axios";
import { useDispatch, useSelector } from "@lib/index";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { setTransactionData } from "@redux/actions";
import { RootState } from "@redux/index";

const useTransaction = () => {
  const config = useSelector((state: RootState) => state.config);
  const transactionData = useSelector((state: RootState) => state.transaction);

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const getTransactionHistory = (payload) => {
    dispatch(setTransactionData({ loading: true }));

    axios
      .get("transaction-history", {
        params: {
          page: payload.page,
        },
      })
      .then(({ data }) => {
        dispatch(
          setTransactionData({
            history: data.data,
          })
        );
      })
      .catch(console.log)
      .finally(() => dispatch(setTransactionData({ loading: false })));
  };

  return {
    config,
    transactionData,
    getTransactionHistory,
  };
};

export default useTransaction;
