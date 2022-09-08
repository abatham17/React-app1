import * as actionTypes from 'Admin/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  isLanguageChangeStatus:false,
  isLanguageChangeStatusError:false,
  LanguageChangeStatus:false,
  isLanguageList: false,
  isLanguageListError: false,
  LanguageList: false,
  isUploadFile:false,
  isUploadFileError: false,
  uploadFile: false,
}

export default (state = initState, action = {}) => {
  switch (action.type) {

      //Language List
    case actionTypes.GET_LANGUAGE_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isLanguageList: false,
        isLanguageListError: false,
      }
    case actionTypes.GET_LANGUAGE_LIST_SUCCESS:
      return {
        ...state,
        message: 'LANGUAGE List',
        LanguageList: action.payload.response,
        isLanguageList: true,
        isLanguageListError: false,
      }
    case actionTypes.GET_LANGUAGE_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isLanguageList: false,
        isLanguageListError: true
      }

      //Language Status Change
      case actionTypes.GET_LANGUAGE_CHANGE_STATUS_REQUEST:
      return {
        ...state,
        message: '',
        isLanguageChangeStatus: false,
        isLanguageChangeStatusError: false,
      }
    case actionTypes.GET_LANGUAGE_CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        message: 'Language Status Changed',
        LanguageChangeStatus: action.payload.response,
        isLanguageChangeStatus: true,
        isLanguageChangeStatusError: false,
      }
    case actionTypes.GET_LANGUAGE_CHANGE_STATUS_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isLanguageChangeStatus: false,
        isLanguageChangeStatusError: true
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


    default:
      return state
  }
}

/********* Show list of Language */



