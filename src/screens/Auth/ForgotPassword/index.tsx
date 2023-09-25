import {Input} from '@components';
import useAuth from '@hooks/useAuth';
import {useForm, yup, yupResolver} from '@lib/index';
import {Box, Button, Heading, VStack} from 'native-base';
import React from 'react';

let userSchema = yup.object({
  email: yup.string().required().email().label('Email'),
});

const ForgotPassword = ({navigation}) => {
  const {handleSendPasswordResetToken, config} = useAuth();

  const {
    handleSubmit,
    setValue,
    control,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(userSchema),
  });

  return (
    <Box px="5" py="10" flex={1}>
      <VStack space={7} flex={1}>
        <VStack space={2}>
          <Heading size="lg">Forgot Password</Heading>
          <Heading fontWeight="light" size="sm">
            Enter your email and instructions will be sent to you!
          </Heading>
        </VStack>

        <VStack space={3} mt="5">
          <Input
            placeholder="Email"
            label="Email"
            name="email"
            errors={errors}
            control={control}
            onChangeText={value => setValue('email', value)}
          />
        </VStack>
      </VStack>

      <VStack space={5}>
        <Button
          colorScheme="primary"
          size="lg"
          isLoading={config.isBtnLoading}
          onPress={handleSubmit(handleSendPasswordResetToken)}>
          Continue
        </Button>
        <Button
          variant="link"
          p={0}
          onPress={() => navigation.navigate('Login')}>
          Oops? I remember my details
        </Button>
      </VStack>
    </Box>
  );
};

export default ForgotPassword;
