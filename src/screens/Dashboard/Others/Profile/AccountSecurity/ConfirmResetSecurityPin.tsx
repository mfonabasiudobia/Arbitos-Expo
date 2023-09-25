import {Box, Button, Heading, VStack} from 'native-base';
import React, {useState} from 'react';
import DailPin from '@screens/Auth/Register/Components/DailPin';
import {AppBar} from '@components';
import useAuth from '@hooks/useAuth';

const ConfirmResetSecurityPin = ({route}) => {
  const [pin, setPin] = useState<object>({
    1: '',
    2: '',
    3: '',
    4: '',
  });

  const {handleCreateSecurityPin, userData, config} = useAuth();

  return (
    <>
      <AppBar title="Confirm Reset Password" />
      <VStack px="5" py="10" flex={1} justifyContent="flex-end">
        <VStack space={7}>
          <DailPin pin={pin} setPin={setPin} />

          <Button
            colorScheme="primary"
            size="lg"
            isLoading={config.isBtnLoading}
            isDisabled={
              pin[4] && route.params.pin === Object.values(pin).join('')
                ? false
                : true
            }
            onPress={() =>
              handleCreateSecurityPin({
                pin: route.params.pin,
                email: userData.email,
              })
            }>
            Reset Security Pin
          </Button>
        </VStack>
      </VStack>
    </>
  );
};

export default ConfirmResetSecurityPin;
