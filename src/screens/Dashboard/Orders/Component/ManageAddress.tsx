import {
  Button,
  HStack,
  Text,
  Actionsheet,
  Heading,
  Image,
  Flex,
  ScrollView,
  VStack,
} from 'native-base';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import useOrder from '@hooks/useOrder';
import {useFocusEffect} from '@react-navigation/native';

interface model {
  isOpen: boolean;
  onClose: () => any;
}

const ManageAddress: React.FC<model> = ({isOpen, onClose}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const {orderData, getAddresses, selectDeliveryAddress} = useOrder();

  useFocusEffect(
    React.useCallback(() => {
      getAddresses();
      // Place your useEffect logic here
      return () => {
        // Clean up or remove listeners if necessary
      };
    }, []),
  );

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Heading textAlign="center" fontSize="lg">
          Choose Address
        </Heading>

        <HStack justifyContent="flex-end" w="full" my={2}>
          <Button
            variant="unstyled"
            onPress={() => navigation.navigate('AddAddress')}>
            <Text bold>+ Add New Address</Text>
          </Button>
        </HStack>

        <ScrollView w="full">
          {orderData.addresses.length === 0 ? (
            <VStack justifyContent="center" alignItems="center" py={5}>
              <Image
                rounded="lg"
                source={require('/assets/images/empty-box.png')}
                alt="image"
                h="200"
                w="200"
              />
              <Text textAlign="center">No delivery address found</Text>
            </VStack>
          ) : (
            orderData.addresses.map((item, index) => (
              <Actionsheet.Item
                key={index}
                onPress={() => {
                  selectDeliveryAddress(item);
                  onClose();
                }}>
                <VStack>
                  <Text>
                    <Text bold>Address:</Text> {item.address}
                  </Text>
                  <Text>
                    <Text bold>State:</Text> {item.state_name}
                  </Text>
                  <Text>
                    <Text bold>City:</Text> {item.city_name}
                  </Text>
                  <Text>
                    <Text bold>LGA:</Text> {item.lga}
                  </Text>
                  <Text>
                    <Text bold>Postal Code:</Text> {item.postal_code}
                  </Text>
                  <Text>
                    <Text bold>Mobile Number:</Text> {item.mobile_number}
                  </Text>
                </VStack>
              </Actionsheet.Item>
            ))
          )}
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default React.memo(ManageAddress);
