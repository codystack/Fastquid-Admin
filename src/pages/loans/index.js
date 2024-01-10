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
import { Box } from "@mui/system";
import SoftButton from "components/SoftButton";
import React, { useState } from "react";
import { AppBar, Dialog, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
// import DebitCardsTable from "examples/Tables/cards";
// import CompaniesTable from "examples/Tables/companies";
import { useSelector } from "react-redux";
import Requests from "pages/requests";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Loan({usecase}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { profileData } = useSelector((state) => state.profile);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        {profileData &&
          (profileData?.privilege?.role === "manager" || profileData?.privilege?.role === "developer") &&
          profileData?.privilege?.claim === "read/write" && usecase === "pending" && (
            <Box pb={2} display="flex" flexDirection={"row"} justifyContent={"end"}>
              <SoftButton
                variant="gradient"
                color="dark"
                onClick={() => {
                  setOpen(true);
                }}
              >
                All Requests
              </SoftButton>
            </Box>
          )}

        <Card>
          <LoansTable usecase={usecase} />
        </Card>
      </Box>
      <Footer />
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "relative", backgroundColor: "#18113c", color: "white" }}
          color="secondary"
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="white"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textTransform: "capitalize" }}
              variant="h6"
              component="div"
              color="#fff"
            >
              {`All Loan Requests So Far`}
            </Typography>
            <SoftButton autoFocus color="inherit" onClick={() => setOpen(false)}>
              Close
            </SoftButton>
          </Toolbar>
        </AppBar>
        <Box p={3}>
          <Requests />
          {/* <DebitCardsTable /> */}
        </Box>
      </Dialog>
    </DashboardLayout>
  );
}

export default Loan;
