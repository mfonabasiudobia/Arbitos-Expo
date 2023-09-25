import useAuth from '@hooks/useAuth';
import {Box, Button, HStack, Heading, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import DailPin from './Register/Components/DailPin';
import {getUsername} from '@utils/helper';

const WelcomeBack = ({navigation}) => {
  const [pin, setPin] = useState<object>({
    1: '',
    2: '',
    3: '',
    4: '',
  });
  const [username, setUsername] = React.useState<any>('');

  const {handlePinVerification, userData, config} = useAuth();

  React.useLayoutEffect(() => {
    const handleGetUsername = async () => {
      const username = await getUsername();

      setUsername(username);
    };

    handleGetUsername();
  }, []);

  return (
    <Box px="5" py="10" flex={1}>
      <VStack space={2} flex={1}>
        <Heading size="lg">Hello, {username} </Heading>
        <Heading fontWeight="light" size="sm">
          Please sign in to continue
        </Heading>
      </VStack>

      <VStack space={7}>
        <DailPin pin={pin} setPin={setPin} />

        <Button
          colorScheme="primary"
          size="lg"
          isLoading={config.isBtnLoading}
          isDisabled={pin[4] ? false : true}
          onPress={() =>
            handlePinVerification({
              pin: Object.values(pin).join(''),
            })
          }>
          Continue
        </Button>
        <HStack space={2} justifyContent="center">
          <Text fontSize="sm">Not you?</Text>
          <Button
            variant="link"
            p={0}
            onPress={() => navigation.navigate('Login')}>
            Switch Account
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default WelcomeBack;
