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
import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
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
import AddTemplate from "forms/email/add_template";
import UpdateTemplate from "forms/email/update_template";

function PlatformSettings() {
  const [isPersonalActive, setPersonalActive] = useState(true);
  const [isPaydayActive, setPaydayActive] = useState(true);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [directLoanState, setDirectLoanState] = useState(false);
  const [companyLoanState, setCompanyLoanState] = useState(false);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const { settings, emailTemplates } = useSelector((state) => state.setting);
  const { isLoading } = useSelector((state) => state.loading);

  useEffect(() => {
    if (settings) {
      setDirectLoanState(settings?.directLoan);
      setCompanyLoanState(settings?.companyLoan);
    }
    if (settings?.personalLoanState) {
      setPersonalActive(settings?.personalLoanState === "active" ? true : false);
    }
    if (settings?.payDayLoanState) {
      setPaydayActive(settings?.payDayLoanState === "active" ? true : false);
    }

  }, [settings, settings?.payDayLoanState, settings?.personalLoanState]);

  console.log("CHECK SETTINGS:   ", settings);

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

  const updateLoanStatus = async (directLoan, companyLoan) => {
    try {
      // Now update the settings here
      const payload = {
        personalLoanState: settings?.payDayLoanState,
        payDayLoanState: settings?.payDayLoanState,
        directLoan: directLoan,
        companyLoan: companyLoan,
        minimumLoanAmount: settings?.minimumLoanAmount,
        maximumLoanAmount: settings?.maximumLoanAmount,
        personalLoanAmountPercentage: settings?.personalLoanAmountPercentage,
        paydayLoanAmountPercentage: settings?.paydayLoanAmountPercentage,
        paydayLoanInterest: settings?.paydayLoanInterest,
        personalLoanInterest: settings?.personalLoanInterest,
        loanReasons: settings?.loanReasons,
      }

      const response = await APIService.update("/admin/setting/update", settings?.id, payload);
      console.log("RESPONNSE ::: :::: ", response);
      
    } catch (error) {
      console.log("LOAN APPLICAT STATE ERR ::: ", error);
    }
  }

  return (
    <Box>
      <Card>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>....... Add New Loan Reason .......</DialogTitle>
          {/* <SoftBox p={4} role='form' component='form' onSubmit={addReason}>
            <SoftInput
              required
              fullWidth
              type='text'
              value={reason}
              name='minimumLoanAmount'
              onChange={e => {
                setReason(e?.target?.value);
              }}
            />
            <br />
            <SoftButton type='submit' variant='gradient' color='dark' fullWidth>
              Submit
            </SoftButton>
          </SoftBox> */}
        </Dialog>

        <Dialog open={openAdd} fullWidth onClose={() => setOpenAdd(false)}>
          <DialogTitle> ADD NEW EMAIL TEMPLATE </DialogTitle>
          <SoftBox p={4}>
            <AddTemplate setOpen={setOpenAdd} />
          </SoftBox>
        </Dialog>

        <DialogItem open={openUpdate} setOpen={setOpenUpdate} data={data} />

        <SoftBox
          p={4}
          lineHeight={1.25}
          width="100%"
          component="form"
          role="form"
          onSubmit={formik.handleSubmit}
        >
          <SoftTypography
            variant="caption"
            fontWeight="bold"
            color="text"
            textTransform="uppercase"
          >
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

          <SoftBox
            display="flex"
            flexDirection="column"
            py={1}
            mb={0.25}
            styles={{ width: "100%", marginTop: 4 }}
          >
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
                Loan Application Type
              </SoftTypography>
            </SoftBox>
            <SoftBox p={2}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={directLoanState}
                      onChange={(e, checked) => {
                        setDirectLoanState(checked);
                        updateLoanStatus(checked, companyLoanState);
                      }}
                    />
                  }
                  label="Direct Loan"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={companyLoanState}
                      onChange={(e, checked) => {
                        setCompanyLoanState(checked);
                        updateLoanStatus(directLoanState, checked);
                      }}
                    />
                  }
                  label="Company Loan"
                />
              </FormGroup>
            </SoftBox>
          </SoftBox>

          <SoftBox mt={4} mb={1}>
            <SoftButton
              disabled={isLoading}
              type="submit"
              variant="gradient"
              color="dark"
              fullWidth
            >
              Save Changes
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </Card>
      <Toolbar />
      <Card>
        <SoftBox
          p={4}
          lineHeight={1.25}
          width="100%"
          component="form"
          role="form"
          // onSubmit={formik.handleSubmit}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pb={2}
          >
            <Typography textTransform={"uppercase"}>Email Template Customization</Typography>
            {/* <Button variant='contained' onClick={() => setOpenAdd(true)}>
              Add Template
            </Button> */}
          </Box>

          <SoftBox display="flex" py={1} mb={0.25}>
            <Grid container spacing={2}>
              {emailTemplates?.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <SoftBox mt={0.25}>
                    <SoftTypography variant="body2" textTransform="capitalize">
                      {`${item?.type}`.replace("-", " ")}
                    </SoftTypography>
                    <Button
                      sx={{ textTransform: "capitalize" }}
                      startIcon={<Edit />}
                      size="small"
                      onClick={() => {
                        setData(item);
                        setOpenUpdate(true);
                      }}
                    >
                      Customize
                    </Button>
                  </SoftBox>
                </Grid>
              ))}
            </Grid>
          </SoftBox>
        </SoftBox>
      </Card>
    </Box>
  );
}

const DialogItem = (props) => (
  <Dialog open={props.open} fullWidth onClose={() => props.setOpen(false)}>
    <DialogTitle> UPDATE EMAIL TEMPLATE </DialogTitle>
    <SoftBox p={4}>
      <UpdateTemplate data={props.data} setOpen={props.setOpen} />
    </SoftBox>
  </Dialog>
);

export default PlatformSettings;
