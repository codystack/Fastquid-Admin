import React from "react";
import { PropTypes } from "prop-types";
import { Avatar, Chip, Divider, Grid, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import formatCurrency from "utils/formatCurrency";
import logo from "../../../assets/images/fast-logos/credit_card_icon.jpg";

const Preview = (props) => {
  let { selected } = props;

  let fL = selected?.row?.user?.firstName?.slice(0, 1);
  let sL = selected?.row?.user?.lastName?.slice(0, 1);

  return (
    <Box
      padding={4}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Avatar
        size="large"
        sx={{ width: 128, height: 128 }}
        src={selected?.row?.user?.photoUrl ?? logo}
      >{`${fL}${sL}`}</Avatar>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              FULLNAME
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.user?.fullName}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              EMAIL
            </Typography>
            <p style={{ fontSize: 14, textTransform: "lowercase" }}>
              {selected?.row?.user?.emailAddress}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              PHONE NUMBER
            </Typography>
            <p style={{ fontSize: 14 }}>{selected?.row?.user?.phoneNumber}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              GENDER
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.user?.gender}
            </p>
          </Box>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              CARD TYPE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>{selected?.row?.card_type}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              CHANNEL
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>{selected?.row?.channel}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              ADDED ON
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
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              LAST 4 DIGIT
            </Typography>
            <p style={{ fontSize: 14 }}>{selected?.row?.last4}</p>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              EXPIRY MONTH
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>{selected?.row?.exp_month}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              EXPIRY YEAR
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>{selected?.row?.exp_year}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              COUNTRY
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.country_code}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              BIN
            </Typography>
            <p style={{ fontSize: 14 }}>{selected?.row?.bin}</p>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              BANK
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>{selected?.row?.bin}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              ACCOUNT NAME
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.account_name}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              AUTH CODE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.authorization_code}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              SIGNATURE
            </Typography>
            <p style={{ fontSize: 14 }}>{selected?.row?.signature}</p>
          </Box>
        </Grid>
      </Grid>
      <br />
      <br />
    </Box>
  );
};

Preview.propTypes = {
  selected: PropTypes.object,
};

export default Preview;
