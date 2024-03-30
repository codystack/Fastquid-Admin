import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { setLoading } from "redux/slices/backdrop";
import SoftBox from "components/SoftBox";
import { Box, FormControl, FormHelperText, NativeSelect } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TagInput from "components/Autocomplete/tag";
import SoftButton from "components/SoftButton";
import APIService from "service";
import toast, { Toaster } from "react-hot-toast";
import QuillEditable from "components/richtext/edit_quill";
import { mutate } from "swr";
import TagInputUpdate from "components/Autocomplete/tag_update";

const UpdateTemplate = ({ data, setOpen }) => {
  const [content, setContent] = React.useState(data?.content);
  const [selectedCodes, setSelectedCodes] = React.useState(data?.shortCodes);

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
      type: data?.type,
      userType: data?.userType,
    },
    validationSchema,
    onSubmit: async values => {
      try {
        dispatch(setLoading(true));
        const payload = {
          userType: values.userType,
          content: content,
          shortCodes: selectedCodes,
        };

        console.log("DSTE ::: ", data);
        console.log("SHORT CODES ::: ", payload);

        const response = APIService.update("/admin/setting/email-template/update", data?.id, payload);
        console.log("ADD TEMPLATE RESPONSE ::: ", response);

        toast.promise(response, {
          loading: "Loading",
          success: res => {
            setLoading(false);
            dispatch(setLoading(false));
            setOpen(false)
            mutate('/admin/setting/email-template/all')
            console.log(res);
            return `Email template updated successfully!`;
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
      <FormControl fullWidth error={Boolean(touched.type && errors.type)} disabled >
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

      <TagInputUpdate setSelectedCodes={setSelectedCodes} values={selectedCodes} />

      <br />

      <Box width={"100%"} minHeight={200}>
        <p style={{ fontSize: 12 }}>Message Content</p>
        <QuillEditable
          value={content}
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

export default UpdateTemplate;
