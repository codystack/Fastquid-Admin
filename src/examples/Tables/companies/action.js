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
import { mutate } from "swr";
import EditCompany from "./edit";

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
  // const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [menu, setMenu] = React.useState(null);
  const dispatch = useDispatch();

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const openAction = Boolean(anchorEl);
  const { profileData } = useSelector((state) => state.profile);
  // const handleMoreAction = (e) => setAnchorEl(e.currentTarget);

  // const handleCloseMoreAction = () => {
  //   setAnchorEl(null);
  // };

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
        key={"00"}
        onClick={() => {
          closeMenu();
          setOpen(true);
        }}
      >
        Preview
      </MenuItem>
      {profileData &&
        profileData?.privilege?.type === "superadmin" &&
        profileData?.privilege?.claim === "read/write" && (
          <>
            <MenuItem
              key={"10"}
              onClick={() => {
                closeMenu();
                setOpenEdit(true);
              }}
            >
              {"Update"}
            </MenuItem>
            <MenuItem
              key={"22"}
              onClick={() => {
                closeMenu();
                setOpenDelete(true);
              }}
            >
              {"Remove"}
            </MenuItem>
          </>
        )}
    </Menu>
  );

  // const updateCompany = async () => {
  //   handleClose();
  //   dispatch(setLoading(true));
  //   const payload = { ...selected?.row };

  //   // console.log("NEW PAYLOAD ", payload);
  //   try {
  //     let response = APIService.update("/admin/company/update", `${selected.row?._id}`, payload);

  //     toast.promise(response, {
  //       loading: "Loading",
  //       success: (res) => {
  //         dispatch(setLoading(false));
  //         mutate("/company/all");
  //         return `Company updated successfully`;
  //       },
  //       error: (err) => {
  //         console.log("ERROR HERE >>> ", `${err}`);
  //         dispatch(setLoading(false));
  //         return err?.response?.data?.message || err?.message || "Something went wrong, try again.";
  //       },
  //     });
  //   } catch (error) {
  //     dispatch(setLoading(false));
  //     console.log("ERROR ASYNC HERE >>> ", `${error}`);
  //   }
  // };

  const deleteCompany = () => {
    dispatch(setLoading(true));
    console.log("DELE KLKNS");

    try {
      let response = APIService.delete("/company/delete", `${selected.row?.id}`);

      toast.promise(response, {
        loading: "Loading",
        success: (res) => {
          console.log("RESP :: ", res);
          dispatch(setLoading(false));
          mutate("/company/all?page=1");
          setOpenDelete(false);
          return `${response.data?.message || "Operation successful"}`;
        },
        error: (err) => {
          dispatch(setLoading(false));
          return err?.response?.data?.message || err?.message || "Something went wrong, try again.";
        },
      });
    } catch (error) {
      dispatch(setLoading(false));
    }
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
        open={openDelete}
        TransitionComponent={Transition}
        onClose={() => setOpenDelete(true)}
        aria-describedby="alert-dialog-slide-descriptio"
      >
        <DialogTitle>{"Delete Company"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Are you sure you want to delete ${selected?.row?.name}\ from database? 
            Proceed if you are very sure you want to delete this company`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button key={"9302h"} onClick={deleteCompany}>Yes, proceed</Button>
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
              color="#fff"
            >
              {`${selected?.row?.name}'s Company Summary`}
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

      <Dialog
        fullScreen
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#18113c", color: "white" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenEdit(false)}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, textTransform: "capitalize" }}
              variant="h6"
              component="div"
            >
              {`Update ${selected?.row?.name}'s Company Information`}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => setOpenEdit(false)}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <EditCompany setOpen={setOpenEdit} selected={selected} />
      </Dialog>
    </>
  );
};

// Typechecking props for the ActionButton
ActionButton.propTypes = {
  selected: PropTypes.object,
};

export default ActionButton;
