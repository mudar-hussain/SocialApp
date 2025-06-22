import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "../Auth/Reducer";
import { UserReducer } from "../User/Reducer";
import { PostReducer } from "../Post/Reducer";
import { CommentReducer } from "../Comment/Reducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { StoryReducer } from "../Story/Reducer";

const rootReducers=combineReducers({
    auth:AuthReducer,
    user:UserReducer,
    post:PostReducer,
    comment:CommentReducer,
    story:StoryReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'user', 'post', 'comment', 'story'], // Only persist the 'auth' part of the state
  };

const persistedReducer = persistReducer(persistConfig, rootReducers);


 const store=legacy_createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};