import About from "./pages/about/About";
import AdminPanel from "./pages/admin_panel/AdminPanel";
import UserPanel from "./pages/user_panel/UserPanel";
import Fundraisings from "./pages/fundraisings/Fundraisings";
import Landing from "./pages/landing/Landing";
import Staff from "./pages/staff/Staff";
import Notices from "./pages/notices/Notices";
import {
    ABOUT_ROUTE, ADMIN_ROUTE, CONTACTS_ROUTE, FAQ_ROUTE,
    FUNDRAISINGS_ROUTE, LANDING_ROUTE, LOGIN_ROUTE, NOTICES_ROUTE,
    FORGOT_ROUTE, RESULTS_ROUTE, SIGNUP_ROUTE, STAFF_ROUTE, USER_ROUTE,
    RESET_ROUTE,
    CONFIRM_ROUTE
} from "./utils/constants";
import Results from "./pages/results/Results";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import Contacts from "./pages/contacts/Contacts";
import FAQ from "./pages/faq/FAQ";
import { questions, members } from "./utils/constants";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import ResetPassword from "./pages/reset_password/ResetPassword";
import avatar from './resources/people.png';
import Confirm from "./pages/confirm/Confirm";

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <AdminPanel />
    }
];

export const userRoutes = [
    {
        path: USER_ROUTE,
        Component: <UserPanel avatar={avatar} />
    },
    {
        path: CONFIRM_ROUTE,
        Component: <Confirm />
    }
];

export const publicRoutes = [
    {
        path: LANDING_ROUTE,
        Component: <Landing members={members} />
    },
    {
        path: ABOUT_ROUTE,
        Component: <About />
    },
    {
        path: STAFF_ROUTE,
        Component: <Staff />
    },
    {
        path: FUNDRAISINGS_ROUTE + '/:id',
        Component: <Fundraisings />
    },
    {
        path: NOTICES_ROUTE + '/:id',
        Component: <Notices />
    },
    {
        path: RESULTS_ROUTE + '/:id',
        Component: <Results />
    },
    {
        path: CONTACTS_ROUTE,
        Component: <Contacts />
    },
    {
        path: FAQ_ROUTE,
        Component: <FAQ quests={questions} />
    },
    {
        path: LOGIN_ROUTE,
        Component: <Login />
    },
    {
        path: SIGNUP_ROUTE,
        Component: <Registration />
    },
    {
        path: FORGOT_ROUTE,
        Component: <ForgotPassword />
    },
    {
        path: RESET_ROUTE,
        Component: <ResetPassword />
    }
];