import {
  AspectRatio,
  Flex,
  Heading,
  Image,
  Pressable,
  Text,
  VStack,
  useTheme,
  useColorMode,
} from 'native-base';
import StarSvg from '/assets/svg/star.svg';
import React from 'react';
import {number_format, hasDiscount, discountPercentage} from '@utils/helper';

interface model {
  width: any;
  [key: string]: any;
  quantity: number;
  name: string;
  price: number;
  salePrice: number;
  minimum_order_quantity?: number;
  maximum_order_quantity?: number;
  description?: string;
  images: any;
  ratingsCount: number;
  averageRating: number;
}

const ProductCard: React.FC<model> = ({
  width,
  quantity = 0,
  name,
  price = 0,
  salePrice = 0,
  minimum_order_quantity = 1,
  maximum_order_quantity = 1,
  description,
  images = [],
  ratingsCount = 0,
  averageRating,
  ...rest
}) => {
  const theme = useTheme();
  const {colorMode} = useColorMode();

  return (
    <Pressable {...rest}>
      <VStack
        mr={3}
        p={2}
        style={{elevation: 1}}
        space={2}
        bg={
          colorMode === 'dark'
            ? theme.colors.trueGray[700]
            : theme.colors.trueGray[50]
        }
        rounded="lg"
        w={width}>
        {images.length > 0 && (
          <AspectRatio ratio={9 / 5}>
            <Image
              rounded="lg"
              source={{
                uri: images[0],
              }}
              alt="image"
            />
          </AspectRatio>
        )}

        <VStack>
          <Text fontSize="2xs" fontWeight="light" isTruncated>
            Stock: Available ({quantity} units)
          </Text>
          <Text fontSize="xs" isTruncated>
            {name}
          </Text>
        </VStack>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Flex direction="row" alignItems="center" justifyContent="start">
            <StarSvg />
            <Text ml={0.5} fontSize="sm">
              {averageRating} | {ratingsCount}
            </Text>
          </Flex>

          <VStack h="7" justifyContent="center">
            <Heading fontSize="xs" textAlign="right">
              ₦{number_format(salePrice)}
            </Heading>
            {hasDiscount(price, salePrice) && (
              <Text
                fontSize="2xs"
                fontWeight="light"
                textAlign="right"
                strikeThrough={true}>
                ₦{number_format(price)}
              </Text>
            )}
          </VStack>
        </Flex>
      </VStack>
      {hasDiscount(price, salePrice) && (
        <Text
          position="absolute"
          right="0"
          bg="primary.600"
          px={1}
          fontSize="xs"
          color="#fff"
          opacity="0.8">
          {discountPercentage(price, salePrice)}
        </Text>
      )}
    </Pressable>
  );
};

export default React.memo(ProductCard);
