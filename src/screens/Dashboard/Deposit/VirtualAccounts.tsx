import {Alert, AppBar} from '@components';
import VirtualCard from '@components/Wallet/VirtualCard';
import {Box, ScrollView, VStack} from 'native-base';
import React from 'react';
import useUser from '@hooks/useUser';

const VirtualAccounts = () => {
  const {userData} = useUser();

  return (
    <>
      <AppBar title="Fund Account" />
      <Box p={3}>
        <ScrollView>
          <VStack space={5}>
            <Alert
              status="info"
              title="Add money via your mobile banking app"
            />
            <VStack space={4}>
              {userData.user_virtual_banks.map((item, index) => (
                <VirtualCard
                  key={index}
                  width="full"
                  accountName={item.account_name}
                  bankName={item.bank_name}
                  accountNumber={item.account_number}
                />
              ))}
            </VStack>
          </VStack>
        </ScrollView>
      </Box>
    </>
  );
};

export default VirtualAccounts;
