import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import Spacer from "./Spacer";
import { Button, Input, Text } from "react-native-elements";

const AuthForm = ( { headerText, errorMessage, buttonTitle, onSubmit } ) => {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );

  return (
    <>
      <Spacer>
        <Text h3 style={ { alignSelf: 'center' } }>{ headerText }</Text>
      </Spacer>
      <Spacer>
        <Input
          label="Email"
          autoCapitalize="none"
          autoCorrect={ false }
          value={ email }
          onChangeText={ ( newEmail ) => setEmail( newEmail ) }
        />
      </Spacer>
      <Spacer>
        <Input
          secureTextEntry
          label="Password"
          autoCapitalize="none"
          autoCorrect={ false }
          value={ password }
          onChangeText={ ( newPassword ) => setPassword( newPassword ) }
          errorMessage={ errorMessage }
          errorStyle={ { color: 'red', marginLeft: 1 } }
        />
      </Spacer>
      <Spacer>
        <Button
          title={ buttonTitle }
          onPress={ () => onSubmit( { email, password } ) }
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create( {} );

export default AuthForm;
