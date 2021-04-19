import React, { useContext } from 'react';
import { Dimensions, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";
import haversine from "haversine";
import Spacer from "../components/Spacer";

const TrackDetailScreen = ( { navigation } ) => {
  const { state } = useContext( TrackContext );
  const _id = navigation.getParam( '_id' );
  const track = state.find( tr => tr._id === _id );
  const initialCoords = track.locations[0].coords;
  const endCoords = track.locations[track.locations.length - 1].coords;
  const startPoint = {
    latitude: initialCoords.latitude,
    longitude: initialCoords.longitude
  }
  const endPoint = {
    latitude: endCoords.latitude,
    longitude: endCoords.longitude
  }
  const trackDistance = haversine( startPoint, endPoint, { unit: 'mile' } ).toFixed( 2 );
  const calculateAvgSpeed = arrLocations => arrLocations.reduce( ( acc, loc ) => acc + loc.coords.speed, 0 ) / arrLocations.length;
  const avgSpeedMetersPerSecond = calculateAvgSpeed( track.locations ).toFixed(2);
  const avgSpeedMilesPerHour = (avgSpeedMetersPerSecond * 2.23694).toFixed(2);

  return (
    <SafeAreaView
      style={ styles.viewContainer }
    >
      <Text h3 style={ { alignSelf: 'center' } }>{ track.name }</Text>
      <Spacer />
      <MapView
        style={ styles.map }
        initialRegion={
          {
            ...initialCoords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          } }
      >
        <Polyline
          strokeWidth={ 4 }
          strokeColor='#0d6efd'
          coordinates={ track.locations.map( loc => loc.coords ) }
        />
      </MapView>
      <Spacer>
        <Text
          style={ { fontSize: 20, alignSelf: 'flex-start' } }
        >
          Track Distance: { trackDistance } miles
        </Text>
        <Text
          style={ { fontSize: 20, alignSelf: 'flex-start' } }
        >
          Track Avg Speed: { avgSpeedMilesPerHour } miles per hour
        </Text>
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create( {
  viewContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  map: {
    width: Dimensions.get( 'window' ).width,
    height: 300,
  },
} );

export default TrackDetailScreen;
