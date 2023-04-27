import { AUTH_SUCCESS , AUTH_START , AUTH_FAILURE, AUTH_LOGOUT } from "../Constants"
export const authStart = () =>({
    type:AUTH_START,
})
export const authSuccess = (data) => ({
    type:AUTH_SUCCESS,
    data
})

export const authFailure = (error) => ({
    type: AUTH_FAILURE
})

export const authLogout = () =>({
    type: AUTH_LOGOUT
})