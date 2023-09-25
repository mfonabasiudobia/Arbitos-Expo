import {AppBar, Input} from '@components';
import useUser from '@hooks/useUser';
import {useForm, yup, yupResolver} from '@lib/index';
import {Box, Button, VStack} from 'native-base';
import React from 'react';

let userSchema = yup.object({
  first_name: yup.string().required().label('First Name'),
  last_name: yup.string().required().label('Last Name'),
});

const EditProfile = () => {
  const {config, handleProfileUpdate, userData} = useUser();

  const {
    handleSubmit,
    setValue,
    control,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(userSchema),
    defaultValues: {
      first_name: userData.first_name,
      last_name: userData.last_name,
    },
  });

  return (
    <>
      <AppBar title="Edit Profile" />
      <Box px="5" py="5" flex={1}>
        <VStack space={3} mt="5" flex={1}>
          <Input
            placeholder="First Name"
            label="First Name"
            name="first_name"
            errors={errors}
            defaultValue={userData.first_name}
            control={control}
          />

          <Input
            placeholder="Last Name"
            label="Last Name"
            name="last_name"
            errors={errors}
            defaultValue={userData.last_name}
            control={control}
          />

          <Input
            placeholder="Email"
            label="Email"
            name="email"
            defaultValue={userData.email}
            isReadOnly={true}
            control={control}
            isDisabled={true}
            errors={errors}
          />
        </VStack>

        <Button
          colorScheme="primary"
          size="lg"
          isLoading={config.isBtnLoading}
          onPress={handleSubmit(handleProfileUpdate)}>
          Update
        </Button>
      </Box>
    </>
  );
};

export default EditProfile;
