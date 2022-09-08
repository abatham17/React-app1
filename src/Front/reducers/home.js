import * as actionTypes from 'Front/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  isVisitList:false,
  isVisitListError: false,
  VisitList: false,

  isPatientRegistration:false,
  isPatientRegistrationError: false,
  PatientRegistration: false,

  isPatientEdit:false,
  isPatientEditError: false,
  PatientEdit: false,

  isPatientOut:false,
  isPatientOutError: false,
  PatientOut: false,

  isNextVisit:false,
  isNextVisitError: false,
  NextVisit: false,

  isHolidayList:false,
  isHolidayListError: false,
  HolidayList: false,

  isEducatorMsgList:false,
  isEducatorMsgListError: false,
  EducatorMsgList: false,

  isCategoryList:false,
  isCategoryListError: false,
  categoryList: false,

  isKnowledgeList:false,
  isKnowledgeListError: false,
  knowledgeList: false,

  isPrintShareDocument:false,
  isPrintShareDocumentError: false,
  printShareDocument: false,

  isTaskList:false,
  isTaskListError: false,
  taskList: false,

  isChangeStatus:false,
  isChangeStatusError: false,
  changeStatus: false,

  isHistory:false,
  isHistoryError: false,
  History: false,
  
} 
 
export default (state = initState, action={}) => {
  switch (action.type) {
    //Visit List
    case actionTypes.GET_VISIT_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isVisitList: false,
        isVisitListError: false,
      }
    case actionTypes.GET_VISIT_LIST_SUCCESS:
      return {
        ...state,
        message: 'Visit List successfully',   
        VisitList: action.payload.response,   
        isVisitList: true,
        isVisitListError: false,
      }
    case actionTypes.GET_VISIT_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isVisitList: false,
        isVisitListError: true
      } 

      // Patient Registration
      
      case actionTypes.GET_PATIENT_REGISTRATION_REQUEST:
      return {
        ...state,
        message: '',
        isPatientRegistration: false,
        isPatientRegistrationError: false,
      }
    case actionTypes.GET_PATIENT_REGISTRATION_SUCCESS:
      return {
        ...state,
        message: 'Successfully patient Added!',   
        PatientRegistration: action.payload.response,   
        isPatientRegistration: true,
        isPatientRegistrationError: false,
      }
    case actionTypes.GET_PATIENT_REGISTRATION_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isPatientRegistration: false,
        isPatientRegistrationError: true
      } 

       // Patient Edit
      
       case actionTypes.GET_PATIENT_EDIT_REQUEST:
       return {
         ...state,
         message: '',
         isPatientEdit: false,
         isPatientEditError: false,
       }
     case actionTypes.GET_PATIENT_EDIT_SUCCESS:
       return {
         ...state,
         message: 'Patient successfully updated',   
         PatientEdit: action.payload.response,   
         isPatientEdit: true,
         isPatientEditError: false,
       }
     case actionTypes.GET_PATIENT_EDIT_ERROR:
       return {
         ...state,
         response: action.payload.error,
         message: action.payload.error,
         isPatientEdit: false,
         isPatientEditError: true
       } 
    // patient out
    case actionTypes.GET_PATIENT_OUT_REQUEST:
      return {
        ...state,
        message: '',
        isPatientOut: false,
        isPatientOutError: false,
      }
    case actionTypes.GET_PATIENT_OUT_SUCCESS:
      return {
        ...state,
        message: 'Patient successfully out',   
        PatientOut: action.payload.response,   
        isPatientOut: true,
        isPatientOutError: false,
      }
    case actionTypes.GET_PATIENT_OUT_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isPatientOut: false,
        isPatientOutError: true
      } 

    // Next Visit
    case actionTypes.GET_NEXT_VISIT_REQUEST:
      return {
        ...state,
        message: '',
        isNextVisit: false,
        isNextVisitError: false,
      }
    case actionTypes.GET_NEXT_VISIT_SUCCESS:
      return {
        ...state,
        message: 'Successfully next visit date seted.',   
        NextVisit: action.payload.response,   
        isNextVisit: true,
        isNextVisitError: false,
      }
    case actionTypes.GET_NEXT_VISIT_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isNextVisit: false,
        isNextVisitError: true
      }

    // Holiday List
    case actionTypes.GET_HOLIDAY_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isHolidayList: false,
        isHolidayListError: false,
      }
    case actionTypes.GET_HOLIDAY_LIST_SUCCESS:
      return {
        ...state,
        message: 'Successfully .',   
        HolidayList: action.payload.response,   
        isHolidayList: true,
        isHolidayListError: false,
      }
    case actionTypes.GET_HOLIDAY_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isHolidayList: false,
        isHolidayListError: true
      }


    // Educator message list
    case actionTypes.GET_EDUCATOR_MSG_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isEducatorMsgList: false,
        isEducatorMsgListError: false,
      }
    case actionTypes.GET_EDUCATOR_MSG_LIST_SUCCESS:
      return {
        ...state,
        message: 'Successfully Educator message listed.',   
        EducatorMsgList: action.payload.response,   
        isEducatorMsgList: true,
        isEducatorMsgListError: false,
      }
    case actionTypes.GET_EDUCATOR_MSG_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isEducatorMsgList: false,
        isEducatorMsgListError: true
      }

      // category list
      case actionTypes.GET_CATEGORY_LIST_REQUEST:
        return {
          ...state,
          message: '',
          isCategoryList: false,
          isCategoryListError: false,
        }
      case actionTypes.GET_CATEGORY_LIST_SUCCESS:
        return {
          ...state,
          message: 'Plan List successfully',
          categoryList: action.payload.response,
          isCategoryList: true,
          isCategoryListError: false,
        }
      case actionTypes.GET_CATEGORY_LIST_ERROR:
        return {
          ...state,
          response: action.payload.error,
          message: action.payload.error,
          isCategoryList: false,
          isCategoryListError: true
        }

    // knowledge list
    case actionTypes.GET_KNOWLEDGE_LIST_REQUEST:
    return {
      ...state,
      message: '',
      isKnowledgeList: false,
      isKnowledgeListError: false,
    }
    case actionTypes.GET_KNOWLEDGE_LIST_SUCCESS:
      return {
        ...state,
        message: 'Knowledge List successfully',
        knowledgeList: action.payload.response,
        isKnowledgeList: true,
        isKnowledgeListError: false,
      }
    case actionTypes.GET_KNOWLEDGE_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isKnowledgeList: false,
        isKnowledgeListError: true
    }

    // print document
    case actionTypes.PRINT_SHARE_DOCUMENT_REQUEST:
    return {
      ...state,
      message: '',
      isPrintShareDocument: false,
      isPrintShareDocumentError: false,
    }
    case actionTypes.PRINT_SHARE_DOCUMENT_SUCCESS:
      return {
        ...state,
        message: 'Knowledge List successfully',
        printShareDocument: action.payload.response,
        isPrintShareDocument: true,
        isPrintShareDocumentError: false,
      }
    case actionTypes.PRINT_SHARE_DOCUMENT_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isPrintShareDocument: false,
        isPrintShareDocumentError: true
    }

    // Task list
    case actionTypes.GET_TASK_LIST_REQUEST:
    return {
      ...state,
      message: '',
      isTaskList: false,
      isTaskListError: false,
    }
    case actionTypes.GET_TASK_LIST_SUCCESS:
      return {
        ...state,
        message: 'TASK List successfully',
        TaskList: action.payload.response,
        isTaskList: true,
        isTaskListError: false,
      }
    case actionTypes.GET_TASK_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isTaskList: false,
        isTaskListError: true
    }

    // Change Status
    case actionTypes.CHANGE_STATUS_REQUEST:
    return {
      ...state,
      message: '',
      isChangeStatus: false,
      isChangeStatusError: false,
    }
    case actionTypes.CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        message: 'TASK List successfully',
        ChangeStatus: action.payload.response,
        isChangeStatus: true,
        isChangeStatusError: false,
      }
    case actionTypes.CHANGE_STATUS_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isChangeStatus: false,
        isChangeStatusError: true
    }


    // History
    case actionTypes.HISTORY_REQUEST:
    return {
      ...state,
      message: '',
      isHistory: false,
      isHistoryError: false,
    }
    case actionTypes.HISTORY_SUCCESS:
      return {
        ...state,
        message: 'History List successfully',
        History: action.payload.response,
        isHistory: true,
        isHistoryError: false,
      }
    case actionTypes.HISTORY_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isHistory: false,
        isHistoryError: true
    }

    default:
    return state
  }
}


