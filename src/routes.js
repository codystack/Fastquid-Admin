// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Loans from "pages/loans";
// import Transactions from "layouts/transactions";

import Profile from "layouts/profile";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";

import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";

import { People, Person } from "@mui/icons-material";
import { Box } from "@mui/material";
import Support from "pages/support";
import Users from "pages/users";
import Transactions from "pages/transactions";
import About from "pages/about";
import Companies from "pages/companies";
import Admins from "pages/admins";
import Requests from "pages/requests";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Requests",
    key: "requests",
    route: "/requests",
    icon: <Office size="12px" />,
    component: <Loans usecase="pending" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Approved",
    key: "approved",
    route: "/approved",
    icon: <Office size="12px" />,
    component: <Loans usecase="approved" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Disbursed",
    key: "disbursed",
    route: "/disbursed",
    icon: <Office size="12px" />,
    component: <Loans usecase="credited" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Settled",
    key: "settled",
    route: "/settled",
    icon: <Office size="12px" />,
    component: <Loans usecase="settled" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Transactions",
    key: "transactions",
    route: "/transactions",
    icon: <CreditCard size="12px" />,
    component: <Transactions />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Reports",
  //   key: "reports",
  //   route: "/reports",
  //   icon: <CreditCard size="12px" />,
  //   component: <Loans usecase="all" />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Support",
    key: "support",
    route: "/support",
    icon: <CustomerSupport size="12px" />,
    component: <Support />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Companies",
    key: "companies",
    route: "/companies",
    icon: <Settings size="12px" />,
    component: <Companies />,
    noCollapse: true,
  },
  { type: "title", title: "Account", key: "account-pages" },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    route: "/users",
    icon: <People size="12px" />,
    component: <Users />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Admins",
    key: "admins",
    route: "/admins",
    icon: <SpaceShip size="12px" />,
    component: <Admins />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <Person size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  
];

export default routes;
