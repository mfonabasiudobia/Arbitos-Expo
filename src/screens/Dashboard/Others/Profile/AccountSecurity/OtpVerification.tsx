import ConfirmCode from '@components/ConfirmCode';
import useAuth from '@hooks/useAuth';
import {Box, Button, Heading, VStack} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';

const SecurityPinOtpVerification = () => {
  const [countdown, setCountdown] = useState(60); // Initial countdown value in seconds
  const {handleOTPVerification, resendOtp, config, userData} = useAuth();

  const firstInput = useRef<any>();
  const secondInput = useRef<any>();
  const thirdInput = useRef<any>();
  const fourthInput = useRef<any>();
  const fifthInput = useRef<any>();
  const sixthInput = useRef<any>();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  useEffect(() => {
    resendOtp();
  }, []);

  const [otp, setOtp] = useState<object>({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
  });

  const handleVerificationSuccessful = (): void => {
    handleOTPVerification(
      {otp: Object.values(otp).join(''), email: userData.email},
      'RESET_SECURITY_PIN',
    );
  };

  const hanldeResendOtp = () => {
    resendOtp();
    setCountdown(60);
  };

  return (
    <Box px="5" py="10" flex={1}>
      <VStack space={7} flex={1}>
        <VStack space={2}>
          <Heading size="xl">OTP Verification</Heading>
          <Heading fontWeight="light" size="sm">
            6 digit code has been sent to your email
          </Heading>
        </VStack>

        <ConfirmCode
          hanldeResendOtp={hanldeResendOtp}
          firstInput={firstInput}
          secondInput={secondInput}
          thirdInput={thirdInput}
          fourthInput={fourthInput}
          fifthInput={fifthInput}
          sixthInput={sixthInput}
          setOtp={setOtp}
          otp={otp}
          countdown={countdown}
        />
      </VStack>

      <Button
        colorScheme="primary"
        size="lg"
        isDisabled={otp[6] ? false : true}
        isLoading={config.isBtnLoading}
        onPress={handleVerificationSuccessful}>
        Verify
      </Button>
    </Box>
  );
};

export default SecurityPinOtpVerification;
