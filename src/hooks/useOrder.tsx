import axios from "@lib/axios";
import { useDispatch, useSelector } from "@lib/index";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { setConfigData, setOrderData, setProductData } from "@redux/actions";
import { RootState } from "@redux/index";
import { toaster } from "@utils/helper";

const useOrder = () => {
  const config = useSelector((state: RootState) => state.config);
  const orderData = useSelector((state: RootState) => state.order);

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const productData = useSelector((state: RootState) => state.product);

  const getAddresses = () => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .get("address")
      .then(({ data }) => {
        dispatch(setOrderData({ addresses: data.data }));
      })
      .catch(console.log)
      .finally(() => dispatch(setConfigData({ isBtnLoading: false })));
  };

  const getOrders = (payload, canClear = false) => {
    dispatch(setOrderData({ loading: true, allLoading: canClear }));

    console.log(payload);

    axios
      .get("order/all", {
        params: {
          order_type: payload.order_type,
          order_status: payload.status,
        },
      })
      .then(({ data }) => {
        dispatch(
          setOrderData({
            orders: data.data,
          })
        );
      })
      .catch(console.log)
      .finally(() =>
        dispatch(setOrderData({ loading: false, allLoading: false }))
      );
  };

  const getOrderDetails = (orderId) => {
    dispatch(setOrderData({ loading: true }));

    axios
      .get(`order/${orderId}`)
      .then(({ data }) => {
        dispatch(setOrderData({ ordered_response: data.data }));
      })
      .catch(console.log)
      .finally(() => dispatch(setOrderData({ loading: false })));
  };

  const addAddress = (payload) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("address", payload)
      .then(({ data }) => {
        toaster(data.message);

        dispatch(setOrderData({ selected_address: data.data }));

        navigation.navigate("Checkout");
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

  const addReview = (payload) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("order/submit-review", payload)
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
      .finally(() => dispatch(setConfigData({ isBtnLoading: false })));
  };

  const placeOrder = () => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post("order/place-order", {
        sub_total: getSubtotal(),
        discount_amount: getTotalDiscount(),
        delivery_fee: 0,
        tax_amount: getTotalTax(),
        total_amount: getTotal(),
        order_type:
          productData.cart[0].product_type == "cylinder"
            ? "fuel"
            : productData.cart[0].product_type,
        shipping_address: orderData.selected_address.address,
        shipping_state: orderData.selected_address.state_name,
        shipping_city: orderData.selected_address.city_name,
        shipping_lga: orderData.selected_address.lga,
        shipping_postal_code: orderData.selected_address.postal_code,
        shipping_mobile_number: orderData.selected_address.mobile_number,
        cart: JSON.stringify(productData.cart),
      })
      .then(({ data }) => {
        toaster(data.message);
        dispatch(
          setOrderData({ ordered_response: data.data, order_status: true })
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

  const selectDeliveryAddress = (payload) => {
    dispatch(setOrderData({ selected_address: payload }));
  };

  const getSubtotal = () => {
    let subtotal = 0;

    for (const item of productData.cart) {
      subtotal += item.price * item.quantity;
    }

    return subtotal;
  };

  const getTotalTax = () => {
    let total = 0;

    for (const item of productData.cart) {
      total += item.tax_amount * item.quantity;
    }

    return total;
  };

  const getTotalDiscount = () => {
    let total = 0;

    for (const item of productData.cart) {
      total += item.discount_amount * item.quantity;
    }

    return total;
  };

  const getTotal = () => {
    return getSubtotal() - getTotalDiscount() + getTotalTax();
  };

  const clearCart = () => {
    dispatch(setProductData({ cart: [] }));
    dispatch(
      setOrderData({
        order_status: false,
        selected_address: {
          id: "",
          state_name: "",
          city_name: "",
          lga: "",
          postal_code: "",
          mobile_number: "",
          address: "",
        },
      })
    );
  };

  const clearHistory = () => {
    dispatch(
      setOrderData({
        orders: [],
        current_page: 1,
        last_page: 0,
      })
    );
  };

  return {
    config,
    orderData,
    getAddresses,
    addAddress,
    selectDeliveryAddress,
    getSubtotal,
    getTotalDiscount,
    getTotal,
    getTotalTax,
    placeOrder,
    clearCart,
    getOrders,
    getOrderDetails,
    clearHistory,
    addReview,
  };
};

export default useOrder;
