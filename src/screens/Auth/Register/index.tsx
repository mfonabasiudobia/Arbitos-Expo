import {Input} from '@components';
import useAuth from '@hooks/useAuth';
import {useForm, yup, yupResolver} from '@lib/index';
import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  IconButton,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let userSchema = yup.object({
  first_name: yup.string().required().label('First Name'),
  last_name: yup.string().required().label('Last Name'),
  password: yup.string().required().min(6).label('Password'),
  email: yup.string().required().email().label('Email'),
  referral_code: yup.string().nullable().label('Referral Code'),
});

const Register = ({navigation}) => {
  const {handleRegistration, handleTogglePassword, showPassword, config} =
    useAuth();

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
    <ScrollView px="5" py="10">
      <VStack space={7}>
        <VStack space={2}>
          <Heading size="lg">Welcome, Create Your Account</Heading>
          <Heading fontWeight="light" size="sm">
            It only takes a minute to create an Arbitos account
          </Heading>
        </VStack>

        <VStack space={3} mt="5" flex={1}>
          <HStack space={3}>
            <Input
              placeholder="First Name"
              label="First Name"
              name="first_name"
              errors={errors}
              style={{flex: 1}}
              control={control}
            />

            <Input
              placeholder="Last Name"
              label="Last Name"
              name="last_name"
              errors={errors}
              style={{flex: 1}}
              control={control}
            />
          </HStack>

          <Input
            placeholder="Email"
            label="Email"
            name="email"
            errors={errors}
            control={control}
          />

          <Input
            placeholder="Create your password"
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
            placeholder="Referral Code (Optional)"
            label="Referral Code"
            name="referral_code"
            errors={errors}
            control={control}
          />
        </VStack>

        <VStack space={5}>
          <Button
            colorScheme="primary"
            size="lg"
            isLoading={config.isBtnLoading}
            onPress={handleSubmit(handleRegistration)}>
            Finish
          </Button>
          <HStack space={2} justifyContent="center">
            <Text fontSize="sm">Have an account?</Text>
            <Button
              variant="link"
              p={0}
              onPress={() => navigation.navigate('Login')}>
              Login
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default Register;
