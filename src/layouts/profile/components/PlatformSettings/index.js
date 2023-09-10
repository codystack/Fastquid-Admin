/**
=========================================================
* FastQuid Admin Dashboard React - v1.0.1
=========================================================

*  
* Copyright 2023 FastQuid. All Rights Reserved

Coded by Stanley Nyekpeye (stanleynyekpeye@gmail.com)

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Dialog, DialogTitle, Grid, IconButton } from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import Box from "@mui/system/Box";
import SoftInput from "components/SoftInput";
import { useSelector, useDispatch } from "react-redux";
import SoftButton from "components/SoftButton";
import { useFormik } from "formik";
import { setLoading } from "redux/slices/backdrop";
import APIService from "service";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import { useEffect } from "react";
import { Add } from "@mui/icons-material";

function PlatformSettings() {
  const [isPersonalActive, setPersonalActive] = useState(true);
  const [isPaydayActive, setPaydayActive] = useState(true);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(null);
  const dispatch = useDispatch();

  const { settings } = useSelector((state) => state.setting);
  const { isLoading } = useSelector((state) => state.loading);

  useEffect(() => {
    if (settings?.personalLoanState) {
      setPersonalActive(settings?.personalLoanState === "active" ? true : false);
    }
    if (settings?.payDayLoanState) {
      setPaydayActive(settings?.payDayLoanState === "active" ? true : false);
    }
  }, [settings, settings?.payDayLoanState, settings?.personalLoanState]);

  const formik = useFormik({
    initialValues: {
      minimumLoanAmount: settings?.minimumLoanAmount ?? 0,
      maximumLoanAmount: settings?.maximumLoanAmount ?? 0,
      personalLoanAmountPercentage: settings?.personalLoanAmountPercentage ?? 0,
      paydayLoanAmountPercentage: settings?.paydayLoanAmountPercentage ?? 0,
      paydayLoanInterest: parseFloat(settings?.paydayLoanInterest?.$numberDecimal) ?? 0,
      personalLoanInterest: parseFloat(settings?.personalLoanInterest?.$numberDecimal) ?? 0,
      personalLoanState: settings?.personalLoanState ?? "",
      payDayLoanState: settings?.payDayLoanState ?? "",
    },

    onSubmit: (values) => {
      dispatch(setLoading(true));

      const { personalLoanState, payDayLoanState, ...rest } = Object.assign({}, values);

      const payload = {
        ...values,
        personalLoanState: isPersonalActive ? "active" : "disabled",
        payDayLoanState: isPaydayActive ? "active" : "disabled",
      };

      try {
        const response = APIService.update("/admin/setting/update", settings?.id, payload);

        toast.promise(response, {
          loading: "Loading",

          success: (res) => {
            console.log("RESP HERE >>> ", `${res}`);

            dispatch(setLoading(false));
            mutate("/admin/setting/load");

            return `Platform settings updated successfully`;
          },
          error: (err) => {
            console.log(
              "ERROR HERE >>> ",
              `${
                err?.response?.data?.message || err?.message || "Something went wrong, try again."
              }`
            );
            dispatch(setLoading(false));
            return `${
              err?.response?.data?.message || err?.message || "Something went wrong, try again."
            }`;
          },
        });
      } catch (error) {
        dispatch(setLoading(false));
        console.log("ERROR => ", error);
      }
    },
  });

  const addReason = async () => {
    try {
      
    } catch (error) {
      
    }
  }

  return (
    <Card>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>....... Add New Loan Reason .......</DialogTitle>
        <SoftBox p={4} role="form" component="form" onSubmit={addReason} >
          <SoftInput
            required
            fullWidth
            type="text"
            value={reason}
            name="minimumLoanAmount"
            onChange={(e) => {
              setReason(e?.target?.value);
            }}
          />
          <br />
          <SoftButton type="submit" variant="gradient" color="dark" fullWidth>
            Submit
          </SoftButton>
        </SoftBox>
      </Dialog>
      <SoftBox
        p={4}
        lineHeight={1.25}
        width="100%"
        component="form"
        role="form"
        onSubmit={formik.handleSubmit}
      >
        <SoftTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          Loan Types
        </SoftTypography>
        <SoftBox display="flex" py={1} mb={0.25}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <SoftBox mt={0.25}>
                <SoftTypography variant="body2">Personal Loan</SoftTypography>
                <Switch
                  checked={isPersonalActive}
                  onChange={() => setPersonalActive(!isPersonalActive)}
                />
              </SoftBox>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <SoftBox mt={0.25}>
                <SoftTypography variant="body2">Pay Day Loan</SoftTypography>
                <Switch
                  checked={isPaydayActive}
                  onChange={() => setPaydayActive(!isPaydayActive)}
                />
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mt={2}>
          <SoftTypography
            variant="caption"
            fontWeight="bold"
            color="text"
            textTransform="uppercase"
          >
            Loan Amount
          </SoftTypography>
        </SoftBox>
        <SoftBox display="flex" py={1} mb={0.25}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <SoftBox
                bgcolor={"red"}
                width="100%"
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="start"
              >
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Minimum Loan Amount
                </SoftTypography>
                <SoftInput
                  required
                  type="number"
                  value={formik.values?.minimumLoanAmount}
                  name="minimumLoanAmount"
                  onChange={formik.handleChange}
                />
              </SoftBox>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <SoftBox
                bgcolor={"red"}
                width="100%"
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="start"
              >
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Maximum Loan Amount
                </SoftTypography>
                <SoftInput
                  type="number"
                  value={formik.values?.maximumLoanAmount}
                  name="maximumLoanAmount"
                  onChange={formik.handleChange}
                />
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mt={2}>
          <SoftTypography
            variant="caption"
            fontWeight="bold"
            color="text"
            textTransform="uppercase"
          >
            Loan Interest
          </SoftTypography>
        </SoftBox>
        <SoftBox display="flex" py={1} mb={0.25}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <SoftBox
                bgcolor={"red"}
                width="100%"
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="start"
              >
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Personal Loan Interest
                </SoftTypography>
                <SoftInput
                  required
                  type="number"
                  value={formik.values?.personalLoanInterest}
                  name="personalLoanInterest"
                  onChange={formik.handleChange}
                />
              </SoftBox>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <SoftBox
                bgcolor={"red"}
                width="100%"
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="start"
              >
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Payday Loan Interest
                </SoftTypography>
                <SoftInput
                  type="number"
                  value={formik.values.paydayLoanInterest}
                  name="paydayLoanInterest"
                  onChange={formik.handleChange}
                />
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>

        <SoftBox mt={2}>
          <SoftTypography
            variant="caption"
            fontWeight="bold"
            color="text"
            textTransform="uppercase"
          >
            Loan Percentage
          </SoftTypography>
        </SoftBox>
        <SoftBox display="flex" py={1} mb={0.25}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <SoftBox
                bgcolor={"red"}
                width="100%"
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="start"
              >
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Personal Salary Percentage (%)
                </SoftTypography>
                <SoftInput
                  required
                  type="number"
                  value={formik.values.personalLoanAmountPercentage}
                  name="personalLoanAmountPercentage"
                  onChange={formik.handleChange}
                />
              </SoftBox>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <SoftBox
                bgcolor={"red"}
                width="100%"
                display="flex"
                flexDirection="column"
                justifyContent="start"
                alignItems="start"
              >
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  Payday Salary Percentage (%)
                </SoftTypography>
                <SoftInput
                  type="number"
                  value={formik.values.paydayLoanAmountPercentage}
                  name="paydayLoanAmountPercentage"
                  onChange={formik.handleChange}
                />
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>

        <br />

        <SoftBox display="flex" py={1} mb={0.25} styles={{ width: "100%", marginTop: 4 }}>
          <SoftBox
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <SoftTypography
              variant="caption"
              fontWeight="bold"
              color="text"
              textTransform="uppercase"
            >
              Loan Reasons
            </SoftTypography>

            <SoftButton
              variant="gradient"
              color="light"
              startIcon={<Add />}
              onClick={() => setOpen(true)}
            >
              Add New
            </SoftButton>
          </SoftBox>
        </SoftBox>

        <SoftBox mt={4} mb={1}>
          <SoftButton disabled={isLoading} type="submit" variant="gradient" color="dark" fullWidth>
            Save Changes
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default PlatformSettings;
