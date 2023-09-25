import {Alert, AppBar, Input} from '@components';
import WalletCard from '@components/Wallet/WalletCard';
import useUser from '@hooks/useUser';
import {useForm, yup, yupResolver} from '@lib/index';
import {number_format} from '@utils/helper';
import {Button, VStack} from 'native-base';
import React, {useState} from 'react';
import MakePayment from './Components/MakePayment';

const InvestmentPayment = ({navigation, route}) => {
  const [showPaymentModal, setPaymentModal] = useState(false);

  const handleSetPaymentModal = React.useCallback(
    () => [setPaymentModal(prev => !prev)],
    [],
  );

  const {userData} = useUser();

  let schema = yup.object({
    amount: yup
      .number()
      .typeError('Amount must be a number')
      .required()
      .positive()
      .integer()
      .required()
      .max(userData.wallet_balance, 'Insufficient Wallet Balance')
      .max(
        route.params.maxAmount,
        `Maximum Capital Amount is ₦${number_format(route.params.maxAmount)}`,
      )
      .min(
        route.params.minAmount,
        `Minimum Capital Amount is ₦${number_format(route.params.minAmount)}`,
      )
      .label('Amount'),
  });

  const {
    handleSubmit,
    control,
    getValues,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleInvestment = data => {
    setPaymentModal(prev => !prev);
  };

  return (
    <>
      <AppBar title={route.params.title} />
      <MakePayment
        isOpen={showPaymentModal}
        onClose={handleSetPaymentModal}
        id={route.params.id}
        interest={route.params.interest}
        amount={getValues('amount')}
      />
      <VStack px="5" py="5" flex={1} space={5}>
        <Alert
          status="error"
          title={`Min. Capital: ₦${number_format(
            route.params.minAmount,
          )} | Max. Capital:₦${number_format(route.params.maxAmount)}`}
          showIcon={true}
        />

        <WalletCard
          width="full"
          showButtons={false}
          description={`You’re about to invest in AGO package which comes with ${route.params.interest}% interest.`}
        />

        <VStack space={3} flex={1}>
          <Input
            placeholder="Enter Amount to Invest"
            label="Amount to Invest"
            name="amount"
            keyboardType="phone-pad"
            errors={errors}
            control={control}
          />
        </VStack>
        <Button
          colorScheme="primary"
          size="lg"
          onPress={handleSubmit(handleInvestment)}>
          Make Payment
        </Button>
      </VStack>
    </>
  );
};

export default InvestmentPayment;
