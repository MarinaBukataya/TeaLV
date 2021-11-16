import React, { useState } from "react";
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBAnimation,
} from "mdbreact";
import { useDispatch } from "react-redux";
import { REGISTER_SUCCESS } from "../../redux/actions/userActions";
import { registerThunk } from "../../redux/reducers/userReducer";
import "./Register.css";
import {useHistory} from 'react-router-dom'

export default function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const history = useHistory();

  function onInputChangeHandler(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    dispatch({ type: REGISTER_SUCCESS, payload: { ...user, role: "User" } });
    dispatch(registerThunk());
    history.push('/')
  }

  return (
    <div id="classicformpage">
      <MDBView>
        <MDBMask className="d-flex justify-content-center align-items-center gradient">
          <MDBContainer>
            <MDBRow>
              <MDBAnimation
                type="fadeInLeft"
                delay=".3s"
                className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"
              >
                <h1 className="h1-responsive font-weight-bold">
                  Welcome, fellow tea lover!
                </h1>
                <hr className="hr-light" />
                <h5 className="mb-4">
                  “If you are cold, tea will warm you; if you are too heated, it
                  will cool you; If you are depressed, it will cheer you; If you
                  are excited, it will calm you.” ― William Ewart Gladstone
                </h5>
              </MDBAnimation>

              <MDBCol md="6" xl="5">
                <MDBAnimation type="fadeInRight" delay=".3s">
                  <MDBCard id="classic-card">
                    <MDBCardBody>
                      <form onSubmit={onSubmitHandler}>
                        <p className="white-text h4 text-center mb-4">
                          Sign up
                        </p>
                        <div className="white-text h4">
                          <MDBInput
                            className="white-text "
                            label="Your name"
                            required
                            name="name"
                            value={user.name}
                            type="text"
                            validate
                            onChange={onInputChangeHandler}
                          />
                          <MDBInput
                            className="white-text"
                            label="Your email"
                            type="email"
                            validate
                            required
                            error="wrong"
                            success="right"
                            name="email"
                            value={user.email}
                            onChange={onInputChangeHandler}
                          />

                          <MDBInput
                            style={{ marginBottom: "-20px" }}
                            className="white-text"
                            label="Your password"
                            type="password"
                            validate
                            required
                            name="password"
                            pattern=".{6,}"
                            value={user.password}
                            onChange={onInputChangeHandler}
                          />
                          <p
                            className="white-text h6 "
                            style={{
                              marginBottom: "30px",
                              fontWeight: "lighter",
                              fontSize: "small",
                            }}
                          >
                            Password should be at least 6 characters long
                          </p>
                        </div>

                        <div className="text-center">
                          <MDBBtn color="light-green" type="submit">
                            Register
                          </MDBBtn>
                        </div>
                      </form>
                    </MDBCardBody>
                  </MDBCard>
                </MDBAnimation>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBMask>
      </MDBView>
    </div>
  );
}
