// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

import { Box, Divider, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import logo from "../../assets/images/fast-logos/favicon.png";

function Overview() {
  const { currentTab } = useSelector((state) => state.setting);
  const { profileData } = useSelector((state) => state.profile);

  return (
    <DashboardLayout>
      <Header />
      <br />
      {currentTab === 0 ? (
        <Card>
          <Box p={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <SoftBox>
                  <Typography fontWeight={600} variant="body2">
                    First Name
                  </Typography>
                  <SoftTypography textTransform="capitalize" variant="body2">
                    {profileData?.firstName}
                  </SoftTypography>
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SoftBox>
                  <Typography fontWeight={600} variant="body2">
                    Last Name
                  </Typography>
                  <SoftTypography textTransform="capitalize" variant="body2">
                    {" "}
                    {profileData?.lastName}{" "}
                  </SoftTypography>
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SoftBox>
                  <Typography fontWeight={600} variant="body2">
                    Email
                  </Typography>
                  <SoftTypography variant="body2"> {profileData?.emailAddress} </SoftTypography>
                </SoftBox>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <SoftBox>
                  <Typography fontWeight={600} variant="body2">
                    Phone Number
                  </Typography>
                  <SoftTypography textTransform="capitalize" variant="body2">
                    {profileData?.phoneNumber}
                  </SoftTypography>
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SoftBox>
                  <Typography fontWeight={600} variant="body2">
                    Gender
                  </Typography>
                  <SoftTypography textTransform="capitalize" variant="body2">
                    {" "}
                    {profileData?.gender}{" "}
                  </SoftTypography>
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SoftBox>
                  <Typography fontWeight={600} variant="body2">
                    Account Created On
                  </Typography>
                  <SoftTypography variant="body2">
                    {" "}
                    {`${new Date(profileData?.createdAt).toLocaleString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}`}{" "}
                  </SoftTypography>
                </SoftBox>
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2} pt={1}>
              <Grid item xs={12} sm={6} md={4}>
                <SoftBox>
                  <Typography fontWeight={600} variant="body2">
                    Account Type
                  </Typography>
                  <SoftTypography textTransform="capitalize" variant="body2">
                    {profileData?.privilege?.type}
                  </SoftTypography>
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SoftBox>
                  <Typography fontWeight={600} variant="body2">
                    Role
                  </Typography>
                  <SoftTypography textTransform="capitalize" variant="body2">
                    {" "}
                    {profileData?.privilege?.role}{" "}
                  </SoftTypography>
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SoftBox>
                  <Typography fontWeight={600} variant="body2">
                    Claim
                  </Typography>
                  <SoftTypography textTransform="capitalize" variant="body2"> {profileData?.privilege?.claim} </SoftTypography>
                </SoftBox>
              </Grid>
            </Grid>
          </Box>
        </Card>
      ) : (
        <PlatformSettings />
      )}
      <br/>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
