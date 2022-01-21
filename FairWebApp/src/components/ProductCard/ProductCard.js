import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Typography } from '@mui/material';
import Button from "@mui/material/Button";
import {RadialChart} from "react-vis";
import {useMediaQuery} from "react-responsive"

export default function ProductCard(props) {
    const {useState} = React;
    const smallScreen = useMediaQuery({ maxWidth: 800 });

    function getDistributionData(){
      var res = [];
    }


    const[myData, setMyData] = useState([{angle: props.productprice - props.productfairprice}, {angle: props.productfairprice}]);

    return (
        <>
            <Card sx={{ maxWidth: smallScreen ? 750 : 500, marginTop: 0, marginBottom: 0, paddingBottom: 0, paddingTop: 0}}>
              <CardActionArea onClick={props.buyingproduct ? props.productconfirmed ? props.myid == undefined  ? () => {} : () => props.action(props.myid) : () => {} : () => props.action(props.myid)}>
                <CardMedia
                  component="img"
                  height="320"
                  image={"https://ipfs.io/ipfs/" + props.productimage}
                  alt="Missing image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {props.productname} {/*Make list of information, show the price in a nice way, allow for more buttons etc*/}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" align="left">
                    <b>Product Price: </b> {props.productprice/100 + " €"}
                    <br/>
                    <b>Fair Transparent Price: </b> {props.productfairprice/100 + " €"}
                    <br/>
                    <b>Producers and Distribution: </b> 
                    {props.getparticipants(props.participantsnames, props.participantsroles, props.participantscountries, props.participantsproportions , props.productparticipants)}
                  </Typography>
                </CardContent>
                </CardActionArea>
                {props.buyingproduct ? 
                <CardActions>
                  {props.productconfirmed ? <Button size="large" onClick={props.myid == undefined  ? props.action : () => props.action(props.myid)}style={{marginRight: "40%"}}>Buy Product</Button> : <Typography>This product is not confirmed</Typography>}
                  <RadialChart
                    colorRange={["#2E8B57", "#880808"]}
                    data={myData}
                    width={100}
                    height={100} />
                </CardActions> :
                <CardActions>
                  {<Button size="large" onClick={() => props.action(props.myid)}>{props.productconfirmed ? "Unconfirm Product" : "Confirm Product"}</Button>}
                </CardActions>
              }
            </Card>
        </>
    )
}