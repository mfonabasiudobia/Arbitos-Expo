import {Input} from '@components';
import useAuth from '@hooks/useAuth';
import {useForm, yup, yupResolver} from '@lib/index';
import {Box, Button, Heading, Icon, IconButton, VStack} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let schema = yup.object({
  password: yup.string().required().min(6).label('Password'),
  confirm_passowrd: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required()
    .label('Confirm Password'),
});

const Login = () => {
  const {handlePasswordReset, handleTogglePassword, showPassword, config} =
    useAuth();

  const {
    handleSubmit,
    setValue,
    control,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  return (
    <Box px="5" py="10" flex={1}>
      <VStack space={7} flex={1}>
        <VStack space={2}>
          <Heading size="lg">Reset Password</Heading>
          <Heading fontWeight="light" size="sm">
            Enter a new password for your account
          </Heading>
        </VStack>

        <VStack space={3} mt="5">
          <Input
            placeholder="Password"
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

          <Input
            placeholder="Confirm Password"
            label="Confirm Password"
            name="confirm_passowrd"
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
        </VStack>
      </VStack>

      <Button
        colorScheme="primary"
        size="lg"
        isLoading={config.isBtnLoading}
        onPress={handleSubmit(handlePasswordReset)}>
        Continue
      </Button>
    </Box>
  );
};

export default Login;
