import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";


function LoginPage(props) {
    return (
        <div id="login">
          <Typography variant="h4" color="inherit">Login with MetaMask to Start</Typography>
          <Box mt={"2%"} mb ={"2%"}>
            <Button variant="contained" size="large" onClick={() => props.connectAccount(false)}>MetaMask Login Rinkeby</Button>
            {props.error && (
              <Typography marginTop="20px" variant="subtitle1">There was an error. Please try again.</Typography>
            )}
          </Box>
          <Box mt={"1%"} mb ={"4%"}>
            <Button variant="contained" size="large" onClick={() => props.connectAccount(true)}>MetaMask Login Bloxberg</Button>
            {props.error && (
              <Typography marginTop="20px" variant="subtitle1">There was an error. Please try again.</Typography>
            )}
          </Box>
          <Typography variant="h4" marginBottom="2%" color="inherit">Are you new? FairProfit Explained:</Typography>
          <iframe width="90%" height="750" src="https://www.youtube.com/embed/l4FB_Q2TVBo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    )
}

export default LoginPage
