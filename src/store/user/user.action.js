import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGNIN_START);
export const emailSignInStart = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGNIN_START, {email, password});

export const signOutStart = () => createAction(USER_ACTION_TYPES.SIGNOUT_START);
export const signOutSuccess = () => createAction(USER_ACTION_TYPES.SIGNOUT_SUCCESS);
export const signOutFailed= (error) => createAction(USER_ACTION_TYPES.SIGNOUT_FAILED, error);

export const signUpStart = (email, password, displayName) => createAction(USER_ACTION_TYPES.SIGNUP_START, {email, password, displayName});
export const signUpSuccess = (user, aditionalDetails) => createAction(USER_ACTION_TYPES.SIGNUP_SUCCESS, {user, aditionalDetails});
export const signUpFailed= (error) => createAction(USER_ACTION_TYPES.SIGNUP_FAILED, error);

export const signInSuccess = (user) => createAction(USER_ACTION_TYPES.SIGNIN_SUCCESS, user);
export const signInFailed = (error) => createAction(USER_ACTION_TYPES.SIGNIN_FAILED, error);
