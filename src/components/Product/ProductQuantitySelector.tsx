import {
  Box,
  HStack,
  Heading,
  Button,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
  useTheme,
  Pressable,
  useColorMode,
} from 'native-base';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CircleMinusIcon from '/assets/svg/circle-minus.svg';
import CirclePlusIcon from '/assets/svg/circle-plus.svg';
import {
  number_format,
  strip_tags,
  hasDiscount,
  discountPercentage,
} from '@utils/helper';
import useProduct from '@hooks/useProduct';

interface model {
  id: string;
  name: string;
  price: number;
  salePrice: number;
  quantity: number;
  images: any;
  showActionButtons?: boolean;
  description?: string;
}

const ProductQuantitySelector: React.FC<model> = ({
  id,
  name,
  price,
  salePrice,
  quantity,
  images,
  showActionButtons = true,
  description = '',
}) => {
  const theme = useTheme();
  const {colorMode} = useColorMode();

  const {
    removeItemFromCart,
    decreaseQuantityFromCart,
    increaseQuantityFromCart,
    config,
  } = useProduct();

  return (
    <HStack
      bg={
        colorMode === 'dark'
          ? theme.colors.trueGray[700]
          : theme.colors.trueGray[50]
      }
      p={3}
      space={3}
      rounded={10}>
      <Box>
        <Image
          source={{
            uri: images[0],
          }}
          alt="Image"
          w={70}
          rounded="lg"
          h={70}
        />
      </Box>
      <VStack flexShrink={1} space={2}>
        <VStack space={1}>
          <Text isTruncated>{name}</Text>
          <Text fontSize="xs" isTruncated>
            {strip_tags(description)}
          </Text>
          <Text bold>
            ₦{' '}
            {salePrice
              ? number_format(salePrice * quantity)
              : number_format(price * quantity)}
          </Text>
          {hasDiscount(price, salePrice) && (
            <HStack space={2} alignItems="center">
              <Text fontSize="xs" fontWeight="light" strikeThrough={true}>
                ₦{number_format(price)}
              </Text>
              <Text
                bg="primary.600"
                px={1}
                fontSize="xs"
                color="#fff"
                opacity="0.8">
                {discountPercentage(price, salePrice)}
              </Text>
            </HStack>
          )}
        </VStack>
        {showActionButtons && (
          <HStack alignItems="center">
            <HStack alignItems="center" space={2} flex={1}>
              <Button
                variant="unstyled"
                p={0}
                w={9}
                h={9}
                bg={config.isBtnLoading ? 'primary.600' : 'transparent'}
                rounded="full"
                isLoading={config.isBtnLoading}
                onPress={() => decreaseQuantityFromCart(id, 1, quantity)}>
                <CircleMinusIcon />
              </Button>
              <Text bold>{quantity}</Text>
              <Button
                variant="unstyled"
                p={0}
                w={9}
                h={9}
                bg={config.isBtnLoading ? 'primary.600' : 'transparent'}
                rounded="full"
                isLoading={config.isBtnLoading}
                onPress={() => increaseQuantityFromCart(id, 1, quantity)}>
                <CirclePlusIcon />
              </Button>
            </HStack>

            <IconButton
              colorScheme="dark"
              rounded="full"
              variant="outline"
              onPress={() => removeItemFromCart(id)}
              icon={
                <Icon
                  size={3}
                  as={AntDesign}
                  color={
                    colorMode === 'dark'
                      ? theme.colors.trueGray[50]
                      : theme.colors.trueGray[700]
                  }
                  name="delete"
                />
              }
            />
          </HStack>
        )}
      </VStack>
    </HStack>
  );
};

export default React.memo(ProductQuantitySelector);
