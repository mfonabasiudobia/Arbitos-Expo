import {AppBar} from '@components';
import VirtualCard from '@components/Wallet/VirtualCard';
import {MessageModal} from '@components';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useTheme,
  useColorMode,
} from 'native-base';
import React, {useState} from 'react';
import useUser from '@hooks/useUser';
import {SafeAreaView} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {data} from './utils/constant';

const More = ({navigation}) => {
  const theme = useTheme();
  const {colorMode} = useColorMode();

  const [showLogoutModal, setLogoutModal] = useState(false);

  const {handleLogout, userData} = useUser();

  return (
    <>
      <AppBar title="More" />
      <ScrollView>
        <MessageModal
          isOpen={showLogoutModal}
          onClose={() => setLogoutModal(prev => !prev)}
          successButtonAction={handleLogout}
          type="error"
          errorTitle="Are you sure you want to sign out?"
          errorButtonTitle="Yes, Logout"
          errorDescription="This action will log you out and you will need to sign in again to access your account."
        />

        <Box p={3} flex={1}>
          <VStack space={2} flex={1}>
            {userData.user_virtual_banks.slice(0, 1).map((item, index) => (
              <VirtualCard
                key={item.id}
                width="full"
                accountName={item.account_name}
                bankName={item.bank_name}
                accountNumber={item.account_number}
              />
            ))}
            <Box
              p={2}
              rounded={10}
              bg={
                colorMode === 'dark'
                  ? theme.colors.trueGray[700]
                  : theme.colors.trueGray[50]
              }>
              {data.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    item.title === 'Sign Out'
                      ? setLogoutModal(prev => !prev)
                      : navigation.navigate(item.routeName)
                  }>
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    py={2}>
                    <HStack space={3} alignItems="center">
                      <item.Icon />
                      <Text bold>{item.title}</Text>
                    </HStack>

                    <IconButton
                      variant="unstyled"
                      rounded="full"
                      icon={
                        <Icon
                          size={5}
                          color={
                            colorMode === 'dark'
                              ? theme.colors.trueGray[50]
                              : theme.colors.trueGray[700]
                          }
                          as={Entypo}
                          name="chevron-thin-right"
                        />
                      }
                    />
                  </HStack>
                </Pressable>
              ))}
            </Box>
          </VStack>
        </Box>
      </ScrollView>
    </>
  );
};

export default More;
