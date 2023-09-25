import {AppBar} from '@components';
import FuelPriceCard from '@components/Wallet/FuelPriceCard';
import useOrder from '@hooks/useOrder';
import useProduct from '@hooks/useProduct';
import useUser from '@hooks/useUser';
import {useFocusEffect} from '@react-navigation/native';
import {format_date, number_format} from '@utils/helper';
import {
  Button,
  HStack,
  Heading,
  Image,
  Pressable,
  FlatList,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import ReceiptIcon from '/assets/svg/receipt.svg';

const Fuel = ({navigation}) => {
  const {getProducts, productData} = useProduct();

  const {getOrders, orderData} = useOrder();

  React.useEffect(() => {
    if (productData.fuel_products.length === 0) {
      getProducts({is_featured: 0, product_type: 'fuel'});
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getOrders({order_type: 'fuel', status: 'all'});
      // Place your useEffect logic here
      return () => {
        // Clean up or remove listeners if necessary
      };
    }, []),
  );

  return (
    <>
      <AppBar title="Buy Fuel" showBackIcon={false} />
      <ScrollView p={3}>
        <VStack space={2}>
          {productData.loading ? (
            <Spinner accessibilityLabel="Loading products" size="xl" />
          ) : (
            productData.fuel_products.map((item, index) => (
              <FuelPriceCard
                title={item.name}
                price={item.price}
                salePrice={item.sale_price}
                id={item.id}
                key={index}
                width={'full'}
                color={
                  item.name === 'Diesel'
                    ? '#FE6603'
                    : item.name === 'Gas'
                    ? '#29156E'
                    : '#010E0E'
                }
                framePath={
                  item.name === 'Diesel'
                    ? require('/assets/images/diesel-frame.png')
                    : item.name === 'Gas'
                    ? require('/assets/images/gas-frame.png')
                    : require('/assets/images/petrol-frame.png')
                }
                images={item.images}
                buttonColor={
                  item.name === 'Diesel'
                    ? '#FE6603'
                    : item.name === 'Gas'
                    ? '#29156E'
                    : 'rgba(0,0,0,0.2)'
                }
              />
            ))
          )}
        </VStack>

        <VStack space={2} mt={5}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size="sm">Recent Orders</Heading>
            <Button
              variant="unstyled"
              p={0}
              onPress={() => navigation.navigate('OrderHistory')}>
              See all
            </Button>
          </HStack>
          {orderData.orders.length === 0 ? (
            <VStack alignItems="center">
              <Image
                rounded="lg"
                source={require('/assets/images/empty-box.png')}
                alt="image"
                h="200"
                w="200"
              />
              <Text textAlign="center">No Orders Found</Text>
            </VStack>
          ) : (
            Object.keys(orderData.orders).map((item, index) => (
              <VStack space={2} key={index}>
                <Text>{item}</Text>

                {orderData.orders[item].map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() =>
                      navigation.navigate('OrderReceipt', {
                        id: item.id,
                      })
                    }>
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      py={2}>
                      <HStack space={3}>
                        <ReceiptIcon />
                        <VStack justifyContent="center">
                          <Text bold>#{item.trx}</Text>
                          <Text fontWeight="light" fontSize="xs">
                            {format_date(item.created_at)}
                          </Text>
                        </VStack>
                      </HStack>
                      <VStack>
                        <Heading fontSize="sm" textAlign="right">
                          ₦{number_format(item.total_amount)}
                        </Heading>
                        <Text
                          fontSize="xs"
                          textAlign="right"
                          bold
                          style={{
                            textTransform: 'uppercase',
                            color:
                              item.payment_status === 'paid'
                                ? '#00ff00'
                                : '#ff0000',
                          }}>
                          {item.payment_status}
                        </Text>
                        <Text
                          fontSize="xs"
                          textAlign="right"
                          bold
                          style={{
                            textTransform: 'uppercase',
                          }}>
                          {item.order_status}
                        </Text>
                      </VStack>
                    </HStack>
                  </Pressable>
                ))}
              </VStack>
            ))
          )}
        </VStack>
      </ScrollView>
    </>
  );
};

export default Fuel;
