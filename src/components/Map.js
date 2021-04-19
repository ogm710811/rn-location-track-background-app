import React, { useContext } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import MapView, { Polyline, Circle } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';

const Map = () => {
  const { state: { currentLocation, locations } } = useContext( LocationContext );
  console.log( 'currentLocation ::', currentLocation )
  console.log( 'locations array ::', locations.length )

  if ( !currentLocation ) {
    return (
      <ActivityIndicator
        size='large'
        style={ { marginTop: 200 } }
      />
    );
  }

  return (
    <MapView
      style={ styles.map }
      initialRegion={
        {
          ...currentLocation.coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        } }
      region={
        {
          ...currentLocation.coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        } }
    >
      <Circle
        center={ currentLocation.coords }
        radius={ 30 }
        strokeColor='rgba(158, 158, 255, 1.0)'
        fillColor='rgba(158, 158, 255, 0.3)'
      />
      <Polyline
        strokeWidth={ 4 }
        strokeColor='#0d6efd'
        coordinates={ locations.map( loc => loc.coords ) }
      />
    </MapView>
  );
};

const styles = StyleSheet.create( {
  map: {
    width: Dimensions.get( 'window' ).width,
    height: 300,
  },
} );

export default Map;


/**
 * SIMULATING A RANDOM LIST OF POINTS IN THE MAP.
 */
// let points = [];
// for ( let i = 0; i < 20; i++ ) {
//   if ( i % 2 === 0 ) {
//     points.push( {
//       latitude: 30.266407400000002 + i * 0.001,
//       longitude: -81.793785 + i * 0.001
//     } )
//   } else {
//     points.push( {
//       latitude: 30.266407400000002 - i * 0.002,
//       longitude: -81.793785 - i * 0.001
//     } )
//   }
// }
