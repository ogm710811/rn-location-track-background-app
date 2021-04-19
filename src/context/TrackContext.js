import createDataContext from "./createDataContext";
import axiosTrackerInstance from "../api/axios-tracker";

export const FETCH_TRACKS = "Fetch Tracks";

const trackReducer = ( state, action ) => {
  switch ( action.type ) {
    case FETCH_TRACKS:
      return action.payload;
    default:
      return state;
  }
}

const fetchTracks = dispatch => async () => {
  const res = await axiosTrackerInstance.get( '/tracks' );
  dispatch( { type: FETCH_TRACKS, payload: res.data } );
};

const createTrack = dispatch => async ( name, locations ) => {
  await axiosTrackerInstance.post( '/tracks', { name, locations } )
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
)
