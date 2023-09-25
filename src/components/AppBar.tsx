import {useNavigation} from '@react-navigation/native';
import {
  HStack,
  Icon,
  IconButton,
  Heading,
  useTheme,
  useColorMode,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import React from 'react';

interface model {
  title: string;
  showBackIcon?: boolean;
  rightItem?: any;
}

const AppBar: React.FC<model> = ({title, showBackIcon = true, rightItem}) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const {colorMode} = useColorMode();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      {/* <StatusBar bg="#000" barStyle="light-content" /> */}
      {/* <Box safeAreaTop /> */}
      <HStack justifyContent="space-between" alignItems="center" px={3} py={2}>
        <HStack alignItems="center" space={2}>
          {showBackIcon ? (
            <IconButton
              colorScheme="dark"
              onPress={handleGoBack}
              variant="outline"
              rounded="full"
              w={12}
              h={12}
              icon={
                <Icon
                  size={5}
                  color={
                    colorMode === 'dark'
                      ? theme.colors.trueGray[50]
                      : theme.colors.trueGray[700]
                  }
                  as={Entypo}
                  name="chevron-thin-left"
                />
              }
            />
          ) : null}

          <Heading fontSize="xl" fontWeight="semibold">
            {title}
          </Heading>
        </HStack>

        {rightItem}
      </HStack>
    </>
  );
};

export default React.memo(AppBar);
