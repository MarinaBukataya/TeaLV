import React from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBTooltip,
} from "mdbreact";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteProduct } from "../../redux/reducers/productsReducer";
import { SET_CART } from "../../redux/actions/cartActions";
import { addCart } from "../../redux/reducers/cartReducer";

export default function Item({ product }) {
  const role = useSelector((state) => state.userReducer.user.role);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  function handleEdit(id) {
    history.push(`/edit_product/${id}`);
  }

  function handleDelete(id) {
    dispatch(deleteProduct(id));
  }

  function handleAddToCart(product) {
    if (isLoggedIn) {
      dispatch({
        type: SET_CART,
        payload: product,
      });
      dispatch(addCart());
    } else{
      history.push("/login")
    }
  }

  function handleViewProduct(id) {
    history.push({ pathname: `/view_product/${id}`, state: true });
  }

  return (
    <MDBCard style={{ width: "17rem", height: "19rem" }}>
      <MDBCardImage
        src={product.image.url}
        top
        alt=""
        style={{ height: "270px", width: "310px" }}
      />
      <MDBCardBody className="text-center">
        <MDBCardTitle style={{ textTransform: "capitalize" }}>
          <strong>{product.title}</strong>
        </MDBCardTitle>

        <span className="float-left font-weight-bold">
          <strong>{product.price}$</strong>
        </span>
        {role === "Admin" ? (
          <span className="float-right">
            <MDBTooltip domElement placement="top">
              <i
                className="grey-text fa fa-edit mr-3"
                onClick={() => handleEdit(product._id)}
              />
              <span>Edit</span>
            </MDBTooltip>

            <MDBTooltip domElement placement="top">
              <i
                className="grey-text fa fa-trash"
                onClick={() => handleDelete(product._id)}
              />
              <span>Delete</span>
            </MDBTooltip>
          </span>
        ) : (
          <span className="float-right">
            <MDBTooltip domElement placement="top">
              <i
                className="grey-text fa fa-shopping-cart mr-3"
                onClick={() => handleAddToCart(product)}
              />
              <span>Add to Cart</span>
            </MDBTooltip>

            <MDBTooltip domElement placement="top">
              <i
                className="grey-text fa fa-eye"
                onClick={() => handleViewProduct(product._id)}
              />
              <span>View details</span>
            </MDBTooltip>
          </span>
        )}
      </MDBCardBody>
    </MDBCard>
  );
}
