import * as actionTypes from 'Admin/actions/actionTypes'
const initState = {
  response: [],
  message: '',

  isAddEducator:false,
  isAddEducatorError: false,
  AddEducator: false,
  isEducatorList:false,
  isEducatorListError: false,
  EducatorList: false,
  isUpdateEducator: false,
  isUpdateEducatorError: false,
  UpdateEducator: false,
  isEducatorChangeStatus:false,
  isEducatorChangeStatusError:false,
  EducatorChangeStatus:false,
} 
 
export default (state = initState, action={}) => {
  switch (action.type) {

      //Add Educator
      case actionTypes.GET_ADD_EDUCATOR_REQUEST:
        return {
          ...state,
          message: '',
          isAddEducator: false,
          isAddEducatorError: false,
        }
      case actionTypes.GET_ADD_EDUCATOR_SUCCESS:
        return {
          ...state,
          message: 'Educator added successfully',   
          AddEducator: action.payload.response,   
          isAddEducator: true,
          isAddEducatorError: false,
        }
      case actionTypes.GET_ADD_EDUCATOR_ERROR:
        return {
          ...state,
          response: action.payload.error,
          message: action.payload.error,
          isAddEducator: false,
          isAddEducatorError: true
        } 

         //EDUCATOR List
    case actionTypes.GET_EDUCATOR_LIST_REQUEST:
    return {
      ...state,
      message: '',
      isEducatorList: false,
      isEducatorListError: false,
    }
  case actionTypes.GET_EDUCATOR_LIST_SUCCESS:
    return {
      ...state,
      message: 'Educator Listed Successfully',
      EducatorList: action.payload.response,
      isEducatorList: true,
      isEducatorListError: false,
    }
  case actionTypes.GET_EDUCATOR_LIST_ERROR:
    return {
      ...state,
      response: action.payload.error,
      message: action.payload.error,
      isEducatorList: false,
      isEducatorListError: true
    }

    //Educator Update

    case actionTypes.GET_UPDATE_EDUCATOR_REQUEST:
    return {
      ...state,
      message: '',
      isUpdateLink: false,
      isUpdateLinkError: false,
    }
  case actionTypes.GET_UPDATE_EDUCATOR_SUCCESS:
    return {
      ...state,
      message: 'Educator Updated Successfully',
      UpdateEducator: action.payload.response,
      isUpdateEducator: true,
      isUpdateEducatorError: false,
    }
  case actionTypes.GET_UPDATE_EDUCATOR_ERROR:
    return {
      ...state,
      response: action.payload.error,
      message: action.payload.error,
      isUpdateEducator: false,
      isUpdateEducatorError: true
    }

  //Eduactor Status Change
  case actionTypes.GET_EDUCATOR_CHANGE_STATUS_REQUEST:
  return {
    ...state,
    message: '',
    isEducatorChangeStatus: false,
    isEducatorChangeStatusError: false,
  }
case actionTypes.GET_EDUCATOR_CHANGE_STATUS_SUCCESS:
  return {
    ...state,
    message: 'Educator Status Changed',
    EducatorChangeStatus: action.payload.response,
    isEducatorChangeStatus: true,
    isEducatorChangeStatusError: false,
  }
case actionTypes.GET_EDUCATOR_CHANGE_STATUS_ERROR:
  return {
    ...state,
    response: action.payload.error,
    message: action.payload.error,
    isEducatorChangeStatus: false,
    isEducatorChangeStatusError: true
  }

    default:
    return state
  }
}
