import {AppBar, Input} from '@components';
import useOrder from '@hooks/useOrder';
import {useForm, yup, yupResolver} from '@lib/index';
import {Box, Button, HStack, ScrollView, VStack} from 'native-base';
import React from 'react';

let schema = yup.object({
  address: yup.string().required().label('Address'),
  state_name: yup.string().required().label('State'),
  lga: yup.string().required().label('Local Government'),
  postal_code: yup.string().required().label('Postal Code'),
  mobile_number: yup.string().required().label('Mobile Number'),
  city_name: yup.string().required().label('City'),
});

const AddAddress = ({navigation}) => {
  const {config, addAddress} = useOrder();

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
    <>
      <AppBar title="Shipping Address" />
      <Box px="5" py="5" flex={1}>
        <ScrollView mt="5">
          <VStack space={3}>
            <Input
              placeholder="Enter your address"
              label="Deliver to"
              name="address"
              errors={errors}
              control={control}
            />

            <Input
              placeholder="Enter your state of resident"
              label="State"
              name="state_name"
              errors={errors}
              control={control}
            />

            <Input
              placeholder="Enter your resident LGA"
              label="Local Government"
              name="lga"
              errors={errors}
              control={control}
            />

            <HStack space={5}>
              <Input
                placeholder="Enter your City"
                label="City"
                name="city_name"
                errors={errors}
                style={{flex: 1}}
                control={control}
              />

              <Input
                placeholder="Enter your Postal Code"
                label="Postal Code"
                name="postal_code"
                keyboardType="phone-pad"
                errors={errors}
                style={{flex: 1}}
                control={control}
              />
            </HStack>

            <Input
              placeholder="Enter your mobile address"
              label="Mobile Number"
              name="mobile_number"
              keyboardType="phone-pad"
              errors={errors}
              control={control}
            />
          </VStack>
        </ScrollView>

        <Button
          colorScheme="primary"
          size="lg"
          isLoading={config.isBtnLoading}
          onPress={handleSubmit(addAddress)}>
          Continue
        </Button>
      </Box>
    </>
  );
};

export default AddAddress;
