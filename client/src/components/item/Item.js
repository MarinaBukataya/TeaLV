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
    } else {
      history.push("/login");
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
        onClick={() => {
          handleViewProduct(product._id);
          console.log(product);
        }}
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
            <span onClick={() => handleEdit(product._id)}>
              <MDBTooltip domElement placement="top">
                <i className="grey-text fa fa-edit mr-3" />
                <span>Edit</span>
              </MDBTooltip>
            </span>

            <span onClick={() => handleDelete(product._id)}>
              <MDBTooltip domElement placement="top">
                <i className="grey-text fa fa-trash" />
                <span>Delete</span>
              </MDBTooltip>
            </span>
          </span>
        ) : (
          <span className="float-right">
            <span onClick={() => handleViewProduct(product._id)}>
              <MDBTooltip domElement placement="top">
                <i className="black-text fa fa-eye mr-3" />
                <span>View Details</span>
              </MDBTooltip>
            </span>
            <span onClick={() => handleAddToCart(product)}>
              <MDBTooltip domElement placement="top">
                <i className="black-text fa fa-shopping-cart" />
                <span>Add to Cart</span>
              </MDBTooltip>
            </span>
          </span>
        )}
      </MDBCardBody>
    </MDBCard>
  );
}
