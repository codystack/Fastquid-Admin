import React from "react";
import { PropTypes } from "prop-types";
import { Avatar, Chip, Divider, Grid, Toolbar, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import formatCurrency from "utils/formatCurrency";

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
              TICKET ID
            </Typography>
            <p style={{ fontSize: 14 }}>{selected?.row?.ticketId}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              SUBJECT
            </Typography>
            <p style={{ fontSize: 14 }}>{selected?.row?.subject}</p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              MESSAGE
            </Typography>
            <p style={{ fontSize: 14, textTransform: 'initial' }}>{selected?.row?.message}</p>
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
