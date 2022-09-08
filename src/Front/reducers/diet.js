import * as actionTypes from 'Front/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  isDietList:false,
  isDietListError: false,
  dietList: false,
  isDietPrint: false,
  isDietPrintError: false,
  printDiet:false
}

export default (state = initState, action={}) => {
  switch (action.type) {
    // Diet list
    case actionTypes.GET_DIET_LIST_SUCCESS:
      return {
        ...state,
        message: 'Diet List successfully',
        dietList: action.payload.response,
        isDietList: true,
        isDietListError: false,
      }
    case actionTypes.GET_DIET_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isDietList: false,
        isDietListError: true
      }

    // Print diet
    case actionTypes.PRINT_DIET_REQUEST:
      return {
        ...state,
        message: '',
        isDietPrint: false,
        isDietPrintError: false,
      }
    case actionTypes.PRINT_DIET_SUCCESS:
      return {
        ...state,
        message: 'Diet print successfull',
        printDiet: action.payload.response,
        isDietPrint: true,
        isDietPrintError: false,
      }
    case actionTypes.PRINT_DIET_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isDietPrint: false,
        isDietPrintError: true,
      }

    default:
    return state
  }
}
