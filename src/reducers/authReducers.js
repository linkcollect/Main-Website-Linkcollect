import { AUTH_SUCCESS, AUTH_START, AUTH_FAILURE, AUTH_LOGOUT } from "../Constants";
const initilaState = {
    token:"",
    user:{},
    loading:false,
    error:false
}
const authReducer = (state=initilaState,action) => {
    const {type,data} = action;
    switch(type) {
        case AUTH_START :
            return {
                ...state,
                loading:true,
                error:false
            }
        case AUTH_SUCCESS : 
            return  {
                ...state,
                token:data.token,
                user:data.user,
                loading:false,
            }
        case AUTH_FAILURE :
            return {
            ...state,
            loading:false,
            error:true
        }
        case AUTH_LOGOUT:
            return {...initilaState}
        default:
            return state
    }
}

export default authReducer