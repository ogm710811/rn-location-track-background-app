import { useEffect, useState } from "react";
import { Accuracy, requestPermissionsAsync, startLocationUpdatesAsync, watchPositionAsync } from "expo-location";
import * as TaskManager from 'expo-task-manager';
import * as Location from "expo-location";

export const LOCATION_TASK_NAME = 'background-location-task';

export default ( callback ) => {
  const [ err, setErr ] = useState( null );

  TaskManager.defineTask(
    LOCATION_TASK_NAME,
    ( { data, error } ) => {
      if ( error ) {
        // Error occurred - check `error.message` for more details.
        return;
      }
      if ( data ) {
        const { locations } = data;
        // trackLocations = locations;
        // console.log( 'useBackgroundLocation :: locations ::', locations )
        callback( locations );
      }
    } );

  useEffect( () => {
    const startWatching = async () => {
      try {
        const { status } = await Location.requestPermissionsAsync();
        if ( status === 'granted' ) {
          await Location.startLocationUpdatesAsync( LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.BestForNavigation,
            deferredUpdatesInterval: 1000,
            distanceInterval: 10
          } );
        }
      } catch ( e ) {
        setErr( e );
      }
    };
    startWatching()

  }, [] );

  return [ err ];
}


