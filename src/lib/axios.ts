import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// const BASE_URL = "http://192.168.172.233:8000/api/v1";

const BASE_URL = "https://arbitos.kabadpalmsgolfresort.com/api/v1";

const axiosInstance =  axios.create({
	baseURL: BASE_URL
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@token');

    // If the token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Set "Content-Type" to "application/json"
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;


