import * as actionTypes from 'Front/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  isClinicList:false,
  isClinicListError: false,
  ClinicList: false,
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


    default:
    return state
  }
}
