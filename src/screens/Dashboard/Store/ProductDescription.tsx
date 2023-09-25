import {AppBar} from '@components';
import useProduct from '@hooks/useProduct';
import {useFocusEffect} from '@react-navigation/native';
import {number_format, discountPercentage, hasDiscount} from '@utils/helper';
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  IconButton,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
  useColorMode,
  useTheme,
} from 'native-base';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {Rating} from 'react-native-ratings';
import HTMLRender from 'react-native-render-html';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductSlider from './Components/ProductSlider';
import CircleMinusIcon from '/assets/svg/circle-minus.svg';
import CirclePlusIcon from '/assets/svg/circle-plus.svg';
import StarSvg from '/assets/svg/star.svg';

const ProductDescription = ({navigation, route}) => {
  const theme = useTheme();
  const {colorMode} = useColorMode();
  const {width} = useWindowDimensions();
  const [count, setcount] = React.useState<number>(1);
  const {
    productData: {details, loading},
    config,
    addProductToCart,
    getProductDetails,
    getCartItem,
  } = useProduct();

  useFocusEffect(
    React.useCallback(() => {
      getProductDetails({id: route.params.id});
      // Place your useEffect logic here
      return () => {
        // Clean up or remove listeners if necessary
      };
    }, []),
  );

  const cartItem = getCartItem(details.id);

  return (
    <>
      <AppBar
        title="Product Details"
        showBackIcon={true}
        rightItem={
          <IconButton
            colorScheme="dark"
            variant="outline"
            rounded="full"
            onPress={() => navigation.navigate('Cart')}
            w={12}
            h={12}
            icon={
              <Icon size={5} as={MaterialCommunityIcons} name="cart-outline" />
            }
          />
        }
      />

      {loading ? (
        <VStack flex={1} justifyContent="center">
          <Spinner accessibilityLabel="Loading products" size="xl" />
        </VStack>
      ) : (
        <>
          <ScrollView
            horizontal={false}
            p={3}
            showsHorizontalScrollIndicator={false}>
            <VStack space={7}>
              <Box position="relative">
                <ProductSlider images={details.images} />
                {hasDiscount(details.price, details.sale_price) && (
                  <Text
                    position="absolute"
                    right="0"
                    bg="primary.600"
                    px={1}
                    fontSize="xs"
                    color="#fff"
                    opacity="0.8">
                    {discountPercentage(details.price, details.sale_price)}
                  </Text>
                )}
              </Box>

              <HStack
                alignItems="flex-start"
                space={2}
                justifyContent="flex-start">
                <VStack flex={1} space={1}>
                  <Text fontSize="2xs" fontWeight="light">
                    Stock: Available ({details.quantity} units)
                  </Text>
                  <Text>{details.name}</Text>
                  <HStack alignItems="center" justifyContent="start">
                    <StarSvg />
                    <Text ml={0.5} fontSize="sm">
                      {details.ratings_avg_rate ? details.ratings_avg_rate : 0}{' '}
                      | {details.ratings_count}
                    </Text>
                  </HStack>
                </VStack>

                <HStack alignItems="center" space={2}>
                  <Pressable
                    onPress={() =>
                      setcount(prev => prev - (prev <= 0 ? 0 : 1))
                    }>
                    <CircleMinusIcon />
                  </Pressable>
                  <Text bold>{count}</Text>
                  <Pressable onPress={() => setcount(prev => prev + 1)}>
                    <CirclePlusIcon />
                  </Pressable>
                </HStack>
              </HStack>
              <VStack space={1}>
                <Text bold>Description</Text>

                {details.description ? (
                  <HTMLRender
                    contentWidth={width}
                    source={{
                      html: details.description,
                    }}
                    tagsStyles={{
                      body: {
                        color: colorMode === 'dark' ? 'white' : 'black',
                      },
                    }}
                  />
                ) : (
                  <Text>No Description</Text>
                )}
              </VStack>
              <VStack space={3} pb={3}>
                <HStack space={2} alignItems="center">
                  <Text bold>Reviews</Text>
                  <Text fontSize="xs" fontWeight="light">
                    {details.ratings_count}
                  </Text>
                </HStack>

                {details?.ratings.length === 0 ? (
                  <Text>No Rating</Text>
                ) : (
                  details?.ratings?.map((item, index) => (
                    <Box key={index}>
                      <HStack
                        space={2}
                        alignItems="flex-start"
                        justifyContent="flex-start"
                        py={2}>
                        <Avatar
                          width={35}
                          height={35}
                          source={{
                            uri: item.user.profile_image,
                          }}
                        />
                        <VStack alignItems="flex-start" space={1}>
                          <Rating
                            readonly={true}
                            tintColor={
                              colorMode === 'dark' ? '#333333' : 'white'
                            }
                            startingValue={item.rate}
                            type="custom"
                            ratingBackgroundColor={
                              colorMode === 'dark' ? 'white' : '#cccc'
                            }
                            ratingCount={5}
                            imageSize={18}
                          />
                          <Text fontSize="xs">{item.comment}</Text>
                        </VStack>
                      </HStack>
                      <Divider />
                    </Box>
                  ))
                )}
              </VStack>
            </VStack>
          </ScrollView>
          <HStack alignItems="center" py={5} p={3}>
            <VStack flex={1}>
              <Text fontSize="xs">Total Price</Text>
              <Heading fontSize="lg">
                ₦{number_format(details?.sale_price)}
              </Heading>
              {hasDiscount(details.price, details.sale_price) && (
                <Text fontSize="xs" fontWeight="light" strikeThrough={true}>
                  ₦{number_format(details.price)}
                </Text>
              )}
            </VStack>
            <Box>
              <Button
                size="lg"
                px={7}
                isLoading={config.isBtnLoading}
                isDisabled={count > details.quantity}
                spinnerPlacement="end"
                isLoadingText="Place Order"
                onPress={() =>
                  addProductToCart({
                    id: details.id,
                    quantity: count + (cartItem ? cartItem.quantity : 0),
                  })
                }>
                Place Order
              </Button>
            </Box>
          </HStack>
        </>
      )}
    </>
  );
};

export default ProductDescription;
