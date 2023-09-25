import {Modal, Text, VStack} from 'native-base';
import React from 'react';
import {Animated, Easing} from 'react-native';
interface model {
  isOpen: boolean;
}

const PageLoader: React.FC<model> = ({isOpen = false}) => {
  const rotation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000, // Duration of each rotation in milliseconds
        easing: Easing.linear,
        useNativeDriver: false, // Native driver is not supported for rotation
      }),
    ).start();
  }, []);

  const interpolatedRotation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal
      isOpen={isOpen}
      size="full"
      avoidKeyboard
      justifyContent="flex-end"
      bottom="0"
      overlayVisible={true}
      animationPreset="slide">
      <Modal.Content maxWidth="full">
        <Modal.Body p={0}>
          <VStack space={3} justifyContent="center" alignItems="center" py={7}>
            <Animated.Image
              style={[
                {
                  width: 100,
                  height: 100,
                },
                {transform: [{rotate: interpolatedRotation}]},
              ]}
              source={require('/assets/images/page-loader.png')}
            />

            <Text bold textAlign="center">
              Loading...
            </Text>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default React.memo(PageLoader);
