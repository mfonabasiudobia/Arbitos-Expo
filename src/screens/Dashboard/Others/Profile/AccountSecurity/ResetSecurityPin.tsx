import {AppBar} from '@components';
import DailPin from '@screens/Auth/Register/Components/DailPin';
import {Button, VStack} from 'native-base';
import React, {useState} from 'react';

const ResetSecurityPin = ({navigation}) => {
  const [pin, setPin] = useState<object>({
    1: '',
    2: '',
    3: '',
    4: '',
  });

  return (
    <>
      <AppBar title="Reset Security PIN" />
      <VStack px="5" py="10" flex={1} justifyContent="flex-end">
        <VStack space={7}>
          <DailPin pin={pin} setPin={setPin} />

          <Button
            colorScheme="primary"
            size="lg"
            onPress={() =>
              navigation.navigate('ConfirmResetSecurityPin', {
                pin: Object.values(pin).join(''),
              })
            }>
            Continue
          </Button>
        </VStack>
      </VStack>
    </>
  );
};

export default ResetSecurityPin;
