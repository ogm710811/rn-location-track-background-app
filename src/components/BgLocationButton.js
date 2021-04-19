import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

const BgLocationButton = () => {
  // const onPress = async () => {
  //   const { status } = await Location.requestPermissionsAsync();
  //   if ( status === 'granted' ) {
  //     await Location.startLocationUpdatesAsync( LOCATION_TASK_NAME, {
  //       accuracy: Location.Accuracy.BestForNavigation,
  //       deferredUpdatesInterval: 1000,
  //       distanceInterval: 10
  //     } );
  //   }
  // };

  return (
    <TouchableOpacity onPress={ onPress }>
      <Text>Enable background location</Text>
    </TouchableOpacity>
  );
}

// TaskManager.defineTask(
//   LOCATION_TASK_NAME,
//   ({ data, error }) => {
//   if (error) {
//     // Error occurred - check `error.message` for more details.
//     return;
//   }
//   if (data) {
//     const { locations } = data;
//     console.log( 'useBackgroundLocation :: data', data )
//   }
// });

export default BgLocationButton;
