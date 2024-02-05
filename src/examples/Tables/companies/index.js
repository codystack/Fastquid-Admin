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
import useCompany from "hooks/useCompany";
import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import xlsx from "json-as-xlsx";
import { toast } from "react-hot-toast";

export default function CompaniesTable () {
  const { companies } = useSelector(state => state.company);
  const [loading, setLoading] = React.useState(false);
  const [filteredCompanies, setFilteredCompanies] = React.useState(companies?.docs ?? []);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 25,
  });

  const { data: companyData, mutate } = useCompany(paginationModel.page + 1);

  let data = [
    {
      sheet: "Companies",
      columns: [
        { label: "Company Name", value: row => row?.name }, // Top level data
        { label: "Email Address", value: row => row?.emailAddress }, // Top level data
        { label: "Phone Number", value: row => row?.phone }, // Top level data
        { label: "Company Website", value: row => row?.website }, // Top level data
        { label: "Contact Person", value: row => row?.contactPerson?.name }, // Top level data
        { label: "Contact Person No", value: row => row?.contactPerson?.phone }, // Top level data
        { label: "Account Manager", value: row => row?.accountManager?.fullName }, // Top level data
        { label: "Email Domain", value: row => row?.domain }, // Top level data
        {
          label: "Initiated On",
          value: row =>
            new Date(row?.createdAt).toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
        },
        {
          label: "Updated On",
          value: row =>
            new Date(row?.updatedAt).toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
        }, // Top level data
      ],
      content: companies?.docs ?? [],
    },
  ];

  let settings = {
    fileName: "company_records", // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
    RTL: false, // Display the columns from right-to-left (the default value is false)
  };

  let callback = function (sheet) {
    toast.success("Excel file downloaded successfully");
  };

  function CustomToolbar () {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button
          startIcon={<Download />}
          onClick={() => {
            xlsx(data, settings, callback); // Will download the excel file
          }}
        >
          Excel
        </Button>
      </GridToolbarContainer>
    );
  }

  React.useEffect(() => {
    if (companies) {
      setFilteredCompanies(companies?.docs);
    }
  }, [companies]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 125,
      renderCell: params => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.name}</p>
      ),
    },
    {
      field: "emailAddress",
      headerName: "Email",
      width: 170,
      renderCell: params => <p style={{ fontSize: 14 }}>{params?.row?.emailAddress}</p>,
    },
    {
      field: "phone",
      headerName: "Phone No",
      width: 135,
      renderCell: params => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>{params?.row?.phone}</p>
      ),
    },
    {
      field: "website",
      headerName: "Website",
      width: 200,
      renderCell: params => <p style={{ fontSize: 14 }}>{params?.row?.website}</p>,
    },
    {
      field: "contactPerson",
      headerName: "Company Rep",
      width: 150,
      renderCell: params => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.contactPerson?.name}
        </p>
      ),
    },
    {
      field: "contactPersonPhone",
      headerName: "Rep's Phone",
      width: 125,
      renderCell: params => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.contactPerson?.phone}
        </p>
      ),
    },
    {
      field: "accountManager",
      headerName: "Account Manager",
      width: 175,
      renderCell: params => (
        <p style={{ textTransform: "capitalize", fontSize: 14 }}>
          {params?.row?.accountManager?.fullName ?? ""}
        </p>
      ),
    },
    {
      field: "domain",
      headerName: "Email Domain",
      width: 150,
      renderCell: params => <p style={{ fontSize: 14 }}>{`@${params?.row?.domain}`}</p>,
    },
    {
      field: "id",
      headerName: "Actions",
      width: 80,
      renderCell: params => {
        return <ActionButton selected={params} />;
      },
    },
  ];

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      if (companyData) {
        setFilteredCompanies(companyData?.docs);
      }

      if (!active) {
        return;
      }

      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [paginationModel.page, companyData]);

  return (
    <div style={{ height: "75vh", width: "100%" }}>
      {companies && companies?.docs && filteredCompanies && (
        <DataGrid
          sx={{ padding: 1 }}
          rows={filteredCompanies}
          columns={columns}
          paginationMode='server'
          pageSizeOptions={[25]}
          rowCount={companies?.totalDocs}
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
