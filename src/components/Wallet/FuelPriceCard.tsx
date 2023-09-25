import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Box, Button, HStack, Heading, Image, Text, VStack} from 'native-base';
import React, {memo} from 'react';
import {ImageBackground, ImageSourcePropType} from 'react-native';
import {number_format, hasDiscount, discountPercentage} from '@utils/helper';

interface model {
  width: any;
  framePath: ImageSourcePropType;
  images: any;
  id: string;
  color: string;
  title: string;
  buttonColor?: string;
  price: number;
  salePrice: number;
}
const FuelPriceCard: React.FC<model> = ({
  width,
  framePath,
  color,
  id,
  title,
  price,
  buttonColor,
  salePrice,
  images,
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <ImageBackground
      source={framePath}
      style={{
        width: width,
        borderRadius: 30,
        padding: 20,
        overflow: 'hidden',
      }}>
      <HStack alignItems="center" justifyContent="space-between" py={2}>
        <HStack space={3} alignItems="center">
          <Image
            source={{
              uri: images[0],
            }}
            w="55"
            h="55"
            rounded="full"
            alt="Fuel Image"
          />
          <VStack space={1}>
            <Text color={color}>{title}</Text>
            <VStack>
              <Heading color={color} fontSize="lg">
                ₦{number_format(salePrice)}
              </Heading>
              {hasDiscount(price, salePrice) && (
                <Text fontSize="2xs" fontWeight="light" strikeThrough={true}>
                  ₦{number_format(price)}
                </Text>
              )}
            </VStack>
            <Text color={color}>Per Liter</Text>
          </VStack>
        </HStack>

        <Button
          bg={buttonColor ? buttonColor : color}
          rounded="full"
          px={7}
          onPress={() =>
            navigation.navigate('BuyFuel', {
              id: id,
              title: title,
            })
          }>
          Buy
        </Button>
      </HStack>
    </ImageBackground>
  );
};

export default memo(FuelPriceCard);
