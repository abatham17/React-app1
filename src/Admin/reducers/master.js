import * as actionTypes from 'Admin/actions/actionTypes'
const initState = {
  response: [],
  message: '',
  isCountryList:false,
  isCountryListError: false,
  countryList: false,

  isStateList:false,
  isStateListError: false,
  stateList: false,

  isPlanList:false,
  isPlanListError: false,
  planList: false,

  addPlan: false,
  isAddPlan: true,
  isAddPlanError: false,

  updatePlan: false,
  isUpdatePlan: true,
  isUpdatePlanError: false,

  isPlanChangeStatus:false,
  isPlanChangeStatusError:false,
  PlanChangeStatus:false,

  isAddKnowledge:false,
  isAddKnowledgeError: false,
  AddKnowledge: false,

  isKnowledgeList:false,
  isKnowledgeListError: false,
  KnowledgeList: false,

  isUpdateKnowledge:false,
  isUpdateKnowledgeError: false,
  UpdateKnowledge: false,


  isKnowledgeChangeStatus:false,
  isKnowledgeChangeStatusError:false,
  KnowledgeChangeStatus:false,

  isUploadFile:false,
  isUploadFileError: false,
  uploadFile: false,

  isCategoryList:false,
  isCategoryListError: false,
  categoryList: false,

  isTermconditionList:false,
  isTermconditionListError: false,
  TermconditionList: false,

  isUpdateTermcondition:false,
  isUpdateTermconditionError: false,
  UpdateTermcondition: false,
}

export default (state = initState, action={}) => {
  switch (action.type) {
    case actionTypes.GET_COUNTRY_LIST_REQUEST:
      return {
        ...state,
        message: '',
        isCountryList: false,
        isCountryListError: false,
      }
    case actionTypes.GET_COUNTRY_LIST_SUCCESS:
      return {
        ...state,
        message: 'Country List successfully',
        countryList: action.payload.response,
        isCountryList: true,
        isCountryListError: false,
      }
    case actionTypes.GET_COUNTRY_LIST_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isCountryList: false,
        isCountryListError: true
      }

      case actionTypes.GET_STATE_LIST_REQUEST:
        return {
          ...state,
          message: '',
          isStateList: false,
          isStateListError: false,
        }
      case actionTypes.GET_STATE_LIST_SUCCESS:
        return {
          ...state,
          message: 'Country List successfully',
          stateList: action.payload.response,
          isStateList: true,
          isStateListError: false,
        }
      case actionTypes.GET_STATE_LIST_ERROR:
        return {
          ...state,
          response: action.payload.error,
          message: action.payload.error,
          isStateList: false,
          isStateListError: true
        }

      //Add Knowledge
      case actionTypes.GET_ADD_KNOWLEDGE_REQUEST:
        return {
          ...state,
          message: '',
          isAddKnowledge: false,
          isAddKnowledgeError: false,
        }
      case actionTypes.GET_ADD_KNOWLEDGE_SUCCESS:
        return {
          ...state,
          message: 'Knowledge added successfully',
          AddKnowledge: action.payload.response,
          isAddKnowledge: true,
          isAddKnowledgeError: false,
        }
      case actionTypes.GET_ADD_KNOWLEDGE_ERROR:
        return {
          ...state,
          response: action.payload.error,
          message: action.payload.error,
          isAddKnowledge: false,
          isAddKnowledgeError: true
        }


        //Update Knowledge
      case actionTypes.GET_UPDATE_KNOWLEDGE_REQUEST:
      return {
        ...state,
        message: '',
        isUpdateKnowledge: false,
        isUpdateKnowledgeError: false,
      }
    case actionTypes.GET_UPDATE_KNOWLEDGE_SUCCESS:
      return {
        ...state,
        message: 'Knowledge Updated successfully',
        UpdateKnowledge: action.payload.response,
        isUpdateKnowledge: true,
        isUpdateKnowledgeError: false,
      }
    case actionTypes.GET_UPDATE_KNOWLEDGE_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isUpdateKnowledge: false,
        isUpdateKnowledgeError: true
      }

        //Knowledge List
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
        message: 'Knowledge Listed successfully',
        KnowledgeList: action.payload.response,
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

       //KNOWLEDGE Status Change
       case actionTypes.GET_KNOWLEDGE_CHANGE_STATUS_REQUEST:
       return {
         ...state,
         message: '',
         isKnowledgeChangeStatus: false,
         isKnowledgeChangeStatusError: false,
       }
     case actionTypes.GET_KNOWLEDGE_CHANGE_STATUS_SUCCESS:
       return {
         ...state,
         message: 'Knowledge Status Changed',
         KnowledgeChangeStatus: action.payload.response,
         isKnowledgeChangeStatus: true,
         isKnowledgeChangeStatusError: false,
       }
     case actionTypes.GET_KNOWLEDGE_CHANGE_STATUS_ERROR:
       return {
         ...state,
         response: action.payload.error,
         message: action.payload.error,
         isKnowledgeChangeStatus: false,
         isKnowledgeChangeStatusError: true
       }


      //Plan
      case actionTypes.GET_PLAN_LIST_REQUEST:
        return {
          ...state,
          message: '',
          isPlanList: false,
          isPlanListError: false,
        }
      case actionTypes.GET_PLAN_LIST_SUCCESS:
        return {
          ...state,
          message: 'Plan List successfully',
          planList: action.payload.response,
          isPlanList: true,
          isPlanListError: false,
        }
      case actionTypes.GET_PLAN_LIST_ERROR:
        return {
          ...state,
          response: action.payload.error,
          message: action.payload.error,
          isPlanList: false,
          isPlanListError: true
        }
        //Add Plan
        case actionTypes.POST_ADD_PLAN_REQUEST:
          return {
            ...state,
            message: '',
            isAddPlan: false,
            isAddPlanError: false,
          }
        case actionTypes.GET_ADD_PLAN_SUCCESS:
          return {
            ...state,
            message: 'Plan added',
            addPlan: action.payload.response,
            isAddPlan: true,
            isAddPlanError: false,
          }
        case actionTypes.GET_ADD_PLAN_ERROR:
          return {
            ...state,
            addPlan: action.payload.error,
            message: action.payload.error,
            isAddPlan: false,
            isAddPlanError: true
          }

          //Update Plan
        case actionTypes.POST_UPDATE_PLAN_REQUEST:
        return {
          ...state,
          message: '',
          isUpdatePlan: false,
          isUpdatePlanError: false,
        }
      case actionTypes.GET_UPDATE_PLAN_SUCCESS:
        return {
          ...state,
          message: 'Plan Updated Successfully',
          updatePlan: action.payload.response,
          isUpdatePlan: true,
          isUpdatePlanError: false,
        }
      case actionTypes.GET_UPDATE_PLAN_ERROR:
        return {
          ...state,
          updatePlan: action.payload.error,
          message: action.payload.error,
          isUpdatePlan: false,
          isUpdatePlanError: true
        }


           //Plan Status Change
       case actionTypes.GET_PLAN_CHANGE_STATUS_REQUEST:
       return {
         ...state,
         message: '',
         isPlanChangeStatus: false,
         isPlanChangeStatusError: false,
       }
     case actionTypes.GET_PLAN_CHANGE_STATUS_SUCCESS:
       return {
         ...state,
         message: 'Plan Status Changed',
         PlanChangeStatus: action.payload.response,
         isPlanChangeStatus: true,
         isPlanChangeStatusError: false,
       }
     case actionTypes.GET_PLAN_CHANGE_STATUS_ERROR:
       return {
         ...state,
         response: action.payload.error,
         message: action.payload.error,
         isPlanChangeStatus: false,
         isPlanChangeStatusError: true
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

         //Update Termcondition
      case actionTypes.GET_UPDATE_TERMCONDITION_REQUEST:
      return {
        ...state,
        message: '',
        isUpdateTermcondition: false,
        isUpdateTermconditionError: false,
      }
    case actionTypes.GET_UPDATE_TERMCONDITION_SUCCESS:
      return {
        ...state,
        message: 'Term & condition Updated successfully',
        UpdateTermcondition: action.payload.response,
        isUpdateTermcondition: true,
        isUpdateTermconditionError: false,
      }
    case actionTypes.GET_UPDATE_TERMCONDITION_ERROR:
      return {
        ...state,
        response: action.payload.error,
        message: action.payload.error,
        isTermcondition: false,
        isTermconditionError: true
      }

      case actionTypes.GET_TERMCONDITION_LIST_REQUEST:
        return {
          ...state,
          message: '',
          isTermconditionList: false,
          isTermconditionListError: false,
        }
      case actionTypes.GET_TERMCONDITION_LIST_SUCCESS:
        return {
          ...state,
          message: 'Termcondition List successfully',
          categoryList: action.payload.response,
          isTermconditionList: true,
          isTermconditionListError: false,
        }
      case actionTypes.GET_TERMCONDITION_LIST_ERROR:
        return {
          ...state,
          response: action.payload.error,
          message: action.payload.error,
          isTermconditionList: false,
          isTermconditionListError: true
        }


    default:
    return state
  }
}
