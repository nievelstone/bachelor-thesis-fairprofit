import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import { ButtonGroup } from '@mui/material';


function UnverifiedPage(props) {
    return (
        <div className="unverifiedstakeholder">
            <Typography variant="h4" color="inherit">You are not verified yet.</Typography>
            <Typography variant="h6" paddingTop="25px">It seems like you tried to login as a Supply Chain Stakeholder, but are not verified by the Certification Organization, yet.</Typography>
            <Typography variant="h6">Please try to get in contat with them. </Typography>
        </div>
    )
}

export default UnverifiedPage;
