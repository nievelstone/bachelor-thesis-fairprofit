import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import { CircularProgress } from '@mui/material';


function AddingNewProduct(props) {
    return (
        <div id="certificationrole" style={{alignContent: "center"}}>
            <Button variant="contained" onClick={() => props.stakeholderAction(4)}>Go Back</Button>
            <Typography variant="h4" color="inherit" marginTop="20px">Add a new Product</Typography>
            <form onSubmit={(event) => {
              event.preventDefault();
              props.addNewProduct();
            }}>
            <Box mt={"2%"} mb={"1%"}>
              <TextField id="productname" label="Name" variant="outlined" required/>
              <TextField id="productprice" label="Price" variant="outlined" type="number" required/>
              <TextField id="productfairprice" label="Fair Price Amount" variant="outlined" type="number" required/>
              <TextField id="productcid" label="CID" variant="outlined" type="text" required/>
            </Box>
            <div id="inputfields">
            <Box mb={"1%"} id="box1" style={{display: "block"}}>
              <Typography variant="body1" color="primary" marginTop="20px" marginBottom="15px">First stakeholder in supply chain:</Typography>
              <TextField id="stakeholder1" label="Participating Address" variant="outlined" required/>
              <TextField id="stakeholderprice1" label="Fair Proportion" variant="outlined" type="number" required/>
            </Box>
            <Box mb={"1%"} id="box2" style={{display: "none"}}>
            <Typography variant="body1" color="primary" marginTop="20px" marginBottom="15px">Second stakeholder in supply chain:</Typography>
              <TextField id="stakeholder2" label="Participating Address" variant="outlined"/>
              <TextField id="stakeholderprice2" label="Fair Proportion" variant="outlined" type="number"/>
            </Box>
            <Box mb={"1%"} id="box3" style={{display: "none"}}>
            <Typography variant="body1" color="primary" marginTop="20px" marginBottom="15px">Third stakeholder in supply chain:</Typography>
              <TextField id="stakeholder3" label="Participating Address" variant="outlined"/>
              <TextField id="stakeholderprice3" label="Fair Proportion" variant="outlined" type="number"/>
            </Box>
            <Box mb={"1%"} id="box4" style={{display: "none"}}>
            <Typography variant="body1" color="primary" marginTop="20px" marginBottom="15px">Fourth stakeholder in supply chain:</Typography>
              <TextField id="stakeholder4" label="Participating Address" variant="outlined"/>
              <TextField id="stakeholderprice4" label="Fair Proportion" variant="outlined" type="number"/>
            </Box>
            <Box mb={"1%"} id="box5" style={{display: "none"}}>
            <Typography variant="body1" color="primary" marginTop="20px" marginBottom="15px">Fifth stakeholder in supply chain:</Typography>
              <TextField id="stakeholder5" label="Participating Address" variant="outlined"/>
              <TextField id="stakeholderprice5" label="Fair Proportion" variant="outlined" type="number"/>
            </Box>
            </div>
            <Box mb={"2%"}>
              <Button variant="text" size="large" onClick={props.moreStakeholderInput}>+ Add more Stakeholders +</Button>
            </Box>
            <Button variant="outlined" size="large" type="submit">Add the new Product</Button>
            </form>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: "5px"}}>
                <CircularProgress id="loadingscreen" style={{display: "none"}}/>
            </div>
        </div>
    )
}

export default AddingNewProduct
