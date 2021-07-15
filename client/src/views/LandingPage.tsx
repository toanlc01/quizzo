import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import quizzoLogo from "../assets/logo.svg";
import logoutIcon from "../assets/logout.svg";
import { connect, useDispatch } from "react-redux";
import { showModal } from "../store/actions/auth/authActions";
import { Link } from "react-router-dom";
import store from "../store/store";
import LoginForm from "../components/auth/LoginForm";

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  const showLoginModal = () => {
    dispatch(showModal());
  };

  return (
    <>
      <LoginForm />
      <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
        <Navbar.Brand className="font-weight-bolder text-white">
          <img
            src={quizzoLogo}
            alt="quizzoLogo"
            width="32"
            height="32"
            className="mr-2"
          />
          Quizzo
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/landingPage"
              as={Link}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/about"
              as={Link}
            >
              About
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link className="font-weight-bolder text-white" disabled>
              Welcome
            </Nav.Link>
            <Button
              variant="secondary"
              className="font-weight-bolder text-white"
              onClick={showLoginModal}
            >
              <img
                src={logoutIcon}
                alt="logoutIcon"
                width="32"
                height="32"
                className="mr-2"
              />
              LogIn
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default connect()(LandingPage);
