import Dashboard from 'Admin/views/Dashboard/Dashboard.jsx';
import UserPage from 'Admin/views/Pages/UserPage.jsx';
import ClinicList from 'Admin/views/ManageClinic/ClinicList.jsx';
import AddClinic from 'Admin/views/ManageClinic/AddClinic.jsx';
import ClinicSubscription from 'Admin/views/ManageClinic/ClinicSubscription.jsx';
import AddClinicSubscription from 'Admin/views/ManageClinic/AddClinicSubscription.jsx';
import UpdateClinic from 'Admin/views/ManageClinic/UpdateClinic.jsx';
import UserList from 'Admin/views/ManageUser/UserList.jsx';
import AddUser from 'Admin/views/ManageUser/AddUser.jsx';
import UpdateUser from 'Admin/views/ManageUser/UpdateUser.jsx';
import SpecializationList from 'Admin/views/ManageMaster/SpecializationList.jsx';
import AddSpecialization from 'Admin/views/ManageMaster/AddSpecilization.jsx';
import UpdateSpecialization from 'Admin/views/ManageMaster/UpdateSpecilization.jsx';
import AddKnowledge from 'Admin/views/ManageMaster/AddKnowledge.jsx';
import UpdateKnowledge from 'Admin/views/ManageMaster/UpdateKnowledge.jsx';
import KnowledgeList from 'Admin/views/ManageMaster/KnowledgeList.jsx';
import AddFaq from 'Admin/views/ManageMaster/AddFaq.jsx';
import UpdateFaq from 'Admin/views/ManageMaster/UpdateFaq.jsx';
import AddEducator from 'Admin/views/ManageMaster/AddEducator.jsx';
import UpdateEducator from 'Admin/views/ManageMaster/UpdateEducator.jsx';
import EducatorList from 'Admin/views/ManageMaster/EducatorList.jsx';
import pagesRoutes from './pages.jsx';
import AddPlan from 'Admin/views/ManageMaster/AddPlan.jsx';
import UpdatePlan from 'Admin/views/ManageMaster/UpdatePlan.jsx';
import LinkList from 'Admin/views/ManageMaster/LinkList.jsx';
import LanguageList from 'Admin/views/ManageMaster/LanguageList.jsx';
import FaqList from 'Admin/views/ManageMaster/FaqList.jsx';
import AddLink from 'Admin/views/ManageMaster/AddLink.jsx';
import UpdateLink from 'Admin/views/ManageMaster/UpdateLink.jsx';
import PlanList from 'Admin/views/ManageMaster/PlanList.jsx';
import ClinicCalendar from 'Admin/views/ManageClinic/ClinicCalendar.jsx';
import AddClinicCalendar from 'Admin/views/ManageClinic/AddClinicCalendar.jsx';
import UpdateClinicCalendar from 'Admin/views/ManageClinic/UpdateClinicCalendar.jsx';
import UpdateTermcondition from 'Admin/views/ManageMaster/UpdateTermcondition.jsx';
import ClinicActiveList from 'Admin/views/ManageClinic/ClinicActiveList.jsx';



var pages = [ 

    { path: "/update-specialization", name: "Update Specialization", mini: "US", component: UpdateSpecialization },
    { path: "/admin/update-educator", name: "Update Educator", mini: "UE", component: UpdateEducator},
    { path: "/admin/update-plan", name: "Update Plan", mini: "UP", component: UpdatePlan},
    { path: "/admin/update-faq", name: "Update Faq", mini: "UF", component: UpdateFaq},
    { path: "/admin/update-link", name: "Update Link", mini: "UL", component: UpdateLink },
    { path: "/admin/update-user", name: "Update User", mini: "AU", component: UpdateUser },
    { path: "/admin/update-knowledge", name: "Update Knowledge", mini: "UK", component: UpdateKnowledge },
    { path: "/admin/update-calendar", name: "Update Calendar", mini: "UF", component: UpdateClinicCalendar},
    { path: "/pages/user-page", name: "User Page", mini: "UP", component: UserPage },
    { path: "/admin/update-clinic", name: "Update Clinic", mini: "UC", component: UpdateClinic },
    { path: "/update-specialization", name: "Update Specialization", mini: "US", component: UpdateSpecialization },
    { path: "/admin/update-faq", name: "Update Faq", mini: "UF", component: UpdateFaq},

].concat(pagesRoutes);
var dashRoutes = [
    { path: "/admin/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    { collapse: true, path: "/manage-clinic", name: "Manage Clinic", state: "openManageClinic", icon: "pe-7s-plugin", views:[
        { path: "/admin/clinic-list", name: "Clinic List", mini: "CL", component: ClinicList },
        { path: "/admin/add-clinic", name: "Add Clinic", mini: "AC", component: AddClinic },
        { path: "/admin/clinic-subscription", name: "Clinic Subscription", mini: "CS", component: ClinicSubscription },
        { path: "/admin/add-clinic-subscription", name: "Add Clinic Subscription", mini: "CS", component: AddClinicSubscription },
        { path: "/admin/clinic-active-list", name: "Clinic Active List", mini: "CAL", component: ClinicActiveList },
        ]
    },
    { collapse: true, path: "/manage-master", name: "Manage Master", state: "openManageMaster", icon: "pe-7s-plugin", views:[
        //{ path: "/admin/specialization-list", name: "Specialization List", mini: "M", component: AddSpecilization },
        { path: "/add-specialization", name: "Add Specialization", mini: "AS", component: AddSpecialization },
        { path: "/specialization-list", name: "Specialization List", mini: "AL", component: SpecializationList },
        { path: "/admin/add-knowledge", name: "Add Knowledge", mini: "AK", component: AddKnowledge },
        { path: "/admin/knowledge-list", name: "Knowledge List", mini: "KL", component: KnowledgeList },
        { path: "/admin/add-educator", name: "Add Educator", mini: "AE", component: AddEducator},
        { path: "/admin/educator-list", name: "Educator List", mini: "EL", component: EducatorList},
        { path: "/admin/add-faq", name: "Add Faq", mini: "AF", component: AddFaq},
        { path: "/admin/faq-list", name: "Faq List", mini: "FL", component: FaqList},
        { path: "/admin/add-plan", name: "Add Plan", mini: "KL", component: AddPlan },
        { path: "/admin/plan-list", name: "Plan List", mini: "PL", component: PlanList },
        { path: "/admin/add-link", name: "Add Link", mini: "Al", component: AddLink },
        { path: "/admin/link-list", name: "Link List", mini: "LL", component: LinkList },
        { path: "/admin/language-list", name: "Language List", mini: "LL", component: LanguageList },
        { path: "/admin/add-clinic-calendar", name: "Add Clinic Calendar", mini: "ACC", component: AddClinicCalendar },
        { path: "/admin/clinic-calendar", name: "Clinic Calendar", mini: "CC", component: ClinicCalendar },
        { path: "/admin/update-termCondition", name: "Update TermCondition", mini: "UT", component: UpdateTermcondition },
        ]
    },
    { collapse: true, path: "/manage-user", name: "Manage User", state: "openManageUser", icon: "pe-7s-plugin", views:[
        { path: "/admin/user-list", name: "User List", mini: "UL", component: UserList },
        { path: "/admin/add-user", name: "Add User", mini: "AU", component: AddUser },
        ]
    },
    // { collapse: true, path: "/components", name: "Components", state: "openComponents", icon: "pe-7s-plugin", views:[
    //     { path: "/components/buttons", name: "Buttons", mini: "B", component: Buttons },
    //     { path: "/components/grid-system", name: "Grid System", mini: "GS", component: GridSystem },
    //     { path: "/components/panels", name: "Panels", mini: "P", component: Panels },
    //     { path: "/components/sweet-alert", name: "Sweet Alert", mini: "SA", component: SweetAlert },
    //     { path: "/components/notifications", name: "Notifications", mini: "N", component: Notifications },
    //     { path: "/components/icons", name: "Icons", mini: "I", component: Icons },
    //     { path: "/components/typography", name: "Typography", mini: "T", component: Typography }]
    // },
    // { collapse: true, path: "/forms", name: "Forms", state: "openForms", icon: "pe-7s-note2", views:
    //     [{ path: "/forms/regular-forms", name: "Regular Forms", mini: "RF", component: RegularForms },
    //     { path: "/forms/extended-forms", name: "Extended Forms", mini: "EF", component: ExtendedForms },
    //     { path: "/forms/validation-forms", name: "Validation Forms", mini: "VF", component: ValidationForms },
    //     { path: "/forms/wizard", name: "Wizard", mini: "W", component: Wizard }]
    // },
    // { collapse: true, path: "/tables", name: "Tables", state: "openTables", icon: "pe-7s-news-paper", views:
    //     [{ path: "/tables/regular-tables", name: "Regular Tables", mini: "RT", component: RegularTables },
    //     { path: "/tables/extended-tables", name: "Extended Tables", mini: "ET", component: ExtendedTables },
    //     { path: "/tables/data-tables", name: "Data Tables", mini: "DT", component: DataTables }]
    // },
    // { collapse: true, path: "/maps", name: "Maps", state: "openMaps", icon: "pe-7s-map-marker", views:
    //     [{ path: "/maps/google-maps", name: "Google Maps", mini: "GM", component: GoogleMaps },
    //     { path: "/maps/full-screen-maps", name: "Full Screen Map", mini: "FSM", component: FullScreenMap },
    //     { path: "/maps/vector-maps", name: "Vector Map", mini: "VM", component: VectorMap }]
    // },
    // { path: "/charts", name: "Charts", icon: "pe-7s-graph1", component: Charts },
    // { path: "/calendar", name: "Calendar", icon: "pe-7s-date", component: Calendar },
    { collapse: true, path: "/pages", name: "Pages", state: "openPages", icon:"pe-7s-gift", views:
        pages
    },
    { redirect: true, path: "/", pathTo: "/admin/dashboard", name: "Dashboard" }
];
export default dashRoutes;
