import useUser from '@hooks/useUser';
import {useDispatch} from '@lib/index';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {setConfigData} from '@redux/slices/config';
import {
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Text,
} from 'native-base';
import React from 'react';
import {ImageBackground} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {number_format} from '@utils/helper';

interface walletCardModel {
  width: any;
  showButtons?: boolean;
  description?: string;
}

const WalletCard: React.FC<walletCardModel> = ({
  width,
  showButtons = true,
  description = null,
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const {config, userData} = useUser();
  const dispatch = useDispatch();

  const onWalletBalanceSwitchChange = () => {
    dispatch(
      setConfigData({
        hideWallet: !config.hideWallet,
      }),
    );
  };

  return (
    <ImageBackground
      source={require('/assets/images/wallet-background.png')}
      style={{
        width: width,
        minHeight: 140,
        borderRadius: 30,
        padding: 7,
        overflow: 'hidden',
        marginRight: 10,
      }}>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        flex={1}
        zIndex={5}>
        <Text color="#fff">Wallet Balance</Text>
        <HStack alignItems="center">
          <Heading mt={2} size="md" color="#fff">
            {'\u20A6'}
            {config.hideWallet
              ? '*****'
              : number_format(userData.wallet_balance)}
          </Heading>
          <IconButton
            variant="unstyled"
            icon={
              <Icon
                as={MaterialCommunityIcons}
                color="white"
                name={config.hideWallet ? 'eye-off' : 'eye'}
                onPress={onWalletBalanceSwitchChange}
                size={6}
              />
            }
          />
        </HStack>
        {showButtons ? (
          <HStack space={3} mt={3}>
            <Button
              variant="solid"
              bg="primary.200"
              rounded="full"
              px="7"
              onPress={() => navigation.navigate('WithdrawalNavigation')}>
              Withdrawal
            </Button>
            <Button
              variant="solid"
              bg="primary.200"
              rounded="full"
              px="10"
              onPress={() => navigation.navigate('VirtualAccounts')}>
              Deposit
            </Button>
          </HStack>
        ) : (
          <Text textAlign="center">{description}</Text>
        )}
      </Flex>
    </ImageBackground>
  );
};

export default React.memo(WalletCard);
