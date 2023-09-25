import {Box, Button, Flex, Icon, IconButton, Text, VStack} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DailPin = ({pin, setPin}) => {
  const handleFillPin = (item: number | string) => {
    if (!pin[1]) {
      setPin({...pin, 1: item});
    } else if (!pin[2]) {
      setPin({...pin, 2: item});
    } else if (!pin[3]) {
      setPin({...pin, 3: item});
    } else if (!pin[4]) {
      setPin({...pin, 4: item});
    }
  };

  const handleDeletePin = () => {
    if (pin[4]) {
      setPin({...pin, 4: ''});
    } else if (pin[3]) {
      setPin({...pin, 3: ''});
    } else if (pin[2]) {
      setPin({...pin, 2: ''});
    } else if (pin[1]) {
      setPin({...pin, 1: ''});
    }
  };

  return (
    <VStack space={10}>
      <Flex direction="row" justifyContent="center" mt="5">
        {Object.keys(pin).map((item, index) => (
          <IconButton
            key={index}
            icon={
              <Icon
                as={MaterialCommunityIcons}
                name={
                  pin[item]
                    ? 'checkbox-blank-circle'
                    : 'checkbox-blank-circle-outline'
                }
                size={6}
              />
            }
          />
        ))}
      </Flex>

      <VStack space={3}>
        <Flex direction="row" flexWrap="wrap">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, '0', 'X'].map((item, index) => (
            <Button
              key={index}
              flexBasis="33%"
              py={7}
              fontWeight="bold"
              flex={1}
              onPress={() => {
                if (item === 'X') {
                  handleDeletePin();
                } else if (item !== null) {
                  handleFillPin(item);
                }
              }}
              variant="unstyled">
              {item === 'X' ? (
                <Icon
                  as={MaterialCommunityIcons}
                  name="tooltip-remove-outline"
                  size={6}
                />
              ) : (
                <Text fontWeight="bold" fontSize="20">
                  {item}
                </Text>
              )}
            </Button>
          ))}
        </Flex>
      </VStack>
    </VStack>
  );
};

export default DailPin;
