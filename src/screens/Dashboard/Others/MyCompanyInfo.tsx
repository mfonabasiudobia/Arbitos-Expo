import {AppBar, Input} from '@components';
import useUser from '@hooks/useUser';
import {useForm, yup, yupResolver} from '@lib/index';
import {Box, Button, VStack} from 'native-base';
import React from 'react';

let schema = yup.object({
  company_name: yup.string().required().label('Company Name'),
  company_email: yup.string().required().label('Company Email'),
  company_address: yup.string().required().label('Company Address'),
});

const MyCompanyInfo = ({navigation}) => {
  const {config, handleCompanyInformationUpdate, userData} = useUser();

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      company_name: userData.company_name,
      company_email: userData.company_email,
      company_address: userData.company_address,
    },
  });

  return (
    <>
      <AppBar title="My Company Info" />
      <Box px="5" py="5" flex={1}>
        <VStack space={3} mt="5" flex={1}>
          <Input
            placeholder="Enter your company name"
            label="Company Name"
            name="company_name"
            errors={errors}
            control={control}
          />

          <Input
            placeholder="Enter your company email"
            label="Company Email Address"
            name="company_email"
            errors={errors}
            control={control}
          />

          <Input
            placeholder="Enter your company address"
            label="Company Address"
            name="company_address"
            errors={errors}
            control={control}
          />
        </VStack>

        <Button
          colorScheme="primary"
          size="lg"
          isLoading={config.isBtnLoading}
          onPress={handleSubmit(handleCompanyInformationUpdate)}>
          Update Company
        </Button>
      </Box>
    </>
  );
};

export default MyCompanyInfo;
