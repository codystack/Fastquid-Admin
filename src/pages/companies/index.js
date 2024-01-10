import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import React from "react";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
// import Card from "@mui/material/Card";
import UsersTable from "examples/Tables/users";
import AdminsTable from "examples/Tables/admins";
import SoftButton from "components/SoftButton";
import { Add, Close } from "@mui/icons-material";
import {
  AppBar,
  Checkbox,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
  Toolbar,
} from "@mui/material";

import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import { useFormik } from "formik";
import APIService from "service";
import { toast } from "react-hot-toast";
import CompaniesTable from "examples/Tables/companies";
import { useSelector } from "react-redux";

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

const Companies = () => {
  const [countryCode] = React.useState("+234");
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [isError, setError] = React.useState(false);
  const [pass, setPass] = React.useState("");

  const { admins } = useSelector(state => state.admin);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sectors = [
    "Finance",
    "Oil & Gas",
    "Education",
    "Government",
    "Hospitality",
    "Healthcare",
    "Transportation",
    "Manufacturing",
    "Technology",
    "Others",
  ];

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

  const formik = useFormik({
    initialValues: {
      name: "",
      website: "",
      phone: "",
      emailAddress: "",
      domain: "",
      contactName: "",
      contactPhone: "",
      type: "",
      accountManager: "",
    },
    onSubmit: values => {
      setLoading(true); 

      try {
        const { contactName, contactPhone, ...rest } = Object.assign({}, values);

        const payload = {
          ...rest,
          contactPerson: {
            name: values.contactName,
            phone: values.contactPhone,
          },
        };

        const response = APIService.post("/company/create", payload);

        toast.promise(response, {
          loading: "Loading",
          success: res => {
            console.log("RESP HERE >>> ", `${res}`);
            setError(false);
            setErrMsg("");

            setLoading(false);
            setOpen(false);

            return `New company added successfully`;
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
        <SoftButton
          variant='gradient'
          color='dark'
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Add Company
        </SoftButton>
      </Box>
      <Box sx={{ width: "100%" }}>
        <CompaniesTable />
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
              {`Add New Company`}
            </Typography>
            <SoftButton autoFocus color='inherit' onClick={() => setOpen(false)}>
              Close
            </SoftButton>
          </Toolbar>
        </AppBar>
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
          <SoftBox width='50%' component='form' role='form' onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <SoftInput
                    id='name'
                    name='name'
                    required
                    value={formik.values.name}
                    placeholder='Company name'
                    onChange={formik.handleChange}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <SoftInput
                    id='website'
                    name='website'
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    placeholder='Company website'
                  />
                </SoftBox>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <SoftInput
                    id='domain'
                    name='domain'
                    value={formik.values.domain}
                    onChange={formik.handleChange}
                    placeholder="Company's email domain in the format abc.com"
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
                    id='phone'
                    name='phone'
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    type='phone'
                    placeholder="Company's phone number"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box mb={2}>
                  <FormControl fullWidth  >
                    <p style={{ fontSize: 12 }}>Select sector type</p>

                    <NativeSelect
                      defaultValue={formik.values.type}
                      disableUnderline
                      variant='outlined'
                      onChange={formik.handleChange}
                      required
                      fullWidth
                      sx={{ textTransform: "capitalize" }}
                      inputProps={{
                        name: "type",
                        id: "type",
                        sx: {
                          minWidth: "100%",
                        },
                      }}
                    >
                      {sectors?.map((el, index) => (
                        <option style={{ textTransform: "uppercase", }} key={index} value={el.toLowerCase()}>
                          {`${el}`}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <SoftInput
                    id='contactName'
                    name='contactName'
                    required
                    value={formik.values.contactName}
                    placeholder="Representative's name"
                    onChange={formik.handleChange}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <SoftInput
                    required
                    id='contactPhone'
                    name='contactPhone'
                    value={formik.values.contactPhone}
                    onChange={formik.handleChange}
                    type='phone'
                    placeholder="Representative's phone number"
                  />
                </SoftBox>
              </Grid>
            </Grid>

            <SoftBox>
              <FormControl sx={{ minWidth: 120 }} size='medium' fullWidth>
                <p style={{ fontSize: 12 }}> Select account manager</p>

                <NativeSelect
                  defaultValue={formik.values.accountManager}
                  disableUnderline
                  variant='outlined'
                  onChange={formik.handleChange}
                  required
                  fullWidth
                  sx={{ textTransform: "capitalize" }}
                  inputProps={{
                    name: "accountManager",
                    id: "accountManager",
                    sx: {
                      minWidth: "100%",
                    },
                  }}
                >
                  {admins?.map((el, index) => (
                    <option style={{ textTransform: "capitalize" }} key={index} value={el.id}>
                      {`${el.fullName} - ${el?.privilege?.role}`}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </SoftBox>

            <SoftBox mt={4} mb={1}>
              <SoftButton
                disabled={isLoading}
                type='submit'
                variant='gradient'
                color='dark'
                fullWidth
              >
                add company
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </List>
      </Dialog>
      <Footer />
    </DashboardLayout>
  );
};

export default Companies;
