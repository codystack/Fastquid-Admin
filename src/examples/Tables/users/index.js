import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import CustomNoRowsOverlay from "../../../components/no_data/custom_no_row";
import ActionButton from "./action";
import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  Divider,
  FormControl,
  NativeSelect,
  Typography,
} from "@mui/material";
import SoftTypography from "components/SoftTypography";
import formatCurrency from "utils/formatCurrency";
import { fCurrency } from "utils/formatNumber";
import { fNumber } from "utils/formatNumber";
import { useFormik } from "formik";
import { ClearAll, FileDownload } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import NumericFormatCustom from "utils/num_format";
import xlsx from "json-as-xlsx";
import { toast } from "react-hot-toast";
import { isAfter, isBefore, isEqual, parseISO } from "date-fns";
import useUsers from "hooks/users";

export default function UsersTable() {
  const { users } = useSelector((state) => state.user);

  const [loading, setLoading] = React.useState(false);
  const [rangeField, setRangeField] = React.useState("createdAt");
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(users?.totalDocs ?? 0);
  const [filteredUsers, setFilteredUsers] = React.useState(users?.docs ?? []);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });

  const { data: usersData } = useUsers(paginationModel.page + 1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    if (users) {
      setFilteredUsers(users?.docs);
    }
  }, [users]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setRangeField(e.target?.value);
  };

  let data = [
    {
      sheet: "Users",
      columns: [
        { label: "Full Name", value: (row) => row?.firstName + " " + row?.lastName }, // Top level data
        { label: "Email Address", value: (row) => row?.emailAddress }, // Top level data
        { label: "Phone Number", value: (row) => row?.phoneNumber }, // Top level data
        { label: "Gender", value: "gender" }, // Top level data
        {
          label: "Joned On",
          value: (row) =>
            new Date(row?.createdAt).toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
        },
        { label: "Marital Status", value: "maritalStatus" },
        { label: "Children", value: "children" },
        { label: "Country", value: "countryCode" },
        {
          label: "DOB",
          value: (row) =>
            new Date(row?.dob).toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
        },
        { label: "Account Status", value: "accountStatus" },
      ],
      content: users?.docs ?? [],
    },
  ];

  let settings = {
    fileName: "users", // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
    RTL: false, // Display the columns from right-to-left (the default value is false)
  };

  let callback = function (sheet) {
    toast.success("Excel file downloaded successfully");
  };

  const rangeFields = [
    { label: "Date Joined", value: "createdAt" },
    { label: "DOB", value: "dob" },
  ];

  const formik = useFormik({
    initialValues: {
      start: "",
      end: "",
    },
    onSubmit: (values) => {
      setOpen(false);
      console.log("SELECTED VAL .", rangeField);
      console.log("START VAL .", values.start);
      console.log("END VAL .", values.end);
      // console.log("CHECKER  .", new Date(values.start).toISOString());

      try {
        //Perform filtering here
        if (rangeField === "createdAt") {
          //Filter by amount borrowed
          let result = users?.docs?.filter(
            (item) =>
              (isAfter(parseISO(item?.createdAt), parseISO(values.start)) ||
                isEqual(parseISO(item?.createdAt), parseISO(values.start))) &&
              (isBefore(parseISO(item?.createdAt), parseISO(values.end)) ||
                isEqual(parseISO(item?.createdAt), parseISO(values.end)))
          );
          setFilteredUsers(result);
          setCount(result?.length);
          console.log("RESULT", result);
        }
      } catch (error) {
        setLoading(false);
        console.log("ERROR => ", error);
      }
    },
  });

  const clearFilter = () => {
    setFilteredUsers(users?.docs);
    setCount(users?.totalDocs);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button
          startIcon={<FileDownload />}
          onClick={() => {
            xlsx(data, settings, callback); // Will download the excel file
          }}
        >
          Excel
        </Button>
        <Button onClick={handleClickOpen} startIcon={<FontAwesomeIcon icon={faFilter} size="xs" />}>
          Multi - Filter
        </Button>
        {count !== users?.totalDocs && (
          <Button startIcon={<ClearAll />} onClick={clearFilter}>
            Clear
          </Button>
        )}
      </GridToolbarContainer>
    );
  }

  const columns = [
    {
      field: "user",
      headerName: "Photo",
      width: 70,
      renderCell: (params) => (
        <Avatar src={params?.row?.photoUrl} variant="circular">
          {params?.row?.user?.firstName}
        </Avatar>
      ),
    },
    {
      field: "fullName",
      headerName: "FullName",
      width: 150,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.fullName}</p>
      ),
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 80,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.gender}</p>
      ),
    },
    {
      field: "emailAddress",
      headerName: "Email",
      renderCell: (params) => <p style={{ fontSize: 14 }}>{params?.row?.emailAddress}</p>,
      width: 150,
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${params?.row?.phoneNumber}`}</p>
      ),
      width: 135,
    },
    {
      field: "createdAt",
      headerName: "Joined On",
      width: 100,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${new Date(
          params?.row?.createdAt
        ).toLocaleDateString("en-GB", {})}`}</p>
      ),
    },
    {
      field: "maritalStatus",
      headerName: "Marital Status",
      renderCell: (params) => (
        <p
          style={{ textTransform: "capitalize", fontSize: 14 }}
        >{`${params?.row?.maritalStatus}`}</p>
      ),
      width: 115,
    },
    {
      field: "children",
      headerName: "Children",
      width: 84,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${fNumber(
          params?.row?.children
        )}`}</p>
      ),
    },
    {
      field: "countryCode",
      headerName: "Country",
      width: 80,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${params?.row?.countryCode}`}</p>
      ),
    },
    {
      field: "dob",
      headerName: "DOB",
      width: 100,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${new Date(
          params?.row?.dob
        ).toLocaleDateString("en-GB", {})}`}</p>
      ),
    },
    {
      field: "accountStatus",
      headerName: "Account Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          size="small"
          sx={{ textTransform: "capitalize" }}
          label={params?.row?.accountStatus}
          color={
            params?.row?.accountStatus === "pending"
              ? "warning"
              : params?.row?.accountStatus === "verified"
              ? "success"
              : "error"
          }
        />
      ),
    },
    {
      field: "id",
      headerName: "Action",
      width: 90,
      renderCell: (params) => {
        return <ActionButton selected={params} />;
      },
    },
  ];

  return (
    <div style={{ height: '75vh', width: "100%" }}>
      <Dialog disablePortal={true} onClose={() => setOpen(false)} open={open}>
        <SoftBox padding={2} component="form" role="form" onSubmit={formik.handleSubmit}>
          <SoftBox
            pb={1}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
            bgcolor={"white"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Typography fontSize={14} fontWeight={600}>
                  Select field
                </Typography>

                <NativeSelect
                  defaultValue={rangeField}
                  disableUnderline
                  onChange={handleChange}
                  required
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                >
                  {rangeFields?.map((el, index) => (
                    <option key={index} value={el.value}>
                      {el.label}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Box>
            <Divider light />
            <Box
              px={1}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              <Box
                width={280}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>
                  <Typography fontSize={14} fontWeight={600}>
                    From
                  </Typography>
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"start"}
                    alignItems={"center"}
                  >
                    <SoftInput
                      size="small"
                      id="start"
                      name="start"
                      required
                      type="date"
                      value={formik.values.start}
                      placeholder="Start"
                      onChange={formik.handleChange}
                    />

                    <Typography px={1}>-</Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography fontSize={14} fontWeight={600}>
                    To
                  </Typography>
                  <SoftInput
                    size="small"
                    id="end"
                    name="end"
                    required
                    type="date"
                    value={formik.values.end}
                    placeholder="End"
                    onChange={formik.handleChange}
                  />
                </Box>
              </Box>
            </Box>
          </SoftBox>

          <SoftBox
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <SoftButton
              style={{ marginRight: 4 }}
              variant="gradient"
              color="dark"
              fullWidth
              size="small"
              onClick={() => {
                console.log("CLIECKEd");
                setOpen(false);
              }}
            >
              Close
            </SoftButton>
            <SoftButton type="submit" variant="gradient" color="dark" fullWidth size="small">
              Apply filter
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </Dialog>
      {users && users?.docs && filteredUsers && (
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          paginationMode="server"
          pageSizeOptions={[25]}
          rowCount={count}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          loading={loading}
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      )}
    </div>
  );
}
