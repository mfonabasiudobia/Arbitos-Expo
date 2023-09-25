import {Box, Button, Heading, VStack, ScrollView} from 'native-base';
import React, {useState} from 'react';
import DailPin from './Components/DailPin';

const PinSetup = ({navigation}) => {
  const [pin, setPin] = useState<object>({
    1: '',
    2: '',
    3: '',
    4: '',
  });

  return (
    <ScrollView px="5" py={5}>
      <VStack space={5}>
        <VStack space={2} flex={1}>
          <Heading size="lg">Set security PIN</Heading>
          <Heading fontWeight="light" size="sm">
            Enter your 4 digits PIN to proceed
          </Heading>
        </VStack>

        <VStack space={7} flex={1}>
          <DailPin pin={pin} setPin={setPin} />

          <Button
            colorScheme="primary"
            size="lg"
            isDisabled={pin[4] ? false : true}
            onPress={() =>
              navigation.navigate('PinConfirmation', {
                pin: Object.values(pin).join(''),
              })
            }>
            Continue
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default PinSetup;
