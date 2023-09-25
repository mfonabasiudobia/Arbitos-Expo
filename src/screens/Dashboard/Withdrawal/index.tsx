import {AppBar, Input} from '@components';
import SearchBox from '@components/SearchBox';
import useAuth from '@hooks/useAuth';
import useWithdrawal from '@hooks/useWithdrawal';
import {useDispatch, useForm, yup, yupResolver} from '@lib/index';
import {setWithdrawData} from '@redux/actions';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Icon,
  IconButton,
  ScrollView,
  Select,
  Switch,
  Text,
  Image,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SaveAccountButtonCard from './Components/SaveAccountButtonCard';
import SavedAccounts from './Components/SavedAccounts';
import {number_format} from '@utils/helper';
import debounce from 'lodash.debounce';

const Withdrawal = ({navigation}) => {
  React.useEffect(() => {
    getAllbanks();
  }, []);

  const dispatch = useDispatch();

  const [showSavedAccounts, setShowSavedAccounts] = useState<boolean>(false);

  const toggleSaveAccounts = () => setShowSavedAccounts(prev => !prev);

  const [searchValue, setSearchValue] = useState<string>('');

  const [isSave, setIsSave] = useState<boolean>(false);

  const {withdrawData, getAllbanks} = useWithdrawal();

  const {userData} = useAuth();

  const debouncedSearch = debounce(value => {
    setSearchValue(value);
  }, 1000);

  const handleSearchValue = text => {
    // Call the handleSearchValue function when the text changes
    debouncedSearch(text);
  };

  let schema = yup.object({
    account_number: yup
      .number()
      .typeError('Account number must be a number')
      .required()
      .positive()
      .integer()
      .label('Account Number'),
    account_name: yup.string().required().label('Account Name'),
    amount: yup
      .number()
      .typeError('Amount must be a number')
      .required()
      .positive()
      .integer()
      .required()
      .max(userData.wallet_balance, 'Insufficient Wallet Balance')
      .label('Amount'),
    bank_id: yup.string().required().label('Bank Name'),
  });

  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const bank_id = watch('bank_id');

  const handleWithdrawal = data => {
    dispatch(
      setWithdrawData({
        account: {
          is_save: isSave,
          ...data,
        },
      }),
    );

    navigation.navigate('AuthorizeTransaction');
  };

  const setAccounts = data => {
    setValue('account_name', data.account_name);
    setValue('account_number', data.account_number);
    setValue('bank_id', data.bank_id);
  };

  return (
    <>
      <AppBar title="Withdrawal" />
      <Box px="5" py="5" flex={1}>
        <SavedAccounts
          setAccount={setAccounts}
          showSavedAccounts={showSavedAccounts}
          toggleSaveAccounts={toggleSaveAccounts}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <SaveAccountButtonCard toggleSaveAccounts={toggleSaveAccounts} />

          <VStack space={3} py={5}>
            <Input
              placeholder="Enter Account Number"
              label="Account Number"
              name="account_number"
              errors={errors}
              control={control}
              keyboardType="phone-pad"
              InputRightElement={
                <IconButton
                  variant="unstyle"
                  icon={<Icon as={EvilIcons} name="user" size={8} />}
                />
              }
            />

            <Input
              placeholder="Enter Account Name"
              label="Account Name"
              name="account_name"
              errors={errors}
              control={control}
              InputRightElement={
                <IconButton
                  variant="unstyle"
                  icon={<Icon as={EvilIcons} name="user" size={8} />}
                />
              }
            />

            <VStack>
              <FormControl isInvalid={errors['bank_id'] ? true : false}>
                <FormControl.Label>Withdrawal Bank</FormControl.Label>
              </FormControl>

              <Controller
                control={control}
                name="bank_id"
                render={({field: {onChange, value}}) => (
                  <Select
                    accessibilityLabel="Select Bank"
                    placeholder="Select Bank"
                    selectedValue={bank_id}
                    maxH="12"
                    onValueChange={value => onChange(value)}
                    _actionSheetBody={{
                      size: 'full',
                      ListHeaderComponent: (
                        <Box w="full" p={2}>
                          <Heading
                            fontSize="lg"
                            textAlign="center"
                            mb={4}
                            fontWeight="semibold">
                            Select Withdrawal Bank
                          </Heading>
                          <SearchBox
                            placeholder="Type name of bank"
                            value={searchValue}
                            onChangeText={handleSearchValue}
                          />
                          {searchValue && (
                            <Text>Search Term: {searchValue}</Text>
                          )}

                          {withdrawData.banks.filter(({name}) =>
                            name
                              .toLowerCase()
                              .includes(searchValue.toLowerCase()),
                          ).length === 0 ? (
                            <VStack
                              justifyContent="center"
                              alignItems="center"
                              py={5}>
                              <Image
                                rounded="lg"
                                source={require('/assets/images/empty-box.png')}
                                alt="image"
                                h="200"
                                w="200"
                              />
                              <Text textAlign="center">No Banks found</Text>
                            </VStack>
                          ) : null}
                        </Box>
                      ),
                    }}
                    variant="filled">
                    {withdrawData.banks
                      .filter(({name}) =>
                        name.toLowerCase().includes(searchValue.toLowerCase()),
                      )
                      .slice(0, 70)
                      .map((item, index) => (
                        <Select.Item
                          key={index}
                          label={item.name}
                          value={item.id}
                        />
                      ))}
                  </Select>
                )}
              />
              <FormControl isInvalid={errors['bank_id'] ? true : false}>
                {errors['bank_id'] && (
                  <FormControl.ErrorMessage>
                    {errors['bank_id'].message}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            </VStack>

            <Input
              placeholder="Enter Withdrawal Amount"
              label="Withdrawal Amount"
              name="amount"
              keyboardType="phone-pad"
              errors={errors}
              control={control}
            />

            <Text fontWeight="semibold">
              Wallet Balance: ₦{number_format(userData.wallet_balance)}
            </Text>

            <FormControl>
              <Flex direction="row" justifyContent="space-between">
                <FormControl.Label>Save as beneficiary</FormControl.Label>

                <Switch
                  size="lg"
                  colorScheme="primary"
                  onToggle={value => setIsSave(value)}
                  isChecked={isSave}
                />
              </Flex>
            </FormControl>
          </VStack>
        </ScrollView>

        <Button
          colorScheme="primary"
          size="lg"
          onPress={handleSubmit(handleWithdrawal)}>
          Continue
        </Button>
      </Box>
    </>
  );
};

export default Withdrawal;
