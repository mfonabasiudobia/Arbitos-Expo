import {Button, Heading, Text, VStack} from 'native-base';
import SuccessIcon from '/assets/svg/success-ripple.svg';
import useWithdrawal from '@hooks/useWithdrawal';
import {number_format} from '@utils/helper';

const TransactionStatus = ({navigation}) => {
  const {withdrawData} = useWithdrawal();

  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      flex={1}
      p={5}
      space={10}>
      <SuccessIcon />
      <VStack space={3}>
        <Heading fontSize="lg" textAlign="center">
          Successful!
        </Heading>
        <Text textAlign="center">
          {`You have successfully, made a withdrawal request of ₦${number_format(
            withdrawData.account.amount,
          )} to your ${withdrawData.account.account_number} account.`}
        </Text>
      </VStack>
      <Button
        colorScheme="primary"
        w="full"
        onPress={() => navigation.navigate('Home')}>
        Continue
      </Button>
    </VStack>
  );
};

export default TransactionStatus;
