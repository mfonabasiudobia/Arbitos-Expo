import { useDispatch, useSelector } from "@lib/index";
import axios from "@lib/axios";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { setConfigData } from "@redux/actions";
import { RootState } from "@redux/index";

const useConfig = () => {
  const config = useSelector((state: RootState) => state.config);

  const dispatch = useDispatch();

  const getConfigData = () => {
    axios
      .get("config")
      .then(({ data }) => {
        dispatch(setConfigData({ data: data.data }));
      })
      .catch(console.log);
  };

  return {
    config,
    getConfigData,
  };
};

export default useConfig;
