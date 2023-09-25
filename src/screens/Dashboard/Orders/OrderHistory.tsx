import {AppBar} from '@components';
import useOrder from '@hooks/useOrder';
import {format_date, number_format} from '@utils/helper';
import {
  FlatList,
  Button,
  HStack,
  Heading,
  Image,
  Pressable,
  Spinner,
  Text,
  VStack,
  useColorMode,
  useTheme,
} from 'native-base';
import React from 'react';
import ReceiptIcon from '/assets/svg/receipt.svg';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useWindowDimensions} from 'react-native';

const OrderHistory = ({navigation}) => {
  const {getOrders, orderData} = useOrder();
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const theme = useTheme();
  const {colorMode} = useColorMode();

  React.useLayoutEffect(() => {
    getOrders(
      {
        page: 1,
        status: index == 0 ? 'all' : index == 1 ? 'delivered' : 'cancelled',
      },
      true,
    );
  }, [index]);

  const handleEndReached = () => {
    if (!orderData.loading && orderData.current_page != orderData.last_page) {
      getOrders({
        page: orderData.current_page + 1,
        status: index === 0 ? 'all' : index === 1 ? 'delivered' : 'cancelled',
      });
    }
  };

  const renderFooter = () => {
    if (orderData.loading) {
      return <Spinner size="xl" />;
    }

    return null;
  };

  const orderHistoryTab = () => {
    return (
      <VStack space={2}>
        {orderData.orders.length === 0 || orderData.allLoading ? (
          <VStack alignItems="center">
            {orderData.loading || orderData.allLoading ? (
              renderFooter()
            ) : (
              <>
                <Image
                  rounded="lg"
                  source={require('/assets/images/empty-box.png')}
                  alt="image"
                  h="200"
                  w="200"
                />
                <Text textAlign="center">No Orders Found!</Text>
              </>
            )}
          </VStack>
        ) : (
          <FlatList
            data={Object.keys(orderData.orders)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item: month}) => (
              <VStack space={2}>
                <Text bold>{month}</Text>
                {orderData.orders[month].map((item, index) => (
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
            )}
            ListFooterComponent={renderFooter}
          />
        )}
      </VStack>
    );
  };

  const renderScene = SceneMap({
    0: orderHistoryTab,
    1: orderHistoryTab,
    2: orderHistoryTab,
  });

  const [routes] = React.useState([
    {key: 0, title: 'All'},
    {key: 1, title: 'Completed'},
    {key: 2, title: 'Cancelled'},
  ]);

  return (
    <>
      <AppBar title="Order History" />
      <VStack px={3} flex={1}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{
                backgroundColor: 'transparent',
              }}
              scrollEnabled={true}
              renderLabel={({route, focused}) => (
                <Button
                  w="100%"
                  rounded="full"
                  py={2}
                  bg={focused ? theme.colors.primary[600] : 'transparent'}>
                  <Text
                    color={
                      colorMode === 'dark' || focused
                        ? theme.colors.trueGray[50]
                        : theme.colors.trueGray[700]
                    }>
                    {route.title}
                  </Text>
                </Button>
              )}
              style={{
                backgroundColor:
                  colorMode === 'dark'
                    ? theme.colors.trueGray[700]
                    : theme.colors.trueGray[50],
                borderRadius: 0,
                overflow: 'hidden',
                marginBottom: 10,
              }}
            />
          )}
        />
      </VStack>
    </>
  );
};

export default OrderHistory;
