import { ACCESS_TOKEN, API_BASE_URL } from "../../Config/Constants";
import {
  CREATE_COMMENT,
  GET_POST_COMMENT,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
} from "./ActionType";



const COMMENT_BASE_URL = `${API_BASE_URL}/comments`;
const jwtToken = localStorage.getItem(ACCESS_TOKEN);
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: "Bearer " + jwtToken,
};

export const createCommentAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${COMMENT_BASE_URL}/create/${data.postId}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data.data),
    });

    const comment = await res.json();
    console.log("createCommentAction result: ", comment);
    dispatch({ type: CREATE_COMMENT, payload: comment });
  } catch (error) {
    console.log("createCommentAction Error: ", error);
  }
};

export const findPostCommentsAction = (postId) => async (dispatch) => {
  try {
    const res = await fetch(`${COMMENT_BASE_URL}/all/${postId}`, {
      method: "GET",
      headers: headers,
    });

    const comments = await res.json();
    console.log("findPostCommentAction result: ", comments);
    dispatch({ type: GET_POST_COMMENT, payload: comments });
  } catch (error) {
    console.log("findPostCommentAction Error: ", error);
  }
};

export const likeCommentAction = (commentId) => async (dispatch) => {
  try {
    const res = await fetch(`${COMMENT_BASE_URL}/like/${commentId}`, {
      method: "PUT",
      headers: headers,
    });

    const comment = await res.json();
    console.log("likeCommentAction result: ", comment);
    dispatch({ type: LIKE_COMMENT, payload: comment });
  } catch (error) {
    console.log("likeCommentAction Error: ", error);
  }
};

export const unLikeCommentAction = (commentId) => async (dispatch) => {
  try {
    const res = await fetch(`${COMMENT_BASE_URL}/unlike/${commentId}`, {
      method: "PUT",
      headers: headers,
    });

    const comment = await res.json();
    console.log("unLikeCommentAction result: ", comment);
    dispatch({ type: UNLIKE_COMMENT, payload: comment });
  } catch (error) {
    console.log("unLikeCommentAction Error: ", error);
  }
};
