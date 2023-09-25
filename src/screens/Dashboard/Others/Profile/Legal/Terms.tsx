import {AppBar} from '@components';
import {VStack, Spinner} from 'native-base';
import React from 'react';
import {WebView} from 'react-native-webview';
import useUser from '@hooks/useUser';

const Terms = ({navigation}) => {
  const {config} = useUser();

  return (
    <>
      <AppBar title="Terms & Condition" />
      <VStack py="5" flex={1}>
        <WebView
          source={{uri: config.data.config.terms_and_condition_url}}
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

export default Terms;
