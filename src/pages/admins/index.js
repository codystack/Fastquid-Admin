import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import React from "react";

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
// import Card from "@mui/material/Card";
import AdminsTable from "examples/Tables/admins";
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

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Admins = () => {
  const [countryCode] = React.useState("+234");
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [isError, setError] = React.useState(false);
  const [deviceType, setDeviceType] = React.useState("mobile");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const roles = ["Manager", "Sales", "Analyst", "Developer", "Operations"];
  const claims = ["Readonly", "Read/Write", "Approve", "Disburse"];
  const gender = ["Male", "Female"];
  const types = ["Admin", "Superadmin"];

  const osName = () => {
    const userAgent = window.navigator.userAgent;
    let os = "";

    if (userAgent.indexOf("Win") !== -1) {
      os = "Windows";
    } else if (userAgent.indexOf("Mac") !== -1) {
      os = "MacOS";
    } else if (userAgent.indexOf("Linux") !== -1) {
      os = "Linux";
    } else if (userAgent.indexOf("Android") !== -1) {
      os = "Android";
    } else if (userAgent.indexOf("iOS") !== -1) {
      os = "iOS";
    } else {
      os = "Unknown";
    }

    return os;
  };

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
      password: "",
      gender: "male",
      role: "manager",
      claim: "readonly",
      type: "admin",
      accountStatus: "active"
    },
    onSubmit: values => {
      setLoading(true);

      console.log("PAYLOAD :: ADMIN CREATE :: ", values);

      try {
        const { claim, role, ...rest } = Object.assign({}, values);

        const payload = {
          ...rest,
          phoneNumber: `${countryCode}${
            values?.phoneNumber.charAt(0) === "0"
              ? values?.phoneNumber.substring(1)
              : values.phoneNumber
          }`,
          privilege: {
            type: values.type,
            role: values.role,
            claim: values.claim,
          },
          device: {
            os: `${osName()}`,
          },
        };

        const response = APIService.post("/admin/create", payload);

        toast.promise(response, {
          loading: "Loading",
          success: res => {
            console.log("RESP HERE >>> ", `${res}`);
            setError(false);
            setErrMsg("");

            setLoading(false);
            setOpen(false);

            return `New admin created successfully`;
          },
          error: err => {
            console.log(
              "ERROR HERE >>> ",
              `${
                err?.response?.data?.message || err?.message || "Something went wrong, try again."
              }`
            );
            setErrMsg(
              `${
                err?.response?.data?.message || err?.message || "Something went wrong, try again."
              }`
            );

            setError(true);

            setLoading(false);
            return `${
              err?.response?.data?.message || err?.message || "Something went wrong, try again."
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
        <SoftButton variant="gradient"
                color="dark" startIcon={<Add />} onClick={() => setOpen(true)}>
          Create Admin
        </SoftButton>
      </Box>
      <Box sx={{ width: "100%" }}>
        <AdminsTable />
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
              {`Create New Admin`}
            </Typography>
            <SoftButton autoFocus color='inherit' onClick={() => setOpen(false)}>
              Close
            </SoftButton>
          </Toolbar>
        </AppBar>
        {
          deviceType === "mobile" && <Toolbar />
        }
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
                          {`${el}`.toLowerCase()}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <Box mb={2}>
                  <FormControl fullWidth>
                    {/* <InputLabel id="demo-simple-select-labe">Role</InputLabel> */}
                    <p style={{ fontSize: 12 }}>Role</p>
                    <NativeSelect
                      defaultValue={formik.values.role}
                      disableUnderline
                      variant='outlined'
                      onChange={formik.handleChange}
                      required
                      fullWidth
                      sx={{ textTransform: "capitalize" }}
                      inputProps={{
                        name: "role",
                        id: "role",
                        sx: {
                          minWidth: "100%",
                        },
                      }}
                    >
                      {roles?.map((el, index) => (
                        <option style={{ textTransform: "capitalize" }} key={index} value={el}>
                          {`${el}`.toLowerCase()}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box mb={2}>
                  <FormControl fullWidth>
                    {/* <InputLabel id="demo-simple-select-lab">Claim</InputLabel> */}
                    <p style={{ fontSize: 12 }}>Select claim</p>
                    <NativeSelect
                      defaultValue={formik.values.claim}
                      disableUnderline
                      variant='outlined'
                      onChange={formik.handleChange}
                      required
                      fullWidth
                      value={formik.values.claim}
                      sx={{ textTransform: "capitalize" }}
                      inputProps={{
                        name: "claim",
                        id: "Claim",
                        sx: {
                          minWidth: "100%",
                        },
                      }}
                    >
                      {claims?.map((el, index) => (
                        <option style={{ textTransform: "capitalize" }} key={index} value={el}>
                          {`${el}`.toLowerCase()}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box mb={2}>
                  <FormControl fullWidth>
                    {/* <InputLabel id="demo-simple-select-lab">Claim</InputLabel> */}
                    <p style={{ fontSize: 12 }}>Admin Type</p>
                    <NativeSelect
                      defaultValue={formik.values.type}
                      disableUnderline
                      variant='outlined'
                      onChange={formik.handleChange}
                      required
                      fullWidth
                      value={formik.values.type}
                      sx={{ textTransform: "capitalize" }}
                      inputProps={{
                        name: "type",
                        id: "type",
                        sx: {
                          minWidth: "100%",
                        },
                      }}
                    >
                      {types?.map((el, index) => (
                        <option style={{ textTransform: "capitalize" }} key={index} value={el}>
                          {`${el}`.toLowerCase()}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SoftBox mb={2}>
                  <p style={{ fontSize: 12 }}>Password</p>
                  <SoftInput
                    id='password'
                    value={formik.values.password}
                    name='password'
                    type='password'
                    required
                    onChange={formik.handleChange}
                    placeholder='Password'
                  />
                </SoftBox>
              </Grid>
            </Grid>

            <SoftBox mt={4} mb={1}>
              <SoftButton
                disabled={isLoading}
                type='submit'
                variant='gradient'
                color='dark'
                fullWidth
              >
                create admin
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </List>
      </Dialog>
      <Footer />
    </DashboardLayout>
  );
};

export default Admins;
