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
      width: 150,
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 320,
    },
    {
      field: "message",
      headerName: "Message",
      width: 500,
    },
    {
      field: "id",
      headerName: "ACTIONS",
      width: 90,
      renderCell: (params) => {
        return <ActionButton selected={params} />;
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
