import useAuth from '@hooks/useAuth';
import {Box, Button, Heading, VStack, ScrollView} from 'native-base';
import React, {useState} from 'react';
import DailPin from './Components/DailPin';

const PinConfirmation = ({route}) => {
  const [pin, setPin] = useState<object>({
    1: '',
    2: '',
    3: '',
    4: '',
  });

  const {handleCreateSecurityPin, userData, config} = useAuth();

  return (
    <Box px="5" py={5}>
      <ScrollView>
        <VStack space={2} flex={1}>
          <Heading size="lg">Confirm security PIN</Heading>
          <Heading fontWeight="light" size="sm">
            Please confirm your security pin to proceed
          </Heading>
        </VStack>

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
            Continue
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default PinConfirmation;
