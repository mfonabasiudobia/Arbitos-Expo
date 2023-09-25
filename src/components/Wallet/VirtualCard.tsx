import { copyToClipboard } from "@utils/helper";
import { Box, Button, Flex, HStack, Heading, Text, VStack } from "native-base";
import React, { memo } from "react";
import { ImageBackground } from "react-native";
import ClipboardSvg from "/assets/svg/copy-clipboard.svg";

interface model {
  width: any;
  accountName: string;
  bankName: string;
  accountNumber: string;
}

const VirtualCard: React.FC<model> = ({
  width,
  accountName,
  bankName,
  accountNumber,
}) => {
  return (
    <ImageBackground
      source={require("/assets/images/virtual-card-background.png")}
      style={{
        width: width,
        borderRadius: 30,
        padding: 20,
        overflow: "hidden",
      }}
    >
      <Box mb={5}>
        <Text color="#fff" fontSize="xs">
          Beneficiary
        </Text>
        <Heading fontSize="lg" color="#fff">
          {accountName}
        </Heading>
      </Box>
      <Flex direction="row" alignItems="center" zIndex={5}>
        <Box flex={1} mr="3">
          <Text color="#fff" fontSize="xs">
            Bank Name
          </Text>
          <Heading fontSize="sm" color="#fff">
            {bankName}
          </Heading>
        </Box>
        <VStack space={1}>
          <Text color="#fff" fontSize="xs" textAlign="right">
            Virtual Account
          </Text>

          <Button
            rounded="full"
            colorScheme="dark"
            px="5"
            size="xs"
            onPress={() => copyToClipboard(accountNumber)}
          >
            <HStack space={1}>
              <Text fontSize="md" color="#fff">
                {accountNumber}
              </Text>
              <ClipboardSvg />
            </HStack>
          </Button>
        </VStack>
      </Flex>
    </ImageBackground>
  );
};

export default memo(VirtualCard);
