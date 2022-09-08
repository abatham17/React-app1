import * as actionTypes from 'Admin/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  isClinicCalendarList:false,
  isClinicCalendarListError: false,
  ClinicCalendarList: false,

  isAddClinicCalendar:false,
  isAddClinicCalendarError:false,
  addClinicCalendarResponse:'',

  isCalendarChangeStatus:false,
  isCalendarChangeStatusError:false,
  CalendarChangeStatusResponse:'',

}

export default (state = initState, action={}) => {
  switch (action.type) {
    case actionTypes.GET_CLINIC_CALENDAR_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isClinicCalendarList: false,
        isClinicCalendarListError: false,
      }
    case actionTypes.GET_CLINIC_CALENDAR_LIST_SUCCESS:
      return {
        ...state,
        message: 'ClinicCalendar List successfully',
        clinicCalendarList: action.payload.response,
        isClinicCalendarList: true,
        isClinicCalendarListError: false,
      }
    case actionTypes.GET_CLINIC_CALENDAR_LIST_ERROR:
      return {
        ...state,
        clinicCalendarList: action.payload.error,
        message: action.payload.error,
        isClinicCalendarList: false,
        isClinicCalendarListError: true
      }
      case actionTypes.POST_ADD_CLINIC_CALENDAR_REQUEST:
        return {
          ...state,
          message: '',
          isAddClinicCalendar: false,
          isAddClinicCalendarError: false,
        }
      case actionTypes.GET_ADD_CLINIC_CALENDAR_SUCCESS:
        return {
          ...state,
          message: 'Clinic Calendar List successfully',
          addClinicCalendarResponse: action.payload.response,
          isAddClinicCalendar: true,
          isAddClinicCalendarError: false,
        }
      case actionTypes.GET_ADD_CLINIC_CALENDAR_ERROR:
        return {
          ...state,
          addClinicCalendarResponse: action.payload.error,
          message: action.payload.error,
          isAddClinicCalendar: false,
          isAddClinicCalendarError: true
        }

        //Calendar Status Change
      case actionTypes.GET_CALENDAR_CHANGE_STATUS_REQUEST:
      return {
        ...state,
        message: '',
        isCalendarChangeStatus: false,
        isCalendarChangeStatusError: false,
      }
    case actionTypes.GET_CALENDAR_CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        message: 'Calendar Status Changed',
        CalendarChangeStatus: action.payload.response,
        isCalendarChangeStatus: true,
        isCalendarChangeStatusError: false,
      }
    case actionTypes.GET_CALENDAR_CHANGE_STATUS_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isCalendarChangeStatus: false,
        isCalendarChangeStatusError: true
      }

    default:
    return state
  }
}
