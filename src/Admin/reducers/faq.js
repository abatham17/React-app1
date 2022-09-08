import * as actionTypes from 'Admin/actions/actionTypes'
const initState = {
  response: [],
  message: '',

  isAddFaq:false,
  isAddFaqError: false,
  AddFaq: false,
  isUpdateFaq:false,
  isUpdateFaqError: false,
  UpdateFaq: false,
  FaqList: false,
  isFaqList: false,
  isFaqListError: false,
  isFaqChangeStatus:false,
  isFaqChangeStatusError:false,
  FaqChangeStatus:false,
  isUploadFile:false,
  isUploadFileError: false,
  uploadFile: false,
} 
 
export default (state = initState, action={}) => {
  switch (action.type) {

      //Add Faq
      case actionTypes.GET_ADD_FAQ_REQUEST:
        return {
          ...state,
          message: '',
          isAddFaq: false,
          isAddFaqError: false,
        }
      case actionTypes.GET_ADD_FAQ_SUCCESS:
        return {
          ...state,
          message: 'Faq Added Successfully',   
          AddFaq: action.payload.response,   
          isAddFaq: true,
          isAddFaqError: false,
        }
      case actionTypes.GET_ADD_FAQ_ERROR:
        return {
          ...state,
          response: action.payload.error,
          message: action.payload.error,
          isAddFaq: false,
          isAddFaqError: true
        } 

        //Update Faq
      case actionTypes.GET_UPDATE_FAQ_REQUEST:
      return {
        ...state,
        message: '',
        isUpdateFaq: false,
        isUpdateFaqError: false,
      }
    case actionTypes.GET_UPDATE_FAQ_SUCCESS:
      return {
        ...state,
        message: 'Faq Updated Successfully',   
        UpdateFaq: action.payload.response,   
        isUpdateFaq: true,
        isUpdateFaqError: false,
      }
    case actionTypes.GET_UPDATE_FAQ_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isUpdateFaq: false,
        isUpdateFaqError: true
      } 

        //Faq List
        case actionTypes.GET_FAQ_LIST_REQUEST:
        return {
          ...state,
          message: '',
          isFaqList: false,
          isFaqListError: false,
        }
      case actionTypes.GET_FAQ_LIST_SUCCESS:
        return {
          ...state,
          message: 'Faq List',
          FaqList: action.payload.response,
          isFaqList: true,
          isFaqListError: false,
        }
      case actionTypes.GET_FAQ_LIST_ERROR:
        return {
          ...state,
          response: action.payload.error,
          message: action.payload.error,
          isFaqList: false,
          isFaqListError: true
        }


        //Faq Status Change
        case actionTypes.GET_FAQ_CHANGE_STATUS_REQUEST:
        return {
          ...state,
          message: '',
          isFaqChangeStatus: false,
          isFaqChangeStatusError: false,
        }
      case actionTypes.GET_FAQ_CHANGE_STATUS_SUCCESS:
        return {
          ...state,
          message: 'Faq Status Changed',
          FaqChangeStatus: action.payload.response,
          isFaqChangeStatus: true,
          isFaqChangeStatusError: false,
        }
      case actionTypes.GET_FAQ_CHANGE_STATUS_ERROR:
        return {
          ...state,
          response: action.payload.error,
          message: action.payload.error,
          isFaqChangeStatus: false,
          isFaqChangeStatusError: true
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
