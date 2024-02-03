import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { setLoading } from "../../../redux/slices/backdrop";
import { PropTypes } from "prop-types";
import SoftBox from "components/SoftBox";
import {
  AppBar,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  List,
  Toolbar,
} from "@mui/material";

import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Close } from "@mui/icons-material";
import Preview from "./preview";
import APIService from "service";
import { toast } from "react-hot-toast";


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

const ActionButton = ({ selected, mutate }) => {
  const classes = useStyles();

  // console.log("SELECTED SUPPORT ::: ", selected);

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [menu, setMenu] = React.useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const dispatch = useDispatch();
  const openAction = Boolean(anchorEl);
  const { profileData } = useSelector(state => state.profile);


  const closeTicket = () => {
    setOpenDelete(false);
    dispatch(setLoading(true));

    try {
      let response = APIService.update("/support/close", `${selected?.row?.id}` , {});

      toast.promise(response, {
        loading: "Loading",
        success: (res) => {
          dispatch(setLoading(false));
          mutate();
          // mutate("/support/all");
          return `${response.data?.message || "Ticket closed successfully"}`;
        },
        error: (err) => {
          // console.log("ERROR HERE >>> ", `${err}`);
          dispatch(setLoading(false));
          return err?.response?.data?.message || err?.message || "Something went wrong, try again.";
        },
      });
    } catch (error) {
      dispatch(setLoading(false));
      console.log("ERROR ASYNC HERE >>> ", `${error}`);
    }
  }


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
      <MenuItem onClick={() => setOpen(true)}>View</MenuItem>
      {(profileData.privilege?.type === "superadmin" &&
        profileData?.privilege?.role === "manager") ||
        (profileData?.privilege?.role === "developer" &&
          profileData?.privilege?.claim === "read/write" && (
            <>
              {selected?.row?.status === "open" && (
                <>
                  <MenuItem onClick={() => setOpenDelete(true)}>Close Ticket</MenuItem>
                </>
              )}
            </>
          ))}
    </Menu>
  );

  return (
    <>
      <SoftBox color='text' px={2}>
        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize='small' onClick={openMenu}>
          more_vert
        </Icon>
      </SoftBox>
      {renderMenu}

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
            {`Are you sure you want to close this support ticket by ${selected?.row?.user?.firstName}? 
            Proceed only if you have resolved this and you\'re sure everything is okay `}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={() => closeTicket()}>Yes, proceed</Button>
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
              color='#fff'
            >
              {`Request/Complain Summary`}
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
