import { SET_CART, REMOVE_FROM_CART, EMPTY_CART } from "../actions/cartActions";
import axios from "axios";
import { GET_ERRORS } from "../actions/errorsActions";

const initialState = {
  cart: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      const {
        _id,
        product_id,
        title,
        price,
        description,
        contents,
        image,
        category,
      } = action.payload;

      const inCart = state.cart.some((item) => item._id === _id);

      if (inCart) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === _id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              _id,
              product_id,
              title,
              price,
              description,
              contents,
              image,
              category,
              quantity: 1,
            },
          ],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item._id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
      case EMPTY_CART:
        return {
          ...state,
          cart: []
        };
    default:
      return state;
  }
}

export const addCart = () => async (dispatch, getState) => {
  try {
    const token = getState().userReducer.token;
    const cart = getState().cartReducer.cart;
    await axios.patch(
      "https://tealv.herokuapp.com/user/add_to_cart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};
