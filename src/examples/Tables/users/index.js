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
import { Avatar, Chip } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import formatCurrency from "utils/formatCurrency";
import { fCurrency } from "utils/formatNumber";
import { fNumber } from "utils/formatNumber";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function UsersTable() {
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
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.emailAddress}</p>
      ),
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
      field: "maritalStatus",
      headerName: "Marital Status",
      renderCell: (params) => (
        <p
          style={{ textTransform: "capitalize", fontSize: 14 }}
        >{`${params?.row?.maritalStatus}`}</p>
      ),
      width: 125,
    },
    {
      field: "loanLevelAmount",
      headerName: "Loan Level",
      width: 115,
      renderCell: (params) => (
        <p
          style={{ textTransform: "capitalize", fontSize: 14 }}
        >{`${fNumber(params?.row?.loanLevelAmount)}`}</p>
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
      width: 160,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${new Date(
          params?.row?.dob
        ).toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        })}`}</p>
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

      //   width: 520,
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

  const { users } = useSelector((state) => state.user);

  return (
    <div style={{ height: 512, width: "100%" }}>
      {users && (
        <DataGrid
          rows={users?.docs}
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
