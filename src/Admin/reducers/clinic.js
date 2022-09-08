import * as actionTypes from 'Admin/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  isClinicList:false,
  isClinicListError: false,
  ClinicList: false,

  isAddClinic:false,
  isAddClinicError:false,
  addClinicResponse:'',

  isClinicChangeStatus:false,
  isClinicChangeStatusError:false,
  ClinicChangeStatusResponse:'',

  isUpdateClinic:false,
  isUpdateClinicError:false,
  updateClinicResponse:'',

}

export default (state = initState, action={}) => {
  switch (action.type) {
    case actionTypes.GET_CLINIC_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isClinicList: false,
        isClinicListError: false,
      }
    case actionTypes.GET_CLINIC_LIST_SUCCESS:
      return {
        ...state,
        message: 'Clinic List successfully',
        ClinicList: action.payload.response,
        isClinicList: true,
        isClinicListError: false,
      }
    case actionTypes.GET_CLINIC_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isClinicList: false,
        isClinicListError: true
      }
      case actionTypes.POST_ADD_CLINIC_REQUEST:
        return {
          ...state,
          message: '',
          isAddClinic: false,
          isAddClinicError: false,
        }
      case actionTypes.GET_ADD_CLINIC_SUCCESS:
        return {
          ...state,
          message: 'Clinic List successfully',
          addClinicResponse: action.payload.response,
          isAddClinic: true,
          isAddClinicError: false,
        }
      case actionTypes.GET_ADD_CLINIC_ERROR:
        return {
          ...state,
          addClinicResponse: action.payload.error,
          message: action.payload.error,
          isAddClinic: false,
          isAddClinicError: true
        }
        case actionTypes.POST_UPDATE_CLINIC_REQUEST:
          return {
            ...state,
            message: '',
            isUpdateClinic: false,
            isUpdateClinicError: false,
          }
        case actionTypes.GET_UPDATE_CLINIC_SUCCESS:
        debugger
          return {
            ...state,
            message: 'Clinic Updated successfully',
            updateClinicResponse: action.payload.response,
            isUpdateClinic: true,
            isUpdateClinicError: false,
          }
        case actionTypes.GET_UPDATE_CLINIC_ERROR:
        debugger
          return {
            ...state,
            updateClinicResponse: action.payload.error,
            message: action.payload.error,
            isUpdateClinic: false,
            isUpdateClinicError: true
          }

      //Clinic Status Change
      case actionTypes.GET_CLINIC_CHANGE_STATUS_REQUEST:
      return {
        ...state,
        message: '',
        isClinicChangeStatus: false,
        isClinicChangeStatusError: false,
      }
    case actionTypes.GET_CLINIC_CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        message: 'Clinic Status Changed',
        ClinicChangeStatus: action.payload.response,
        isClinicChangeStatus: true,
        isClinicChangeStatusError: false,
      }
    case actionTypes.GET_CLINIC_CHANGE_STATUS_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isClinicChangeStatus: false,
        isClinicChangeStatusError: true
      }
    default:
    return state
  }
}
