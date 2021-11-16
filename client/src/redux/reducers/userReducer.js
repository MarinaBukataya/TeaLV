import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REFRESH_TOKEN,
  LOGOUT,
} from "../actions/userActions";
import axios from "axios";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");

const initialState = {
  token: null,
  user: {},
  error: null,
  isLoggedIn: false,
};

if (token) {
  try {
    const jwt_decoded = jwt_decode(token);
    console.log(jwt_decoded);
    const timeToExpire = jwt_decoded.exp - Date.now();
    console.log("token expires" + jwt_decoded.exp);
    console.log("now" + Date.now());
    if (timeToExpire > 0) {
      setTimeout(() => {
        const token = axios.get("/user/refresh_token");
        localStorage.setItem("token", token);
      }, timeToExpire);
      console.log("token refreshed");
      initialState.token = token;
    }
  } catch (error) {
    console.log("error parsing token");
  }
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, user: action.payload, token: action.payload.accessToken, isLoggedIn: true };
    case LOGIN_SUCCESS:
      if (action.payload.accessToken) {
        localStorage.setItem("token", action.payload.accessToken);
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.accessToken,
          isLoggedIn: true,
        };
      }
      return { ...state, user: action.payload, isLoggedIn: true };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return { ...state, error: action.payload, isLoggedIn: false };
    case LOGOUT:
      return { ...state, token: null, user: {}, isLoggedIn: false };
    case REFRESH_TOKEN:
      return { ...state,  };

    default:
      return state;
  }
}

export const registerThunk = () => async (dispatch, getState) => {
  try {
    const user = getState().userReducer.user;

    await axios.post("/user/register", { ...user }).then((response) => {
      // localStorage.setItem("token", response.data.accessToken);
      // dispatch({ type: REGISTER_SUCCESS, payload: response.data.user });
    });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.response.data });
  }
};

export const loginThunk = () => async (dispatch, getState) => {
  
  try {
    const {user} = getState().userReducer.user;
    await axios.post("/user/login", { email: user.email, password: user.password }).then((response) => {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data });
  }
};
