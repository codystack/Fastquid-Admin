import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, IconButton, InputAdornment, TextField, Toolbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/slices/backdrop";
import APIService from "service";
import { mutate } from "swr";
import toast from "react-hot-toast";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { setAuth } from "redux/slices/profile";
import { setProfile } from "redux/slices/profile";
import { useNavigate } from "react-router-dom";

export default function DisburseOTPForm({ setOpen, data, type }) {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const [showCode, setShowCode] = React.useState(false)
  // const {  bio } = data

  //   console.log('PROFD :: ', data)

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("OTP code is required"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      try {
        const payload = {
          otp: values.code,
        };
        const response = APIService.post("/admin/loan/verifyOtp", payload);

        toast.promise(response, {
          loading: "Loading",
          success: (res) => {
            setTimeout(async () => {
              if (type === "manual") {
                const payload = { ...data?.row, status: "credited" };

                try {
                  let response = APIService.update("/admin/loan/update", "", payload);

                  toast.promise(response, {
                    loading: "Loading",
                    success: (res) => {
                      mutate("/loan/all");
                      dispatch(setLoading(false));
                      return `${response.data?.message || "Loan successfully marked as disbursed"}`;
                    },
                    error: (err) => {
                      console.log("ERROR HERE >>> ", `${err}`);
                      dispatch(setLoading(false));
                      return (
                        err?.response?.data?.message ||
                        err?.message ||
                        "Something went wrong, try again."
                      );
                    },
                  });
                } catch (error) {
                  dispatch(setLoading(false));
                  console.log("ERROR ASYNC HERE >>> ", `${error}`);
                }
              } else {
                const payload2 = { loan: data?.row, userId: data?.row?.user?._id };
                let resp = APIService.post("/loan/disburse", payload2);

                toast.promise(resp, {
                  loading: "Loading",
                  success: (respo) => {
                    dispatch(setLoading(false));
                    mutate("/loan/all");
                    values.code = "";
                    setOpen(false);
                    return `${
                      respo.data?.message || respo?.message || "Loan credited successfully"
                    }`;
                  },
                  error: (erro) => {
                    dispatch(setLoading(false));
                    return (
                      erro?.response?.data?.message ||
                      erro?.message ||
                      "Something went wrong, try again."
                    );
                  },
                });
              }
            }, 1000);
            return `${res.data?.message || "Loan credited successfully"}`;
          },
          error: (err) => {
            console.log("ERROR HERE >>> ", `${err}`);
            dispatch(setLoading(false));
            return (
              err?.response?.data?.message || err?.message || "Something went wrong, try again."
            );
          },
        });
      } catch (error) {
        dispatch(setLoading(false));
      }
    },
  });

  const { errors, getFieldProps, handleSubmit, touched } = formik;

  return (
    <Box
      p={2}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
    >
      <Toolbar />

      <TextField
        variant="outlined"
        fullWidth
        {...getFieldProps("code")}
        label="OTP Code"
        placeholder="Enter the OTP code"
        required
        type="number"
        size="medium"
        error={Boolean(touched.code && errors.code)}
        helperText={errors.code}
      />

      <br />
      <br />
      <Button
        variant="contained"
        fullWidth
        sx={{ textTransform: "capitalize" }}
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
    </Box>
  );
}
