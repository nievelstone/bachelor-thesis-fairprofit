import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import { CircularProgress } from '@mui/material';


function RemoveStakeholder(props) {
    return (
        <div id="removestakeholder">
            <Button variant="contained" onClick={() => props.certificationAction(3)}>Go Back</Button>
            <Typography variant="h4" color="inherit" marginTop="20px">Remove an old Stakeholder</Typography>
            <form onSubmit={(event) => {
              event.preventDefault();
              props.removeOldStakeholder();
            }}>
            <Box mt={"2%"} mb={"1%"}>
              <TextField id="removestakeholderaddress" label="Stakeholder Address" variant="outlined" required/>
            </Box>
            <Button variant="outlined" size="large" type="submit">Remove old Stakeholder</Button>
            </form>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: "5px"}}>
                <CircularProgress id="loadingscreen" style={{display: "none"}}/>
            </div>
        </div>
    )
}

export default RemoveStakeholder;
