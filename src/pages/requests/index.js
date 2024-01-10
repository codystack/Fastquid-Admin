import Card from "@mui/material/Card";

import { Box } from "@mui/system";
import RequestsTable from "examples/Tables/requests";

function Requests() {
  return (
      <Box p={3}>
        <Card>
          <RequestsTable />
        </Card>
      </Box>
  );
}

export default Requests;
