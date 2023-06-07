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

const useStyles = makeStyles((theme) => ({
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ActionButton = ({ selected }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  //   const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [menu, setMenu] = React.useState(null);
  const dispatch = useDispatch();

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const openAction = Boolean(anchorEl);
  //   const { enqueueSnackbar } = useSnackbar();
  const { profileData } = useSelector((state) => state.profile);
  const handleMoreAction = (e) => setAnchorEl(e.currentTarget);

  const handleCloseMoreAction = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    closeMenu();
    setOpenConfirm(true);
  };

  const handleClose = () => {
    setOpenConfirm(false);
  };

  const performDelete = async () => {};

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
      {profileData && profileData?.privilege?.claim === "read/write" && (
        <>
          {selected?.row?.status === "pending" && (
            <>
              <MenuItem onClick={handleClickOpen}>{"Approve"}</MenuItem>
              <MenuItem
                onClick={() => {
                  closeMenu();
                  setOpenDelete(true);
                }}
              >
                {"Decline"}
              </MenuItem>
            </>
          )}
          {selected?.row?.status === "approved" && (
            <>
              <MenuItem onClick={handleClickOpen}>{"Credit"}</MenuItem>
              <MenuItem onClick={() => setOpenDelete(true)}>{"Decline"}</MenuItem>
            </>
          )}
        </>
      )}

      <MenuItem onClick={() => setOpen(true)}>Preview</MenuItem>
    </Menu>
  );
  //   []?.

  const approveTransaction = async () => {
    handleClose();
    // dispatch(setLoading(true));
    // const payload = { ...selected?.row, status: "approved" };

    // // console.log("NEW PAYLOAD ", payload);
    // try {
    //   let response = APIService.update("/admin/loan/update", "", payload);

    //   toast.promise(response, {
    //     loading: "Loading",
    //     success: (res) => {
    //       dispatch(setLoading(false));
    //       mutate("/loan/all");
    //       return `Transaction approved successfully`;
    //     },
    //     error: (err) => {
    //       console.log("ERROR HERE >>> ", `${err}`);
    //       dispatch(setLoading(false));
    //       return err?.response?.data?.message || err?.message || "Something went wrong, try again.";
    //     },
    //   });
    // } catch (error) {
    //   dispatch(setLoading(false));
    //   console.log("ERROR ASYNC HERE >>> ", `${error}`);
    // }
  };

  const creditLoan = async () => {
    setOpenDelete(false);
    dispatch(setLoading(true));
    const payload = { ...selected?.row, status: "credited" };

    try {
      let response = APIService.update("/admin/loan/update", "", payload);

      toast.promise(response, {
        loading: "Loading",
        success: (res) => {
          dispatch(setLoading(false));
          mutate("/loan/all");
          return `Loan credited successfully`;
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

  const declineTransaction = () => {
    handleClose();
    // dispatch(setLoading(true));
    // const payload = { ...selected?.row, status: "denied" };

    // try {
    //   let response = APIService.update("/admin/loan/update", "", payload);

    //   toast.promise(response, {
    //     loading: "Loading",
    //     success: (res) => {
    //       dispatch(setLoading(false));
    //       mutate("/loan/all");
    //       return `Loan credited successfully`;
    //     },
    //     error: (err) => {
    //       console.log("ERROR HERE >>> ", `${err}`);
    //       dispatch(setLoading(false));
    //       return err?.response?.data?.message || err?.message || "Something went wrong, try again.";
    //     },
    //   });
    // } catch (error) {
    //   dispatch(setLoading(false));
    //   console.log("ERROR ASYNC HERE >>> ", `${error}`);
    // }
  };

  return (
    <>
      <SoftBox color="text" px={2}>
        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
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
          {selected?.row?.status === "pending"
            ? "Approve Transaction"
            : "Disburse Funds For Loan Request"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{ fontSize: 14 }}>
            {`${
              selected?.row?.status === "pending"
                ? "Are you sure you want to approve this transaction by "
                : "Are you sure you want to disburse funds for"
            } ${selected?.row?.user?.firstName}? 
          ${
            selected?.row?.status === "pending"
              ? `Proceed if you are very sure you want to approve this ${selected?.row?.type} transaction `
              : `Make sure you have credited ${selected?.row?.user?.fullName} before proceeding`
          }`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={selected?.row?.status === "pending" ? approveTransaction : creditLoan}>
            Yes, proceed
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDelete(true)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Decline Loan Request"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Are you sure you want to decline ${selected?.row?.user?.firstName}\'s loan request? 
            Proceed if you are very sure you ou want to decline this loan request`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={declineTransaction}>Yes, proceed</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#18113c", color: "white" }} color="secondary" >
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
              color="#fff"
            >
              {`${selected?.row?.user?.fullName !== undefined ? `${ selected?.row?.user?.fullName}'s` : ""} Transaction Summary`}
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
