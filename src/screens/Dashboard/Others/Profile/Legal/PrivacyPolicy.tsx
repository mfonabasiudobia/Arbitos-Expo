import {AppBar} from '@components';
import {VStack, Spinner} from 'native-base';
import React from 'react';
import {WebView} from 'react-native-webview';
import useUser from '@hooks/useUser';

const PrivacyPolicy = ({navigation}) => {
  const {config} = useUser();

  return (
    <>
      <AppBar title="Privacy Policy" />
      <VStack py="5" flex={1}>
        <WebView
          source={{uri: config.data.config.privacy_policy_url}}
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

export default PrivacyPolicy;
