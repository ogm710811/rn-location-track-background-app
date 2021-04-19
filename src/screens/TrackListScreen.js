import React, { useContext } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { Context as TrackContext } from "../context/TrackContext";
import { SafeAreaView } from "react-native-safe-area-context";

const TrackListScreen = ( { navigation } ) => {
  const { state, fetchTracks } = useContext( TrackContext );

  return (
    <>
      <NavigationEvents onWillFocus={ fetchTracks }/>
      <FlatList
        data={ state }
        keyExtractor={ ( item ) => item._id }
        renderItem={ ( { item } ) => {
          return (
            <TouchableOpacity
              onPress={
                () => navigation.navigate( 'TrackDetail', { _id: item._id } )
              }
            >
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{ item.name }</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron/>
              </ListItem>
            </TouchableOpacity>
          );
        } }
      />
    </>
  );
};

TrackListScreen.navigationOptions = () => {
  return {
    headerTitleStyle: { alignSelf: 'center' },
    title: 'Tracks'
  };
};

const styles = StyleSheet.create( {
  viewContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  }
} );

export default TrackListScreen;
