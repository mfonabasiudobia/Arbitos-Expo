import {AppBar} from '@components';
import useUser from '@hooks/useUser';
import useTransaction from '@hooks/useTransaction';
import {format_date, number_format} from '@utils/helper';
import {
  Avatar,
  HStack,
  Heading,
  Image,
  FlatList,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import ReceiptIcon from '/assets/svg/receipt.svg';

const TransactionHistory = () => {
  const {getTransactionHistory, transactionData} = useTransaction();

  React.useEffect(() => {
    getTransactionHistory({page: 1});
  }, []);

  const handleEndReached = () => {
    if (
      !transactionData.loading &&
      transactionData.current_page != transactionData.last_page
    ) {
      getTransactionHistory({page: transactionData.current_page + 1});
    }
  };

  const renderFooter = () => {
    if (transactionData.loading) {
      return <Spinner size="xl" />;
    }

    return null;
  };

  return (
    <>
      <AppBar title="Transaction History" />
      <VStack space={2} px={3}>
        {transactionData.history.length === 0 ? (
          <VStack alignItems="center">
            <Image
              rounded="lg"
              source={require('/assets/images/empty-box.png')}
              alt="image"
              h="200"
              w="200"
            />
            <Text textAlign="center">No Transactions Found!</Text>
          </VStack>
        ) : (
          <FlatList
            data={Object.keys(transactionData.history)}
            renderItem={({item: month}) => (
              <VStack space={2}>
                <Text bold>{month}</Text>
                {transactionData.history[month].map((item, index) => (
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
                          color: item.trx_type === '+' ? '#00ff00' : '#ff0000',
                        }}>
                        {item.trx_type === '+' ? 'credit' : 'debit'}
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
    </>
  );
};

export default TransactionHistory;
