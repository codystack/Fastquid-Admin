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
  FormHelperText,
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
import { mutate } from "swr";
import * as Yup from "yup";

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

const daysOfMonth = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31,
];

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

  const dateSuffixer = num =>
    num === 1 || num === 21 || num === 31
      ? "st"
      : num === 2 || num === 22
      ? "nd"
      : num === 3 || num === 23
      ? "rd"
      : "th";

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Company name is required."),
    website: Yup.string().url().required("Company name is required."),
    phone: Yup.string().required("Company phone number is required."),
    domain: Yup.string().required("Company work email domain is required."),
    contactName: Yup.string().required("Company rep name is required."),
    contactPhone: Yup.string().required("Company rep phone number is required."),
    type: Yup.string().required("Company sector type is required."),
    accountManager: Yup.string().required("Company account manager is required."),
    salaryDay: Yup.number().required("Company salary day is required."),
    emailAddress: Yup.string()
      .email("Enter a valid email address")
      .required("Company email address is required."),
  });

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
      salaryDay: 0,
    },
    validationSchema,
    onSubmit: values => {
      // setLoading(true);

     
      try {
        const { contactName, contactPhone, ...rest } = Object.assign({}, values);

        const payload = {
          ...rest,
          contactPerson: {
            name: values.contactName,
            phone: values.contactPhone,
          },
          salaryDay: parseInt(values.salaryDay)
        };

        console.log("COMAPNY PAYLOADS ... ", payload);


        const response = APIService.post("/company/create", payload);

        toast.promise(response, {
          loading: "Loading",
          success: res => {
            console.log("RESP HERE >>> ", `${res}`);
            setError(false);
            setErrMsg("");

            mutate("/company/all?page=1");

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

  const { errors, touched, values, getFieldProps, handleSubmit } = formik;

  // console.log("ADMINS >>> ", admins);

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
                  <p style={{ fontSize: 12 }}> Company Name</p>
                  <SoftInput
                    id='name'
                    name='name'
                    required
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={errors.name}
                    placeholder='Company name'
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <p style={{ fontSize: 12 }}> Company's Website</p>
                  <SoftInput
                    id='website'
                    name='website'
                    {...getFieldProps('website')}
                    error={Boolean(touched.website && errors.website)}
                    helperText={errors.website}
                   
                    placeholder='Company website'
                  />
                </SoftBox>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <p style={{ fontSize: 12 }}> Company's Web Domain</p>
                  <SoftInput
                    id='domain'
                    name='domain'
                    {...getFieldProps('domain')}
                    error={Boolean(touched.domain && errors.domain)}
                    helperText={errors.domain}
                    placeholder="Company's email domain in the format abc.com"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <p style={{ fontSize: 12 }}> Company's Email</p>
                  <SoftInput
                    required
                    id='emailAddress'
                    name='emailAddress'
                    {...getFieldProps('emailAddress')}
                    error={Boolean(touched.emailAddress && errors.emailAddress)}
                    helperText={errors.emailAddress}
                    type='email'
                    placeholder='Email Address'
                  />
                </SoftBox>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <p style={{ fontSize: 12 }}>Company's Phone</p>
                  <SoftInput
                    required
                    id='phone'
                    name='phone'
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={errors.phone}
                    type='phone'
                    placeholder="Company's phone number"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box mb={2}>
                  <FormControl fullWidth error={Boolean(touched.type && errors.type)} >
                    <p style={{ fontSize: 12 }}>Sector type</p>
                    <NativeSelect
                      disableUnderline
                      variant='outlined'
                      required
                      fullWidth
                      {...getFieldProps('type')}
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
                        <option
                          style={{ textTransform: "uppercase" }}
                          key={index}
                          value={el.toLowerCase()}
                        >
                          {`${el}`}
                        </option>
                      ))}
                    </NativeSelect>
                    <FormHelperText>
                    {errors.type}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <p style={{ fontSize: 12 }}> Rep's Name</p>
                  <SoftInput
                    id='contactName'
                    name='contactName'
                    required
                    {...getFieldProps('contactName')}
                    error={Boolean(touched.contactName && errors.contactName)}
                    helperText={errors.contactName}
                    placeholder="Representative's name"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <SoftBox mb={2}>
                  <p style={{ fontSize: 12 }}> Rep's Phone</p>
                  <SoftInput
                    required
                    id='contactPhone'
                    name='contactPhone'
                    {...getFieldProps('contactPhone')}
                    error={Boolean(touched.contactPhone && errors.contactPhone)}
                    helperText={errors.contactPhone}
                    type='phone'
                    placeholder="Representative's phone number"
                  />
                </SoftBox>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <SoftBox>
                  <FormControl sx={{ minWidth: 120 }} size='medium' fullWidth>
                    <p style={{ fontSize: 12 }}> Salary Day</p>
                    <NativeSelect
                      defaultValue={formik.values.salaryDay}
                      disableUnderline
                      variant='outlined'
                      onChange={formik.handleChange}
                      required
                      fullWidth
                      sx={{ textTransform: "capitalize" }}
                      inputProps={{
                        name: "salaryDay",
                        id: "salaryDay",
                        sx: {
                          minWidth: "100%",
                        },
                      }}
                    >
                      {daysOfMonth?.map((el, index) => (
                        <option
                          style={{ textTransform: "capitalize" }}
                          key={index}
                          value={parseInt(`${el}`)}
                        >
                          {`${el}${dateSuffixer(el)}`}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </SoftBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <SoftBox>
                  <FormControl sx={{ minWidth: 120 }} size='medium' fullWidth>
                    <p style={{ fontSize: 12 }}>Account Manager</p>
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
