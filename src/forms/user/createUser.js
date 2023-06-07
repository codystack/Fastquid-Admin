import { Checkbox } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import React from "react";

const createUserForm = () => {
  return (
    <SoftBox pt={2} pb={3} px={3} bg>
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftInput placeholder="Name" />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput type="email" placeholder="Email" />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput type="password" placeholder="Password" />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Checkbox checked={agreement} onChange={handleSetAgremment} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetAgremment}
            sx={{ cursor: "poiner", userSelect: "none" }}
          >
            &nbsp;&nbsp;I agree the&nbsp;
          </SoftTypography>
          <SoftTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
            Terms and Conditions
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="dark" fullWidth>
            sign up
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Already have an account?&nbsp;
            <SoftTypography
              component={Link}
              to="/authentication/sign-in"
              variant="button"
              color="dark"
              fontWeight="bold"
              textGradient
            >
              Sign in
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
};

export default createUserForm;
