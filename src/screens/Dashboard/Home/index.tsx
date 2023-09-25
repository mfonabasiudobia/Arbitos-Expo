import ProductCard from '@components/Product/ProductCard';
import VirtualCard from '@components/Wallet/VirtualCard';
import WalletCard from '@components/Wallet/WalletCard';
import useProduct from '@hooks/useProduct';
import useUser from '@hooks/useUser';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
  useColorMode,
  useTheme,
} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';

const images = [
  require('/assets/images/slideshow/one.png'),
  require('/assets/images/slideshow/one.png'),
];

const Home = ({navigation}) => {
  const {width} = Dimensions.get('window');

  const {userData, config} = useUser();
  const {getProducts, productData} = useProduct();

  const theme = useTheme();
  const {colorMode} = useColorMode();

  React.useEffect(() => {
    getProducts({is_featured: 1});
    getProducts({is_featured: 0, product_type: 'fuel'});
  }, []);

  return (
    <ScrollView>
      <VStack p="5" space={5}>
        <HStack justifyContent="space-between">
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <HStack space={2}>
              <Avatar
                bg="green.500"
                source={{
                  uri: userData.profile_image,
                }}
              />
              <VStack>
                <Heading size="md">{userData.username},</Heading>
                <Text>Welcome 👋</Text>
              </VStack>
            </HStack>
          </Pressable>

          <IconButton
            colorScheme="dark"
            variant="outline"
            rounded="full"
            onPress={() => navigation.navigate('UserNotification')}
            w={12}
            h={12}
            icon={<Icon size={6} as={Ionicons} name="notifications-outline" />}
          />
        </HStack>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <WalletCard width={width - 70} />

          {userData.user_virtual_banks.slice(0, 1).map((item, index) => (
            <VirtualCard
              key={index}
              width={width - 70}
              accountName={item.account_name}
              bankName={item.bank_name}
              accountNumber={item.account_number}
            />
          ))}
        </ScrollView>

        <VStack space={3}>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between">
            <Heading size="sm">Today's Price</Heading>
            <Button
              variant="ghost"
              p={0}
              colorScheme="blue"
              onPress={() => navigation.navigate('Buy Oil')}>
              See all
            </Button>
          </Flex>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bg={
              colorMode === 'dark'
                ? theme.colors.trueGray[700]
                : theme.colors.trueGray[50]
            }
            rounded="xl"
            p={3}
            contentContainerStyle={{paddingBottom: 5}}>
            {productData.loading ? (
              <Spinner accessibilityLabel="Loading products" size="xl" />
            ) : (
              productData.fuel_products.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate('BuyFuel', {
                      id: item.id,
                      title: item.name,
                    })
                  }>
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    key={index}
                    space={5}
                    mr={5}
                    py={2}>
                    <HStack space={3} alignItems="center">
                      <Image
                        source={{
                          uri: item.images[0],
                        }}
                        w="55"
                        h="55"
                        rounded="full"
                        alt="Fuel Image"
                      />
                      <VStack>
                        <Text bold>{item.name}</Text>
                        <Text>Per Liter</Text>
                      </VStack>
                    </HStack>

                    <Button
                      rounded="full"
                      px={3}
                      size="sm"
                      bg="#FFE9DB"
                      variant="ghost">
                      {`₦${item.price}/L`}
                    </Button>
                  </HStack>
                </Pressable>
              ))
            )}
          </ScrollView>
        </VStack>

        <VStack space={3}>
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between">
            <Heading size="sm">Featured Products</Heading>
            <Button
              variant="ghost"
              p={0}
              colorScheme="blue"
              onPress={() => navigation.navigate('FeaturedProduct')}>
              See all
            </Button>
          </Flex>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 5}}>
            {productData.loading ? (
              <Spinner accessibilityLabel="Loading products" size="xl" />
            ) : (
              productData.featured_products.slice(0, 7).map((item, index) => (
                <Box w={200} mr={3} key={index}>
                  <ProductCard
                    width="full"
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    salePrice={item.sale_price}
                    ratingsCount={item.ratings_count}
                    averageRating={item.ratings_avg_rate}
                    images={item.images}
                    onPress={() =>
                      navigation.navigate('ProductDescription', {
                        id: item.id,
                      })
                    }
                  />
                </Box>
              ))
            )}
          </ScrollView>

          <Carousel
            loop
            width={width - 40}
            height={112}
            autoPlay={true}
            data={config.data.banners}
            scrollAnimationDuration={1000}
            autoPlayInterval={5000}
            renderItem={({item, index}) => (
              <Image
                source={{uri: item.image}}
                alt="Slider"
                h="110"
                key={index}
                rounded="xl"
                resizeMode="stretch"
              />
            )}
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default Home;
