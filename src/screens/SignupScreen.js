import React, { useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import Spacer from "../components/Spacer";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { NavigationEvents } from "react-navigation";

const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useContext( AuthContext );

  return (
    <KeyboardAvoidingView
      behavior={ Platform.OS === "ios" ? "padding" : "height" }
      enabled
      style={ styles.viewContainer }
    >
      <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
        <View>
          <NavigationEvents
            onWillFocus={ clearErrorMessage }
          />
          <AuthForm
            headerText='Sign Up Tracker'
            errorMessage={ state.errorMessage ? state.errorMessage : '' }
            buttonTitle='Sign Up'
            onSubmit={ ( { email, password } ) => signup( { email, password } ) }
          />
          <Spacer>
            <NavLink
              linkText='Already have an account? Sign in instead'
              routeName='Signin'
            />
          </Spacer>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create( {
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150
  }
} );

export default SignupScreen;
