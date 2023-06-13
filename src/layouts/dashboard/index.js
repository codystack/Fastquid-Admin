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
import { forwardRef, useEffect, useState } from "react";
import { isPast, isToday } from "date-fns";
import Loans from "./components/Loans";
import formatCurrency from "utils/formatCurrency";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  List,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import InfoDialog from "./components/info_dialog";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [denied, setDenied] = useState([]);
  const [disbursed, setDisbursed] = useState([]);
  const [due, setDue] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [open, setOpen] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const { loans, recentLoans } = useSelector((state) => state.loan);
  const [title, setTitle] = useState("");
  const [lData, setLData] = useState([]);

  useEffect(() => {
    if (loans) {
      const currentDate = new Date();
      let arr = loans?.docs?.filter((item) => item?.status === "pending");
      let arr2 = loans?.docs?.filter((item) => item?.status === "approved");
      let arr3 = loans?.docs?.filter((item) => item?.status === "credited");
      let arr4 = loans?.docs?.filter((item) => item?.status === "denied");
      let arr5 = loans?.docs?.filter((item) => item?.status === "settled");
      setPending(arr);
      setApproved(arr2);
      setDisbursed(arr3);
      setDenied(arr4);

      let today = loans?.docs?.filter((item) => isToday(new Date(item?.dueDate)));
      let over = loans?.docs?.filter((item) => isPast(new Date(item?.dueDate)));
      setDue(today);
      setOverdue(over);

      let revenue = 0;
      let rev = arr5?.forEach((element) => {
        // if (element) {
        revenue = revenue + element?.interestAmount;
        // }
        setTotalRevenue(revenue);
      });
    }
  }, [loans]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <MiniStatisticsCard
                title={{ text: "total revenue" }}
                count={`${formatCurrency(totalRevenue)}`}
                percentage={{ color: "success", text: "in revenue" }}
                icon={{ color: "error", component: "paid" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => {
                setLData(disbursed);
                setOpen(true);
                setTitle("All Disbursed Loans");
              }}
            >
              <MiniStatisticsCard
                title={{ text: "Disbursed loans" }}
                count={disbursed?.length}
                percentage={{ color: "info", text: "for disbursement" }}
                icon={{ color: "error", component: "price_check" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => {
                setLData(approved);
                setOpen(true);
                setTitle("All Approved Loans");
              }}
            >
              <MiniStatisticsCard
                title={{ text: "Approved loans" }}
                count={approved?.length}
                percentage={{ color: "success", text: "for disbursement" }}
                icon={{ color: "error", component: "credit_score" }}
              />
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mb={3}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => {
                setLData(pending);
                setOpen(true);
                setTitle("All Pending Loans");
              }}
            >
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

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => {
                setLData(due);
                setOpen(true);
                setTitle("All Due Loans");
              }}
            >
              <MiniStatisticsCard
                title={{ text: "due loans" }}
                count={due?.length}
                percentage={{ color: "warning", text: "due for repayment" }}
                icon={{
                  color: "error",
                  component: "access_alarm",
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => {
                setLData(overdue);
                setOpen(true);
                setTitle("All Overdue Loans");
              }}
            >
              <MiniStatisticsCard
                title={{ text: "overdue loans" }}
                count={overdue?.length}
                percentage={{ color: "error", text: "to be repaid" }}
                icon={{ color: "error", component: "fmd_bad" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => {
                setLData(denied);
                setOpen(true);
                setTitle("All Declined Loans");
              }}
            >
              <MiniStatisticsCard
                title={{ text: "declined loans" }}
                count={denied?.length}
                percentage={{ color: "error", text: "declined" }}
                icon={{
                  color: "error",
                  component: "error",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>

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
            <Loans recentLoans={recentLoans} />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid> */}
        </Grid>
      </SoftBox>

      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <InfoDialog title={title} setOpen={setOpen} data={lData} />
      </Dialog>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
