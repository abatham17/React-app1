import * as actionTypes from 'Admin/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  isClinicActiveList:false,
  isClinicActiveListError: false,
  clinicActiveList: false,

}

export default (state = initState, action={}) => {
  switch (action.type) {
    case actionTypes.GET_CLINIC_ACTIVE_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isClinicActiveList: false,
        isClinicActiveListError: false,
      }
    case actionTypes.GET_CLINIC_ACTIVE_LIST_SUCCESS:
      return {
        ...state,
        message: 'Clinic List successfully',
        clinicActiveList: action.payload.response,
        isClinicActiveList: true,
        isClinicActiveListError: false,
      }
    case actionTypes.GET_CLINIC_ACTIVE_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isClinicActiveList: false,
        isClinicActiveListError: true
      }



    default:
    return state
  }
}
