import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import { ButtonGroup } from '@mui/material';


function ChooseRole(props) {
    return (
        <div id="chooserole">
          <Typography variant="h4" color="inherit">Choose your role to finish login</Typography>
          <Typography variant="h6" paddingTop="25px">Your wallet address is: {props.shortenAddress(props.pubKey)}</Typography>
          <Box mt={"3%"} >
            <ButtonGroup variant="outlined">
              <Button variant="outlined" size="large" onClick={() => props.userAction(1)}>I am a customer</Button>
              <Button variant="outlined" size="large" onClick={() => props.userAction(2)}>I am a stakeholder</Button>
            </ButtonGroup>
          </Box>
        </div>
    )
}

export default ChooseRole;
