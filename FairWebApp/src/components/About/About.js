import React from 'react'
import { Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';

function About() {
    return (
        <>
            <Navbar></Navbar>
            <div className="main">
                <Typography variant="h3">About FairProfit</Typography>
                <hr></hr>
                <Typography variant="h5">We are making fair profit distributions trustless and verifiable</Typography>
                <hr></hr>
                <Typography variant="h6">FairProfit is a project in context of the Bachelor thesis <i>Blockchain-based payment to enable Fair Profit Distribution</i> by Sascha Nievelstein in cooperation with the Frauenhofer FIT.</Typography>
                <br/>
            </div>
        </>
    )
}

export default About