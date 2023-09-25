import {AppBar} from '@components';
import {
  Box,
  HStack,
  Pressable,
  ScrollView,
  Switch,
  Text,
  VStack,
  useTheme,
  useColorMode,
} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {data} from './utils/constant';
import useUser from '@hooks/useUser';

const Notification = () => {
  const theme = useTheme();
  const {colorMode} = useColorMode();

  const {userData, handleNotificationUpdate} = useUser();

  return (
    <>
      <AppBar title="Notifications" />
      <SafeAreaView style={{marginBottom: 50, flex: 1}}>
        <Box p={3} flex={1}>
          <VStack space={2} flex={1}>
            <Box
              p={2}
              rounded={10}
              bg={
                colorMode === 'dark'
                  ? theme.colors.trueGray[700]
                  : theme.colors.trueGray[50]
              }>
              <ScrollView>
                {data.map((item, index) => (
                  <Pressable key={index}>
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      py={2}>
                      <HStack space={3} alignItems="center">
                        <item.Icon />
                        <Text bold>{item.title}</Text>
                      </HStack>

                      <Switch
                        size="lg"
                        colorScheme="primary"
                        onToggle={value =>
                          handleNotificationUpdate({[item.field]: value})
                        }
                        isChecked={userData[item.field] ? true : false}
                        defaultIsChecked={userData[item.field] ? true : false}
                      />
                    </HStack>
                  </Pressable>
                ))}
              </ScrollView>
            </Box>
          </VStack>
        </Box>
      </SafeAreaView>
    </>
  );
};

export default Notification;
