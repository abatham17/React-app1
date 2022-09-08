import * as actionTypes from 'Admin/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  isClinicSubscriptionList:false,
  isClinicSubscriptionListError: false,
  clinicSubscriptionList: false,

  isAddClinicSubscription:false,
  isAddClinicSubscriptionError:false,
  addClinicSubscriptionResponse:'',

  isSubscriptionChangeStatus: false,
  isSubscriptionChangeStatusError: false,
  SubscriptionChangeStatusResponse:'',

}

export default (state = initState, action={}) => {
  switch (action.type) {
    case actionTypes.GET_CLINIC_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        message: '',
        isClinicSubscriptionList: false,
        isClinicSubscriptionListError: false,
      }
    case actionTypes.GET_CLINIC_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        message: 'Clinic List successfully',
        clinicSubscriptionList: action.payload.response,
        isClinicSubscriptionList: true,
        isClinicSubscriptionListError: false,
      }
    case actionTypes.GET_CLINIC_SUBSCRIPTION_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isClinicSubscriptionList: false,
        isClinicSubscriptionListError: true
      }


      case actionTypes.POST_ADD_CLINIC_SUBSCRIPTION_REQUEST:
        return {
          ...state,
          message: '',
          isAddClinicSubscription: false,
          isAddClinicSubscriptionError: false,
        }
      case actionTypes.GET_ADD_CLINIC_SUBSCRIPTION_SUCCESS:
        return {
          ...state,
          message: 'Clinic List successfully',
          addClinicSubscriptionResponse: action.payload.response,
          isAddClinicSubscription: true,
          isAddClinicSubscriptionError: false,
        }
      case actionTypes.GET_ADD_CLINIC_SUBSCRIPTION_ERROR:
        return {
          ...state,
          addClinicSubscriptionResponse: action.payload.error,
          message: action.payload.error,
          isAddClinicSubscription: false,
          isAddClinicSubscriptionError: true
        }

      //Subscription Status Change
      case actionTypes.GET_SUBSCRIPTION_CHANGE_STATUS_REQUEST:
      return {
        ...state,
        message: '',
        isSubscriptionChangeStatus: false,
        isSubscriptionChangeStatusError: false,
      }
    case actionTypes.GET_SUBSCRIPTION_CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        message: 'Subscription Status Changed',
        SubscriptionChangeStatus: action.payload.response,
        isSubscriptionChangeStatus: true,
        isSubscriptionChangeStatusError: false,
      }
    case actionTypes.GET_SUBSCRIPTION_CHANGE_STATUS_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isSubscriptionChangeStatus: false,
        isSubscriptionChangeStatusError: true
      }


    default:
    return state
  }
}
