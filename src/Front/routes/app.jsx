import Pages from 'Front/containers/Pages/Pages.jsx';
import Dash from 'Front/containers/Dash/Dash.jsx';

var appRoutes = [
    { path: "/login", name: "Pages", component: Pages },
    { path: "/", name: "Home", component: Dash }
];

export default appRoutes;
