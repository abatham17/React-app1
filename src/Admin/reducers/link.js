import * as actionTypes from 'Admin/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  isAddLink: false,
  isAddLinkError: false,
  AddLink: false,
  isUpdateLink: false,
  isUpdateLinkError: false,
  UpdateLink: false,
  isLinkChangeStatus:false,
  isLinkChangeStatusError:false,
  LinkChangeStatus:false,
  isLinkList: false,
  isLinkListError: false,
  LinkList: false,
  isUploadFile:false,
  isUploadFileError: false,
  uploadFile: false,
}

export default (state = initState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_ADD_LINK_REQUEST:
      return {
        ...state,
        message: '',
        isAddLink: false,
        isAddLinkError: false,
      }
    case actionTypes.GET_ADD_LINK_SUCCESS:
      return {
        ...state,
        message: 'Link Added Successfully',
        AddLink: action.payload.response,
        isAddLink: true,
        isAddLinkError: false,
      }
    case actionTypes.GET_ADD_LINK_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isAddLink: false,
        isAddLinkError: true
      }

      //Link Update

      case actionTypes.GET_UPDATE_LINK_REQUEST:
      return {
        ...state,
        message: '',
        isUpdateLink: false,
        isUpdateLinkError: false,
      }
    case actionTypes.GET_UPDATE_LINK_SUCCESS:
      return {
        ...state,
        message: 'Link Updated Successfully',
        UpdateLink: action.payload.response,
        isUpdateLink: true,
        isUpdateLinkError: false,
      }
    case actionTypes.GET_UPDATE_LINK_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isUpdateLink: false,
        isUpdateLinkError: true
      }

      //Link List
    case actionTypes.GET_LINK_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isLinkList: false,
        isLinkListError: false,
      }
    case actionTypes.GET_LINK_LIST_SUCCESS:
      return {
        ...state,
        message: 'Link List',
        LinkList: action.payload.response,
        isLinkList: true,
        isLinkListError: false,
      }
    case actionTypes.GET_LINK_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isLinkList: false,
        isLinkListError: true
      }

      //Link Status Change
      case actionTypes.GET_LINK_CHANGE_STATUS_REQUEST:
      return {
        ...state,
        message: '',
        isLinkChangeStatus: false,
        isLinkChangeStatusError: false,
      }
    case actionTypes.GET_LINK_CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        message: 'Link Status Changed',
        LinkChangeStatus: action.payload.response,
        isLinkChangeStatus: true,
        isLinkChangeStatusError: false,
      }
    case actionTypes.GET_LINK_CHANGE_STATUS_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isLinkChangeStatus: false,
        isLinkChangeStatusError: true
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

/********* Show list of Link */



