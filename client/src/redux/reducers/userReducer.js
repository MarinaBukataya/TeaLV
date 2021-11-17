import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REFRESH_TOKEN,
  LOGOUT,
} from "../actions/userActions";
import { GET_ERRORS } from "../actions/errorsActions";
import axios from "axios";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");

const initialState = {
  token: null,
  user: {},
  isLoggedIn: false,
};

// if (token) {
//   try {
//     const jwt_decoded = jwt_decode(token);
//     var current_time = new Date().getTime();
//     const timeToExpire = jwt_decoded.exp - current_time;

//     setTimeout(() => {
//       axios.post("/user/refresh_token").then((response) => {
//         localStorage.setItem("token", response.data);
//         initialState.token = response.data;
//       });
//     }, 1 * 60 * 1000);
//   } catch (error) {
//     console.log("error parsing token");
//   }
// }
//Refresh Token Rotation (RTR)
//In a nutshell, RTR makes refresh tokens only valid for one-time use. Each time a refresh token is used, the security token service issues a new access token and a new refresh token. With the new access token, the client can make API calls on behalf of the user, and with the refresh token, it can run a new Refresh Token flow when needed.

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
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
      return { ...state, user: action.payload, isLoggedIn: false };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return { ...state, isLoggedIn: false };
    case LOGOUT:
      return { ...state, token: null, user: {}, isLoggedIn: false };
    case REFRESH_TOKEN:
      localStorage.setItem("token", action.payload.accessToken);
      return { ...state, token: action.payload.accessToken };

    default:
      return state;
  }
}

export const registerThunk = () => async (dispatch, getState) => {
  try {
    const user = getState().userReducer.user;
    await axios
      .post("/user/register", {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      })
      .then((response) => {
        dispatch({ type: REGISTER_SUCCESS, payload: response.data });

        console.log(response.data);
      });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const loginThunk = () => async (dispatch, getState) => {
  try {
    const { user } = getState().userReducer.user;
    await axios
      .post("/user/login", { email: user.email, password: user.password })
      .then((response) => {
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};
