import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/fast-logos/lagos.jpeg";
import APIService from "service";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "redux/slices/backdrop";
import { setLoading } from "../../../redux/slices/backdrop";
import { setProfile } from "redux/slices/profile";
import { setAuth } from "redux/slices/profile";
import { mutate } from "swr";

function SignIn(props) {
  // const { mutate } = props;
  const [rememberMe, setRememberMe] = useState(true);
  // const [loading, setLoading] = useState();
  const [formValues, setFormValues] = useState({
    emailAddress: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValues((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("TORINO");
    try {
      dispatch(setLoading(true));
      //Now perform login here

      const response = APIService.post("/admin/login", formValues);

      toast.promise(response, {
        loading: "Loading",
        
        success: (res) => {

          console.log("REPONSE DDJK :; ", response);
          console.log("REPONSE RES :; ", res);
          
          localStorage.setItem("accessToken", res?.data?.accessToken);
          localStorage.setItem("refreshToken", res?.data?.refreshToken);

          dispatch(setProfile(res?.data?.data));
          dispatch(setAuth(true));

          mutate();

          console.log("PROFILE DATA >> ", data);
          setTimeout(() => {
            mutate();
            dispatch(setLoading(false));
            console.log("PROFILE DATA >> ", data);
            // navigate("/dashboard");
          }, 5000);

          return "Login successful!";
        },
        error: (err) => {
          console.log("err", err);
          dispatch(setLoading(false));
          return err?.response?.data?.message || err?.message || "Something went wrong, try again.";
        },
      });
    } catch (error) {
      dispatch(setLoading(false));
      console.log(
        error?.response?.data?.message || error?.message || "Something went wrong, try again."
      );
    }
  };

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
      top={5}
    >
      <SoftBox component="form" role="form" onSubmit={handleSubmit}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            value={formValues.emailAddress}
            name="emailAddress"
            onChange={handleChange}
            required
            type="email"
            placeholder="Email"
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            value={formValues.password}
            name="password"
            onChange={handleChange}
            required
            type="password"
            placeholder="Password"
          />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton disable={isLoading} variant="gradient" color="error" type="submit">
            sign in
          </SoftButton>
        </SoftBox>
        {/* <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/sign-up"
              variant="button"
              color="error"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox> */}
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
