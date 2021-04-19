import React, { useContext } from 'react';
import { StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import Spacer from "./Spacer";
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
  const {
    state: { trackName, recording, locations },
    startRecording, stopRecording, changeTrackName
  } = useContext( LocationContext )
  const [ saveTrack ] = useSaveTrack();
  console.log( ('locations length :', locations.length) )

  return (
    <>
      <Spacer>
        <Input
          label="Track name"
          autoCapitalize="none"
          autoCorrect={ false }
          value={ trackName }
          onChangeText={ ( track ) => changeTrackName( track ) }
        />
        <Spacer>
          {
            recording
              ? <Button
                title='Stop'
                onPress={ stopRecording }
              />
              : <Button
                title='Start Recording'
                onPress={ startRecording }
              />
          }
        </Spacer>
        <Spacer>
          {
            !recording && locations.length
              ? <Button
                title='Save Track'
                onPress={ saveTrack }
              />
              : null
          }
        </Spacer>
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create( {} );

export default TrackForm;
