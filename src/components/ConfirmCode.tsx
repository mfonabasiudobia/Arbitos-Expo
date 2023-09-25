import {Button, HStack, Input, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';

const ConfirmCode = ({
  firstInput,
  secondInput,
  thirdInput,
  fourthInput,
  fifthInput,
  sixthInput,
  otp,
  setOtp,
  hanldeResendOtp,
  countdown,
}) => {
  return (
    <VStack space={3}>
      <HStack space={2}>
        <Input
          variant="filled"
          flex={1}
          textAlign="center"
          fontSize="25"
          maxH="12"
          keyboardType="phone-pad"
          ref={firstInput}
          maxLength={1}
          onChangeText={text => {
            setOtp({...otp, 1: text});
            text && secondInput.current.focus();
          }}
        />
        <Input
          variant="filled"
          flex={1}
          textAlign="center"
          fontSize="25"
          maxH="12"
          keyboardType="phone-pad"
          ref={secondInput}
          maxLength={1}
          onChangeText={text => {
            setOtp({...otp, 2: text});
            text ? thirdInput.current.focus() : firstInput.current.focus();
          }}
        />
        <Input
          variant="filled"
          flex={1}
          textAlign="center"
          fontSize="25"
          maxH="12"
          keyboardType="phone-pad"
          ref={thirdInput}
          maxLength={1}
          onChangeText={text => {
            setOtp({...otp, 3: text});
            text ? fourthInput.current.focus() : secondInput.current.focus();
          }}
        />
        <Input
          variant="filled"
          flex={1}
          textAlign="center"
          fontSize="25"
          maxH="12"
          keyboardType="phone-pad"
          ref={fourthInput}
          maxLength={1}
          onChangeText={text => {
            setOtp({...otp, 4: text});
            text ? fifthInput.current.focus() : thirdInput.current.focus();
          }}
        />
        <Input
          variant="filled"
          flex={1}
          textAlign="center"
          fontSize="25"
          maxH="12"
          keyboardType="phone-pad"
          ref={fifthInput}
          maxLength={1}
          onChangeText={text => {
            setOtp({...otp, 5: text});
            text ? sixthInput.current.focus() : fourthInput.current.focus();
          }}
        />
        <Input
          variant="filled"
          flex={1}
          textAlign="center"
          fontSize="25"
          maxH="12"
          keyboardType="phone-pad"
          ref={sixthInput}
          maxLength={1}
          onChangeText={text => {
            setOtp({...otp, 6: text});
            !text && fifthInput.current.focus();
          }}
        />
      </HStack>

      <HStack justifyContent="center" space={2}>
        <Button
          p={0}
          variant="ghost"
          isDisabled={countdown > 0}
          onPress={hanldeResendOtp}>
          <Text bold color="primary.600">
            Resend Code
          </Text>
        </Button>
        <Text fontSize="sm" textAlign="center">
          in 00:{countdown}s
        </Text>
      </HStack>
    </VStack>
  );
};

export default ConfirmCode;
