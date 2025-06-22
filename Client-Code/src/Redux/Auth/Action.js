
import { ACCESS_TOKEN, API_BASE_URL } from "../../Config/Constants";
import { getUserProfileAction } from "../User/Action";
import { SIGN_IN, SIGN_UP } from "./ActionType";


export const signinAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${API_BASE_URL}/signin`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        Authorization: "Basic " + btoa(data.email + ":" + data.password),
      },
    });
    const token = res.headers.get("Authorization");

    localStorage.setItem(ACCESS_TOKEN, token);

    console.log("In signinAction: Received token: " + token);

    dispatch({ type: SIGN_IN, payload: token });

    dispatch(getUserProfileAction());

  } catch (error) {
    console.log(error);
  }
};

export const signupAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data)
    });

    const user = await res.json();

    console.log("Signup user: " + user);

    dispatch({ type: SIGN_UP, payload: user });
  } catch (error) {
    console.log(error);
  }
};
