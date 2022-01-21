import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import { CircularProgress } from '@mui/material';


function AddStakeholder(props) {
    return (
        <div id="addstakeholder">
            <Button variant="contained" onClick={() => props.certificationAction(3)}>Go Back</Button>
            <Typography variant="h4" color="inherit" marginTop="20px">Add a new Stakeholder</Typography>
            <form onSubmit={(event) => {
              event.preventDefault();
              props.addNewStakeholder();
              }}>
            <Box mt={"2%"} mb={"1%"}>
              <TextField id="stakeholderaddress" label="Stakeholder Address" variant="outlined" required/>
              <TextField id="stakeholdername" label="Stakeholder Name" variant="outlined" required/>
              <TextField id="stakeholderrole" label="Stakeholder Role" variant="outlined" required/>
              <TextField id="stakeholdercountry" label="Stakeholder Country" variant="outlined" required/>
            </Box>
            <Button variant="outlined" size="large" type="submit">Add the new Stakeholder</Button>
            </form>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: "5px"}}>
                <CircularProgress id="loadingscreen" style={{display: "none"}}/>
            </div>
        </div>
    )
}

export default AddStakeholder;
