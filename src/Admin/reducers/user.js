import * as actionTypes from 'Admin/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  isUserList:false,
  isUserListError: false,
  UserList: false,

  isAddUser:false,
  isAddUserError: false,
  AddUser: false,

  isUpdateUser:false,
  isUpdateUserError: false,
  UpdateUser: false,

  isUserDetail:false,
  isUserDetailError: false,
  UserDetail: false,

  isUserStatus:false,
  isUserStatusError: false,
  userStatus: false,

  isUploadFile:false,
  isUploadFileError: false,
  uploadFile: false,
}

export default (state = initState, action={}) => {
  switch (action.type) {
    case actionTypes.GET_USER_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isUserList: false,
        isUserListError: false,
      }
    case actionTypes.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        message: 'User List successfully',
        UserList: action.payload.response,
        isUserList: true,
        isUserListError: false,
      }
    case actionTypes.GET_USER_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isUserList: false,
        isUserListError: true
      }

      // Add User
      case actionTypes.GET_ADD_USER_REQUEST:
      return {
        ...state,
        message: '',
        isAddUser: false,
        isAddUserError: false,
      }
    case actionTypes.GET_ADD_USER_SUCCESS:
      return {
        ...state,
        response: action.payload.response,
        message: 'Logged in successfully',
        AddUserData: action.payload.response,
        isAddUser: true,
        isAddUserError: false,
      }
    case actionTypes.GET_ADD_USER_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isAddUser: false,
        isAddUserError: true
      }


      // Update User
      case actionTypes.GET_UPDATE_USER_REQUEST:
      return {
        ...state,
        message: '',
        isUpdateUser: false,
        isUpdateUserError: false,
      }
    case actionTypes.GET_UPDATE_USER_SUCCESS:
      return {
        ...state,
        response: action.payload.response,
        message: 'User Updated Successfully...',
        UpdateUserData: action.payload.response,
        isUpdateUser: true,
        isUpdateUserError: false,
      }
    case actionTypes.GET_UPDATE_USER_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isUpdateUser: false,
        isUpdateUserError: true
      }

       //Upload file
       case actionTypes.POST_UPLOAD_FILE_REQUEST:
       return {
         ...state,
         message: '',
         isUploadFile: false,
         isUploadFileError: false,
       }
     case actionTypes.GET_UPLOAD_FILE_SUCCESS:
       return {
         ...state,
         message: 'File Uploaded',
         uploadFile: action.payload.response,
         isUploadFile: true,
         isUploadFileError: false,
       }
     case actionTypes.GET_UPLOAD_FILE_ERROR:
       return {
         ...state,
         uploadFile: action.payload.error,
         message: action.payload.error,
         isUploadFile: false,
         isUploadFileError: true
       }
       //User Status change
       case actionTypes.GET_USER_STATUS_REQUEST:
         return {
           ...state,
           message: '',
           isUserStatus: false,
           isUserStatusError: false,
         }
       case actionTypes.GET_USER_STATUS_SUCCESS:
         return {
           ...state,
           message: 'User List successfully',
           userStatus: action.payload.response,
           isUserStatus: true,
           isUserStatusError: false,
         }
       case actionTypes.GET_USER_STATUS_ERROR:
         return {
           ...state,
           response: action.payload.error,
           message: action.payload.error,
           isUserStatus: false,
           isUserStatusError: true
         }
     default:
     return state
   }
 }
