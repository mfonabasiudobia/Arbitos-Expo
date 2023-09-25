import {AppBar, PressableCard} from '@components';
import ProductQuantitySelector from '@components/Product/ProductQuantitySelector';
import useOrder from '@hooks/useOrder';
import {CommonActions} from '@react-navigation/native';
import {number_format, format_date} from '@utils/helper';
import {
  Button,
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
  Spinner,
  Pressable,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import AddReview from './Component/AddReview';

const OrderReceipt = ({navigation, route}) => {
  const {orderData, clearCart, getOrderDetails} = useOrder();
  const [showAddReview, setShowAddReview] = React.useState(false);
  const [productId, setProductId] = React.useState<string>('');

  const handlesuccessButton = () => {
    clearCart();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'BottomTab'}],
      }),
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      if (route.params) getOrderDetails(route.params.id);
      // Place your useEffect logic here
      return () => {
        // Clean up or remove listeners if necessary
      };
    }, []),
  );

  return (
    <>
      <AppBar title="Order Receipt" showBackIcon={false} />

      <AddReview
        isOpen={showAddReview}
        productId={productId}
        orderId={orderData.ordered_response.id}
        onClose={() => setShowAddReview(prev => !prev)}
      />

      {orderData.loading ? (
        <VStack flex={1} justifyContent="center">
          <Spinner accessibilityLabel="Loading products" size="xl" />
        </VStack>
      ) : (
        <VStack
          px="3"
          borderWidth="1"
          rounded="lg"
          m={2}
          flex={1}
          borderStyle="dashed"
          py="5">
          <ScrollView>
            <VStack space={7}>
              <VStack>
                <HStack justifyContent="space-between">
                  <Text fontSize="sm">Order Date:</Text>
                  <Text bold>
                    {format_date(orderData.ordered_response.created_at)}
                  </Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text fontSize="sm">Order ID:</Text>
                  <Text bold>#{orderData.ordered_response.trx}</Text>
                </HStack>
              </VStack>

              <ScrollView>
                <VStack space={3}>
                  {orderData.ordered_response.items?.map((item, index) => (
                    <Pressable
                      onPress={() => {
                        setProductId(item.product.id);
                        setShowAddReview(prev => !prev);
                      }}
                      key={index}>
                      <ProductQuantitySelector
                        name={item.product.name}
                        salePrice={item.sale_price}
                        price={item.price}
                        quantity={item.quantity}
                        images={item.product.images}
                        description={item.product.description}
                        id={item.product.id}
                        showActionButtons={false}
                      />
                    </Pressable>
                  ))}
                </VStack>
              </ScrollView>
              <VStack space={5}>
                <PressableCard
                  showLeftIcon={false}
                  showRightIcon={false}
                  title="Delivery Address"
                  toggleActionSheet={() => {}}
                  description={`${orderData.ordered_response.shipping_address}, ${orderData.ordered_response.shipping_city}, ${orderData.ordered_response.shipping_state}.`}
                />

                <VStack space={3}>
                  <HStack justifyContent="space-between">
                    <Text fontSize="sm">Subtotal:</Text>
                    <Text bold>
                      ₦{number_format(orderData.ordered_response.sub_total)}
                    </Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Text fontSize="sm">Delivery Fee</Text>
                    <Text bold>
                      +₦{number_format(orderData.ordered_response.delivery_fee)}
                    </Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Text fontSize="sm">Discount Amount:</Text>
                    <Text bold>
                      -₦
                      {number_format(
                        orderData.ordered_response.discount_amount,
                      )}
                    </Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Text fontSize="sm">Tax:</Text>
                    <Text bold>
                      +₦{number_format(orderData.ordered_response.tax_amount)}
                    </Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Text fontSize="sm">Payment Status:</Text>
                    <Text bold color="#00ff00">
                      {orderData.ordered_response.payment_status}
                    </Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Text fontSize="sm">Payment Method:</Text>
                    <Text bold>
                      {orderData.ordered_response.payment_method}
                    </Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Text fontSize="sm">Order Status:</Text>
                    <Text bold>{orderData.ordered_response.order_status}</Text>
                  </HStack>
                  <Divider />
                  <HStack justifyContent="space-between">
                    <Text fontSize="sm">Total:</Text>
                    <Text bold color="primary.600">
                      ₦{number_format(orderData.ordered_response.total_amount)}
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </VStack>
          </ScrollView>
          <Button colorScheme="primary" size="lg" onPress={handlesuccessButton}>
            Continue
          </Button>
        </VStack>
      )}
    </>
  );
};

export default OrderReceipt;
