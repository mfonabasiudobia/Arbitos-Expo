import {Text, VStack} from 'native-base';
import {Image, ImageURISource, useWindowDimensions} from 'react-native';

interface OnboardingProps {
  title: string;
  description: string;
  image: ImageURISource;
}

const OnboardingItem: React.FC<OnboardingProps> = ({
  title,
  description,
  image,
}) => {
  const {width} = useWindowDimensions();

  return (
    <VStack w={width}>
      <Image source={image} style={{flex: 2}} />
      <VStack flex={1} p={5} space={4}>
        <Text fontSize="2xl" textAlign="center" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="sm" textAlign="center">
          {description}
        </Text>
      </VStack>
    </VStack>
  );
};

export default OnboardingItem;
