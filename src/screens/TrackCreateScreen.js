// import '../_mockLocation';
import React, { useCallback, useContext } from 'react';
import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from "react-native-elements";
import { Context as LocationContext } from '../context/LocationContext';
import { withNavigationFocus } from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons';
import BgLocationButton from "../components/BgLocationButton";
import useBackgroundLocation, { LOCATION_TASK_NAME } from "../hooks/useBackgroundLocation";
import * as TaskManager from "expo-task-manager";
import Map from "../components/Map";
import TrackForm from "../components/TrackForm";


const TrackCreateScreen = ( { isFocused } ) => {
  const {
    state: { recording },
    addLocation
  } = useContext( LocationContext );
  const callback = useCallback( ( locations ) => {
    const location = locations[0];
    addLocation( location, recording );
  }, [ recording ] );
  const [ err ] = useBackgroundLocation( callback );


  return (
    <SafeAreaView
      style={ styles.viewContainer }
    >
      <Text h3 style={ { alignSelf: 'center' } }>TrackCreateScreen</Text>
      <Map/>
      {
        err
          ? <Text>Please enable location services</Text>
          : null
      }

      <TrackForm/>
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = () => {
  return {
    headerShown: false,
    title: 'Add Track',
    tabBarIcon: <MaterialIcons name="add-location-alt" size={ 24 } color="black"/>
  };
};

const styles = StyleSheet.create( {
  viewContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  }
} );

export default withNavigationFocus( TrackCreateScreen );


