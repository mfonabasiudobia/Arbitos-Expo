import React from 'react';
import {
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
  useTheme,
  Progress,
  useColorMode,
  Box,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import LongTermIcon from '/assets/svg/long-term-investment.svg';
import ShortTermIcon from '/assets/svg/short-term-investment.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  number_format,
  format_date,
  calculate_maturity_percentage,
} from '@utils/helper';
import SuccessIcon from '/assets/svg/investment-completed-status.svg';
import CircularProgress from 'react-native-circular-progress-indicator';

interface ActiveInvestmentCardModel {
  title: string;
  interest: number;
  amountInvested: number;
  startDate: string;
  endDate: string;
}

const ActiveInvestmentCard: React.FC<ActiveInvestmentCardModel> = ({
  title,
  interest,
  amountInvested,
  startDate,
  endDate,
}) => {
  const theme = useTheme();
  const {colorMode} = useColorMode();

  return (
    <VStack
      p={5}
      space={3}
      rounded="lg"
      bg={
        colorMode === 'dark'
          ? theme.colors.trueGray[700]
          : theme.colors.trueGray[50]
      }>
      <HStack justifyContent="space-between" alignItems="center" space={3}>
        <HStack alignItems="center" flex={1} space={2}>
          <LongTermIcon />

          <Text fontSize="lg">{title}</Text>
        </HStack>
        <VStack alignItems="flex-end" justifyContent="center" minW={100}>
          <Text bold>{interest}%</Text>
          <Text fontSize="xs">Interest</Text>
        </VStack>
      </HStack>

      <HStack justifyContent="space-between">
        <VStack>
          <Text>Investment Amount</Text>
          <Text bold>₦{number_format(amountInvested)}</Text>
        </VStack>

        <HStack space={1} alignItems="center">
          {calculate_maturity_percentage(startDate, endDate) >= 100 ? (
            <SuccessIcon width="40" height="40" />
          ) : (
            <CircularProgress
              value={calculate_maturity_percentage(startDate, endDate)}
              radius={20}
              duration={2000}
              progressValueColor={'#33B469'}
              maxValue={100}
              inActiveStrokeColor={'#EBF9F1'}
              titleStyle={{fontWeight: 'bold'}}
              activeStrokeWidth={6}
              inActiveStrokeWidth={6}
            />
          )}

          <VStack>
            <Text textAlign="right">Withdrawal Date</Text>
            <Text bold textAlign="right">
              {format_date(endDate)}
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default React.memo(ActiveInvestmentCard);
