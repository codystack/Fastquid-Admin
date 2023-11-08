import { Close } from "@mui/icons-material";
import { AppBar, Button, IconButton, List, Toolbar, Typography } from "@mui/material";
import DynamicLoansTable from "examples/Tables/loans/loans_dynamic";
import React from "react";

const InfoDialog = (props) => {
  let { setOpen, data } = props;

  return (
    <div>
      {" "}
      <AppBar
        sx={{ position: "relative", backgroundColor: "#18113c", color: "white" }}
        color="secondary"
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1, textTransform: "capitalize" }}
            variant="h6"
            component="div"
            color={"#fff"}
          >
            {props.title}
          </Typography>
          <Button autoFocus color="inherit" onClick={() => setOpen(false)}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <List  >
        <DynamicLoansTable loans={data} />
      </List>
    </div>
  );
};

export default InfoDialog;
