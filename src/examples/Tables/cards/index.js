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
import { Download } from "@mui/icons-material";
import xlsx from "json-as-xlsx";
import { toast } from "react-hot-toast";

export default function DebitCardsTable() {

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
      width: 135,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.user?.fullName}</p>
      ),
    },
    {
      field: "emailAddress",
      headerName: "Email Address",
      width: 135,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.user?.emailAddress}
        </p>
      ),
    },
    {
      field: "card_type",
      headerName: "Card Type",
      width: 100,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.card_type}</p>
      ),
    },
    {
      field: "exp_month",
      headerName: "Exp Month",
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.exp_month}</p>
      ),
      width: 110,
    },
    {
      field: "exp_year",
      headerName: "Exp Year",
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.exp_year}</p>
      ),
      width: 110,
    },
    {
      field: "bank",
      headerName: "Bank",
      width: 125,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.bank}</p>
      ),
    },
    {
      field: "channel",
      headerName: "Channel",
      width: 100,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.channel}</p>
      ),
    },
    {
      field: "account_name",
      headerName: "Account Name",
      width: 150,
      renderCell: (params) => (
        <p
          style={{ textTransform: "capitalize", fontSize: 14 }}
        >{`${params?.row?.account_name}`}</p>
      ),
    },
    {
      field: "country_code",
      headerName: "Country",
      width: 80,
      renderCell: (params) => (
        <p
          style={{ textTransform: "capitalize", fontSize: 14 }}
        >{`${params?.row?.country_code}`}</p>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created On",
      width: 150,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${new Date(
          params?.row?.createdAt
        ).toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        })}`}</p>
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

  const { cards } = useSelector((state) => state.card);

  // let data = [
  //   {
  //     sheet: "Cards",
  //     columns: [
  //       { label: "Full Name", value: (row) => row.user?.firstName + " " + row.user?.lastName }, // Top level data
  //       { label: "Email Address", value: (row) => row.user?.emailAddress }, // Top level data
  //       { label: "Phone Number", value: (row) => row.user?.phoneNumber }, // Top level data
  //       { label: "Transaction Type", value: "type" }, // Top level data
  //       {
  //         label: "Initiated On",
  //         value: (row) =>
  //           new Date(row?.createdAt).toLocaleString("en-US", {
  //             weekday: "short",
  //             day: "numeric",
  //             month: "short",
  //             year: "numeric",
  //           }),
  //       },
  //       { label: "Channel", value: "channel" }, // Top level data
  //       { label: "Reference", value: "reference" }, // Top level data
  //       { label: "Amount", value: (row) => formatCurrency(row?.amount) }, // Top level data
  //       { label: "Currency", value: "currency" }, // Top level data
  //       {
  //         label: "Updated On",
  //         value: (row) =>
  //           new Date(row?.updatedAt).toLocaleString("en-US", {
  //             weekday: "short",
  //             day: "numeric",
  //             month: "short",
  //             year: "numeric",
  //           }),
  //       }, // Top level data
  //       { label: "Summary", value: "message" }, // Top level data
  //       { label: "Gateway Response", value: "gateway_response" }, // Top level data
  //       { label: "Transaction Status", value: "status" }, // Top level data
  //     ],
  //     content: debitCards?.docs ?? [],
  //   },
  // ];

  let settings = {
    fileName: "debitCards", // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
    RTL: false, // Display the columns from right-to-left (the default value is false)
  };

  let callback = function (sheet) {
    toast.success("Excel file downloaded successfully");
  };

  React.useEffect(() => {
    toast.success(("DEBIT CARDS ===>>> ", cards));
  })

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        {/* <Button
          startIcon={<Download />}
          onClick={() => {
            xlsx(data, settings, callback); // Will download the excel file
          }}
        >
          Excel
        </Button> */}
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ height: '80vh', width: "100%" }}>
      {cards && (
        <DataGrid
          rows={cards}
          columns={columns}
          //   autoHeight
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      )}
    </div>
  );
}
