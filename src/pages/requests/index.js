import Card from "@mui/material/Card";

import { Box } from "@mui/system";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import RequestsTable from "examples/Tables/requests";

function Requests() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Card>
          <RequestsTable />
        </Card>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Requests;
