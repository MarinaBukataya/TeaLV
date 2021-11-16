import { GET_ERRORS, CLEAR_ERRORS } from "../actions/errorsActions";

const initialState = {
  
};

export default function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return { ...state, error: action.payload };
    case CLEAR_ERRORS:
      return { ...state, error: {} };
    default:
      return state;
  }
}
