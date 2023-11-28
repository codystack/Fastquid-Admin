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

export default function AdminsTable() {
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
      field: "type",
      headerName: "Admin Type",
      renderCell: (params) => (
        <p
          style={{ textTransform: "capitalize", fontSize: 14 }}
        >{`${params?.row?.privilege?.type}`}</p>
      ),
      width: 110,
    },
    {
      field: "role",
      headerName: "Role",
      width: 108,
      renderCell: (params) => (
        <p
          style={{ textTransform: "capitalize", fontSize: 14 }}
        >{`${params?.row?.privilege?.role}`}</p>
      ),
    },
    {
      field: "claim",
      headerName: "Access",
      width: 100,
      renderCell: (params) => (
        <p
          style={{ textTransform: "capitalize", fontSize: 14 }}
        >{`${params?.row?.privilege?.claim}`}</p>
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
      field: "createdAt",
      headerName: "Created On",
      width: 160,
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

  const { admins } = useSelector((state) => state.admin);

  return (
    <div style={{ height: '80vh', width: "100%" }}>
      {admins && (
        <DataGrid
          rows={admins}
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
