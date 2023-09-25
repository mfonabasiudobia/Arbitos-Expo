import React from 'react';
import {
  HStack,
  Heading,
  Text,
  Icon,
  VStack,
  useTheme,
  Pressable,
  useColorMode,
} from 'native-base';
import HouseIcon from '/assets/svg/house.svg';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const SaveAccountButtonCard = ({toggleSaveAccounts}) => {
  const theme = useTheme();
  const {colorMode} = useColorMode();

  return (
    <Pressable onPress={toggleSaveAccounts}>
      <HStack
        bg={
          colorMode === 'dark'
            ? theme.colors.trueGray[700]
            : theme.colors.trueGray[50]
        }
        px={1}
        py={4}
        rounded={10}
        space={2}
        alignItems="center">
        <HouseIcon />
        <VStack space={1} flex={1}>
          <Heading fontSize="sm">Saved Account</Heading>
          <Text>Withdraw to your saved accounts</Text>
        </VStack>
        <Icon as={EvilIcons} name="chevron-right" size={10} />
      </HStack>
    </Pressable>
  );
};

export default SaveAccountButtonCard;
