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

export default function CompaniesTable() {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 144,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.name}</p>
      ),
    },
    {
      field: "emailAddress",
      headerName: "Email",
      width: 170,
      renderCell: (params) => <p style={{ fontSize: 14 }}>{params?.row?.emailAddress}</p>,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 125,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.phone}</p>
      ),
    },
    {
      field: "website",
      headerName: "Website",
      width: 170,
      renderCell: (params) => <p style={{ fontSize: 14 }}>{params?.row?.website}</p>,
    },
    {
      field: "contactPerson",
      headerName: "Company Rep",
      width: 145,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.contactPerson?.name}
        </p>
      ),
    },
    {
      field: "contactPersonPhone",
      headerName: "Rep's Phone",
      width: 125,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.contactPerson?.phone}
        </p>
      ),
    },
    {
      field: "domain",
      headerName: "Email Domain",
      width: 125,
      renderCell: (params) => (
        <p style={{  fontSize: 14 }}>{`@${params?.row?.domain}`}</p>
      ),
    },
    {
      field: "id",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => {
        return <ActionButton selected={params} />;
      },
    },
  ];

  const { companies } = useSelector((state) => state.company);

  return (
    <div style={{ height: 512, width: "100%" }}>
      {companies && companies?.docs && (
        <DataGrid
          sx={{ padding: 1 }}
          rows={companies?.docs}
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
