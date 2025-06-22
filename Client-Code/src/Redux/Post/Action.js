import { ACCESS_TOKEN, API_BASE_URL } from "../../Config/Constants";
import {
  CREATE_NEW_POST,
  DELETE_POST,
  GET_SINGLE_POST,
  GET_USER_POST,
  LIKE_POST,
  REQ_USER_POST,
  SAVE_POST,
  UNLIKE_POST,
  UNSAVE_POST,
} from "./ActionType";



const POST_BASE_URL = `${API_BASE_URL}/posts`;
const jwtToken = localStorage.getItem(ACCESS_TOKEN);
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: "Bearer " + jwtToken,
};

export const createPostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${POST_BASE_URL}/create`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data.data),
    });

    const post = await res.json();
    console.log("createPostAction result: ", post);
    dispatch({ type: CREATE_NEW_POST, payload: post });
  } catch (error) {
    console.log("createPostAction Error: ", error);
  }
};

export const findUserPostAction = (userIds) => async (dispatch) => {
  try {
    const res = await fetch(`${POST_BASE_URL}/following/${userIds}`, {
      method: "GET",
      headers: headers,
    });

    const posts = await res.json();
    console.log("findUserPostAction result: ", posts);
    dispatch({ type: GET_USER_POST, payload: posts });
  } catch (error) {
    console.log("findUserPostAction Error: ", error);
  }
};

// export const findAllSavedPostAction = (data) => async (dispatch) => {
//   try {
//     const res = await fetch(`${POST_BASE_URL}/savedposts/${data.postIds}`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         Authorization: "Bearer " + data.jwtToken,
//       },
//     });

//     const posts = await res.json();
//     console.log("findAllSavedPostAction result: ", posts);
//     dispatch({ type: GET_SAVED_POST, payload: posts});
//   } catch (error) {
//     console.log("findAllSavedPostAction Error: ", error);
//   }
// };

export const reqUserPostAction = (userId) => async (dispatch) => {
  try {
    const res = await fetch(`${POST_BASE_URL}/following/${userId}`, {
      method: "GET",
      headers: headers,
    });

    const posts = await res.json();
    console.log("reqUserPostAction result: ", posts);
    dispatch({ type: REQ_USER_POST, payload: posts });
  } catch (error) {
    console.log("reqUserPostAction Error: ", error);
  }
};

export const likePostAction = (postId) => async (dispatch) => {
  try {
    const res = await fetch(`${POST_BASE_URL}/like/${postId}`, {
      method: "PUT",
      headers: headers,
    });

    const post = await res.json();
    console.log("likePostAction result: ", post);
    dispatch({ type: LIKE_POST, payload: post });
  } catch (error) {
    console.log("likePostAction Error: ", error);
  }
};

export const unLikePostAction = (postId) => async (dispatch) => {
  try {
    const res = await fetch(`${POST_BASE_URL}/unlike/${postId}`, {
      method: "PUT",
      headers: headers,
    });

    const post = await res.json();
    console.log("unLikePostAction result: ", post);
    dispatch({ type: UNLIKE_POST, payload: post });
  } catch (error) {
    console.log("unLikePostAction Error: ", error);
  }
};

export const savedPostAction = (postId) => async (dispatch) => {
  try {
    const res = await fetch(`${POST_BASE_URL}/saved/${postId}`, {
      method: "PUT",
      headers: headers,
    });

    const post = await res.json();
    console.log("savedPostAction result: ", post);
    dispatch({ type: SAVE_POST, payload: post });
  } catch (error) {
    console.log("savedPostAction Error: ", error);
  }
};

export const unSavedPostAction = (postId) => async (dispatch) => {
  try {
    const res = await fetch(`${POST_BASE_URL}/unsaved/${postId}`, {
      method: "PUT",
      headers: headers,
    });

    const post = await res.json();
    console.log("unSavedPostAction result: ", post);
    dispatch({ type: UNSAVE_POST, payload: post });
  } catch (error) {
    console.log("unSavedPostAction Error: ", error);
  }
};

export const findPostByIdAction = (postId) => async (dispatch) => {
  try {
    const res = await fetch(`${POST_BASE_URL}/${postId}`, {
      method: "GET",
      headers: headers,
    });

    const post = await res.json();
    console.log("findPostByIdAction result: ", post);
    dispatch({ type: GET_SINGLE_POST, payload: post });
  } catch (error) {
    console.log("findPostByIdAction Error: ", error);
  }
};

export const deletePostAction = (postId) => async (dispatch) => {
  try {
    const res = await fetch(`${POST_BASE_URL}/delete/${postId}`, {
      method: "DELETE",
      headers: headers,
    });

    const post = await res.json();
    console.log("deletePostAction result: ", post);
    dispatch({ type: DELETE_POST, payload: post });
  } catch (error) {
    console.log("deletePostAction Error: ", error);
  }
};
