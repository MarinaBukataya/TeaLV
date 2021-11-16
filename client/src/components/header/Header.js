import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { MDBIcon } from "mdbreact";
import {
  MDBAlert,
  MDBNavLink,
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
  const error = useSelector((state) => state.userReducer.error);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const role = useSelector((state) => state.userReducer.user.role);
  const categories = useSelector((state) => state.categoriesReducer.categories);
  const otherError = useSelector((state) => state.errorsReducer.error);
  const cart = useSelector((state) => state.cartReducer.cart);
  const [itemCount, setItemCount] = useState();
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

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

  function handleClearError() {
    dispatch(clearErrors());
  }

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
        <MDBNavLink to={"/add_product"} className="white-text h5">
          Add product
        </MDBNavLink>
        <MDBNavLink to={"/view_orders"} className="white-text h5">
          View orders
        </MDBNavLink>
      </>
    );
  };

  return (
    <MDBNavbar className="d-flex" fixed="top" scrolling color="mdb">
      <MDBNavbarBrand className="mr-auto ml-5 pb-0" >
        <MDBNavLink to="/">
          <strong
            className="white-text h1"
            style={{ fontFamily: "'Indie Flower', cursive", fontSize: 50 }}
          >
            TeaLV
          </strong>
        </MDBNavLink>
      </MDBNavbarBrand>
      {error && (
        <MDBAlert
          color="warning"
          className="mx-auto"
          dismiss
          onClick={handleClearError}
        >
          <strong>You’re so naugh-tea!</strong> {error.msg}. &nbsp;
        </MDBAlert>
      )}
      {otherError && (
        <MDBAlert
          color="warning"
          className="mx-auto"
          dismiss
          onClick={handleClearError}
        >
          <strong>You’re so naugh-tea!</strong> {otherError.msg}. &nbsp;
        </MDBAlert>
      )}
      <MDBDropdown>
        <MDBDropdownToggle
          nav
          caret
          color="secondary"
          className="white-text h5"
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
        <MDBNavLink to="/" className="white-text h5" onClick={handleLogout}>
          Log out
        </MDBNavLink>
      ) : (
        <>
          <MDBNavLink to={"/register"} className="white-text h5">
            Register
          </MDBNavLink>
          <MDBNavLink to={"/login"} className="white-text h5">
            Sign in
          </MDBNavLink>
        </>
      )}
    </MDBNavbar>
  );
}
