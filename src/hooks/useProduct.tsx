import axios from "@lib/axios";
import { useDispatch, useSelector } from "@lib/index";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { setConfigData, setProductData } from "@redux/actions";
import { RootState } from "@redux/index";
import { toaster } from "@utils/helper";

const useProduct = () => {
  const config = useSelector((state: RootState) => state.config);
  const productData = useSelector((state: RootState) => state.product);

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const getProducts = (payload) => {
    dispatch(setProductData({ loading: true }));

    axios
      .get("product", {
        params: {
          is_featured: payload.is_featured,
          product_type: payload.product_type,
          search: payload.search,
        },
      })
      .then(({ data }) => {
        if (payload.is_featured) {
          dispatch(setProductData({ featured_products: data.data }));
        } else if (payload.product_type === "fuel") {
          dispatch(setProductData({ fuel_products: data.data }));
        } else {
          dispatch(setProductData({ products: data.data }));
        }
      })
      .catch(console.log)
      .finally(() => dispatch(setProductData({ loading: false })));
  };

  const getProductDetails = (payload) => {
    dispatch(setProductData({ loading: true }));

    axios
      .get(`product/${payload.id}`)
      .then(({ data }) => {
        dispatch(setProductData({ details: data.data }));
      })
      .catch(console.log)
      .finally(() => dispatch(setProductData({ loading: false })));
  };

  const addProductToCart = (payload) => {
    dispatch(setConfigData({ isBtnLoading: true }));

    axios
      .post(`order/add-to-cart`, payload)
      .then(({ data }) => {
        const itemExists = productData.cart.some(
          (item) => item.id === data.data.id
        );

        if (itemExists) {
          var updatedData = [...productData.cart].map((item) => {
            if (item.id === data.data.id) {
              return { ...item, quantity: payload.quantity };
            }

            return item;
          });
        } else {
          var updatedData = [...productData.cart];

          updatedData.push({
            id: data.data.id,
            images: data.data.images,
            name: data.data.name,
            description: data.data.description,
            quantity: payload.quantity,
            price: data.data.price,
            sale_price: data.data.sale_price,
            discount_amount: data.data.discount_amount,
            tax_amount: data.data.tax_amount,
            product_type: data.data.product_type,
          });
        }

        dispatch(setProductData({ cart: updatedData }));

        if (data.data.product_type != "cylinder") {
          navigation.navigate("Cart");
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

  const removeItemFromCart = (id) => {
    const updatedData = productData.cart.filter((item) => item.id !== id);

    dispatch(setProductData({ cart: updatedData }));
  };

  const getCartItem = (id) => productData.cart.find((item) => item.id === id);

  const increaseQuantityFromCart = (id, increment, lastQuantity) => {
    addProductToCart({
      id: id,
      quantity: lastQuantity + increment,
    });
  };

  const decreaseQuantityFromCart = (id, decrement, lastQuantity) => {
    if (lastQuantity - decrement <= 0) {
      return removeItemFromCart(id);
    }

    addProductToCart({
      id: id,
      quantity: lastQuantity - decrement,
    });
  };

  return {
    config,
    getProducts,
    productData,
    getProductDetails,
    addProductToCart,
    removeItemFromCart,
    increaseQuantityFromCart,
    decreaseQuantityFromCart,
    getCartItem,
  };
};

export default useProduct;
