import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import { CircularProgress } from '@mui/material';


function ConfirmProduct(props) {
    return (
        <div id="confirmproduct">
            <Button variant="contained" onClick={() => props.stakeholderAction(4)}>Go Back</Button>
            <Typography variant="h4" color="inherit" marginTop="20px">Confirm an existing product</Typography>
            <form onSubmit={(event) => {
              event.preventDefault();
              props.confirmTheProduct(-1);
            }}>
            <Box mt={"2%"} mb={"1%"}>
              <TextField id="confirmid" label="Product ID" variant="outlined" type="number" required/>
            </Box>
            <Button variant="outlined" size="large" type="submit">Confirm Product</Button>
            </form>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: "5px"}}>
                <CircularProgress id="loadingscreen" style={{display: "none"}}/>
            </div>
        </div>
    )
}

export default ConfirmProduct
