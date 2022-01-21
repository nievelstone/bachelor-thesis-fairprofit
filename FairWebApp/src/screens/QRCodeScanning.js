import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import QrReader from 'react-qr-reader'


function QRCodeScanning(props) {
    return (
        <div className="scanningqrcode">
            <Box mb={"1%"}>
              <Button variant="contained" onClick={() => props.userAction(3)}>Go back</Button>
            </Box>
            <Typography variant="h4" color="inherit">Please scan the QR Code</Typography>
            <QrReader 
              delay={300}
              onError={props.handleError}
              onScan={props.handleScan}
              style={{width: "100%"}}
              facingMode="environment"
            />
        </div>
    )
}

export default QRCodeScanning;
