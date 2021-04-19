import createDataContext from "./createDataContext";
import axiosTrackerInstance from "../api/axios-tracker";
import AsyncStorage from "@react-native-community/async-storage";
import { navigate } from '../navigationRef';

export const USER_SIGN = "User Sign";
export const USER_SIGN_OUT = "User Sign Out";
export const AUTH_ERROR = "Auth Error";
export const CLEAR_ERROR_MESSAGE = "Clear Error Message";

const authReducer = ( state, action ) => {
  switch ( action.type ) {
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      }
    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: ''
      }
    case USER_SIGN:
      return {
        errorMessage: '',
        token: action.payload,
      }
    case USER_SIGN_OUT:
      return {
        errorMessage: '',
        token: null
      }
    default:
      return state;
  }
}

const signup = ( dispatch ) => async ( { email, password } ) => {
  try {
    const res = await axiosTrackerInstance.post( '/signup', { email, password } );
    await AsyncStorage.setItem( 'token', res.data.token );
    dispatch( { type: USER_SIGN, payload: res.data.token } );
    navigate( 'TrackList' );
  } catch ( e ) {
    dispatch( { type: AUTH_ERROR, payload: 'Something went wrong with sign up' } )
  }
};

const clearErrorMessage = ( dispatch ) => {
  return () => {
    dispatch( { type: CLEAR_ERROR_MESSAGE } )
  }
};

const signin = ( dispatch ) => async ( { email, password } ) => {
  try {
    const res = await axiosTrackerInstance.post( '/signin', { email, password } );
    await AsyncStorage.setItem( 'token', res.data.token );
    dispatch( { type: USER_SIGN, payload: res.data.token } );
    navigate( 'TrackList' );
  } catch ( e ) {
    dispatch( { type: AUTH_ERROR, payload: 'Something went wrong with sign in' } )
  }
};

const tryLocalSignin = ( dispatch ) => async () => {
  const token = await AsyncStorage.getItem( 'token' );
  if ( token ) {
    dispatch( { type: USER_SIGN, payload: token } );
    navigate( 'TrackList' );
  } else {
    navigate( 'loginFlow' );
  }
};

const signout = ( dispatch ) => async () => {
  await AsyncStorage.removeItem( 'token' );
  dispatch( { type: USER_SIGN_OUT } );
  navigate( 'loginFlow' );
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);
