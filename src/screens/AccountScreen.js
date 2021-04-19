import React, { useContext } from 'react';
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { FontAwesome } from '@expo/vector-icons';

const AccountScreen = () => {
  const { signout } = useContext( AuthContext );

  return (
    <View style={ styles.viewContainer }>
      <Spacer>
        <Text h3 style={ { alignSelf: 'center' } }>Sign Out Tracker</Text>
      </Spacer>
      <Spacer>
        <Button
          title='Sign Out'
          onPress={ signout }
        />
      </Spacer>
    </View>
  );
};

AccountScreen.navigationOptions = () => {
  return {
    headerShown: false,
    title: 'Sign Out',
    tabBarIcon: <FontAwesome name="sign-out" size={24} color="black" />
  };

};
const styles = StyleSheet.create( {
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150
  }
} );

export default AccountScreen;
