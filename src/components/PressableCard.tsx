import React from 'react';
import {
  HStack,
  Heading,
  Text,
  Icon,
  VStack,
  useTheme,
  Pressable,
  useColorMode,
} from 'native-base';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

interface model {
  title?: string;
  description?: string;
  toggleActionSheet: () => void;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
}

const PressableCard: React.FC<model> = ({
  title,
  description,
  toggleActionSheet,
  showLeftIcon = true,
  showRightIcon = true,
}) => {
  const theme = useTheme();
  const {colorMode} = useColorMode();

  return (
    <Pressable onPress={toggleActionSheet}>
      <HStack
        bg={
          colorMode === 'dark'
            ? theme.colors.trueGray[700]
            : theme.colors.trueGray[50]
        }
        px={3}
        py={4}
        rounded={10}
        space={2}
        alignItems="center">
        <VStack space={1} flex={1}>
          <Heading fontSize="sm">{title}</Heading>
          <Text>{description}</Text>
        </VStack>
        {showRightIcon && (
          <Icon as={EvilIcons} name="chevron-right" size={10} />
        )}
      </HStack>
    </Pressable>
  );
};

export default React.memo(PressableCard);
