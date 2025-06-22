import { ACCESS_TOKEN, API_BASE_URL } from "../../Config/Constants";
import {
  FOLLOW_USER,
  GET_SUGGESTION_USER,
  GET_USER_BY_USERNAME,
  GET_USER_SAVED_POST,
  GET_USERS_BY_USER_IDS,
  REQ_USER,
  SEARCH_USER,
  UNFOLLOW_USER,
  UPDATE_USER,
} from "./ActionType";



const USER_BASE_URL = `${API_BASE_URL}/users`;
const POST_BASE_URL = `${API_BASE_URL}/posts`;
const jwtToken = localStorage.getItem(ACCESS_TOKEN);
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: "Bearer " + jwtToken,
};

export const getUserProfileAction = () => async (dispatch) => {
  try {
    
    const res = await fetch(`${USER_BASE_URL}/req`, {
      method: "GET",
      headers: headers,
    });
    // console.log(res);
    let reqUser = null;
    if(res.ok) {
      reqUser = await res.json();
    }
    console.log("User: ", reqUser);
    dispatch({ type: REQ_USER, payload: reqUser });
    if(reqUser === null){
      throw new Error(res.status);
    }
    // Fetch Saved Posts of reqUser
    const data = {
      postIds: reqUser.savedPosts,
      userId: reqUser.id,
    }
    dispatch(findAllSavedPostAction(data));
    dispatch(suggestionsUserAction(data));
  } catch (error) {
    console.log("getUserProfileAction Error: ", error);
  }
};

const findAllSavedPostAction = (postIds) => async (dispatch) => {
  try {
    const res = await fetch(`${POST_BASE_URL}/savedposts/${postIds}`, {
      method: "GET",
      headers: headers,
    });

    const posts = await res.json();
    console.log("findAllSavedPostAction result: ", posts);
    dispatch({ type: GET_USER_SAVED_POST, payload: posts});
  } catch (error) {
    console.log("findAllSavedPostAction Error: ", error);
  }
};

const suggestionsUserAction = (userId) => async (dispatch) => {
  try {
    const res = await fetch(`${USER_BASE_URL}/suggestions/${userId}`, {
      method: "GET",
      headers: headers,
    });

    const users = await res.json();
    console.log("suggestionsUserAction result: ", users);
    dispatch({ type: GET_SUGGESTION_USER, payload: users });
  } catch (error) {
    console.log("suggestionsUserAction Error: ", error);
  }
};

export const findUserByUsernameAction = (username) => async (dispatch) => {
  try {
    const res = await fetch(`${USER_BASE_URL}/username/${username}`, {
      method: "GET",
      headers: headers,
    });

    const user = await res.json();
    console.log("Find by username result: ", user);
    dispatch({ type: GET_USER_BY_USERNAME, payload: user });
  } catch (error) {
    console.log("findUserByUsernameAction Error: ", error);
  }
};

export const findUserByUserIdsAction = (userIds) => async (dispatch) => {
  try {
    const res = await fetch(`${USER_BASE_URL}/ids/${userIds}`, {
      method: "GET",
      headers: headers,
    });

    const users = await res.json();
    console.log("Find by userids result: ", users);
    dispatch({ type: GET_USERS_BY_USER_IDS, payload: users });
  } catch (error) {
    console.log("findUserByUserIdsAction Error: ", error);
  }
};

export const followUserAction = (userId) => async (dispatch) => {
  try {
    const res = await fetch(`${USER_BASE_URL}/follow/${userId}`, {
      method: "PUT",
      headers: headers,
    });

    const user = await res.json();
    console.log("Follow user: ", user);
    dispatch({ type: FOLLOW_USER, payload: user });
  } catch (error) {
    console.log("followUserAction Error: ", error);
  }
};

export const unFollowUserAction = (userId) => async (dispatch) => {
  try {
    const res = await fetch(`${USER_BASE_URL}/unfollow/${userId}`, {
      method: "PUT",
      headers: headers,
    });

    const user = await res.json();
    console.log("Unfollow user: ", user);
    dispatch({ type: UNFOLLOW_USER, payload: user });
  } catch (error) {
    console.log("unFollowUserAction Error: ", error);
  }
};

export const searchUserAction = (query) => async (dispatch) => {
  try {
    const res = await fetch(`${USER_BASE_URL}/search?q=${query}`, {
      method: "GET",
      headers: headers,
    });

    const user = await res.json();
    console.log("Search user: ", user);
    dispatch({ type: SEARCH_USER, payload: user });
  } catch (error) {
    console.log("searchUserAction Error: ", error);
  }
};

export const updateUserDetailsAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${USER_BASE_URL}/account/edit`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data.data),
    });

    const user = await res.json();
    console.log("Update user: ", user);
    dispatch({ type: UPDATE_USER, payload: user });
  } catch (error) {
    console.log("searchUserAction Error: ", error);
  }
};

