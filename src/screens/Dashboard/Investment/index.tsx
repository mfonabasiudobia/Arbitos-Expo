import {AppBar} from '@components';
import CapitalWalletCard from '@components/Wallet/CapitalWalletCard';
import useInvestment from '@hooks/useInvestment';
import {
  Button,
  Image,
  ScrollView,
  Spinner,
  Text,
  VStack,
  useColorMode,
  useTheme,
} from 'native-base';
import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ActiveInvestmentCard from './Components/ActiveInvestmentCard';
import InvestmentCard from './Components/InvestmentCard';

const Referrals = ({navigation, route}) => {
  const layout = useWindowDimensions();
  const theme = useTheme();
  const {colorMode} = useColorMode();

  const {investmentData, getActiveInvestments, getInvestmentHistory} =
    useInvestment();

  const [index, setIndex] = useState(0);

  React.useEffect(() => {
    getActiveInvestments();
    getInvestmentHistory();
  }, [index]);

  const ActiveInvestmentTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack space={5}>
        {investmentData.loading ? (
          <VStack space={2}>
            <Spinner accessibilityLabel="Loading products" size="xl" />
          </VStack>
        ) : investmentData.investments.length === 0 ? (
          <VStack alignItems="center">
            <Image
              rounded="lg"
              source={require('/assets/images/empty-box.png')}
              alt="image"
              h="200"
              w="200"
            />
            <Text textAlign="center">No Active Investments</Text>
          </VStack>
        ) : (
          investmentData.investments.map((item, index) => (
            <InvestmentCard
              isShortTerm={item.type === 'short-term'}
              key={index}
              title={item.title}
              id={item.id}
              minAmount={item.min_amount}
              maxAmount={item.max_amount}
              interest={item.interest}
              duration={item.duration}
            />
          ))
        )}
      </VStack>
    </ScrollView>
  );

  const MyInvestmentTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack space={3}>
        <CapitalWalletCard width="full" />

        {investmentData.loading ? (
          <VStack space={2}>
            <Spinner accessibilityLabel="Loading products" size="xl" />
          </VStack>
        ) : investmentData.history.length === 0 ? (
          <VStack alignItems="center">
            <Image
              rounded="lg"
              source={require('/assets/images/empty-box.png')}
              alt="image"
              h="200"
              w="200"
            />
            <Text textAlign="center">No Investments Found!</Text>
          </VStack>
        ) : (
          <VStack space={5}>
            {investmentData.history.map((item, index) => (
              <ActiveInvestmentCard
                key={index}
                title={item.title}
                interest={item.interest}
                startDate={item.start_date}
                endDate={item.end_date}
                amountInvested={item.amount_invested}
              />
            ))}
          </VStack>
        )}
      </VStack>
    </ScrollView>
  );

  const renderScene = SceneMap({
    0: ActiveInvestmentTab,
    1: MyInvestmentTab,
  });

  const [routes] = useState([
    {key: 0, title: 'Active Packages'},
    {key: 1, title: 'My Investments'},
  ]);

  return (
    <>
      <AppBar title="Invest" />

      <VStack p={3} flex={1}>
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
              renderLabel={({route, focused}) => (
                <Button
                  w="100%"
                  rounded="full"
                  py={2}
                  bg={focused ? theme.colors.primary[600] : 'transparent'}>
                  <Text
                    textAlign="center"
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
                borderRadius: 100,
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

export default Referrals;
