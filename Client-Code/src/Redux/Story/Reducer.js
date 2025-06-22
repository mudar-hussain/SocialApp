import { GET_FOLLOWING_USER_STORY, GET_USER_STORY } from "./ActionType";

const initialValue = {
  userStories: [],
  followingStories: [],
};

export const StoryReducer = (store = initialValue, { type, payload }) => {
  if (type === GET_USER_STORY) {
    return { ...store, userStories: payload };
  } else if (type === GET_FOLLOWING_USER_STORY) {
    return { ...store, followingStories: payload };
  }

  return store;
};
