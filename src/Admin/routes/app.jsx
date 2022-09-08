import Pages from 'Admin/containers/Pages/Pages.jsx';
import Dash from 'Admin/containers/Dash/Dash.jsx';

var appRoutes = [
    { path: "/login", name: "Pages", component: Pages },
    { path: "/pages/register-page", name: "Pages", component: Pages },
    { path: "/pages/lock-screen-page", name: "Pages", component: Pages },
    { path: "/", name: "Home", component: Dash }
];

export default appRoutes;
