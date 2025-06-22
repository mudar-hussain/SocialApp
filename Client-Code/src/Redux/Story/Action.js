import { ACCESS_TOKEN, API_BASE_URL } from "../../Config/Constants";
import { GET_FOLLOWING_USER_STORY, GET_USER_STORY } from "./ActionType";


const STORY_BASE_URL = `${API_BASE_URL}/story`;
const jwtToken = localStorage.getItem(ACCESS_TOKEN);
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: "Bearer " + jwtToken,
};


export const findFollowingUserStory = (userIds) => async (dispatch) => {
    try {
        const res = await fetch(`${STORY_BASE_URL}/all/${userIds}`, {
          method: "GET",
          headers: headers,
        });
    
        const stories = await res.json();
        console.log("findFollowingUserStory result: ", stories);
        dispatch({ type: GET_FOLLOWING_USER_STORY, payload: stories});
      } catch (error) {
        console.log("findFollowingUserStory Error: ", error);
      }
}

export const findStoryByUserId = (userId) => async (dispatch) => {
    try {
        const res = await fetch(`${STORY_BASE_URL}/${userId}`, {
          method: "GET",
          headers: headers,
        });
    
        const stories = await res.json();
        console.log("findStoryByUserId result: ", stories);
        dispatch({ type: GET_USER_STORY, payload: stories});
      } catch (error) {
        console.log("findStoryByUserId Error: ", error);
      }
}