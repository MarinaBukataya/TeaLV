import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { MDBIcon } from "mdbreact";
import {
  MDBAlert,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBadge,
} from "mdbreact";
import { clearErrors } from "../../redux/actions/errorsActions";
import { loadCategories } from "../../redux/reducers/categoriesReducer";
import { loadProducts } from "../../redux/reducers/productsReducer";
import { LOGOUT } from "../../redux/actions/userActions";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const role = useSelector((state) => state.userReducer.user.role);
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const cart = useSelector((state) => state.cartReducer.cart);
  const [itemCount, setItemCount] = useState();
  const history = useHistory();
  const { pathname } = useLocation();
  const [message, setMessage] = useState();
  const error = useSelector((state) => state.errorsReducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  useEffect(() => {
    if (error !== undefined) {
      setMessage(error.msg);
    }
  }, [error]);

  useEffect(() => {
    const getTotal = () => {
      const itemsInCart = cart.reduce(
        (count, { quantity }) => count + quantity,
        0
      );
      setItemCount(itemsInCart);
    };
    getTotal();
  }, [cart]);

  function handleCategoryChange(e) {
    e.preventDefault();
    const category = e.target.value;
    dispatch(loadProducts(category));
    history.push({ pathname: "/", state: false });
  }

  function handleLogout() {
    dispatch({ type: LOGOUT });
  }

  function navigateToCart() {
    history.push("/shopping_cart");
  }

  const adminRouter = () => {
    return (
      <>
        <Link to={"/add_product"} className="white-text h5 mr-3">
          Add product
        </Link>
        {/* <Link to={"/view_orders"} className="white-text h5 mr-3">
          View orders
        </Link> */}
      </>
    );
  };

  return (
    <MDBNavbar className="d-flex" fixed="top" scrolling color="mdb">
      <MDBNavbarBrand className="mr-auto ml-5 pb-0">
        <Link to="/">
          <strong
            className="white-text h1"
            style={{ fontFamily: "'Indie Flower', cursive", fontSize: 50 }}
          >
            TeaLV
          </strong>
        </Link>
      </MDBNavbarBrand>
      {message && (
        <MDBAlert
          className="mx-auto"
          color="warning"
          dismiss
          onClose={() => dispatch(clearErrors())}
        >
          <strong>{message} &nbsp;</strong>
        </MDBAlert>
      )}
      <MDBDropdown>
        <MDBDropdownToggle
          nav
          caret
          color="secondary"
          className="white-text h5 mr-3"
        >
          Collections
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          {categories.map((category) => (
            <MDBDropdownItem
              style={{ textTransform: "uppercase" }}
              onClick={handleCategoryChange}
              key={category._id}
              value={"category=" + category.name}
            >
              {category.name}
            </MDBDropdownItem>
          ))}
          <MDBDropdownItem value={null} onClick={handleCategoryChange}>
            ALL TEAS
          </MDBDropdownItem>
          {role === "Admin" && (
            <>
              <MDBDropdownItem divider />
              <MDBDropdownItem>
                <Link
                  to={{ pathname: "/add_category", state: { modal: true } }}
                >
                  Manage Collections
                </Link>
              </MDBDropdownItem>
            </>
          )}
        </MDBDropdownMenu>
      </MDBDropdown>
      {role === "Admin" ? (
        adminRouter()
      ) : isLoggedIn ? (
        <>
          <MDBIcon
            size="2x"
            className="ml-3 white-text fa fa-shopping-cart"
            onClick={navigateToCart}
          />
          <MDBBadge
            style={{
              position: "relative",
              left: "-1rem",
              top: "-1rem",
              borderRadius: "50%",
              width: "20px",
            }}
            className="mr-1 ml-1"
            tag="a"
            color="light-green darken-4"
          >
            {itemCount}
          </MDBBadge>
        </>
      ) : (
        ""
      )}
      {isLoggedIn ? (
        <Link to="/" className="white-text h5 mr-3" onClick={handleLogout}>
          Log out
        </Link>
      ) : pathname === "/login" ? (
        <Link to={"/register"} className="white-text h5 mr-3">
          Register
        </Link>
      ) : (
        <>
          <Link to={"/register"} className="white-text h5 mr-3">
            Register
          </Link>
          <Link to={"/login"} className="white-text h5 mr-3">
            Sign in
          </Link>
        </>
      )}
    </MDBNavbar>
  );
}
