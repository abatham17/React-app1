import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import login from './login'
import clinic from './clinic'
import clinicSubscription from './clinic_subscription'
import user from './user'
import master from './master'
import educator from './educator'
import faq from './faq'
import specilization from './specilization'
import clinicCalendar from './clinic_calendar'
import clinicActive from './clinic_active'
import link from './link'
import language from './language'
const reducer = combineReducers({
   router: routerReducer,
   login,
   clinic,
   user,
   master,
   specilization ,
   educator,
   faq,
   clinicSubscription,
   clinicCalendar,
   clinicActive,
   link,
   language,
})

export default reducer
