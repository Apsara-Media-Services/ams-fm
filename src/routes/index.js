/**
 * Internal dependencies
 */
import HomePage from "../pages/HomePage";
import Monday from "../pages/day/Monday";
import Tuesday from "../pages/day/Tuesday";
import Wednesday from "../pages/day/Wednesday";
import Thursday from "../pages/day/Thursday";
import Friday from "../pages/day/Friday";
import Saturday from "../pages/day/Saturday";
import Sunday from "../pages/day/Sunday";

const routes = [
    {
        path: "/",
        element: HomePage,
    },
    {
        path: "/settings",
        element: HomePage,
    },
    {
        path: "/day/monday",
        element: Monday,
    },
    {
        path: "/day/tuesday",
        element: Tuesday,
    },
    {
        path: "/day/wednesday",
        element: Wednesday,
    },
    {
        path: "/day/thursday",
        element: Thursday,
    },
    {
        path: "/day/friday",
        element: Friday,
    },
    {
        path: "/day/saturday",
        element: Saturday,
    },
    {
        path: "/day/sunday",
        element: Sunday,
    },
];

export default routes;
