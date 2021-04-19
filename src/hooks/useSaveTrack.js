import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import { useContext } from "react";
import { navigate } from "../navigationRef";

export default () => {
  const { createTrack } = useContext( TrackContext );
  const {
    state: { locations, trackName },
    resetState
  } = useContext( LocationContext );

  const saveTrack = async () => {
    await createTrack( trackName, locations );
    resetState();
    navigate( 'TrackList' );
  };

  return [ saveTrack ];
};

