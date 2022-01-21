import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import { ButtonGroup } from '@mui/material';


function CertificationPage(props) {
    return (
        <div id="certificationrole">
            <Typography variant="h4" color="inherit">Welcome Certification Organization</Typography>
            <Typography variant="h6" paddingTop="25px">Choose your action:</Typography>
            <Box mt={"3%"} >
            <ButtonGroup variant="outlined">
              <Button variant="outlined" size="large" onClick={() =>props.certificationAction(1)}>Add a new Stakeholder</Button>
              <Button variant="outlined" size="large" onClick={() =>props.certificationAction(2)}>Remove an old Stakeholder</Button>
            </ButtonGroup>
            </Box>
        </div>
    )
}

export default CertificationPage;
