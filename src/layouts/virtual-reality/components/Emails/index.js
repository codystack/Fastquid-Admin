/**
=========================================================
* FastQuid Admin Dashboard React - v1.0.1
=========================================================

*  
* Copyright 2023 FastQuid. All Rights Reserved

Coded by Stanley Nyekpeye (stanleynyekpeye@gmail.com)

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function Emails() {
  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" p={3} lineHeight={1}>
        <SoftTypography variant="body2" color="text">
          Emails (21)
        </SoftTypography>
        <Tooltip title="Check your emails" placement="top">
          <SoftBox component="a" href="#">
            <SoftTypography variant="body2">Check</SoftTypography>
          </SoftBox>
        </Tooltip>
      </SoftBox>
    </Card>
  );
}

export default Emails;
