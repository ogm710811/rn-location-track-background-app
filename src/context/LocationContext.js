import createDataContext from "./createDataContext";

export const ADD_CURRENT_LOCATION = "Add Current Location";
export const ADD_LOCATION = "Add Location";
export const START_RECORDING_LOCATION = "Start Recording Location";
export const STOP_RECORDING_LOCATION = "Stop Recording Location";
export const CHANGE_TRACK_NAME = "Change Track Name";
export const RESET_STATE = "Reset State";

const locationReducer = ( state, action ) => {
  switch ( action.type ) {
    case ADD_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload
      }
    case ADD_LOCATION:
      return {
        ...state,
        locations: [ ...state.locations, action.payload ]
      }
    case START_RECORDING_LOCATION:
      return {
        ...state,
        recording: true,
      }
    case STOP_RECORDING_LOCATION:
      return {
        ...state,
        recording: false,
      }
    case CHANGE_TRACK_NAME:
      return {
        ...state,
        trackName: action.payload,
      }
    case RESET_STATE:
      return {
        ...state,
        trackName: '',
        recording: false,
        locations: [],
        currentLocation: null
      }
    default:
      return state;
  }
}

const changeTrackName = dispatch => ( trackName ) => {
  dispatch( { type: CHANGE_TRACK_NAME, payload: trackName } )
};

const startRecording = dispatch => () => {
  dispatch( { type: START_RECORDING_LOCATION } );
};

const stopRecording = dispatch => () => {
  dispatch( { type: STOP_RECORDING_LOCATION } );
};

const addLocation = dispatch => ( location, recording ) => {
  dispatch( { type: ADD_CURRENT_LOCATION, payload: location } );
  if ( recording ) {
    dispatch( { type: ADD_LOCATION, payload: location } )
  }
};

const resetState = dispatch => () => {
  dispatch( { type: RESET_STATE } );
}

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeTrackName, resetState },
  { trackName: '', recording: false, locations: [], currentLocation: null }
)
