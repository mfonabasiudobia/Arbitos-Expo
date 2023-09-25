import SearchBox from '@components/SearchBox';
import {
  Actionsheet,
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  Image,
  useTheme,
  ScrollView,
  useColorMode,
} from 'native-base';
import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import RoundedUserIcon from '/assets/svg/rounded-user.svg';
import useAuth from '@hooks/useAuth';

interface model {
  showSavedAccounts: boolean;
  toggleSaveAccounts: () => void;
  setAccount: any;
}

const SavedAccounts: React.FC<model> = ({
  showSavedAccounts,
  toggleSaveAccounts,
  setAccount,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const theme = useTheme();
  const {colorMode} = useColorMode();
  const {width} = useWindowDimensions();
  const {userData} = useAuth();

  return (
    <Actionsheet isOpen={showSavedAccounts} onClose={toggleSaveAccounts}>
      <Actionsheet.Content>
        <VStack py={5} space={5}>
          <Heading fontSize="lg" textAlign="center" fontWeight="semibold">
            Your Saved Accounts
          </Heading>

          {/* <SearchBox
            value={searchValue}
            placeholder="Type name"
            onChangeText={setSearchValue}
          /> */}
        </VStack>

        <ScrollView>
          {userData.beneficiary_accounts.length === 0 ? (
            <VStack justifyContent="center" alignItems="center" py={5}>
              <Image
                rounded="lg"
                source={require('/assets/images/empty-box.png')}
                alt="image"
                h="200"
                w="200"
              />
              <Text textAlign="center">No Accounts found</Text>
            </VStack>
          ) : (
            userData.beneficiary_accounts
              .filter(
                item =>
                  item.account_name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  item.account_number
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()),
              )
              .slice(0, 70)
              .map((item, index) => (
                <Actionsheet.Item
                  key={index}
                  py={2}
                  onPress={() => {
                    setAccount({
                      account_name: item.account_name,
                      account_number: item.account_number,
                      bank_id: item.bank.id,
                    });
                    toggleSaveAccounts();
                  }}
                  bg={
                    colorMode === 'dark'
                      ? theme.colors.trueGray[700]
                      : theme.colors.trueGray[50]
                  }>
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    space={3}
                    w={width - 50}>
                    <HStack alignItems="center" space={3}>
                      <RoundedUserIcon width={40} />
                      <Box>
                        <Heading fontSize="sm">{item.account_name}</Heading>
                        <Text fontSize="xs">{item.account_number}</Text>
                      </Box>
                    </HStack>
                    <Box>
                      <Text fontSize="xs">{item.bank.name}</Text>
                    </Box>
                  </HStack>
                </Actionsheet.Item>
              ))
          )}
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default React.memo(SavedAccounts);
