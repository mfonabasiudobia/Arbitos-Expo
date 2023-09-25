import { AppBar, Input } from "@components";
import useMarketing from "@hooks/useMarketing";
import { useForm, yup, yupResolver } from "@lib/index";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Pressable,
  ScrollView,
  Select,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { Controller } from "react-hook-form";
// import {launchImageLibrary} from 'react-native-image-picker';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import DocumentUploadIcon from "/assets/svg/document-upload.svg";

let schema = yup.object({
  state: yup.string().required().label("State"),
  address: yup.string().required().label("Address"),
  identification_type: yup.string().required().label("Identification Type"),
  mobile_number: yup.string().required().label("Mobile Number"),
  // identitication_image: yup.string().required().label('Identitication Image'),
});

const BecomeOurMarketer = ({ navigation }) => {
  const { config, handleSubmitProposal } = useMarketing();

  const {
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const identificationImage = watch("identification_image", null);

  const openImagePicker = () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    // launchImageLibrary(options, response => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('Image picker error: ', response.error);
    //   } else {
    //     let imageUri = response.uri || response.assets?.[0]?.uri;
    //     setValue('identification_image', imageUri);
    //   }
    // });
  };

  return (
    <>
      <AppBar title="Become Our Marketer" />
      <Box px="5" py="5" flex={1}>
        <Text colorScheme="dark">
          Kindly fill the information below to become out marketer.
        </Text>
        <ScrollView>
          <VStack space={3} mt="5" flex={1}>
            <Input
              placeholder="Select State of resident"
              label="State of resident"
              name="state"
              errors={errors}
              control={control}
            />

            <Input
              placeholder="Enter your Location/Address"
              label="Location"
              name="address"
              errors={errors}
              control={control}
              InputRightElement={
                <IconButton
                  variant="unstyle"
                  icon={<Icon as={EvilIcons} name="location" size={8} />}
                />
              }
            />

            <VStack>
              <FormControl
                isInvalid={errors["identification_type"] ? true : false}
              >
                <FormControl.Label>
                  Select Identification Type
                </FormControl.Label>
              </FormControl>
              <Controller
                control={control}
                name="identification_type"
                render={({ field: { onChange, value } }) => (
                  <Select
                    placeholder="Means of Identification"
                    onValueChange={(value) => onChange(value)}
                    maxH="12"
                    _actionSheetBody={{
                      ListHeaderComponent: (
                        <Box w="full" p={2}>
                          <Heading
                            fontSize="lg"
                            textAlign="center"
                            mb={4}
                            fontWeight="semibold"
                          >
                            Select Identification Type
                          </Heading>
                        </Box>
                      ),
                    }}
                    variant="filled"
                  >
                    <Select.Item label="Passport" value="Passport" />
                    <Select.Item
                      label="Driver’s License"
                      value="Driver’s License"
                    />
                    <Select.Item label="Voter’s Card" value="Voter’s Card" />
                    <Select.Item label="National ID" value="National ID" />
                  </Select>
                )}
              />
              <FormControl
                isInvalid={errors["identification_type"] ? true : false}
              >
                {errors["identification_type"] && (
                  <FormControl.ErrorMessage>
                    {errors["identification_type"].message}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            </VStack>

            <Input
              placeholder="Enter your Mobile Number"
              label="Mobile Number (Preferably WhatsApp)"
              name="mobile_number"
              errors={errors}
              control={control}
            />

            <VStack>
              <Pressable position="relative" onPress={openImagePicker}>
                <HStack
                  justifyContent="center"
                  alignItems="center"
                  py={5}
                  space={3}
                  borderColor="#2F80ED"
                  borderWidth={1}
                  borderStyle="dashed"
                >
                  {!identificationImage ? (
                    <DocumentUploadIcon />
                  ) : (
                    <Image
                      source={{
                        uri: identificationImage,
                      }}
                      rounded="full"
                      h={70}
                      w={70}
                      alt="Profile Photo"
                    />
                  )}
                  <Text>Upload your means of ID</Text>
                </HStack>
              </Pressable>
              {errors["identification_image"] && (
                <FormControl.ErrorMessage>
                  {errors["identification_image"].message}
                </FormControl.ErrorMessage>
              )}
            </VStack>
          </VStack>
        </ScrollView>

        <Button
          colorScheme="primary"
          size="lg"
          isLoading={config.isBtnLoading}
          onPress={handleSubmit(handleSubmitProposal)}
        >
          Submit Request
        </Button>
      </Box>
    </>
  );
};

export default BecomeOurMarketer;
