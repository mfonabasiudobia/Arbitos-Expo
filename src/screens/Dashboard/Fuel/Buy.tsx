import {Alert, AppBar, Input} from '@components';
import useProduct from '@hooks/useProduct';
import useUser from '@hooks/useUser';
import {useForm, yup, yupResolver} from '@lib/index';
import {useFocusEffect} from '@react-navigation/native';
import {number_format} from '@utils/helper';
import {Controller} from 'react-hook-form';
import {
  Box,
  Button,
  Spinner,
  Text,
  VStack,
  FormControl,
  Select,
  Keyboard,
  IconButton,
  Icon,
} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let schema = yup.object({
  litres: yup
    .number()
    .typeError('Litres must be a number')
    .required()
    .integer()
    .required()
    .label('Litres'),
  cylinder_id: yup.string().nullable().label('Cylinder'),
});

const BuyDiesel = ({navigation, route}) => {
  const {
    productData: {details, loading},
    config,
    addProductToCart,
    getProductDetails,
    getCartItem,
  } = useProduct();
  const {userData} = useUser();

  useFocusEffect(
    React.useCallback(() => {
      getProductDetails({id: route.params.id});
      // Place your useEffect logic here
      return () => {
        // Clean up or remove listeners if necessary
      };
    }, []),
  );

  const {
    handleSubmit,
    control,
    watch,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      cylinder_id: '',
    },
  });

  const litres = watch('litres', 0);

  const cartItem = getCartItem(details.id);

  const handleFormSubmit = data => {
    console.log('Product ID:', details.id);
    console.log('Cylinder ID:', data.cylinder_id);
    addProductToCart({
      id: details.id,
      quantity: data.litres + (cartItem ? cartItem.quantity : 0),
    });
  };

  return (
    <>
      <AppBar
        title={`Buy ${route.params.title}`}
        rightItem={
          <IconButton
            colorScheme="dark"
            variant="outline"
            onPress={() => navigation.navigate('Cart')}
            rounded="full"
            w={12}
            h={12}
            icon={
              <Icon size={5} as={MaterialCommunityIcons} name="cart-outline" />
            }
          />
        }
      />
      {loading ? (
        <Spinner accessibilityLabel="Loading products" size="xl" />
      ) : (
        <Box px="5" py="5" flex={1}>
          <Box flex={1}>
            <VStack space={3} mb={3}>
              <Input
                placeholder="Enter liters"
                label="Enter liters"
                name="litres"
                errors={errors}
                control={control}
              />

              {route.params.title === 'Gas' && (
                <>
                  <FormControl isInvalid={errors['cylinder_id'] ? true : false}>
                    <FormControl.Label>Cylinder (Optional)</FormControl.Label>
                  </FormControl>

                  <Controller
                    control={control}
                    name="cylinder_id"
                    render={({field: {onChange, value}}) => (
                      <Select
                        accessibilityLabel="Select Cylinder"
                        placeholder="Select Cylinder"
                        onValueChange={value => {
                          onChange(value);
                          addProductToCart({
                            id: value,
                            quantity: 1,
                          });
                        }}
                        maxH="12"
                        variant="filled">
                        {config.data.cylinders.map((item, index) => (
                          <Select.Item
                            key={index}
                            label={`${item.name} -  ₦${number_format(
                              item.price,
                            )}`}
                            value={item.id}
                          />
                        ))}
                      </Select>
                    )}
                  />

                  <FormControl isInvalid={errors['cylinder_id'] ? true : false}>
                    {errors['cylinder_id'] && (
                      <FormControl.ErrorMessage>
                        {errors['cylinder_id'].message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                </>
              )}

              <Text fontWeight="semibold">
                Wallet Balance: ₦{number_format(userData.wallet_balance)}
              </Text>
            </VStack>

            <Alert
              status="error"
              title="Estimated Price"
              rightItem={`₦ ${number_format(details.price * litres)}`}
              showIcon={false}
            />
          </Box>

          <Button
            colorScheme="primary"
            size="lg"
            isLoading={config.isBtnLoading}
            spinnerPlacement="end"
            isLoadingText="Buy Now"
            onPress={handleSubmit(handleFormSubmit)}>
            Continue
          </Button>
        </Box>
      )}
    </>
  );
};

export default BuyDiesel;
