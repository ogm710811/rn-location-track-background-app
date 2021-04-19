import React, { useContext, useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import Spacer from "../components/Spacer";
import { NavigationEvents } from "react-navigation";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext( AuthContext );

  return (
    <KeyboardAvoidingView
      behavior={ Platform.OS === "ios" ? "padding" : "height" }
      style={ styles.viewContainer }
    >
      <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
        <View>
          <NavigationEvents
            onWillFocus={ clearErrorMessage }
          />
          <AuthForm
            headerText='Sign In Tracker'
            errorMessage={ state.errorMessage ? state.errorMessage : '' }
            buttonTitle='Sign In'
            onSubmit={ ( { email, password } ) => signin( { email, password } ) }
          />
          <Spacer>
            <NavLink
              linkText='Do not have an account? Go back to sign up'
              routeName='Signup'
            />
          </Spacer>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;
