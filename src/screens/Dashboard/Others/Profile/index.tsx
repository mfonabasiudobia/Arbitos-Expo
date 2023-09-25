import { AppBar, MessageModal } from "@components";
import useUser from "@hooks/useUser";
import { setConfigData } from "@redux/slices/config";
import { colorModeManager } from "@utils/helper";
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Image,
  Pressable,
  ScrollView,
  Switch,
  Text,
  VStack,
  useColorMode,
  useTheme,
} from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch } from "react-redux";
import { data } from "./utils/constant";
import EditIcon from "/assets/svg/edit-icon.svg";
// import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const Profile = ({ navigation }) => {
  const theme = useTheme();

  const { colorMode, setColorMode } = useColorMode();

  const dispatch = useDispatch();

  const [showLogoutModal, setLogoutModal] = React.useState(false);

  const { handleLogout, config, userData, handleUploadProfileImage } =
    useUser();

  const [imageSource, setImageSource] = React.useState(null);

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
    //     setImageSource(imageUri);
    //     handleUploadProfileImage(imageUri);
    //   }
    // });
  };

  const onDarkModeSwitchChange = async (value) => {
    const colorMode = value ? "dark" : "light";

    dispatch(setConfigData({ isDarkMode: value }));

    setColorMode(colorMode);

    await colorModeManager.set(colorMode);
  };

  const onWalletBalanceSwitchChange = (value) => {
    dispatch(setConfigData({ hideWallet: value }));
  };

  return (
    <>
      <AppBar title="My Profile" />

      <MessageModal
        isOpen={showLogoutModal}
        onClose={() => setLogoutModal((prev) => !prev)}
        successButtonAction={handleLogout}
        type="error"
        errorTitle="Are you sure you want to sign out?"
        errorButtonTitle="Yes, Logout"
        errorDescription="This action will log you out and you will need to sign in again to access your account."
      />

      <ScrollView>
        <VStack p={3} flex={1} space={7}>
          <HStack justifyContent="space-between">
            <HStack alignItems="center" space={2} flexWrap="wrap">
              <Pressable position="relative" onPress={openImagePicker}>
                <Image
                  source={{
                    uri: imageSource ? imageSource : userData.profile_image,
                  }}
                  rounded="full"
                  h={70}
                  w={70}
                  alt="Profile Photo"
                />
                <EditIcon
                  style={{
                    position: "absolute",
                    bottom: -5,
                    right: -5,
                  }}
                  width={30}
                  height={30}
                />
              </Pressable>
              <Box overflow="hidden">
                <Text bold>
                  {`${userData.first_name} ${userData.last_name}`.substring(
                    0,
                    20
                  )}
                </Text>
                <Text>{userData.email.substring(0, 25)}</Text>
              </Box>
            </HStack>
            <Button
              variant="unstyle"
              onPress={() => navigation.navigate("EditProfile")}
            >
              Edit profile
            </Button>
          </HStack>
          <VStack space={2} flex={1}>
            <VStack space={5}>
              {data.map((item, index) => (
                <VStack key={index} space={2}>
                  <Text bold fontSize="md">
                    {Object.keys(item)[0]}
                  </Text>
                  <Box
                    p={2}
                    rounded={10}
                    bg={
                      colorMode === "dark"
                        ? theme.colors.trueGray[700]
                        : theme.colors.trueGray[50]
                    }
                  >
                    {item[Object.keys(item)[0]].map((item, index) => (
                      <Pressable
                        key={index}
                        onPress={() =>
                          item.title == "Wallet Balance"
                            ? {}
                            : item.title === "Sign Out"
                            ? setLogoutModal((prev) => !prev)
                            : navigation.navigate(item.routeName)
                        }
                      >
                        <HStack
                          justifyContent="space-between"
                          alignItems="center"
                          py={2}
                        >
                          <HStack space={3} alignItems="center">
                            <item.Icon />
                            <Text bold>{item.title}</Text>
                          </HStack>

                          {item.title === "Dark Mode" ? (
                            <Switch
                              size="lg"
                              colorScheme="primary"
                              onToggle={onDarkModeSwitchChange}
                              isChecked={config.isDarkMode}
                              defaultIsChecked={config.isDarkMode}
                            />
                          ) : item.title === "Wallet Balance" ? (
                            <Switch
                              size="lg"
                              colorScheme="primary"
                              onToggle={onWalletBalanceSwitchChange}
                              isChecked={config.hideWallet}
                              defaultIsChecked={config.hideWallet}
                            />
                          ) : (
                            <IconButton
                              variant="unstyled"
                              rounded="full"
                              icon={
                                <Icon
                                  size={5}
                                  color={
                                    theme.config.initialColorMode === "dark"
                                      ? theme.colors.trueGray[50]
                                      : theme.colors.trueGray[700]
                                  }
                                  as={Entypo}
                                  name="chevron-thin-right"
                                />
                              }
                            />
                          )}
                        </HStack>
                      </Pressable>
                    ))}
                  </Box>
                </VStack>
              ))}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
};

export default Profile;
