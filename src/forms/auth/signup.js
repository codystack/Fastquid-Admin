import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
// Third party
import toast, { Toaster } from "react-hot-toast";
// Services
import APIService from "../../service/";

import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";

import { useDispatch } from "react-redux";
// import env from '../../env';

import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useProfile from "hooks/profile";
import { setAuth, setProfile } from "../../redux/slices/profile";
import { APP_KEY } from "config.js";
import SoftButton from "components/SoftButton";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const sex = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
];

const privilegeTypes = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Super Admin",
    value: "superadmin",
  },
];

const privilegeClaims = [
  {
    label: "Read Only",
    value: "readonly",
  },
  {
    label: "Read & Write",
    value: "read/write",
  },
];

const privilegeRoles = [
  {
    label: "Manager",
    value: "manager",
  },
  {
    label: "Sales",
    value: "sales",
  },
  {
    label: "Operations",
    value: "operations",
  },
  {
    label: "Developer",
    value: "developer",
  },
  {
    label: "Analyst",
    value: "analyst",
  },
];

function RegisterForm(props) {
  //   const { mutate } = props;
  const [loading, setLoading] = useState();
  const [countryCode] = useState("+234");
  const [showCode, setShowCode] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    emailAddress: "",
    password: "",
    type: "",
    role: "",
    claim: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({ ...prevData, [name]: value }));
  };

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

  //   const registerSchema = Yup.object().shape({
  //     firstName: Yup.string()
  //       .min(2, "Too Short!")
  //       .max(50, "Too Long!")
  //       .required("First name required"),
  //     lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Last name required"),
  //     phoneNumber: Yup.string()
  //       .matches(phoneRegExp, "Enter a valid phone number")
  //       .required("Phone number is required")
  //       .min(10, "Phone Number must be between 10-11 digits")
  //       .max(11, "Phone Number must not be more than 11 digits"),
  //     emailAddress: Yup.string()
  //       .email("Email must be a valid email address")
  //       .required("Email is required"),
  //     gender: Yup.string().required("Gender is required"),
  //     state: Yup.string().required("State is required"),
  //     city: Yup.string().required("City is required"),
  //     address: Yup.string().required("Current Address is required"),
  //     dob: Yup.string().required("Date of Birth is required"),
  //     password: Yup.string().required("Password is required"),
  //   });

  //   const formik = useFormik({
  //     initialValues: {
  //       firstName: "",
  //       lastName: "",
  //       emailAddress: "",
  //       phoneNumber: "",
  //       gender: "male",
  //       dob: new Date("2000-12-31T23:00:00.000Z"),
  //       address: "",
  //       state: "Abia",
  //       city: "",
  //       password: "",
  //     },
  //     // validationSchema: registerSchema,
  //     onSubmit: async () => {
  //       console.log("CHECKING >> ");

  //       setLoading(true);
  //       const payload = {
  //         ...values,
  //         phoneNumber: `${countryCode}${
  //           values?.phoneNumber.charAt(0) === "0"
  //             ? values?.phoneNumber.substring(1)
  //             : values?.phoneNumber
  //         }`,
  //         location: {
  //           state: values?.state,
  //           city: values?.city,
  //           address: values?.address,
  //         },
  //       };

  //       const response = APIService.get("/admin/profile");

  //       toast.promise(response, {
  //         loading: "Loading",
  //         success: (res) => {
  //           setLoading(false);
  //           // send to verify otp
  //           //mutate profile

  //           //   navigate("/verify-otp", {
  //           //     state: {
  //           //       emailAddress: values?.emailAddress,
  //           //       accessToken: res?.data?.accessToken,
  //           //       refreshToken: res?.data?.refreshToken,
  //           //     },
  //           //     replace: true,
  //           //   });
  //           return `${res?.data?.message}! We sent an OTP to your email address (${values?.emailAddress}). open your mail and enter the OTP sent to your mail.`;
  //         },
  //         error: (err) => {
  //           console.log("ERROR HERE >>> ", `${err}`);
  //           setLoading(false);
  //           return err?.response?.data?.message || err?.message || "Something went wrong, try again.";
  //         },
  //       });
  //     },
  //   });

  //   const { errors, touched, values, handleSubmit, getFieldProps, isValid, setFieldValue } = formik;

  //   const handleShowPassword = () => {
  //     setShowPassword((show) => !show);
  //   };

  const submitForm = async (e) => {
    // console.log("LOADING >>>", APP_KEY);
    // setLoading(true);
 
    try {
      const { type, claim, role, ...rest } = Object.assign({}, formValues);

      const payload = {
        ...rest,
        phoneNumber: `${countryCode}${
          formValues?.phoneNumber.charAt(0) === "0"
            ? formValues?.phoneNumber.substring(1)
            : formValues?.phoneNumber
        }`,
        privilege: {
          type: formValues.type,
          role: formValues.role,
          claim: formValues.claim,
        },
        device: {
          os: `${osName()}`,
        },
      };

      console.log("PAYLOADS ", payload);

      const response = APIService.post("/admin/create", payload);

      //   const response = APIService.get("/admin/create");

      toast.promise(response, {
        loading: "Loading",
        success: (res) => {
          setLoading(false);

          //Now route to login
          navigate("/login", {
            replace: true,
          });

          return `Login to continue`;
        },
        error: (err) => {
          console.log("ERROR HERE >>> ", `${err}`);
          setLoading(false);
          return err?.response?.data?.message || err?.message || "Something went wrong, try again.";
        },
      });
    } catch (error) {
      console.log("ERROR => ", error);
    }
  };

  return (
    <>
      <ValidatorForm onSubmit={submitForm}>
        {/* <Stack spacing={2} sx={{ marginBottom: 2 }}> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First name"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              placeholder="First name"
              variant="outlined"
              validators={["required"]}
              errorMessages={["First name is required"]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              margin="normal"
              fullWidth
              id="middleName"
              label="Middle name"
              name="middleName"
              value={formValues.middleName}
              onChange={handleChange}
              placeholder="Middle name (optional"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last name"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              placeholder="Last name"
              variant="outlined"
              validators={["required"]}
              errorMessages={["Last name is required"]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              margin="normal"
              autoComplete="email-address"
              required
              type="email"
              fullWidth
              id="emailAddress"
              label="Email Address"
              name="emailAddress"
              value={formValues.emailAddress}
              onChange={handleChange}
              placeholder="Email address"
              variant="outlined"
              validators={["required"]}
              errorMessages={["Email address is required"]}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              margin="normal"
              required
              autoComplete="phone"
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleChange}
              placeholder="Phone number"
              variant="outlined"
              validators={["required"]}
              errorMessages={["Phone number is required"]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              margin="normal"
              value={formValues.gender}
              onChange={handleChange}
              label="Select gender"
              name="gender"
              fullWidth
              variant="outlined"
              size="small"
              id="gender"
              validators={["required"]}
              errorMessages={["Gender e is required"]}
            >
              {sex?.map((gender) => (
                <MenuItem key={gender.value} value={gender.value}>
                  {gender.label}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              margin="normal"
              value={formValues.type}
              onChange={handleChange}
              label="Select admin type"
              name="type"
              fullWidth
              variant="outlined"
              size="small"
              id="type"
              validators={["required"]}
              errorMessages={["Admin type is required"]}
            >
              {privilegeTypes?.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              margin="normal"
              value={formValues.role}
              onChange={handleChange}
              label="Select admin role"
              name="role"
              fullWidth
              variant="outlined"
              size="small"
              id="role"
              validators={["required"]}
              errorMessages={["Admin role is required"]}
            >
              {privilegeRoles?.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <SelectValidator
              margin="normal"
              value={formValues.claim}
              onChange={handleChange}
              label="Select admin claim"
              name="claim"
              fullWidth
              variant="outlined"
              size="small"
              id="claim"
              validators={["required"]}
              errorMessages={["Admin claim is required"]}
            >
              {privilegeClaims?.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextValidator
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showCode ? "text" : "password"}
              id="password"
              onChange={handleChange}
              value={formValues.password}
              autoComplete="current-password"
              placeholder="Password"
              variant="outlined"
              validators={["required"]}
              errorMessages={["Password is required"]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle code"
                      onClick={() => setShowCode(!showCode)}
                      onMouseDown={() => setShowCode(!showCode)}
                      edge="end"
                    >
                      {showCode ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <br />

        <SoftButton fullWidth  size="large" color="error" type="submit" variant="contained" disabled={loading}>
          Create Account
        </SoftButton>

        <Box
          paddingY={2}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="body2">Already have an account? </Typography>
          <Link
            style={{ fontSize: 15, textDecoration: "underline", paddingLeft: 10 }}
            to={"/login"}
          >
            Login{" "}
          </Link>
        </Box>
      </ValidatorForm>
      <Toaster />
    </>
  );
}

export default RegisterForm;
