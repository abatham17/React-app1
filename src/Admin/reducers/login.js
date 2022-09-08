import * as actionTypes from 'Admin/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  loginCheck:false,
  isLogin:false,
  isLoginError: false,
} 
 
export default (state = initState, action={}) => {
  switch (action.type) {
    case actionTypes.GET_SIGNIN_USER_REQUEST:
      return {
        ...state,
        message: '',
        isLogin: false,
        isLoginError: false,
      }
    case actionTypes.GET_SIGNIN_USER_SUCCESS:
      return {
        ...state,
        response: action.payload.response,
        message: 'Logged in successfully',   
        LoginData: action.payload.response,   
        isLogin: true,
        isLoginError: false,
      }
    case actionTypes.GET_SIGNIN_USER_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isLogin: false,
        isLoginError: true
      }    


    default:
    return state
  }
}
