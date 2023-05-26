/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Images
import kal from "assets/images/kal-visuals-square.jpg";
import marie from "assets/images/marie.jpg";
import ivana from "assets/images/ivana-square.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

const profilesListData = [
  {
    image: kal,
    name: "Sophie B.",
    description: "Founder/CEO",
    action: {
      type: "internal",
      route: "/pages/profile/profile-overview",
      color: "info",
      label: "contact",
    },
  },
  {
    image: marie,
    name: "Anne Marie",
    description: "Manager",
    action: {
      type: "internal",
      route: "/pages/profile/profile-overview",
      color: "info",
      label: "contact",
    },
  },
  {
    image: ivana,
    name: "Ivanna",
    description: "Sales Manager",
    action: {
      type: "Sales Manager",
      route: "/pages/profile/profile-overview",
      color: "info",
      label: "contact",
    },
  },
];

export default profilesListData;
