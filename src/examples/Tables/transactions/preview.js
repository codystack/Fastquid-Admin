import React from "react";
import { PropTypes } from "prop-types";
import { Avatar, Chip, Divider, Grid, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import formatCurrency from "utils/formatCurrency";

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
        src={selected?.row?.user?.photoUrl}
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
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.user?.phoneNumber}
            </p>
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
              TRANSACTION TYPE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>{selected?.row?.type}</p>
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
              INITIATED ON
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {new Date(selected?.row?.createdAt).toLocaleString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              REFERENCE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.reference}
            </p>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              AMOUNT
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {formatCurrency(selected?.row?.amount)}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
             GATEWAY RESPONSE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>{selected?.row?.gateway_response}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              CURRENCY
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.currency}
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              MESSAGE
            </Typography>
            <p style={{ fontSize: 14, textTransform: "capitalize" }}>
              {selected?.row?.message}
            </p>
          </Box>
        </Grid>
      </Grid>
      <br />
      <br />
      <Box
        padding={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight={600}>
          TRANSACTION STATUS
        </Typography>
        <Chip
          size="large"
          sx={{ textTransform: "capitalize" }}
          label={selected?.row?.status}
          color={
            selected?.row?.status === "pending"
              ? "warning"
              : selected?.row?.status === "approved" || selected?.row?.status === "settled" ||  selected?.row?.status === "success"
              ? "success"
              : selected?.row?.status === "credited"
              ? "info"
              : "error"
          }
        />
      </Box>
    </Box>
  );
};

Preview.propTypes = {
  selected: PropTypes.object,
};

export default Preview;
