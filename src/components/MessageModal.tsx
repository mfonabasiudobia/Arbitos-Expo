import React from 'react';
import {
  Modal,
  Stack,
  Flex,
  Image,
  Heading,
  Spacer,
  Button,
  HStack,
  Text,
} from 'native-base';
import useAuth from '@hooks/useAuth';

interface model {
  isOpen: boolean;
  onClose: () => any;
  type: 'success' | 'error';
  title?: string;
  buttonTitle?: string;
  description?: string;
  successButtonAction?: () => any;
  errorTitle?: string;
  errorButtonTitle?: string;
  errorDescription?: string;
  showIcon?: booelan;
}
const MessageModal: React.FC<model> = ({
  isOpen = false,
  onClose,
  type,
  title,
  description,
  buttonTitle,
  successButtonAction,
  errorTitle,
  errorDescription,
  errorButtonTitle = 'Try again',
  showIcon = true,
}) => {
  const {config} = useAuth();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      avoidKeyboard
      justifyContent="flex-end"
      bottom="0"
      overlayVisible={true}
      animationPreset="slide">
      <Modal.Content maxWidth="full">
        <Modal.Body p={0}>
          <Stack direction="column" space={5}>
            <Flex
              direction="column"
              justifyContent="center"
              p="5"
              alignItems="center">
              {showIcon && (
                <Image
                  source={
                    type === 'success'
                      ? require('/assets/images/success.png')
                      : require('/assets/images/failed.png')
                  }
                  alt="Image"
                />
              )}

              <Spacer mt={4} />

              <Heading
                size="md"
                fontWeight="semibold"
                mb="2"
                textAlign="center">
                {type === 'success' ? title : errorTitle}
              </Heading>

              <Text textAlign="center">
                {type === 'success' ? description : errorDescription}
              </Text>
            </Flex>

            <HStack>
              {type === 'success' ? (
                <Button
                  colorScheme="primary"
                  py="7"
                  w="full"
                  onPress={successButtonAction}>
                  {buttonTitle}
                </Button>
              ) : (
                <>
                  <Button colorScheme="light" py="7" flex={1} onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="primary"
                    py="7"
                    isLoading={config.isBtnLoading}
                    flex={1}
                    onPress={successButtonAction}>
                    {errorButtonTitle}
                  </Button>
                </>
              )}
            </HStack>
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default React.memo(MessageModal);
