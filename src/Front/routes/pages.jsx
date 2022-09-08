import LoginPage from 'Front/views/Login/LoginPage.jsx';
//import RegisterPage from 'Front/views/Pages/RegisterPage.jsx';
import PatientSearch from 'Front/views/PatientSearch/PatientSearch.jsx';
//import TestPage from 'Front/views/PatientSearch/TestPage.jsx';
import ReceptionistPatientSearch from 'Front/views/PatientSearch/ReceptionistPatientSearch.jsx';
//import PatientRegistration from 'Front/views/Home/PatientRegistration.jsx';
import Dashboard from 'Front/views/Dashboard/Dashboard.jsx';
//import NextVisit from 'Front/views/Home/NextVisit.jsx';
//import TaskScreen from 'Front/views/TaskScreen/TaskScreen.jsx';
//import Diet from 'Front/views/Diet/Diet.jsx';
//import DietChart from 'Front/views/DietChart/DietChart.jsx';
import ColorNotations from 'Front/views/Pages/ColorNotations/ColorNotations.jsx';
import ClinicCalender from 'Front/views/Pages/ClinicCalender/ClinicCalender.jsx';
import ChangePassword from 'Front/views/Pages/ChangePassword/ChangePassword.jsx';
import ManageRequest from 'Front/views/Pages/ManageRequest/ManageRequest.jsx';
import UserList from 'Front/views/Pages/UserList/UserList.jsx';
let userType = localStorage.getItem('userType');
let pagesRoutes = [];

if(userType === 'receptionist')
{   

    pagesRoutes = [    
    { path: "/clinic-calenders", name: "Clinic Calender", icon: "pe-7s-graph", component: ClinicCalender },
    { path: "/change-password", name: "Change Password", icon: "pe-7s-graph", component: ChangePassword },
    { path: "/dashboard", name: "Dashboard", mini: "DB", component: Dashboard },
    { path: "/patient-search", name: "Patient Search", mini: "PS", component: ReceptionistPatientSearch },
    //{ path: "/diet", name: "Diet", mini: "D", component: Diet },
    //{ path: "/diet-chart", name: "Diet", mini: "D", component: DietChart },
    //{ path: "/patient-edit", name: "Patient Edit", mini: "PE", component: PatientRegistration },
    { path: "/", name: "Dashboard", mini: "DB", component: Dashboard },
   ];

}else{ 
     pagesRoutes = [
    //{ path: "/patient-registration", name: "Patient Registration", icon: "pe-7s-graph", component: PatientRegistration },
    { path: "/color-notations", name: "Color Notations", icon: "pe-7s-graph", component: ColorNotations },
    { path: "/clinic-calenders", name: "Clinic Calender", icon: "pe-7s-graph", component: ClinicCalender },
    { path: "/change-password", name: "Change Password", icon: "pe-7s-graph", component: ChangePassword },
    { path: "/manage-request", name: "Manage Request", icon: "pe-7s-graph", component: ManageRequest },
    { path: "/user-list", name: "User List", icon: "pe-7s-graph", component: UserList },   
    { path: "/login", name: "Login Page", mini: "LP", component: LoginPage },
   // { path: "/pages/register-page", name: "Register", mini: "RP", component: RegisterPage },
   // { path: "/patient-registration", name: "Patient Registraction", mini: "PR", component: PatientRegistration },
    { path: "/dashboard", name: "Dashboard", mini: "DB", component: Dashboard },
    { path: "/patient-search", name: "PatientSearch", mini: "PS", component: PatientSearch },
    //{ path: "/test-page", name: "Patient Search", mini: "PS", component: TestPage },
    //{ path: "/next-visit", name: "Next Visit", mini: "NV", component: NextVisit },
    //{ path: "/task-screen", name: "Task Screen", mini: "NV", component: TaskScreen },
    //{ path: "/diet", name: "Diet", mini: "D", component: Diet },
    //{ path: "/diet-chart", name: "Diet", mini: "D", component: DietChart },
    //{ path: "/patient-edit", name: "Patient Edit", mini: "PE", component: PatientRegistration },
    { path: "/", name: "Dashboard", mini: "DB", component: Dashboard },
  ];
}


export default pagesRoutes;
