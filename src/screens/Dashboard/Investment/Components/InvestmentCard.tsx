import React from 'react';
import {
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
  useTheme,
  useColorMode,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import LongTermIcon from '/assets/svg/long-term-investment.svg';
import ShortTermIcon from '/assets/svg/short-term-investment.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {number_format, seconds_to_human_readable_time} from '@utils/helper';

interface InvestmentCardModel {
  isShortTerm: boolean;
  title: string;
  minAmount: number;
  maxAmount: number;
  interest: number;
  duration: number;
  id: string;
}

const InvestmentCard: React.FC<InvestmentCardModel> = ({
  isShortTerm,
  title,
  minAmount,
  maxAmount,
  interest,
  duration,
  id,
}) => {
  const theme = useTheme();
  const {colorMode} = useColorMode();

  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('InvestmentPayment', {
          title,
          minAmount,
          maxAmount,
          interest,
          duration,
          id,
        })
      }>
      <VStack
        p={3}
        space={3}
        rounded="lg"
        bg={
          colorMode === 'dark'
            ? theme.colors.trueGray[700]
            : theme.colors.trueGray[50]
        }>
        <HStack justifyContent="space-between" alignItems="center" space={3}>
          <HStack alignItems="center" flex={1} space={2}>
            {isShortTerm ? <ShortTermIcon /> : <LongTermIcon />}

            <Text fontSize="lg">{title}</Text>
          </HStack>
          <VStack alignItems="flex-end" justifyContent="center" minW={100}>
            <Text bold>{interest}%</Text>
            <Text fontSize="xs">Interest</Text>
          </VStack>
        </HStack>

        <Divider />
        <HStack justifyContent="space-between">
          <Text>Min Investment</Text>
          <Text bold>₦{number_format(minAmount)}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Max Investment</Text>
          <Text bold>₦{number_format(maxAmount)}</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Withdrawal Interval</Text>
          <Text bold>{seconds_to_human_readable_time(duration)}</Text>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default React.memo(InvestmentCard);
