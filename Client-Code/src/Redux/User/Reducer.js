import {
  GET_USERS_BY_USER_IDS,
  GET_USER_BY_USERNAME,
  FOLLOW_USER,
  UNFOLLOW_USER,
  SEARCH_USER,
  UPDATE_USER,
  REQ_USER,
  GET_USER_SAVED_POST,
  GET_SUGGESTION_USER,
} from "./ActionType";

const initialValue = {
  reqUser: null,
  findByUsername: null,
  findUserByIds: [],
  followUser: null,
  unfollowUser: null,
  searchUser: null,
  updatedUser: null,
  userSavedPost: [],
  suggestionUser: [],
};

export const UserReducer = (store = initialValue, { type, payload }) => {
  if (type === REQ_USER) {
    return { ...store, reqUser: payload };
  } else if (type === GET_USER_BY_USERNAME) {
    return { ...store, findByUsername: payload };
  } else if (type === GET_USERS_BY_USER_IDS) {
    return { ...store, findUserByIds: payload };
  } else if (type === FOLLOW_USER) {
    return { ...store, followUser: payload };
  } else if (type === UNFOLLOW_USER) {
    return { ...store, unfollowUser: payload };
  } else if (type === SEARCH_USER) {
    return { ...store, searchUser: payload };
  } else if (type === UPDATE_USER) {
    return { ...store, updatedUser: payload };
  } else if (type === GET_USER_SAVED_POST) {
    return { ...store, userSavedPost: payload };
  } else if (type === GET_SUGGESTION_USER) {
    return { ...store, suggestionUser: payload };
  }

  return store;
};
