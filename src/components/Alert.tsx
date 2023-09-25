import React from 'react';
import {Alert, VStack, HStack, Text} from 'native-base';
interface model {
  status: 'info' | 'error' | 'success' | 'warning';
  title: string;
  showIcon?: boolean;
  rightItem?: any;
}

const AlertComponent: React.FC<model> = ({
  status,
  title,
  showIcon = true,
  rightItem,
}) => {
  return (
    <Alert
      w="100%"
      status={status}
      py={5}
      bg="#2F80ED"
      rounded={15}
      variant="solid">
      <HStack
        space={1}
        w="full"
        justifyContent="space-between"
        alignItems="center">
        {showIcon ? <Alert.Icon size={5} /> : null}

        <Text fontSize="sm" color="white" fontWeight="light">
          {title}
        </Text>

        <Text color="white">{rightItem}</Text>
      </HStack>
    </Alert>
  );
};

export default React.memo(AlertComponent);
