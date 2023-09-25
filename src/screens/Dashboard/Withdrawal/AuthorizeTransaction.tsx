import {AppBar} from '@components';
import useAuth from '@hooks/useAuth';
import useWithdrawal from '@hooks/useWithdrawal';
import DailPin from '@screens/Auth/Register/Components/DailPin';
import {Box, Heading, VStack, ScrollView} from 'native-base';
import React, {useEffect, useState} from 'react';
import WithdrawIcon from '/assets/svg/withdraw.svg';

const AuthorizeTransaction = ({navigation}) => {
  const [pin, setPin] = useState<object>({
    1: '',
    2: '',
    3: '',
    4: '',
  });

  useEffect(() => {
    if (pin[4]) {
      handleTransactionAuthorization();
    }
  }, [pin[4]]);

  const {withdrawData, handleWithdrawalRequest} = useWithdrawal();

  const handleTransactionAuthorization = () => {
    handleWithdrawalRequest({
      ...withdrawData.account,
      pin: Object.values(pin).join(''),
    });
  };

  return (
    <>
      <AppBar title="Withdrawal" />
      <ScrollView px="5" flex={1}>
        <VStack flex={1} space={5} alignItems="center">
          <WithdrawIcon />

          <VStack space={2}>
            <Heading size="lg" textAlign="center" fontWeight="semibold">
              Authorize Transaction
            </Heading>
            <Heading fontWeight="light" size="sm" textAlign="center">
              Enter your security PIN to authorize transaction
            </Heading>
          </VStack>
        </VStack>

        <VStack space={7}>
          <DailPin pin={pin} setPin={setPin} />
        </VStack>
      </ScrollView>
    </>
  );
};

export default AuthorizeTransaction;
