import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import SoftBox from "components/SoftBox";
import {
  AppBar,
  Dialog,
  Icon,
  List,
  Toolbar,
} from "@mui/material";

import Slide from "@mui/material/Slide";
import { Close } from "@mui/icons-material";
import Preview from "./preview";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ActionButton = ({ selected }) => {

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menu, setMenu] = React.useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const { profileData } = useSelector((state) => state.profile);


  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem
        onClick={() => {
          closeMenu();
          setOpen(true);
        }}
      >
        Preview
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <SoftBox color="text" px={2}>
        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
          more_vert
        </Icon>
      </SoftBox>
      {renderMenu}
    

      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
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
              {`${selected?.row?.user?.fullName}'s Loan Summary`}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <Preview selected={selected} />
        </List>
      </Dialog>
    </>
  );
};

// Typechecking props for the ActionButton
ActionButton.propTypes = {
  selected: PropTypes.object,
};

export default ActionButton;
