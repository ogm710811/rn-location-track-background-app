import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const axiosInstance = axios.create( {
  baseURL: "https://2a010d296adc.ngrok.io",
} );

axiosInstance.interceptors.request.use(
  async ( config ) => {
    const token = await AsyncStorage.getItem( 'token' );
    if ( token ) {
      config.headers.Authorization = `Bearer ${ token }`;
    }
    return config;
  },
  ( err ) => {
    return Promise.reject( err );
  }
)

export default axiosInstance;
