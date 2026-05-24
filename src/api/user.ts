import { LoginPayload, SignupPayload } from "../models/user";
import instance from "./axios";

export const signupUser = async (data: SignupPayload) =>
  instance.post("/signup", data).then((res) => res.data);

export const loginUser = async (data: LoginPayload) =>
  instance.post("/login", data).then((res) => res.data);

export const fetchMe = async () =>
  instance.get("/me", { withCredentials: true }).then((res) => res.data);

export const logoutUser = async () =>
  instance.get("/logout").then((res) => res.data);
