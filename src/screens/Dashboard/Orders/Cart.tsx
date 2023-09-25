import {AppBar} from '@components';
import ProductQuantitySelector from '@components/Product/ProductQuantitySelector';
import {Button, VStack, AspectRatio, Image, Text} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import useProduct from '@hooks/useProduct';

const Cart = ({navigation}) => {
  const {productData, config} = useProduct();

  return (
    <>
      <AppBar title="Cart " />
      <VStack px="3" py="5" flex={1} space={7}>
        {productData.cart.length === 0 ? (
          <VStack
            justifyContent="center"
            alignItems="center"
            space={5}
            flex={1}>
            <VStack>
              <Image
                rounded="lg"
                source={require('/assets/images/empty-box.png')}
                alt="image"
                h="200"
                w="200"
              />
              <Text textAlign="center">Your cart is empty</Text>
            </VStack>

            <Button
              onPress={() => navigation.navigate('Store')}
              size="md"
              px="7">
              Continue Shopping
            </Button>
          </VStack>
        ) : (
          <>
            <ScrollView>
              <VStack space={3}>
                {productData.cart.map((item, index) => (
                  <ProductQuantitySelector
                    name={item.name}
                    price={item.price}
                    salePrice={item.sale_price}
                    quantity={item.quantity}
                    description={item.description}
                    images={item.images}
                    id={item.id}
                    key={index}
                  />
                ))}
              </VStack>
            </ScrollView>
            <Button
              colorScheme="primary"
              size="lg"
              isDisabled={productData.cart.length === 0 || config.isBtnLoading}
              onPress={() => navigation.navigate('Checkout')}>
              Checkout
            </Button>
          </>
        )}
      </VStack>
    </>
  );
};

export default Cart;
