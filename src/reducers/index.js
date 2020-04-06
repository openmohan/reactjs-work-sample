import { combineReducers } from "redux";
import course from "./course";
import user from "./user";
import registration from "./registration";

export default combineReducers({ course, user, registration });
