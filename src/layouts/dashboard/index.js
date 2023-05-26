

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// // Dashboard layout components
// import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
// import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
// import Projects from "layouts/dashboard/components/Projects";
// import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { isPast } from 'date-fns';
import Loans from "./components/Loans";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const {loans, recentLoans} = useSelector((state) => state.loan);

  useEffect(() => {
    if (loans) {
      const currentDate = new Date();
      let arr = loans?.docs?.filter(item => item?.status === "pending");
      let arr2 = loans?.docs?.filter(item => item?.status === "approved");
      setPending(arr);
      setApproved(arr2)

      let over = loans?.docs?.filter(item => isPast(new Date(item?.dueDate)));
      setOverdue(over);
    }
  }, [loans])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "total loans" }}
                count={loans?.totalDocs}
                percentage={{ color: "success", text: "loan requests" }}
                icon={{ color: "error", component: "paid" }}
              /> 
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Approved loans" }}
                count={approved?.length}
                percentage={{ color: "success", text: "for disbursement" }}
                icon={{ color: "error", component: "credit_score" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "overdue loans" }}
                count={overdue?.length}
                percentage={{ color: "error", text: "to be repaid" }}
                icon={{ color: "error", component: "fmd_bad" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "pending loans" }}
                count={pending?.length}
                percentage={{ color: "warning", text: "pending" }}
                icon={{
                  color: "error",
                  component: "hourglass_bottom",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        {/* <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox> */}
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="active users"
                description={
                  <>
                    (<strong>+23%</strong>) than last week
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Sales Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% more{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2021
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Loans recentLoans={recentLoans}/>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid> */}
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
