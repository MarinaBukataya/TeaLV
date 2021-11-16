import React, { useState } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBCol,
  MDBView,
  MDBMask,
  MDBContainer,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LOGIN_SUCCESS } from "../../redux/actions/userActions";
import { loginThunk } from "../../redux/reducers/userReducer";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const history = useHistory();

  function onInputChangeHandler(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    dispatch({ type: LOGIN_SUCCESS, payload: { user } });
    dispatch(loginThunk());
    history.push("/");
  }

  return (
    <div id="classicformpage">
      <MDBView>
        <MDBMask className="d-flex align-items-center">
          <MDBContainer className="d-flex justify-content-center">
            <MDBCol md="6" xl="5" className="mb-4">
              <MDBCard id="classic-card">
                <MDBCardBody>
                  <form onSubmit={onSubmitHandler}>
                    <p className="white-text h4 text-center">Sign in</p>
                    <div className="white-text">
                      <MDBInput
                        className="white-text"
                        label="Your email"
                        type="email"
                        validate
                        name="email"
                        value={user.email}
                        onChange={onInputChangeHandler}
                      />
                      <MDBInput
                        className="white-text"
                        label="Your password"
                        type="password"
                        validate
                        name="password"
                        value={user.password}
                        onChange={onInputChangeHandler}
                      />
                    </div>
                    <div className="text-center">
                      <MDBBtn color="light-green" type="submit">
                        Login
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBContainer>
        </MDBMask>
      </MDBView>
    </div>
  );
}
