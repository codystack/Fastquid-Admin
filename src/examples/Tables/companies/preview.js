import React from "react";
import { PropTypes } from "prop-types";
import { Grid, Toolbar, Typography } from "@mui/material";
import Box from "@mui/system/Box";

const Preview = (props) => {
  let { selected } = props;

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

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              COMPANY NAME
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>{selected?.row?.name}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              COMPANY EMAIL
            </Typography>
            <p style={{ fontSize: 14 }}>{selected?.row?.emailAddress}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              COMPANY PHONE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "initial" }}>{selected?.row?.phone}</p>
          </Box>
        </Grid>
      </Grid>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              COMPANY WEBSITE
            </Typography>
            <p style={{ fontSize: 14 }}>{selected?.row?.website}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              COMPANY EMAIL DOMAIN
            </Typography>
            <p style={{ fontSize: 14 }}>{selected?.row?.domain}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              COMPANY REPRESENTATIVE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "initial" }}>
              {selected?.row?.contactPerson?.name}
            </p>
          </Box>
        </Grid>
      </Grid>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              COMPANY REP PHONE
            </Typography>
            <p style={{ fontSize: 14 }}>{selected?.row?.contactPerson?.phone}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              COMPANY ADDED ON
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {new Date(selected?.row?.createdAt).toLocaleString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              LAST UPDATED ON
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {new Date(selected?.row?.updatedAt).toLocaleString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </Box>
        </Grid>
      </Grid>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              COMPANY SECTOR
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>{selected?.row?.type}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              SALARY DAY
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.salaryDay && selected?.row?.salaryDay + " of every month "}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              ACCOUNT MANAGER
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.accountManager?.fullName ?? ""}
            </p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Preview.propTypes = {
  selected: PropTypes.object,
};

export default Preview;
