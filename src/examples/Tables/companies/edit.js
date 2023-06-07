import React from "react";
import { PropTypes } from "prop-types";
import { Avatar, Chip, Divider, FormControl, Grid, InputLabel, List, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import formatCurrency from "utils/formatCurrency";
import { useFormik } from "formik";
import { mutate } from "swr";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import APIService from "service";
import { toast } from "react-hot-toast";

const EditCompany = (props) => {
  let { selected, setOpen } = props;
  const [isLoading, setLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [isError, setError] = React.useState(false);

  const types = ["personal", "non-profit", "corporation", "government-owned"];

  const formik = useFormik({
    initialValues: {
      name: selected?.row?.name,
      website: selected?.row?.website,
      phone: selected?.row?.phone,
      emailAddress: selected?.row?.emailAddress,
      domain: selected?.row?.domain,
      contactName: selected?.row?.contactPerson?.name,
      contactPhone: selected?.row?.contactPerson?.phone,
      type: selected?.row?.type,
    },
    onSubmit: (values) => {
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

        const response = APIService.update("/company/update", `${selected.row?.id}`, payload);

        toast.promise(response, {
          loading: "Loading",

          success: (res) => {
            console.log("RESP HERE >>> ", `${res}`);
            setError(false);
            setErrMsg("");

            setLoading(false);
            mutate("/company/all");
            setOpen(false);
            return `Company deleted successfully`;
          },
          error: (err) => {
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
    <Box
      padding={4}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Toolbar />
      <Toolbar />

      {isError && (
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
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
        <SoftBox width="100%" component="form" role="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}  >
            <Grid item xs={12} sm={6} md={6}>
              <SoftBox mb={2}>
                <SoftInput
                  id="name"
                  name="name"
                  required
                  fullWidth
                  value={formik.values.name}
                  placeholder="Company name"
                  onChange={formik.handleChange}
                />
              </SoftBox>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <SoftBox mb={2}>
                <SoftInput
                  id="website"
                  name="website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  placeholder="Company website"
                />
              </SoftBox>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6}>
              <SoftBox mb={2}>
                <SoftInput
                  id="domain"
                  name="domain"
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
                  id="emailAddress"
                  name="emailAddress"
                  value={formik.values.emailAddress}
                  onChange={formik.handleChange}
                  type="email"
                  placeholder="Email"
                />
              </SoftBox>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6}>
              <SoftBox mb={2}>
                <SoftInput
                  required
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  type="phone"
                  placeholder="Company's phone number"
                />
              </SoftBox>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Box mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-labe">Company type</InputLabel>
                  <Select
                    labelId="demo-simple-select-labe"
                    id="demo-simple-select"
                    value={formik.values.type}
                    required
                    name="type"
                    label="Company type"
                    onChange={formik.handleChange}
                  >
                    {types?.map((el, index) => (
                      <MenuItem key={index} value={el}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6}>
              <SoftBox mb={2}>
                <SoftInput
                  id="contactName"
                  name="contactName"
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
                  id="contactPhone"
                  name="contactPhone"
                  value={formik.values.contactPhone}
                  onChange={formik.handleChange}
                  type="phone"
                  placeholder="Representative's phone number"
                />
              </SoftBox>
            </Grid>
          </Grid>

          <SoftBox mt={4} mb={1}>
            <SoftButton
              disabled={isLoading}
              type="submit"
              variant="gradient"
              color="dark"
              fullWidth
            >
              Update company
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </List>
    </Box>
  );
};

EditCompany.propTypes = {
  selected: PropTypes.object,
};

export default EditCompany;
