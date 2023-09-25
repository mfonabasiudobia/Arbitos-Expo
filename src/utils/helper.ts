import axios from '@lib/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import * as Notifications from "expo-notifications";
import moment from 'moment';
import { StorageManager, Toast } from 'native-base';
import { Share } from 'react-native';

const id = "test-toast";
 
export const copyToClipboard = async (textToCopy : string) => {
     await Clipboard.setStringAsync(textToCopy);

    const toastId : any = generateUniqueString(10);

    if (!Toast.isActive(toastId)) {
        Toast.show({
          toastId,
          title: "Copied!"
        });
    }

};


export const number_format = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const format_datetime = (date) => moment(date).format("D MMM, YYYY h:mm A");

export const format_date = (date) => moment(date).format('D MMMM, YYYY');

export const calculate_maturity_percentage = (start, end) => {
  const startDate : any = new Date(moment(start).format('YYYY-MM-DD'));
  const endDate : any = new Date(moment(end).format('YYYY-MM-DD'));
  // Get the current datetime
  const now = new Date().toISOString().slice(0, 10);

  const currentDate : any = new Date(now);

  // Calculate the total time difference in milliseconds between start and end dates
  const totalTimeDifference = endDate - startDate;

  // Calculate the time difference from now to the current date in milliseconds
  const currentTimeDifference = currentDate - startDate;

  // Calculate the percentage of time completed
  const percentageTimeCompleted = (currentTimeDifference / totalTimeDifference) * 100;

  return Math.floor(percentageTimeCompleted);
}


export const  strip_tags = (value) =>  value.replace(/<\/?[^>]+(>|$)/g, "").trim();

export const seconds_to_human_readable_time = (seconds) =>  {
    const years = Math.floor(seconds / (365 * 24 * 3600));
    const months = Math.floor((seconds % (365 * 24 * 3600)) / (30 * 24 * 3600));
    const days = Math.floor((seconds % (30 * 24 * 3600)) / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let result = '';

    if (years > 0) {
        result += `${years} ${years === 1 ? 'year' : 'years'} `;
    }

    if (months > 0) {
        result += `${months} ${months === 1 ? 'month' : 'months'} `;
    }

    if (days > 0) {
        result += `${days} ${days === 1 ? 'day' : 'days'} `;
    }

    if (hours > 0) {
        result += `${hours} ${hours === 1 ? 'hour' : 'hours'} `;
    }

    // if (minutes > 0) {
    //     result += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} `;
    // }

    // if (remainingSeconds > 0) {
    //     result += `${remainingSeconds} ${remainingSeconds === 1 ? 'second' : 'seconds'} `;
    // }

    return result.trim();
}

export const generateUniqueString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueString += characters.charAt(randomIndex);
  }

  return uniqueString;
}


export const toaster  = (message, status = "success") => {
  const toastId = generateUniqueString(10);
if (!Toast.isActive(toastId)) {
        Toast.show({
          toastId,
          title: message,
          placement: "top", 
          background: status === "danger" ? 'red.600' : "emerald.500"
        });
    }
}

export const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    
    return text;
};

export const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: 'light' | 'dark') => {
    try {
      await AsyncStorage.setItem('@color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};


export const setToken = async (token : string) => {
  await AsyncStorage.setItem('@token', token);
}

export const setUsername = async (username : string) => {
  await AsyncStorage.setItem('@username', username);
}

export const getToken = async () => {
  let val = await AsyncStorage.getItem('@token');

  return val;
}

export const getUsername = async () => {
  let val = await AsyncStorage.getItem('@username');

  return val;
}




export const requestUserPermission = async () => {
   try {
    // const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // // Stop here if the user did not grant permissions
    // if (status !== 'granted') {
    //   return null;
    // }
    // Get the token that identifies this device
    const token = await Notifications.getExpoPushTokenAsync();

    console.log("Request Permission", token);
    
    return token; 
  }
  catch(err) {
    console.log(err);
  }
}

export const saveFCMToken = async () => {
      const getToken = await requestUserPermission();
      axios
      .post('update-fcm-token', {
        fcm_token: getToken.data,
      })
      .then((res) => {
        console.log('FCM Token Updated');
      })
      .catch(console.log);
}

export const notificationListener =  () => {
   Notifications.addNotificationReceivedListener((notification) => {
      console.log("Add Notification Received", notification);
    });

    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Add Notification Response", response);
    });
}


export const hasDiscount = (regularPrice, salePrice) => {
  return regularPrice != salePrice;
}

export const discountPercentage = (regularPrice, salePrice) => {
  return '-' + Math.floor(100 - (salePrice/regularPrice)*100) + '%';
}

export const share = async (message) => {
    try {
      const result = await Share.share({
        message : message
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      console.log(error)
    }
  
}