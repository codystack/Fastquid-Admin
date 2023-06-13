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

export default function DynamicLoansTable(props) {
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
    {
      field: "disbursedOn",
      headerName: "Disbursed On",
      width: 150,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${new Date(
          params?.row?.disbursedOn
        ).toLocaleString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`}</p>
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

  const { loans } = props;

  return (
    <div style={{ height: 600, width: "100%" }}>
      {loans && (
        <DataGrid
          sx={{ padding: 4 }}
          rows={loans}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      )}
    </div>
  );
}
