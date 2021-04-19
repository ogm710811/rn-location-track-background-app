import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import AccountScreen from "./src/screens/AccountScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { setNavigator } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const trackListFlow = createStackNavigator( {
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
} );

// this is for customize the trackList bottom navigation
trackListFlow.navigationOptions = () => {
  return {
    title: 'Track List',
    tabBarIcon: <MaterialCommunityIcons name="format-list-bulleted-triangle" size={ 24 } color="black"/>
  }
}

const switchNavigator = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator( {
      Signup: SignupScreen,
      Signin: SigninScreen
    } ),
    mainFlow: createBottomTabNavigator( {
      trackListFlow,
      TrackCreate: TrackCreateScreen,
      Account: AccountScreen,
    } )
  }, {
    initialRouteName: 'ResolveAuth',
  } )

const App = createAppContainer( switchNavigator );
export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App ref={ ( navigator ) => {
            setNavigator( navigator )
          } }/>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  )
}
