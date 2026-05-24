import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthCompletedResponse,
  LoginPayload,
  SignupPayload,
  User,
  UserRole,
} from "../../models/user";

export type UserState = {
  user: User;
  isLoggedIn: boolean;
  accessToken: string;
  loading: boolean;
  message: string;
};

const initialState: UserState = {
  user: {
    id: "",
    name: "",
    email: "",
    role: UserRole.USER,
    createdAt: "",
    updatedAt: "",
  },
  isLoggedIn: false,
  accessToken: "",
  loading: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupInitiated,
    loginInitiated,
    authCompleted,
    authError,
    fetchMeInitiated,
    logoutInitiated,
    logoutCompleted,
    logoutError,
  },
});

const { actions, reducer: userReducer } = userSlice;

export const {
  signupInitiated: signupInitiatedAction,
  loginInitiated: loginInitiatedAction,
  authCompleted: authCompletedAction,
  authError: authErrorAction,
  fetchMeInitiated: fetchMeInitiatedAction,
  logoutInitiated: logoutInitiatedAction,
  logoutCompleted: logoutCompletedAction,
  logoutError: logoutErrorAction,
} = actions;

export default userReducer;

function signupInitiated(
  state: UserState,
  _action: PayloadAction<SignupPayload>
) {
  state.loading = true;
}

function loginInitiated(
  state: UserState,
  _action: PayloadAction<LoginPayload>
) {
  state.loading = true;
}

function authCompleted(
  state: UserState,
  action: PayloadAction<AuthCompletedResponse>
) {
  state.loading = false;
  state.user = action.payload.user;
  state.isLoggedIn = true;
  state.accessToken = action.payload.accessToken;
}

function authError(state: UserState, action: PayloadAction<{ error: string }>) {
  state.loading = false;
  state.message = action.payload.error;
}

function fetchMeInitiated(state: UserState) {
  state.loading = true;
}

function logoutInitiated(state: UserState) {
  state.loading = true;
}

function logoutCompleted(
  _state: UserState,
  action: PayloadAction<{ message: string }>
) {
  return { ...initialState, message: action.payload.message };
}

function logoutError(
  state: UserState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
  state.loading = false;
}
