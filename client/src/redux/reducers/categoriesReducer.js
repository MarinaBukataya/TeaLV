import { SET_CATEGORIES, CREATE_CATEGORY } from "../actions/categoriesActions";
import { GET_ERRORS } from "../actions/errorsActions";
import axios from "axios";

const initialState = {
  categories: [],
};

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case CREATE_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };
    default:
      return state;
  }
}

export const loadCategories = () => async (dispatch, getState) => {
  try {
    console.log('Loading categories...');
    await axios.get("/api/categories").then((response) => {
      dispatch({ type: SET_CATEGORIES, payload: response.data });
    });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const saveCategory = (category) => async (dispatch, getState) => {
  try {
    const token = getState().userReducer.token;
    await axios
      .post(
        "/api/categories",
        { name: category },
        { headers: { Authorization: token } }
      )
      .then((response) => {
        dispatch({ type: CREATE_CATEGORY, payload: response.data });
      });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    const token = getState().userReducer.token;
    await axios
      .delete(`/api/categories/${id}`, { headers: { Authorization: token } })
      .then((response) => {
        dispatch(loadCategories());
      });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const updateCategory = (id, category) => async (dispatch, getState) => {
  try {
    const token = getState().userReducer.token;
    await axios
      .put(
        `/api/categories/${id}`,
        { name: category },
        { headers: { Authorization: token } }
      )
      .then((response) => {
        dispatch(loadCategories());
      });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};
