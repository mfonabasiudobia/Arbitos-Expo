import {AppBar, Input} from '@components';
import useAuth from '@hooks/useAuth';
import useUser from '@hooks/useUser';
import {useForm, yup, yupResolver} from '@lib/index';
import {Box, Button, Icon, IconButton, VStack} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let userSchema = yup.object({
  old_password: yup.string().required().min(6).label('Old Password'),
  new_password: yup.string().required().min(6).label('New Password'),
  confirm_passowrd: yup
    .string()
    .oneOf([yup.ref('new_password'), ''], 'Passwords must match')
    .required()
    .label('Confirm Password'),
});

const ResetPassword = () => {
  const {handlePasswordReset, config} = useUser();
  const {handleTogglePassword, showPassword} = useAuth();

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
    <>
      <AppBar title="Reset Password" />
      <Box px="5" py="10" flex={1}>
        <VStack space={3} flex={1}>
          <Input
            placeholder="Old password"
            label="Old Password"
            name="old_password"
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
            placeholder="New password"
            label="New Password"
            name="new_password"
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
            placeholder="Confirm New password"
            label="Confirm New Password"
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

        <Button
          colorScheme="primary"
          size="lg"
          isLoading={config.isBtnLoading}
          onPress={handleSubmit(handlePasswordReset)}>
          Reset Password
        </Button>
      </Box>
    </>
  );
};

export default ResetPassword;
