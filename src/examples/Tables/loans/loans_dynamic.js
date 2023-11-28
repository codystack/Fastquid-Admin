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
import { Avatar, Button, Chip } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import formatCurrency from "utils/formatCurrency";
import { FileDownload } from "@mui/icons-material";
import xlsx from "json-as-xlsx";
import { toast } from "react-hot-toast";



export default function DynamicLoansTable(props) {
  const { loans } = props;

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });
  const [loading, setLoading] = React.useState(false);
  const [count, setCount] = React.useState(loans?.length ?? 0);

  let data = [
    {
      sheet: "Loans",
      columns: [
        { label: "Full Name", value: (row) => row.user?.firstName + " " + row.user?.lastName }, // Top level data
        { label: "Email Address", value: (row) => row.user?.emailAddress }, // Top level data
        { label: "Phone Number", value: (row) => row.user?.phoneNumber }, // Top level data
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
      content: loans ?? [],
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
            xlsx(data, settings, callback); 
          }}
        >
          Excel
        </Button>
       
       
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
      field: "fullName",
      headerName: "Full Name",
      width: 150,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.user?.fullName}</p>
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
    },
    {
      field: "amountBorrowed",
      headerName: "Borrowed",
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${formatCurrency(
          params?.row?.amountBorrowed
        )}`}</p>
      ),
    },
    {
      field: "interestAmount",
      headerName: "Interest",
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${formatCurrency(
          params?.row?.interestAmount
        )}`}</p>
      ),
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
    {
      field: "disbursedOn",
      headerName: "Disbursed On",
      width: 150,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${params?.row?.status === "credited" ?  new Date(
          params?.row?.updatedAt
        ).toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "long",
          year: "numeric",
        }) : ""}`}</p>
      ),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 150,
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
        return <ActionButton selected={params} />;
      },
    },
  ];

  
  return (
    <div style={{ height: '80vh', width: "100%" }}>
      {loans && (
        <DataGrid
          sx={{ padding: 4 }}
          rows={loans}
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
