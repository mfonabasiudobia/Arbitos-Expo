import {AppBar} from '@components';
import useWithdrawal from '@hooks/useWithdrawal';
import {format_date, number_format} from '@utils/helper';
import {
  Button,
  FlatList,
  HStack,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
  useColorMode,
  useTheme,
} from 'native-base';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ReceiptIcon from '/assets/svg/receipt.svg';

const WithdrawalHistory = ({navigation}) => {
  const {getWithdrawalHistory, withdrawData} = useWithdrawal();
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const theme = useTheme();
  const {colorMode} = useColorMode();

  React.useLayoutEffect(() => {
    getWithdrawalHistory(
      {
        page: 1,
        status: index == 0 ? 'all' : index == 1 ? 'approved' : 'cancelled',
      },
      true,
    );
  }, [index]);

  const handleEndReached = () => {
    if (
      !withdrawData.loading &&
      withdrawData.current_page != withdrawData.last_page
    ) {
      getWithdrawalHistory({
        page: withdrawData.current_page + 1,
        status: index === 0 ? 'all' : index === 1 ? 'approved' : 'cancelled',
      });
    }
  };

  const renderFooter = () => {
    if (withdrawData.loading) {
      return <Spinner size="xl" />;
    }

    return null;
  };

  const orderHistoryTab = () => {
    return (
      <VStack space={2}>
        {withdrawData.history.length === 0 || withdrawData.allLoading ? (
          <VStack alignItems="center">
            {withdrawData.loading || withdrawData.allLoading ? (
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
                <Text textAlign="center">No Withdrawals Found!</Text>
              </>
            )}
          </VStack>
        ) : (
          <FlatList
            data={Object.keys(withdrawData.history)}
            renderItem={({item: month}) => (
              <VStack space={2}>
                <Text bold>{month}</Text>
                {withdrawData.history[month].map((item, index) => (
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    key={index}
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
                        ₦{number_format(item.amount)}
                      </Heading>
                      <Text
                        fontSize="xs"
                        textAlign="right"
                        bold
                        style={{
                          textTransform: 'uppercase',
                          color:
                            item.status === 'approved'
                              ? '#00ff00'
                              : item.status === 'pending'
                              ? '#0000ff'
                              : '#ff0000',
                        }}>
                        {item.status}
                      </Text>
                      <Text
                        fontSize="xs"
                        textAlign="right"
                        bold
                        style={{
                          textTransform: 'uppercase',
                        }}>
                        {item.remark}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            )}
            keyExtractor={(item, index) => index.toString()}
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
    {key: 1, title: 'Approved'},
    {key: 2, title: 'Cancelled'},
  ]);

  return (
    <>
      <AppBar title="Withdrawal History" />
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

export default WithdrawalHistory;
