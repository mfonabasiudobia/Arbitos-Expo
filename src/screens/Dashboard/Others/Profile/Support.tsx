import {AppBar} from '@components';
import {VStack, Spinner} from 'native-base';
import React from 'react';
import {WebView} from 'react-native-webview';
import useUser from '@hooks/useUser';

const Support = ({navigation}) => {
  const {config} = useUser();

  return (
    <>
      <AppBar title="Help & Support" />
      <VStack py="5" flex={1}>
        <WebView
          source={{uri: config.data.config.help_and_support_url}}
          startInLoadingState={true}
          renderLoading={() => {
            return (
              <VStack flex={1} justifyContent="flex-start" alignItems="center">
                <Spinner size="xl" />
              </VStack>
            );
          }}
        />
      </VStack>
    </>
  );
};

export default Support;
