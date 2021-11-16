import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBCol,
  MDBCard,
  MDBModalBody,
  MDBRow,
  MDBIcon,
  MDBCardImage,
} from "mdbreact";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SET_CART } from "../../redux/actions/cartActions";
import { addCart } from "../../redux/reducers/cartReducer";

export default function ViewProduct() {
  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(location.state);
  const products = useSelector((state) => state.productsReducer.products);
  const [product, setProduct] = useState({});
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);

  function handleAddToCart(product) {
    dispatch({
      type: SET_CART,
      payload: product,
    });
    dispatch(addCart());
  }

  useEffect(() => {
    if (params.id) {
      products.forEach((p) => {
        if (p._id === params.id) setProduct(p);
      });
    }
  }, [products, params]);

  return (
    <MDBContainer>
      <MDBModal size="lg" isOpen={showModal} toggle={() => {}} centered>
        <MDBModalBody className="d-flex">
          <MDBCol size="5" lg="5">
            {product.image && (
              <MDBCardImage
                src={product.image.url}
                style={{
                  height: "270px",
                }}
                alt=""
                className="img-thumbnail"
              />
            )}
          </MDBCol>
          <MDBCol size="7" lg="7">
            <h2 className="h2-responsive product-name">
              <strong>{product.title}</strong>
            </h2>
            
            <br></br>
            <h4 className="h4-responsive">
              <span className="black-text">
                <strong>${product.price}</strong>
              </span>
              <br></br>
              <br></br>
              <p>{product.contents}</p>
              <p>{product.description}</p>
              <p>Sold: {product.sold}</p>
            </h4>
            <div className="my-4">
              <MDBCard></MDBCard>
            </div>
            <MDBRow>
              <MDBCol
                size="
                      6"
              ></MDBCol>
              <MDBCol size="6"></MDBCol>
            </MDBRow>
            <MDBRow className="justify-content-center">
              <MDBBtn
                onClick={() => {
                  setShowModal(false);
                  history.push("/");
                }}
                outline
                className="z-depth-0"
                color="danger"
              >
                Close
              </MDBBtn>
              {isLoggedIn && <MDBBtn
                color="light-green"
                className="ml-4"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
                <MDBIcon icon="cart-plus" className="ml-2" />
              </MDBBtn> }
            </MDBRow>
          </MDBCol>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
}
