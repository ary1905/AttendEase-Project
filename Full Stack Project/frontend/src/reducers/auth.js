import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    STUDENT_SIGNUP_SUCCESS,
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    userType : null,
    user: null
};


const authReducer = function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            };
        case STUDENT_SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload,
                userType : payload.user_type,
            };
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            };
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            };
        case GOOGLE_AUTH_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
            }
        case GOOGLE_AUTH_FAIL:
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                userType : null,
            };
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
};

export default authReducer;
