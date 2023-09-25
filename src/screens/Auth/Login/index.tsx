import {Input} from '@components';
import useAuth from '@hooks/useAuth';
import {useForm, yup, yupResolver} from '@lib/index';
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let userSchema = yup.object({
  password: yup.string().required().min(6).label('Password'),
  email: yup.string().required().email().label('Email'),
});

const Login = ({navigation}) => {
  const {handleLogin, handleTogglePassword, showPassword, config} = useAuth();

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
          <Heading size="lg">Welcome Back! Glad to see you, again.</Heading>
          <Heading fontWeight="light" size="sm">
            Log in to your account to continue
          </Heading>
        </VStack>

        <VStack space={3} mt="5">
          <Input
            placeholder="Email"
            label="Email"
            name="email"
            errors={errors}
            control={control}
          />

          <Input
            placeholder="Insert your password"
            label="Password"
            name="password"
            errors={errors}
            type={showPassword ? 'text' : 'password'}
            control={control}
            InputRightElement={
              <IconButton
                variant="unstyle"
                icon={
                  <Icon
                    as={MaterialCommunityIcons}
                    name={showPassword ? 'eye' : 'eye-off'}
                    onPress={handleTogglePassword}
                    size={6}
                  />
                }
              />
            }
          />

          <Flex direction="row" justifyContent="flex-end">
            <Button
              variant="unstyle"
              p={0}
              onPress={() => navigation.navigate('ForgotPassword')}>
              Forgot Password?
            </Button>
          </Flex>
        </VStack>
      </VStack>

      <VStack space={5}>
        <Button
          colorScheme="primary"
          size="lg"
          isLoading={config.isBtnLoading}
          onPress={handleSubmit(handleLogin)}>
          Sign in
        </Button>
        <HStack space={2} justifyContent="center">
          <Text fontSize="sm">Don’t have an account?</Text>
          <Button
            variant="link"
            p={0}
            onPress={() => navigation.navigate('Register')}>
            Sign Up
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Login;
