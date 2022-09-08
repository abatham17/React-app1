import * as actionTypes from 'Admin/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  isAddSpecilization:false,
  isAddSpecilizationError: false,
  AddSpecilization: false,

  isUpdateSpecilization:false,
  isUpdateSpecilizationError: false,
  UpdateSpecilization: false,

  isSpecilizationChangeStatus:false,
  isSpecilizationChangeStatusError: false,
  SpecilizationChangeStatus: false,

  isSpecializationList:false,
  isSpecializationListError: false,
  SpecializationList: false,
}

export default (state = initState, action={}) => {
  switch (action.type) {
    case actionTypes.ADD_SPECILIZATION_REQUEST:
      return {
        ...state,
        message: '',
        isisAddSpecilizatio: false,
        isisAddSpecilizatioError: false,
      }
    case actionTypes.ADD_SPECILIZATION_SUCCESS:
      return {
        ...state,
        message: 'Data Added Successfully',
        isAddSpeciliData: action.payload.response,
        isAddSpecilizatio: true,
        isAddSpecilizatioError: false,
      }
    case actionTypes.ADD_SPECILIZATION_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isAddSpecilizatio: false,
        isAddSpecilizatioError: true
      }

      case actionTypes.GET_UPDATE_SPECILIZATION_REQUEST:
      return {
        ...state,
        message: '',
        isUpdateSpecilization: false,
        isUpdateSpecilizatioError: false,
      }
    case actionTypes.GET_UPDATE_SPECILIZATION_SUCCESS:
      return {
        ...state,
        message: 'Data Updated Successfully',
        isUpdateSpeciliData: action.payload.response,
        isUpdateSpecilization: true,
        isUpdateSpecilizatioError: false,
      }
    case actionTypes.GET_UPDATE_SPECILIZATION_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isUpdateSpecilization: false,
        isUpdateSpecilizatioError: true
      }

    case actionTypes.GET_SPECILIZATION_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isSpecializationList: false,
        isSpecializationListError: false,
      }
    case actionTypes.GET_SPECILIZATION_LIST_SUCCESS:
      return {
        ...state,
        message: 'Specialization List',
        SpecializationList: action.payload.response,
        isSpecializationList: true,
        isSpecializationListError: false,
      }
    case actionTypes.GET_SPECILIZATION_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isSpecializationList: false,
        isSpecializationListError: true
      }

      case actionTypes.GET_SPECILIZATION_CHANGE_STATUS_REQUEST:
      return {
        ...state,
        message: '',
        isSpecilizationChangeStatus: false,
        isSpecilizationChangeStatusError: false,
      }
    case actionTypes.GET_SPECILIZATION_CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        message: 'Specialization List',
        SpecilizationChangeStatus: action.payload.response,
        isSpecilizationChangeStatus: true,
        isSpecilizationChangeStatusError: false,
      }
    case actionTypes.GET_SPECILIZATION_CHANGE_STATUS_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isSpecilizationChangeStatus: false,
        isSpecilizationChangeStatusError: true
      }


    default:
    return state
  }
}

/********* Show list of Specilization */
