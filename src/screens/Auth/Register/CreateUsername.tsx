import {Box, Button, FormControl, Heading, VStack} from 'native-base';
import React from 'react';
import {useForm, yup, yupResolver} from '@lib/index';
import useAuth from '@hooks/useAuth';
import {Input} from '@components';

let Schema = yup.object({
  username: yup.string().required().min(3),
});

const CreateUsername = () => {
  const {handleCreateUsername, config, userData} = useAuth();

  const {
    handleSubmit,
    setValue,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(Schema),
  });

  return (
    <Box px="5" py="10" flex={1}>
      <VStack space={7} flex={1}>
        <VStack space={2}>
          <Heading size="xl">Create a username</Heading>
          <Heading fontWeight="light" size="sm">
            Enter your username to proceed
          </Heading>
        </VStack>

        <VStack space={3} mt="5">
          <Input
            placeholder="Username"
            label="Username"
            name="username"
            errors={errors}
            control={control}
            onChangeText={value => setValue('username', value)}
          />
        </VStack>
      </VStack>

      <Button
        colorScheme="primary"
        size="lg"
        isLoading={config.isBtnLoading}
        onPress={handleSubmit(data =>
          handleCreateUsername({...data, email: userData.email}),
        )}>
        Continue
      </Button>
    </Box>
  );
};

export default CreateUsername;
