import {AppBar, MessageModal, PressableCard} from '@components';
import ProductQuantitySelector from '@components/Product/ProductQuantitySelector';
import useOrder from '@hooks/useOrder';
import useProduct from '@hooks/useProduct';
import {CommonActions} from '@react-navigation/native';
import {number_format} from '@utils/helper';
import {Button, Divider, HStack, ScrollView, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import ManageAddress from './Component/ManageAddress';

const Checkout = ({navigation}) => {
  const [showManageAddress, setShowManageAddress] = useState(false);
  const {productData} = useProduct();
  const {
    config,
    orderData,
    getSubtotal,
    getTotalDiscount,
    getTotal,
    getTotalTax,
    placeOrder,
  } = useOrder();

  const handlesuccessButton = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'OrderReceipt'}],
      }),
    );
  };

  return (
    <>
      <ManageAddress
        isOpen={showManageAddress}
        onClose={() => setShowManageAddress(prev => !prev)}
      />
      <MessageModal
        isOpen={orderData.order_status}
        onClose={() => {}}
        successButtonAction={handlesuccessButton}
        type="success"
        buttonTitle="View Order Receipt"
        title="Order placed Successfully!"
        description="Congratulations! Your order has been successfully placed and confirmed. Thank you for choosing our service!"
      />
      <AppBar title="Checkout " />
      <VStack px="5" py="5" flex={1} space={7}>
        <ScrollView>
          <VStack space={3}>
            {productData.cart.map((item, index) => (
              <ProductQuantitySelector
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                images={item.images}
                salePrice={item.sale_price}
                description={item.description}
                id={item.id}
                showActionButtons={false}
                key={index}
              />
            ))}
          </VStack>
        </ScrollView>
        <VStack space={5}>
          <PressableCard
            showLeftIcon={false}
            title="Delivery Address"
            toggleActionSheet={() => setShowManageAddress(prev => !prev)}
            description={
              orderData.selected_address.id.length === 0
                ? 'No Address selected'
                : `${orderData.selected_address.address}, ${orderData.selected_address.city_name}, ${orderData.selected_address.state_name}.`
            }
          />

          <VStack space={3}>
            <HStack justifyContent="space-between">
              <Text fontSize="sm">Subtotal:</Text>
              <Text bold>₦{number_format(getSubtotal())}</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="sm">Delivery Fee</Text>
              <Text bold>₦0.00</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="sm">Discount:</Text>
              <Text bold>-₦{number_format(getTotalDiscount())}</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="sm">Tax:</Text>
              <Text bold>+₦{number_format(getTotalTax())}</Text>
            </HStack>
            <Divider />
            <HStack justifyContent="space-between">
              <Text fontSize="sm">Total:</Text>
              <Text bold color="primary.600">
                ₦{number_format(getTotal())}
              </Text>
            </HStack>
          </VStack>
        </VStack>

        <Button
          colorScheme="primary"
          size="lg"
          isLoading={config.isBtnLoading}
          onPress={() => placeOrder()}>
          Confirm and Continue
        </Button>
      </VStack>
    </>
  );
};

export default Checkout;
