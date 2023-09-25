import axios from "@lib/axios";
import { useDispatch, useSelector } from "@lib/index";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { setNotificationData } from "@redux/actions";
import { RootState } from "@redux/index";

const useNotification = () => {
  const config = useSelector((state: RootState) => state.config);
  const notificationData = useSelector(
    (state: RootState) => state.notification
  );

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const getNotification = () => {
    dispatch(setNotificationData({ loading: true }));

    axios
      .get("notifications")
      .then(({ data }) => {
        dispatch(setNotificationData({ history: data.data }));
      })
      .catch(console.log)
      .finally(() => dispatch(setNotificationData({ loading: false })));
  };

  return {
    config,
    notificationData,
    getNotification,
  };
};

export default useNotification;
