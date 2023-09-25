import React from 'react';
import {Alert} from '@components';
import VirtualCard from '@components/Wallet/VirtualCard';
import {useNavigation} from '@react-navigation/native';
import {Actionsheet, Heading, VStack, Button} from 'native-base';
import {number_format} from '@utils/helper';
import useUser from '@hooks/useUser';
import useInvestment from '@hooks/useInvestment';

interface model {
  isOpen: boolean;
  onClose: () => any;
  id: string;
  amount: number;
  interest: number;
}

const MakePayment: React.FC<model> = ({
  isOpen,
  onClose,
  id,
  amount,
  interest,
}) => {
  const navigation = useNavigation();

  const {userData} = useUser();

  const {config, handleInvestmentRequest} = useInvestment();

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content p={4}>
        <VStack space={20}>
          <VStack space={5}>
            <Heading textAlign="center" fontSize="lg">
              Make A Bank Transfer
            </Heading>

            {userData.user_virtual_banks.slice(0, 1).map((item, index) => (
              <VirtualCard
                key={index}
                width="full"
                accountName={item.account_name}
                bankName={item.bank_name}
                accountNumber={item.account_number}
              />
            ))}

            <Alert
              status="error"
              title={`You’re making a payment of ₦${number_format(
                amount ? amount : 0,
              )} to the account above`}
              showIcon={true}
            />
          </VStack>

          <Button
            colorScheme="primary"
            size="lg"
            isLoading={config.isBtnLoading}
            onPress={() =>
              handleInvestmentRequest({
                amount_invested: amount,
                investment_id: id,
                interest: interest,
              })
            }>
            Confirm Payment
          </Button>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default React.memo(MakePayment);
