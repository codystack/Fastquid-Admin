import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { setLoading } from "redux/slices/backdrop";
import SoftBox from "components/SoftBox";
import { Box, FormControl, FormHelperText, NativeSelect } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import QuillEditor from "components/richtext/quill";
import TagInput from "components/Autocomplete/tag";
import SoftButton from "components/SoftButton";
import APIService from "service";
import toast, { Toaster } from "react-hot-toast";
import { mutate } from "swr";

const AddTemplate = ({setOpen}) => {
  const [content, setContent] = React.useState("");
  const [selectedCodes, setSelectedCodes] = React.useState([]);

  const { isLoading } = useSelector(state => state.loading);
  const dispatch = useDispatch();

  const types = [
    "signup",
    "login",
    "reset-pass",
    "request-loan",
    "approve-loan",
    "disburse-loan",
    "repay-loan",
    "decline-loan",
    "overdue-loan",
    "due-soon"
  ];

  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Template type is required!"),
    userType: Yup.string().required("User type type is required!"),
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      userType: "user",
    },
    validationSchema,
    onSubmit: async values => {
      try {
        dispatch(setLoading(true));
        const payload = {
          ...values,
          content: content,
          shortCodes: selectedCodes,
        };

        console.log("SHORT CODES ::: ", payload);

        const response = APIService.post("/admin/setting/email-template/add", payload);
        console.log("ADD TEMPLATE RESPONSE ::: ", response);

        toast.promise(response, {
          loading: "Loading",
          success: res => {
            setLoading(false);
            setOpen(false);
            dispatch(setLoading(false));
            mutate('/admin/setting/email-template/all')
            console.log(res);
            return `New email template added successfully!`;
          },
          error: err => {
            console.log("ERROR HERE >>> ", `${err}`);
            setLoading(false);
            dispatch(setLoading(false));
            return (
              err?.response?.data?.message || err?.message || "Something went wrong, try again."
            );
          },
        });
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    },
  });

  const { touched, errors, getFieldProps, handleSubmit } = formik;

  return (
    <SoftBox
      display='flex'
      flexDirection='column'
      justifyContent='start'
      component='form'
      role='form'
      onSubmit={handleSubmit}
    >
      <FormControl fullWidth error={Boolean(touched.type && errors.type)}>
        <p style={{ fontSize: 12 }}>Email Type</p>
        <NativeSelect
          disableUnderline
          variant='outlined'
          required
          fullWidth
          {...getFieldProps("type")}
          sx={{ textTransform: "capitalize" }}
          inputProps={{
            name: "type",
            id: "type",
            sx: {
              minWidth: "100%",
            },
          }}
        >
          {types?.map((el, index) => (
            <option style={{ textTransform: "uppercase" }} key={index} value={el.toLowerCase()}>
              {`${el}`.toUpperCase()}
            </option>
          ))}
        </NativeSelect>
        <FormHelperText>{errors.type}</FormHelperText>
      </FormControl>

      <br />

      {/* <FormControl fullWidth error={Boolean(touched.userType && errors.userType)}>
        <p style={{ fontSize: 12 }}>User Type</p>
        <NativeSelect
          disableUnderline
          variant='outlined'
          required
          fullWidth
          {...getFieldProps("userType")}
          sx={{ textTransform: "capitalize" }}
          inputProps={{
            name: "userType",
            id: "userType",
            sx: {
              minWidth: "100%",
            },
          }}
        >
          {["admin","user"]?.map((el, index) => (
            <option style={{ textTransform: "uppercase" }} key={index} value={el.toLowerCase()}>
              {`${el}`.toUpperCase()}
            </option>
          ))}
        </NativeSelect>
        <FormHelperText>{errors.type}</FormHelperText>
      </FormControl>

      <br /> */}

      <TagInput setSelectedCodes={setSelectedCodes} />

      <br />

      <Box width={"100%"} minHeight={200}>
        <p style={{ fontSize: 12 }}>Email Type</p>
        <QuillEditor
          setValue={setContent}
          placeholder={"Type content here. Attach short code as #[short-code] E.g: #[AMOUNT]"}
        />
      </Box>

      <br />

      <SoftButton disabled={isLoading} type='submit' variant='gradient' color='dark' fullWidth>
        Submit
      </SoftButton>
    </SoftBox>
  );
};

export default AddTemplate;
