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
import useSupport from "hooks/support";
import { Chip } from "@mui/material";

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

export default function SupportTable() {
  const { supports } = useSelector((state) => state.support);
  const [loading, setLoading] = React.useState(false);
  const [filteredSupports, setFilteredSupports] = React.useState(supports?.docs ?? []);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });

  const { data: supportData, mutate } = useSupport(paginationModel.page + 1);

  React.useEffect(() => {
    if (supports) {
      setFilteredSupports(supports?.docs);
    }
  }, [supports]);

  const columns = [
    {
      field: "ticketId",
      headerName: "Ticket ID",
      width: 130,
      renderCell: (params) => (
        <p style={{ fontSize: 14 }} > {params?.row?.ticketId } </p>
      ),
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 140,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }} >  {params?.row?.subject } </p>
      ),
    },
    {
      field: "message",
      headerName: "Message",
      width: 450,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }} >  {params?.row?.message } </p>
      ),
    },
    {
      field: "user",
      headerName: "Sender's Email",
      width: 175,
      renderCell: (params) => (
        <p style={{ textTransform: "lowercase", fontSize: 14 }} >  {params?.row?.user?.emailAddress } </p>
      ),
    },
    {
      field: "createAt",
      headerName: "Create On",
      width: 175,
      renderCell: (params) => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{`${new Date(
          params?.row?.createdAt
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
          color={params?.row?.status === "open" ? "success" : "info"}
        />
      ),
    },
    {
      field: "id",
      headerName: "ACTIONS",
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
      if (supportData) {
        setFilteredSupports(supportData?.docs);
      }

      if (!active) {
        return;
      }

      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [paginationModel.page, supportData]);

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      {supports && supports?.docs && filteredSupports && (
        <DataGrid
          sx={{ padding: 1 }}
          rows={filteredSupports}
          columns={columns}
          paginationMode="server"
          pageSizeOptions={[25]}
          rowCount={supports?.totalDocs}
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
