import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import { Grid } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import {useMediaQuery} from "react-responsive"


function StakeholderPage(props) {
    const smallScreen = useMediaQuery({ maxWidth: 2800 });
    return (
        <div id="stakeholderpage">
            <Box mb={"1%"}>
              <Button variant="contained" onClick={() => props.userAction(4)}>Go back</Button>
            </Box>
            <Typography variant="h4" color="inherit">Welcome {props.stakeholderName}!</Typography>
            <Typography variant="h6" color="inhert" paddingTop="20px">Your current role is: {props.stakeholderRole + " (" + props.stakeholderCountry + ")"}</Typography>
            <Typography variant="h6" paddingTop="25px">Choose your action:</Typography>
            <Box mt={"3%"} mb={"1%"}>
            <ButtonGroup variant="outlined">
              <Button variant="outlined" size="large" onClick={() => props.stakeholderAction(1)}>Add a new Product</Button>
              <Button variant="outlined" size="large" onClick={() => props.stakeholderAction(2)}>Confirm an existing product</Button>
              <Button variant="outlined" size="large" onClick={() => props.stakeholderAction(3)}>Unconfirm an existing product</Button>
            </ButtonGroup>
            </Box>
            <Typography variant="h4" color="inherit">List of your Products</Typography>
            <Grid container xs={smallScreen ? 12 : 9} spacing={3} direction="row" alignItems="top" justify="center" style={{ minHeight: '100vh'}} mt={"1%"}>
                {props.myConfirmationList}
            </Grid>
          </div>
    )
}

export default StakeholderPage;