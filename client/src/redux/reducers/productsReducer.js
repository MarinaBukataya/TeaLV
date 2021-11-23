import { SET_PRODUCTS, CREATE_PRODUCT } from "../actions/productsActions";
import { GET_ERRORS } from "../actions/errorsActions";
import axios from "axios";

const initialState = {
  products: [],
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case CREATE_PRODUCT:
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

      return {
        ...state,
        products: [
          // shallow copy cart items
          ...state.products,
          // add new cart item
          {
            _id,
            product_id,
            title,
            price,
            description,
            contents,
            image,
            category,
          },
        ],
      };
    default:
      return state;
  }
}

export const loadProducts =
  (category = "", sort = "", search = "", page = 1) =>
  async (dispatch, getState) => {
    try {
      await axios
        .get(
          `https://tealv.herokuapp.com/api/products?limit=${
            page * 8
          }&${category}&${sort}&${search}`
        )
        .then((response) => {
          dispatch({ type: SET_PRODUCTS, payload: response.data });
          console.log(response.data);
        });
    } catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
  };

export const createProduct =
  ({ product_id, title, price, description, contents, image, category }) =>
  async (dispatch, getState) => {
    console.log(
      product_id,
      title,
      price,
      description,
      contents,
      image,
      category
    );
    try {
      if (!image) {
        return alert("Please attach an image");
      }
      const token = getState().userReducer.token;
      await axios
        .post(
          "https://tealv.herokuapp.com/api/products",
          {
            product_id,
            title,
            price,
            description,
            contents,
            image,
            category,
          },
          { headers: { Authorization: token } }
        )
        .then((response) => {
          dispatch({ type: CREATE_PRODUCT, payload: response.data });
        });
    } catch (err) {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
  };

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    const token = getState().userReducer.token;

    await axios
      .put(
        `https://tealv.herokuapp.com/api/products/${product._id}`,
        {
          product_id: product.product_id,
          title: product.title,
          price: product.price,
          description: product.description,
          contents: product.contents,
          image: product.image,
          category: product.category,
        },
        { headers: { Authorization: token } }
      )
      .then((response) => {
        dispatch(loadProducts());
      });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    const token = getState().userReducer.token;

    await axios
      .delete(
        `https://tealv.herokuapp.com/api/products/${id}`,

        { headers: { Authorization: token } }
      )
      .then((response) => {
        dispatch(loadProducts());
      });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};
