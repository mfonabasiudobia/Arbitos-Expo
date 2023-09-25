import {AppBar} from '@components';
import useNotification from '@hooks/useNotification';
import useUser from '@hooks/useUser';
import {format_date} from '@utils/helper';
import {
  Avatar,
  HStack,
  Heading,
  Pressable,
  ScrollView,
  Image,
  FlatList,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import BellIcon from '/assets/svg/bell.svg';
import CheckNotificationIcon from '/assets/svg/check-notification.svg';

const Notification = ({navigation}) => {
  const {getNotification, notificationData} = useNotification();
  const {userData} = useUser();

  React.useEffect(() => {
    getNotification();
  }, []);

  return (
    <>
      <AppBar title="Notifications" />

      {notificationData.loading ? (
        <VStack
          alignItems="center"
          space={5}
          flex={1}
          justifyContent="center"
          p={5}>
          <Spinner accessibilityLabel="Loading products" size="xl" />
        </VStack>
      ) : notificationData.history.length == 0 ? (
        <VStack
          alignItems="center"
          space={5}
          flex={1}
          justifyContent="center"
          p={5}>
          <BellIcon width="100" height="100" />
          <Text textAlign="center">
            You don't have any activity yet, start using Arbitos to get your
            activities up.
          </Text>
        </VStack>
      ) : (
        <VStack space={3} p={5}>
          <FlatList
            data={Object.keys(notificationData.history)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item: month}) => (
              <VStack space={2}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{month}</Text>
                {notificationData.history[month].map((notification, index) => (
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    key={index}
                    py={2}>
                    <HStack space={3}>
                      <CheckNotificationIcon />
                      <VStack justifyContent="center">
                        <Text bold>{notification.title}</Text>
                        <Text fontWeight="light" fontSize="xs">
                          {notification.content}
                        </Text>
                      </VStack>
                    </HStack>
                  </HStack>
                ))}
              </VStack>
            )}
          />
        </VStack>
      )}
    </>
  );
};

export default Notification;
