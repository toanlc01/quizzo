import axios from "axios";
import { useDispatch } from "react-redux";
import { EAction, User, LoginForm, registerForm } from "../types";
import store from "../../store";
import { setAuthToken } from "../../../utils/setAuthToken";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface IAction {
  type: EAction;
  payload: {};
}

export interface LoginAction extends IAction {
  type: EAction.login;
  payload: {
    user: User;
    isAuthenticated: boolean;
    authLoading: boolean;
  };
}

export interface ShowModalAction extends IAction {
  type: EAction.showModal;
  payload: {
    showModal: boolean;
  };
}

export interface ShowRegisterModalAction extends IAction {
  type: EAction.showRegisterModal;
  payload: {
    showRegisterModal: boolean;
  };
}

export const registerUser = createAsyncThunk(
  "api/users/register",
  async (registerForm: registerForm, { dispatch, getState }) => {
    try {
      const response = await axios.post("/users/register", registerForm);
      if (response.data.success) {
        localStorage.setItem("token", response.data.accessToken);
        if (localStorage["token"]) {
          setAuthToken(localStorage["token"]);
        }
        dispatch(loadUser());
        dispatch(showModal());
      }

      return response.data;
    } catch (error) {}
  }
);

export const loginUser = createAsyncThunk(
  "api/users/login",
  async (loginForm: LoginForm, { dispatch, getState }) => {
    console.log("hahaah");
    try {
      const response = await axios.post("/users/login", loginForm);
      if (response.data.success) {
        localStorage.setItem("token", response.data.accessToken);
        if (localStorage["token"]) {
          setAuthToken(localStorage["token"]);
        }
        dispatch(loadUser());
        dispatch(showModal());
      }

      return response.data;
    } catch (error) {}
  }
);

export const loadUser =
  () =>
  async (dispatch = useDispatch()) => {
    try {
      if (localStorage["token"]) {
        setAuthToken(localStorage["token"]);
      }
      const response = await axios.get("/users/login");
      console.log(response);
      if (response.data !== undefined) {
        dispatch({
          type: EAction.login,
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {}
  };

export const showModal =
  () =>
  (dispatch = useDispatch()) => {
    dispatch({
      type: EAction.showModal,
      payload: {
        showModal: !store.getState().auth.showModal,
      },
    });
  };

export const showRegisterModal =
  () =>
  (dispatch = useDispatch()) => {
    dispatch({
      type: EAction.showRegisterModal,
      payload: {
        showModal: !store.getState().auth.showRegisterModal,
      },
    });
  };