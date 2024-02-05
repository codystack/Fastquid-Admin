import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MoreVertIcon from "@mui/icons-material/MoreVertRounded";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";

// import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { setLoading } from "../../../redux/slices/backdrop";
import Box from "@mui/system/Box";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { PropTypes } from "prop-types";
import SoftBox from "components/SoftBox";
import {
  AppBar,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Icon,
  List,
  ListItem,
  Toolbar,
} from "@mui/material";

import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Close } from "@mui/icons-material";
import Preview from "./preview";
import APIService from "service";
import { toast } from "react-hot-toast";
import { mutate } from "swr";

const useStyles = makeStyles(theme => ({
  awardRoot: {
    display: "flex",
    flexDirection: "column",
  },
  awardRow: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ActionButton = ({ selected }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [menu, setMenu] = React.useState(null);
  const dispatch = useDispatch();

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const openAction = Boolean(anchorEl);
  const { profileData } = useSelector(state => state.profile);

  const handleClickOpen = () => {
    closeMenu();
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenConfirm(false);
  };

  const renderMenu = (
    <Menu
      id='simple-menu'
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
      {profileData &&
        profileData?.privilege?.claim === "read/write" &&
        profileData?.privilege?.type.toLowerCase() === "superadmin" &&
        selected?.row?.privilege?.type.toLowerCase() !== "superadmin" && (
         <div>
           {selected?.row?.accountStatus === "active" ? (
            <MenuItem onClick={() => {
              closeMenu();
              setOpenConfirm(true)
            }}>{'Disable'}</MenuItem>
          ) : (
            <MenuItem onClick={() => {
              closeMenu();
              setOpenConfirm(true)
            }} >{'Enable'}</MenuItem>
          )}
           <MenuItem onClick={handleClickOpen}>{"Remove"}</MenuItem>
         </div>
        )}
      <MenuItem onClick={() => setOpen(true)}>Preview</MenuItem>
    </Menu>
  );

  const freezeAccount = () => {
    handleClose();
    dispatch(setLoading(true));
    const payload = { ...selected?.row, accountStatus: "disabled" };

    try {
      let response = APIService.update("/admin/users/update", "", payload);

      toast.promise(response, {
        loading: "Loading",
        success: (res) => {
          dispatch(setLoading(false));
          mutate("/admin/users/all");
          return `User account successfully disabled`;
        },
        error: (err) => {
          console.log("ERROR HERE >>> ", `${err}`);
          dispatch(setLoading(false));
          return err?.response?.data?.message || err?.message || "Something went wrong, try again.";
        },
      });
    } catch (error) {
      dispatch(setLoading(false));
      console.log("ERROR ASYNC HERE >>> ", `${error}`);
    }
  };

  const unfreezeAccount = () => {
    handleClose();
    dispatch(setLoading(true));
    const payload = {
      ...selected?.row,
      accountStatus:
         "active",
    };

    try {
      let response = APIService.update("/admin/users/update", "", payload);

      toast.promise(response, {
        loading: "Loading",
        success: (res) => {
          dispatch(setLoading(false));
          mutate("/admin/users/all");
          return 'User account successfully enabled';
        },
        error: (err) => {
          console.log("ERROR HERE >>> ", `${err}`);
          dispatch(setLoading(false));
          return err?.response?.data?.message || err?.message || "Something went wrong, try again.";
        },
      });
    } catch (error) {
      dispatch(setLoading(false));
      console.log("ERROR ASYNC HERE >>> ", `${error}`);
    }
  };

  const removeAdmin = () => {
    handleClose();
    dispatch(setLoading(true));
    // const payload = { ...selected?.row, status: "denied" };

    try {
      let response = APIService.delete("/admin/delete", `${selected?.row?.id}`);

      toast.promise(response, {
        loading: "Loading",
        success: res => {
          mutate("/admin/all");
          dispatch(setLoading(false));
          return `${response?.message || "Admin deleted successfully"}`;
        },
        error: err => {
          console.log("ERROR HERE >>> ", `${err}`);
          dispatch(setLoading(false));
          return err?.response?.data?.message || err?.message || "Something went wrong, try again.";
        },
      });
    } catch (error) {
      dispatch(setLoading(false));
      console.log("ERROR ASYNC HERE >>> ", `${error}`);
    }
  };

  return (
    <>
      <SoftBox color='text' px={2}>
        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize='small' onClick={openMenu}>
          more_vert
        </Icon>
      </SoftBox>
      {renderMenu}

      <Dialog
        open={openConfirm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {selected?.row?.accountStatus === "disabled" ? "Enable Account" : "Disable Account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{ fontSize: 14 }}>
            {`${
              selected?.row?.accountStatus === "disabled"
                ? `Are you sure you want to enable ${selected?.row?.firstName}'s account?`
                : `Are you sure you want to disable ${selected?.row?.firstName}'s account?`
            }`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={selected?.row?.accountStatus === "frozen" ? unfreezeAccount : freezeAccount}
          >
            Yes, proceed
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDelete(true)}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{"Remove Admin"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {`Are you sure you want to remove ${selected?.row?.fullName} as an admin. 
            Proceed if you are very sure you want to remove this admin`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={removeAdmin}>Yes, proceed</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "relative", backgroundColor: "#18113c", color: "white" }}
          color='secondary'
        >
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={() => setOpen(false)}
              aria-label='close'
            >
              <Close />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textTransform: "capitalize" }}
              variant='h6'
              component='div'
              color={"#fff"}
            >
              {`${selected?.row?.fullName}'s Profile`}
            </Typography>
            <Button autoFocus color='inherit' onClick={() => setOpen(false)}>
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
