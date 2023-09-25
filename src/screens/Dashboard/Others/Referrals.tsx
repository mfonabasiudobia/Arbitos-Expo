import {AppBar} from '@components';
import {
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Box,
  useTheme,
  useColorMode,
} from 'native-base';
import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import ReferralIcon from '/assets/svg/promote-social-media-marketing.svg';
import UserIcon from '/assets/svg/user.svg';
import {share} from '@utils/helper';
import useUser from '@hooks/useUser';
import {Platform} from 'react-native';

const Referrals = ({navigation}) => {
  const layout = useWindowDimensions();
  const {userData, config} = useUser();
  const theme = useTheme();
  const {colorMode} = useColorMode();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Invite'},
    {key: 'second', title: 'Referrals'},
  ]);

  const InviteTab = () => (
    <VStack p={5} space={10}>
      <VStack space={2}>
        <Heading>Earn extra bonus with every referral</Heading>
        <Text>
          Share your referral code with your friends & family, earn up to 10%
          bonus after they make an order with us.
        </Text>
      </VStack>

      <VStack alignItems="center" justifyContent="center">
        <ReferralIcon />
      </VStack>

      <Button
        colorScheme="primary"
        onPress={() =>
          share(`
📱 Get Arbitos - Africa's leading energy retailer

Download the Arbitos app now

🚀 ${
            Platform.OS === 'android'
              ? config.data.config.app_url_android
              : config.data.config.app_url_ios
          }

🔑 Use my Referral Code: ${userData.referral_code}

#Arbitos #Oil #Referral`)
        }>
        Share with friends
      </Button>
    </VStack>
  );

  const ReferralsTab = () => (
    <VStack p={5} space={10}>
      <HStack>
        <Box flex={1}>
          <Heading textAlign="center">₦3,400</Heading>
          <Text textAlign="center">Total Earnings</Text>
        </Box>
        <Box flex={1}>
          <Heading textAlign="center">120</Heading>
          <Text textAlign="center">Completed</Text>
        </Box>
        <Box flex={1}>
          <Heading textAlign="center">35</Heading>
          <Text textAlign="center">Pending</Text>
        </Box>
      </HStack>

      <VStack space={5}>
        <HStack justifyContent="space-between" alignItems="center" py={2}>
          <HStack space={3} alignItems="center">
            <UserIcon />
            <Box>
              <Text bold>Adeola Adekunle</Text>
              <Text fontSize="sm">Sent a minute ago</Text>
            </Box>
          </HStack>

          <Text fontSize="xs">₦400</Text>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center" py={2}>
          <HStack space={3} alignItems="center">
            <UserIcon />
            <Box>
              <Text bold>Adeola Adekunle</Text>
              <Text fontSize="sm">Sent a minute ago</Text>
            </Box>
          </HStack>

          <Text fontSize="xs">Waiting</Text>
        </HStack>
      </VStack>
    </VStack>
  );

  const renderScene = SceneMap({
    first: InviteTab,
    second: ReferralsTab,
  });

  return (
    <>
      <AppBar title="My Referrals" />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor:
                colorMode === 'dark'
                  ? theme.colors.trueGray[50]
                  : theme.colors.trueGray[700],
            }}
            activeColor={
              colorMode === 'dark'
                ? theme.colors.trueGray[50]
                : theme.colors.trueGray[700]
            }
            inactiveColor={
              colorMode === 'dark'
                ? theme.colors.trueGray[50]
                : theme.colors.trueGray[700]
            }
            style={{
              backgroundColor: 'transparent',
            }}
          />
        )}
      />
    </>
  );
};

export default Referrals;
