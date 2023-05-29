import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action = {}) =>{
    const {type, payload } = action;
    switch(type){
        case USER_ACTION_TYPES.SIGNOUT_START:
        case USER_ACTION_TYPES.EMAIL_SIGNIN_START:
        case USER_ACTION_TYPES.GOOGLE_SIGNIN_START:
        case USER_ACTION_TYPES.SIGNUP_START:
            return{
                ...state,
                isLoading: true
            }
        case USER_ACTION_TYPES.SIGNIN_SUCCESS:
            return {
                ...state,
                currentUser: payload,
                isLoading: false
            }
        case USER_ACTION_TYPES.SIGNIN_FAILED:
        case USER_ACTION_TYPES.SIGNUP_FAILED:
        case USER_ACTION_TYPES.SIGNOUT_FAILED:
            return{
                ...state,
                error: payload,
                isLoading: false
            }
        case USER_ACTION_TYPES.SIGNOUT_SUCCESS:
            return{
                ...state,
                currentUser: null,
                isLoading: false
            }
        default:
            return state;
    }
}