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
import { styled } from "@mui/material/styles";

export default styled("div")(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { size } = ownerState;

  const { dark } = palette;
  const { pxToRem } = functions;

  return {
    lineHeight: 0,
    padding: size === "small" ? `${pxToRem(4)} ${pxToRem(10)}` : `${pxToRem(8)} ${pxToRem(10)}`,
    width: pxToRem(39),
    height: "100%",
    color: dark.main,
  };
});
