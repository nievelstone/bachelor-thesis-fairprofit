import React from 'react'
import { Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

const constants = require("../../helpers/Constants");

function Home() {
    return (
        <>
            <Navbar></Navbar>
            <div className="main">
                <Typography variant="h3">Welcome to FairProfit</Typography>
                <hr></hr>
                <Typography variant="h5">We are making fair profit distributions trustless and verifiable</Typography>
                <hr></hr>
                <Typography variant="h4">How does it work? Q&A:</Typography>
                <br/>
                <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 240, flexGrow: 1, maxWidth: "90%"}}
                >
                <TreeItem nodeId="1" label="What is the use case of FairProfit?">
                    <TreeItem nodeId="2" label={constants.usecase} />
                </TreeItem>
                <TreeItem nodeId="3" label="Who are the customers?">
                    <TreeItem nodeId="4" label={constants.customer} />
                </TreeItem>
                <TreeItem nodeId="5" label="Who are the stakeholders?">
                    <TreeItem nodeId="6" label={constants.stakeholder} />
                </TreeItem>
                <TreeItem nodeId="7" label="What is the certification organization?">
                    <TreeItem nodeId="8" label={constants.certorg} />
                </TreeItem>
                <TreeItem nodeId="9" label="What is the fair price?">
                    <TreeItem nodeId="10" label={constants.fairprice} />
                </TreeItem>
                </TreeView>
                <Typography variant="h4" marginBottom="2%" color="inherit">Are you new? FairProfit Explained:</Typography>
          <iframe width="90%" height="750" src="https://www.youtube.com/embed/l4FB_Q2TVBo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </>
    )
}

export default Home