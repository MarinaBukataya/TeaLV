import {GET_PAYMENTS, MAKE_PAYMENT} from "../actions/paymentsActions"
import { GET_ERRORS } from "../actions/errorsActions";
import axios from "axios";

const initialState = {
    payments: [],
  };
  
  export default function paymentsReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PAYMENTS:
        return { ...state, payments: action.payload };
      case MAKE_PAYMENT:
        return { ...state, payments: [...state.payments, action.payload] };
      default:
        return state;
    }
  }

  export const getPayments = () => async (dispatch, getState) => {
    try {
      await axios.get("https://tealv.herokuapp.com/api/payment").then((response) => {
        dispatch({ type: GET_PAYMENTS, payload: response.data });
      });
    } catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
  };
  
  export const createPayment = (payment) => async (dispatch, getState) => {
    try {
      const token = getState().userReducer.token;
      const cart = getState().cartReducer.cart;
      const { paymentID, address } = payment;
      await axios
        .post(
          "https://tealv.herokuapp.com/api/payment",
          { cart, paymentID, address },
          { headers: { Authorization: token } }
        )
        .then((response) => {
          dispatch({ type: MAKE_PAYMENT, payload: response.data } );
        });
    } catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
  };