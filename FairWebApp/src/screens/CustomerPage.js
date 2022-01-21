import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import { Grid } from '@mui/material';
import {useMediaQuery} from "react-responsive"


import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';


function CustomerPage(props) {
    const smallScreen = useMediaQuery({ maxWidth: 2800 });
    return (
        <div className="customerpage">
            <Box mb={"1%"}>
              <Button variant="contained" onClick={() => props.userAction(4)}>Go back</Button>
            </Box>
            <Typography variant="h4" color="inherit">Welcome to FairProfit.</Typography>
            <Box mt={"1%"} mb={"1%"}>
              <TextField id="productidinput" label="Product ID" variant="outlined" type="number" required/>
            </Box>
            {props.unfairProduct && (<Typography variant="body1" color="secondary">The searched product does not allow FairProfit distribution tracking.</Typography>)}
            <Box mb={"0.5%"} mt={"0.5%"}>
              <Button variant="outlined" size="large" onClick={() => props.checkProduct(-1)}>Check product</Button>
            </Box>
            <Button variant="text" size="large" onClick={() => props.setScanningQrCode(true)} startIcon={<QrCodeScannerIcon/>}>Scan QR Code</Button>
            <Box mt={"1%"}>
              <Typography variant="h4" color="inherit">List of FairProfit Products</Typography>

              <Grid container xs={smallScreen ? 12: 9} spacing={3} direction="row" alignItems="top" justify="center" style={{ minHeight: '100vh'}} mt={"1%"}>
                {props.productList}
              </Grid>
            </Box>
        </div>
    )
}

export default CustomerPage;
