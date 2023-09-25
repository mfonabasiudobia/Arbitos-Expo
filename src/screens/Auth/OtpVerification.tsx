import ConfirmCode from '@components/ConfirmCode';
import useAuth from '@hooks/useAuth';
import {Box, Button, Heading, VStack} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';

const OtpVerification = ({navigation, route}) => {
  const firstInput = useRef<any>();
  const secondInput = useRef<any>();
  const thirdInput = useRef<any>();
  const fourthInput = useRef<any>();
  const fifthInput = useRef<any>();
  const sixthInput = useRef<any>();

  const [countdown, setCountdown] = useState(60); // Initial countdown value in seconds

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  const [otp, setOtp] = useState<object>({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
  });

  const {handleOTPVerification, resendOtp, config, userData} = useAuth();

  const handleVerificationSuccessful = (): void => {
    const TYPE = route.params.verificationType;

    const formattedOTP = Object.values(otp).join('');

    if (TYPE == 'FORGOT_PASSWORD') {
      handleOTPVerification(
        {
          otp: formattedOTP,
          email: route.params.email,
        },
        TYPE,
      );
    } else if (TYPE == 'REGISTER') {
      handleOTPVerification(
        {
          otp: formattedOTP,
          email: userData.email,
        },
        TYPE,
      );
    }
  };

  const hanldeResendOtp = () => {
    resendOtp();
    setCountdown(60);
  };

  return (
    <Box px="5" py="10" flex={1}>
      <VStack space={7} flex={1}>
        <VStack space={2}>
          <Heading size="lg">OTP Verification</Heading>
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

export default OtpVerification;
