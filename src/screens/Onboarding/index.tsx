import React, {useRef, useState} from 'react';
import {View, FlatList, Animated} from 'react-native';
import SLIDES from './Constant/slides';
import OnboardingItem from './Components/OnboardingItem';
import {Button, Flex, VStack} from 'native-base';

const Welcome = ({navigation}: {navigation: any}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const sliderRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any[]}) => {
      setCurrentIndex(viewableItems[0].index);
    },
  ).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = async () => {
    if (currentIndex < SLIDES.length - 1) {
      sliderRef.current.scrollToIndex({
        index: currentIndex + 1,
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={SLIDES}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialScrollIndex={0}
        centerContent
        bounces={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        ref={sliderRef}
        renderItem={({item}) => (
          <OnboardingItem
            title={item.title}
            description={item.description}
            image={item.image}
          />
        )}
      />
      <Flex direction="column" justifyContent="flex-end" p={5} minH="150">
        {currentIndex === 2 ? (
          <VStack space={2}>
            <Button
              w="container"
              size="lg"
              onPress={() => navigation.navigate('Login')}>
              Sign In
            </Button>
            <Button
              w="container"
              colorScheme="dark"
              size="lg"
              onPress={() => navigation.navigate('Register')}>
              Sign Up
            </Button>
          </VStack>
        ) : (
          <Button size="lg" w="container" onPress={scrollTo}>
            Next
          </Button>
        )}
      </Flex>
    </View>
  );
};

export default Welcome;
