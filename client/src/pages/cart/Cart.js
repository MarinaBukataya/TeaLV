import React, { useState } from "react";
import {
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBTableFoot,
  MDBAlert,
} from "mdbreact";
import { useSelector, useDispatch } from "react-redux";
import {
  REMOVE_FROM_CART,
  SET_CART,
  EMPTY_CART,
} from "../../redux/actions/cartActions";
import { createPayment } from "../../redux/reducers/paymentsReducer";
import { addCart } from "../../redux/reducers/cartReducer";
import PayPal from "./PayPal.js";

export default function Cart() {
  const cart = useSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch();
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  function handleRemoveFromCart(id) {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
    dispatch(addCart());
  }
  function handleAddToCart(product) {
    dispatch({ type: SET_CART, payload: product });
    dispatch(addCart());
  }

  const cartTotalAmount = cart.reduce(
    (totalAmount, { price, quantity }) => totalAmount + quantity * price,
    0
  );

  const paymentSuccess = async (payment) => {
    const { paymentID, address } = payment;
    dispatch(createPayment({ paymentID, address }));
    dispatch({ type: EMPTY_CART });
    dispatch(addCart());
    setPaymentSuccessful(true);
  };

  return (
    <MDBRow
      className="my-2 mx-auto"
      center
      style={{ paddingTop: "7rem", width: "90%" }}
    >
      <MDBCard className="w-100">
        <MDBCardBody>
          <MDBTable className="product-table">
            <MDBTableHead
              className="font-weight-bold"
              color="mdb-color lighten-5"
            >
              <tr align="center">
                <th></th>
                <th>Name</th>
                <th>Package</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th colspan="2"></th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {cart.map((product) => (
                <tr align="center" key={product._id}>
                  <td>
                    <img
                      src={product.image.url}
                      alt=""
                      border="3"
                      height="100"
                      width="100"
                    />
                  </td>
                  <td style={{ textTransform: "capitalize" }}>
                    {product.title}
                  </td>
                  <td>{product.contents}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{(product.quantity * product.price).toFixed(2)}</td>
                  <td>
                    <MDBBtn
                      key={product._id}
                      color="purple"
                      outline
                      className="px-3 py-2 z-depth-0"
                      onClick={() => handleRemoveFromCart(product._id)}
                    >
                      REMOVE
                    </MDBBtn>

                    <MDBBtn
                      key={product._id}
                      color="purple"
                      outline
                      className="px-3 py-2 z-depth-0"
                      style={{ width: "87px" }}
                      onClick={() => handleAddToCart(product)}
                    >
                      ADD
                    </MDBBtn>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
            <MDBTableFoot>
              <tr align="center">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="px-3 text-uppercase font-weight-bold">Total</td>
                <td className="font-weight-bold px-5">
                  ${cartTotalAmount.toFixed(2)}
                </td>
                <td>
                  {paymentSuccessful ? (
                    <MDBAlert color="success" dismiss onClose={() => setPaymentSuccessful(false)}>
                      <strong>
                        Thank you, your payment was submitted successfully!
                      </strong>
                    </MDBAlert>
                  ) : (
                    <PayPal
                      total={cartTotalAmount}
                      paymentSuccess={paymentSuccess}
                    />
                  )}
                </td>
              </tr>
            </MDBTableFoot>
          </MDBTable>
        </MDBCardBody>
      </MDBCard>
    </MDBRow>
  );
}
