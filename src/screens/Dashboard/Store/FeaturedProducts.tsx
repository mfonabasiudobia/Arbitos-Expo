import {AppBar, SearchBox} from '@components';
import ProductCard from '@components/Product/ProductCard';
import useProduct from '@hooks/useProduct';
import debounce from 'lodash.debounce';
import {
  Icon,
  IconButton,
  ScrollView,
  HStack,
  Box,
  Image,
  VStack,
  Spinner,
  Text,
} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';

const FeaturedProducts = ({navigation}) => {
  const {width} = Dimensions.get('window');

  const {getProducts, productData} = useProduct();

  useFocusEffect(
    React.useCallback(() => {
      getProducts({is_featured: 1});
      // Place your useEffect logic here
      return () => {
        // Clean up or remove listeners if necessary
      };
    }, []),
  );

  const handleSearchValue = text => {
    // Call the handleSearchValue function when the text changes
    debouncedSearch(text);
  };

  const debouncedSearch = debounce(value => {
    getProducts({
      is_featured: 1,
      search: value,
      product_type: 'general-merchandize',
    });
  }, 1500);

  return (
    <>
      <AppBar
        title="Featured Products"
        showBackIcon={true}
        rightItem={
          <IconButton
            colorScheme="dark"
            variant="outline"
            onPress={() => navigation.navigate('Cart')}
            rounded="full"
            w={12}
            h={12}
            icon={
              <Icon size={5} as={MaterialCommunityIcons} name="cart-outline" />
            }
          />
        }
      />

      <ScrollView
        horizontal={false}
        p={3}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 5}}>
        <VStack space={5}>
          <SearchBox
            placeholder="Search a product"
            onChangeText={handleSearchValue}
          />

          {productData.loading ? (
            <Spinner accessibilityLabel="Loading products" size="xl" />
          ) : productData.featured_products.length === 0 ? (
            <VStack alignItems="center">
              <Image
                rounded="lg"
                source={require('/assets/images/empty-box.png')}
                alt="image"
                h="200"
                w="200"
              />
              <Text textAlign="center">No Products Found!</Text>
            </VStack>
          ) : (
            <HStack flexWrap="wrap">
              {productData.featured_products.map((item, index) => (
                <Box
                  w="48.5%"
                  mb={2}
                  mr={index % 2 === 0 ? '3%' : 0}
                  key={index}>
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
              ))}
            </HStack>
          )}
        </VStack>
      </ScrollView>
    </>
  );
};

export default FeaturedProducts;
