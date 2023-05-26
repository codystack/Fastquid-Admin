

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";
import LoansTable from "examples/Tables/loans";
import { Box } from '@mui/system';

function Tables() {
  // const { columns, rows } = authorsTableData;
  // const { columns: prCols, rows: prRows } = projectsTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        {/* <SoftBox mb={3}> */}
          <Card>
           <LoansTable/> 
          </Card>
        {/* </SoftBox> */}
        <Card>
          {/* <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Projects table</SoftTypography>
          </SoftBox> */}
          {/* <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          > */}
            {/* <Table columns={prCols} rows={prRows} /> */}
          {/* </SoftBox> */}
        </Card>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
