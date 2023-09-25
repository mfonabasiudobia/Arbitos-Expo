import MessageModal from '@components/MessageModal';
import useUser from '@hooks/useUser';
import useWithdrawal from '@hooks/useWithdrawal';
import {useDispatch} from '@lib/index';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {number_format} from '@utils/helper';
import {Button, Flex, HStack, Heading, Text} from 'native-base';
import React from 'react';
import {ImageBackground} from 'react-native';

interface walletCardModel {
  width: any;
}

const CapitalWalletCard: React.FC<walletCardModel> = ({width}) => {
  const [openModal, setOpenModal] = React.useState(false);

  const {userData} = useUser();
  const {handleCapitalWithdraw} = useWithdrawal();

  return (
    <>
      <MessageModal
        isOpen={openModal}
        onClose={() => setOpenModal(prev => !prev)}
        successButtonAction={handleCapitalWithdraw}
        showIcon={false}
        type="error"
        errorButtonTitle="Withdraw"
        errorTitle="Withdraw Capital Balance"
        errorDescription="Do you want to withdraw your capital balance to your wallet?"
      />
      <ImageBackground
        source={require('/assets/images/virtual-card-background.png')}
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
          <Text color="#fff">Capital Balance</Text>
          <HStack alignItems="center">
            <Heading mt={2} size="md" color="#fff">
              {number_format(userData.capital_balance)}
            </Heading>
          </HStack>
          <HStack space={3} mt={3}>
            <Button
              variant="solid"
              bg="gray.200"
              opacity={0.5}
              //   isDisabled={userData.capital_balance == 0}
              onPress={() => setOpenModal(prev => !prev)}
              rounded="full"
              px="7">
              Withdraw
            </Button>
          </HStack>
        </Flex>
      </ImageBackground>
    </>
  );
};

export default React.memo(CapitalWalletCard);
