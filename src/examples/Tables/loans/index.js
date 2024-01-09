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
  InputLabel,
  NativeSelect,
  Popover,
  Typography,
} from "@mui/material";
import SoftTypography from "components/SoftTypography";
import formatCurrency from "utils/formatCurrency";
import { ClearAll, Download, Edit, FileDownload, FileDownloadOff } from "@mui/icons-material";
import xlsx from "json-as-xlsx";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import SoftInput from "components/SoftInput";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import { useFormik } from "formik";
import NumericFormatCustom from "utils/num_format";
import useLoan from "hooks/loans";

export default function LoansTable() {
  const { loans, } = useSelector((state) => state.loan);
  const [loading, setLoading] = React.useState(false);
  const [rangeField, setRangeField] = React.useState("amountBorrowed");
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(loans?.totalDocs ?? 0);
  const [filteredLoans, setFilteredLoans] = React.useState(loans?.docs ?? []);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });

  const { data: loanData, mutate } = useLoan(paginationModel.page + 1);

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  const handleClickOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    if (loans) {
      setFilteredLoans(loans?.docs);
    }
  }, [loans]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setRangeField(e.target?.value);
  };

  let data = [
    {
      sheet: "Loans",
      columns: [
        { label: "Full Name", value: (row) => row.user?.firstName + " " + row.user?.lastName }, // Top level data
        { label: "Email Address", value: (row) => row.user?.emailAddress }, // Top level data
        { label: "Phone Number", value: (row) => row.user?.phoneNumber }, // Top level data
        { label: "Company", value: "company" }, // Top level data
        { label: "Salary", value: (row) => formatCurrency(row?.salary ?? 0) }, // Top level data
        { label: "Loan Type", value: "type" }, // Top level data
        {
          label: "Initiated On",
          value: (row) =>
            new Date(row?.createdAt).toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
        },
        { label: "Loan Duration", value: "duration" }, // Top level data
        { label: "Loan Amount", value: (row) => formatCurrency(row?.amountBorrowed) }, // Top level data
        { label: "Interest", value: (row) => formatCurrency(row?.interestAmount) }, // Top level data
        { label: "Repayment Amount", value: (row) => formatCurrency(row?.totalAmountDue) }, // Top level data
        {
          label: "Disbursed On",
          value: (row) =>
            new Date(row?.disbursedOn).toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
        }, // Top level data
        {
          label: "Due Date",
          value: (row) =>
            new Date(row?.dueDate).toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
        }, // Top level data
        { label: "Loan Status", value: "status" }, // Top level data
      ],
      content: loans?.docs ?? [],
    },
  ];

  let settings = {
    fileName: "loans", // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
    RTL: false, // Display the columns from right-to-left (the default value is false)
  };

  let callback = function (sheet) {
    toast.success("Excel file downloaded successfully");
  };

  const rangeFields = [
    { label: "Amount Borrowed", value: "amountBorrowed" },
    { label: "Due Date", value: "dueDate" },
    { label: "Disbursement Date", value: "disbursedOn" },
    { label: "Initiation Date", value: "createdAt" },
  ];

  const formik = useFormik({
    initialValues: {
      start: "",
      end: "",
    },
    onSubmit: (values) => {
      setOpen(false);
      try {
        //Perform filtering here
        if (rangeField === "amountBorrowed") {
          //Filter by amount borrowed
          let result = loans?.docs.filter(
            (item) => item?.amountBorrowed >= values.start && item?.amountBorrowed <= values.end
          );
          setFilteredLoans(result);
          setCount(result?.length);
        } else if (rangeField === "dueDate") {
          //Filter by amount borrowed
          let result = loans?.docs.filter(
            (item) =>
              (isAfter(parseISO(item?.dueDate), parseISO(values.start)) ||
                isEqual(parseISO(item?.dueDate), parseISO(values.start))) &&
              (isBefore(parseISO(item?.dueDate), parseISO(values.end)) ||
                isEqual(parseISO(item?.dueDate), parseISO(values.end)))
          );
          setFilteredLoans(result);
          setCount(result?.length);
        } else if (rangeField === "disbursedOn") {
          //Filter by amount borrowed
          let result = loans?.docs.filter(
            (item) =>
              (isAfter(parseISO(item?.disbursedOn), parseISO(values.start)) ||
                isEqual(parseISO(item?.disbursedOn), parseISO(values.start))) &&
              (isBefore(parseISO(item?.disbursedOn), parseISO(values.end)) ||
                isEqual(parseISO(item?.disbursedOn), parseISO(values.end)))
          );
          setFilteredLoans(result);
          setCount(result?.length);
        } else {
          //Filter by amount borrowed
          let result = loans?.docs.filter(
            (item) =>
              (isAfter(parseISO(item?.createdAt), parseISO(values.start)) ||
                isEqual(parseISO(item?.createdAt), parseISO(values.start))) &&
              (isBefore(parseISO(item?.createdAt), parseISO(values.end)) ||
                isEqual(parseISO(item?.createdAt), parseISO(values.end)))
          );
          setFilteredLoans(result);
          setCount(result?.length);
        }
      } catch (error) {
        setLoading(false);
        console.log("ERROR => ", error);
      }
    },
  });

  const clearFilter = () => {
    setFilteredUsers(loans?.docs);
    setCount(loans?.totalDocs);
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
        {count !== loans?.totalDocs && (
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
        <Avatar src={params?.row?.user?.photoUrl} variant="circular">
          {params?.row?.user?.firstName}
        </Avatar>
      ),
    },
    {
      field: "name",
      headerName: "Full Name",
      width: 150,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.user?.fullName}</p>
      ),
    },
    {
      field: "debitCard",
      headerName: "Has Card",
      width: 84,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.user?.debitCard ? "true" : "false"}
        </p>
      ),
    },
    {
      field: "type",
      headerName: "Loan Type",
      width: 125,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.type}</p>
      ),
    },
    {
      field: "duration",
      headerName: "Duration",
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.duration}</p>
      ),
      //   width: 520,
    },
    {
      field: "amountBorrowed",
      headerName: "Borrowed",
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${formatCurrency(
          params?.row?.amountBorrowed
        )}`}</p>
      ),
      //   width: 520,
    },
    {
      field: "interestAmount",
      headerName: "Interest",
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${formatCurrency(
          params?.row?.interestAmount
        )}`}</p>
      ),
      //   width: 520,
    },
    {
      field: "totalAmountDue",
      headerName: "Amount Due",
      width: 115,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${formatCurrency(
          params?.row?.totalAmountDue
        )}`}</p>
      ),
    },
    // {
    //   field: "disbursedOn",
    //   headerName: "Disbursed On",
    //   width: 150,
    //   renderCell: (params) => (
    //     <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${new Date(
    //       params?.row?.disbursedOn
    //     ).toLocaleString("en-US", {
    //       weekday: "short",
    //       day: "numeric",
    //       month: "short",
    //       year: "numeric",
    //     })}`}</p>
    //   ),
    // },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 175,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${new Date(
          params?.row?.dueDate
        ).toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`}</p>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 108,
      renderCell: (params) => (
        <Chip
          size="small"
          sx={{ textTransform: "capitalize" }}
          label={params?.row?.status}
          color={
            params?.row?.status === "pending"
              ? "warning"
              : params?.row?.status === "approved" || params?.row?.status === "settled"
              ? "success"
              : params?.row?.status === "credited"
              ? "info"
              : "error"
          }
        />
      ),

      //   width: 520,
    },
    {
      field: "id",
      headerName: "Actions",
      width: 90,
      renderCell: (params) => {
        return <ActionButton selected={params} mutate={mutate} />;
      },
    },
  ];

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      // const newData = await loadServerRows(paginationModel.page, data);
      if (loanData) {
        // console.log("SECOND PAGE DATA", requestData);
        setFilteredLoans(loanData?.docs);
      }

      if (!active) {
        return;
      }

      // setFilteredRequests(data)
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [paginationModel.page, loanData]);

  return (
    <div style={{ height: '80vh', width: "100%" }}>
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
                width={256}
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
                    {rangeField === "amountBorrowed" ? (
                      <SoftInput
                        size="small"
                        id="start"
                        name="start"
                        required
                        type="number"
                        value={formik.values.start}
                        placeholder="Start"
                        onChange={formik.handleChange}
                        inputProps={{
                          inputComponent: NumericFormatCustom,
                        }}
                      />
                    ) : (
                      <SoftInput
                        size="small"
                        id="start"
                        name="start"
                        required
                        value={formik.values.start}
                        placeholder="Start"
                        onChange={formik.handleChange}
                      />
                    )}

                    <Typography px={1}>-</Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography fontSize={14} fontWeight={600}>
                    To
                  </Typography>
                  {rangeField === "amountBorrowed" ? (
                    <SoftInput
                      size="small"
                      id="end"
                      name="end"
                      required
                      type="number"
                      value={formik.values.end}
                      placeholder="End"
                      onChange={formik.handleChange}
                      inputProps={{
                        inputComponent: NumericFormatCustom,
                      }}
                    />
                  ) : (
                    <SoftInput
                      size="small"
                      id="end"
                      name="end"
                      required
                      value={formik.values.end}
                      placeholder="End"
                      onChange={formik.handleChange}
                    />
                  )}
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
      {loans && loans?.docs && filteredLoans && (
        <DataGrid
          sx={{ padding: 1 }}
          rows={filteredLoans}
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
