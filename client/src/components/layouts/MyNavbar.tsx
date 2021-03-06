import React, { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  logOut,
  showModal,
  showRegisterModal,
  showUpdateModal
} from '../../store/slices/auth.slice';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import '../../css/landing/navbar.css';
import { RootState } from '../../store/store';
import { loadUser } from '../../store/slices/auth.slice';
import logoutIcon from '../../assets/logout.svg';
import UpdateForm from '../auth/UpdateForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { setAuthToken } from '../../utils/setAuthToken';

const MyNavbar: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const showLoginForm = () => {
    dispatch(showModal());
  };
  const showRegisterForm = () => {
    dispatch(showRegisterModal());
  };

  const logoutUser = () => {
    setAuthToken(null);
    localStorage.removeItem('Authorization');
    dispatch(logOut());
  };

  const update = () => {
    dispatch(showUpdateModal());
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadUser());
    };
    fetchData();
  }, []);

  let navBar = null;
  if (auth.user) {
    navBar = (
      <>
        <div>Welcome, </div>
        <Button variant="secondary" onClick={update}>
          <FontAwesomeIcon icon={faUser} />
          {auth.user?.username}
        </Button>
        <Button
          variant="secondary"
          className="font-weight-bolder text-white"
          onClick={logoutUser}
        >
          <img
            src={logoutIcon}
            alt="logoutIcon"
            width="40"
            height="23"
            className="mr-2"
          />
          Logout
        </Button>
      </>
    );
  } else {
    navBar = (
      <>
        <Button id="sign-up" className="custom-btn" onClick={showRegisterForm}>
          Sign Up
        </Button>
        <Button id="log-in" className="custom-btn" onClick={showLoginForm}>
          Log In
        </Button>
      </>
    );
  }

  return (
    <>
      <LoginForm />
      <RegisterForm />
      <UpdateForm />
      <Navbar collapseOnSelect expand="md" id="header" style={{ zIndex: 10 }}>
        <Container>
          <Navbar.Brand></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <BsFillPersonFill />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Container></Container>
            <Nav className="align-nav">{navBar}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(MyNavbar);
