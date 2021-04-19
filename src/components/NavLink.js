import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { withNavigation } from "react-navigation";

const NavLink = ( { navigation, linkText, routeName } ) => {
  return (
    <TouchableOpacity onPress={ () => navigation.navigate( { routeName } ) }>
      <Text style={ styles.link }>
        { linkText }
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create( {
  link: {
    alignSelf: 'center',
    color: '#3d8bfd'
  }
} );

export default withNavigation( NavLink );
