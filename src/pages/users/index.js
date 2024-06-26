import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import React from "react";

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
// import Card from "@mui/material/Card";
import UsersTable from "examples/Tables/users";
import SoftButton from "components/SoftButton";
import { Add, Close } from "@mui/icons-material";
import {
  AppBar,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  List,
  NativeSelect,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Slide from "@mui/material/Slide";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { useFormik } from "formik";
import APIService from "service";
import { toast } from "react-hot-toast";

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function TabPanel (props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Users = () => {
  const [countryCode] = React.useState("+234");
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [isError, setError] = React.useState(false);
  const [deviceType, setDeviceType] = React.useState("mobile");

  const gender = ["male", "female"];

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));
  const tablet = useMediaQuery(theme.breakpoints.only('sm'));

  React.useEffect(() => {
    if (mobile) {
      setDeviceType('mobile')
    } else  if (tablet) {
      setDeviceType('tablet')
    }
    else {
      setDeviceType('pc')
    }
  }, [tablet, mobile])


  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      phoneNumber: "",
      emailAddress: "",
      gender: "male",
    },
    onSubmit: values => {
      setLoading(true);

      try {

        const payload = {
          ...values,
          password: "123456",
          phoneNumber: `${countryCode}${
            values?.phoneNumber.charAt(0) === "0"
              ? values?.phoneNumber.substring(1)
              : values.phoneNumber
          }`,
        };

        const response = APIService.post("/auth/addUser", payload);

        toast.promise(response, {
          loading: "Loading",
          success: res => {
            console.log("RESP HERE >>> ", `${res}`);
            setError(false);
            setErrMsg("");

            setLoading(false);
            setTimeout(() => {
              setOpen(false);
            }, 3000);

            return `New user added successfully`;
          },
          error: err => {
            console.log(
              "ERROR HERE >>> ",
              `${
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong, Check internet connection."
              }`
            );
            setErrMsg(
              `${
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong, Check internet connection."
              }`
            );

            setError(true);

            setLoading(false);
            return `${
              err?.response?.data?.message ||
              err?.message ||
              "Something went wrong, Check internet connection."
            }`;
          },
        });
      } catch (error) {
        setLoading(false);
        console.log("ERROR => ", error);
      }
    },
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3} display='flex' flexDirection='row' justifyContent='end' alignItems='center'>
        <SoftButton
          variant='gradient'
          color='dark'
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Create User
        </SoftButton>
      </Box>
      <Box sx={{ width: "100%" }}>
        <UsersTable />
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "relative", backgroundColor: "#18113c", color: "white" }}
          color='secondary'
        >
          <Toolbar>
            <IconButton
              edge='start'
              color='white'
              onClick={() => setOpen(false)}
              aria-label='close'
            >
              <Close />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textTransform: "capitalize" }}
              variant='h6'
              component='div'
              color='#fff'
            >
              {`Create New User`}
            </Typography>
            <SoftButton autoFocus color='inherit' onClick={() => setOpen(false)}>
              Close
            </SoftButton>
          </Toolbar>
        </AppBar>
        {
          deviceType === "mobile" && <Toolbar />
        }
        {isError && (
          <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
            <SoftTypography fontSize={12} sx={{ color: "red" }} pt={4}>
              {errMsg}
            </SoftTypography>
          </Box>
        )}
        <List
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SoftBox width={deviceType === "pc" ? '60%' : deviceType === "tablet" ? '80%' : "90%"} component='form' role='form' onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <SoftInput
                    id='firstName'
                    name='firstName'
                    required
                    value={formik.values.firstName}
                    placeholder='First name'
                    onChange={formik.handleChange}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <SoftInput
                    id='middleName'
                    name='middleName'
                    value={formik.values.middleName}
                    onChange={formik.handleChange}
                    placeholder='Middle name'
                  />
                </SoftBox>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <SoftInput
                    id='lastName'
                    required
                    name='lastName'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    placeholder='Last name'
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <SoftInput
                    required
                    id='emailAddress'
                    name='emailAddress'
                    value={formik.values.emailAddress}
                    onChange={formik.handleChange}
                    type='email'
                    placeholder='Email'
                  />
                </SoftBox>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <p style={{ fontSize: 12 }}>Phone</p>
                  <SoftInput
                    required
                    id='phoneNumber'
                    name='phoneNumber'
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    type='phone'
                    placeholder='Phone number'
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box mb={2}>
                  <FormControl fullWidth>
                    <p style={{ fontSize: 12 }}>Gender</p>
                    {/* <InputLabel id="demo-simple-select-label">Gender</InputLabel> */}

                    <NativeSelect
                      defaultValue={formik.values.gender}
                      disableUnderline
                      variant='outlined'
                      onChange={formik.handleChange}
                      required
                      fullWidth
                      sx={{ textTransform: "capitalize" }}
                      inputProps={{
                        name: "gender",
                        id: "gender",
                        sx: {
                          minWidth: "100%",
                        },
                      }}
                    >
                      {gender?.map((el, index) => (
                        <option style={{ textTransform: "capitalize" }} key={index} value={el}>
                          {`${el}`}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            <SoftBox mt={1} mb={1}>
              <SoftButton
                disabled={isLoading}
                type='submit'
                variant='gradient'
                color='dark'
                fullWidth
              >
                create user
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </List>
      </Dialog>
      <Footer />
    </DashboardLayout>
  );
};

export default Users;
