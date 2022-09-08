// import LoginPage from 'Admin/views/Pages/LoginPage.jsx';
import RegisterPage from 'Admin/views/Pages/RegisterPage.jsx';
import LockScreenPage from 'Admin/views/Pages/LockScreenPage.jsx';


var pagesRoutes = [
    // { path: "/login", name: "Login Page", mini: "LP", component: LoginPage },
    { path: "/pages/register-page", name: "Register", mini: "RP", component: RegisterPage },
    { path: "/pages/lock-screen-page", name: "Lock Screen Page", mini: "LSP", component: LockScreenPage }

];

export default pagesRoutes;
