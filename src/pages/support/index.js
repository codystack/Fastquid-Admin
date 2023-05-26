import { Box, Card } from "@mui/material";
import SoftBox from "components/SoftBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import LoansTable from "examples/Tables/loans";
import SupportTable from "examples/Tables/support";
import React from "react";

const Support = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Card  >
          <SupportTable />
        </Card>
      </Box>
      <Footer />
    </DashboardLayout>
  );
};

export default Support;
