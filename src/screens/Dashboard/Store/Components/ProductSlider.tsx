import {
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  useTheme,
  useColorMode,
  AspectRatio,
} from 'native-base';
import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ActiveCarouselIndicator from '/assets/svg/active-carousel-indicator.svg';
import InActiveCarouselIndicator from '/assets/svg/inactive-carousel-indicator.svg';

interface model {
  images: any;
}

const ProductSlider = ({images}) => {
  const {width} = Dimensions.get('window');
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  const theme = useTheme();
  const {colorMode} = useColorMode();

  return (
    <Box
      rounded="lg"
      position="relative"
      bg={
        colorMode === 'dark'
          ? theme.colors.trueGray[700]
          : theme.colors.trueGray[50]
      }>
      <Carousel
        loop
        width={width}
        height={170}
        autoPlay={true}
        data={images}
        onSnapToItem={index => setCurrentCarouselIndex(index)}
        scrollAnimationDuration={1000}
        autoPlayInterval={5000}
        renderItem={({item, index}) => (
          <AspectRatio ratio={9 / 4} w="full" bg="black" key={index}>
            <Image
              rounded="lg"
              source={{
                uri: item,
              }}
              alt="image"
              resizeMode="contain"
            />
          </AspectRatio>
        )}
      />
      <HStack
        justifyContent="center"
        space={1}
        position="absolute"
        left="45%"
        bottom={2}>
        {images?.map((item, index) => {
          return currentCarouselIndex === index ? (
            <ActiveCarouselIndicator key={index} />
          ) : (
            <InActiveCarouselIndicator key={index} />
          );
        })}
      </HStack>
      {/* <IconButton
        position="absolute"
        right={1}
        top={1}
        icon={<Icon size={7} as={AntDesign} name="heart" />}
      /> */}
    </Box>
  );
};

export default ProductSlider;
