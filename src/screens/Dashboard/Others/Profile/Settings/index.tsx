import {AppBar} from '@components';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useTheme,
  useColorMode,
} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {data} from './utils/constant';

const Settings = ({navigation}) => {
  const theme = useTheme();
  const {colorMode} = useColorMode();

  return (
    <>
      <AppBar title="Settings" />
      <ScrollView>
        <VStack p={3} space={2} flex={1}>
          <Box
            p={2}
            rounded={10}
            bg={
              colorMode === 'dark'
                ? theme.colors.trueGray[700]
                : theme.colors.trueGray[50]
            }>
            {data.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => navigation.navigate(item.routeName)}>
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  py={2}>
                  <HStack space={3} alignItems="center">
                    <item.Icon />
                    <Text bold>{item.title}</Text>
                  </HStack>

                  <IconButton
                    variant="unstyled"
                    rounded="full"
                    icon={
                      <Icon
                        size={5}
                        color={
                          colorMode === 'dark'
                            ? theme.colors.trueGray[50]
                            : theme.colors.trueGray[700]
                        }
                        as={Entypo}
                        name="chevron-thin-right"
                      />
                    }
                  />
                </HStack>
              </Pressable>
            ))}
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
};

export default Settings;
