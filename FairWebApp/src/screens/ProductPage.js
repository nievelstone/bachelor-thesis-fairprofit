import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";
import { Grid } from '@mui/material';
import ProductCard from '../components/ProductCard/ProductCard';
import { Link } from '@mui/material';
import { CircularProgress } from '@mui/material';
import Chart from 'react-apexcharts';
import {useMediaQuery} from "react-responsive"


function ProductPage(props) {
    const {useState} = React;
    const smallScreen = useMediaQuery({ maxWidth: 800 });

    function getChartArray(){
      var res = [];
      for(var i=0;i<props.participantsNames.length;i++){
        res.push(props.participantsNames[i] + " (" + props.participantsRoles[i] + ")");
      }
      return res;
    }
    
    const[options, setOptions] = useState(
      {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: getChartArray(),
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    );

    const[series, setSeries] = useState(props.participantsProportions.map(Number));

    const[options2, setOptions2] = useState(
        {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
              distributed: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: getChartArray(),
          }
        }
    );

    const[options3, setOptions3] = useState({
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: getChartArray(),
      }
    });

    const[series2, setSeries2] = useState([{
      data: props.participantsProportions.map(Number)
    }]);

    return (
        <div className="productpage">
            <Box mb={"1%"}>
              <Button variant="contained" onClick={() => props.userAction(3)}>Go back</Button>
            </Box>
            <Typography variant="h4" color="inherit">Product Overview</Typography>

            <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh'}} mt={"1%"}>
              <Grid item xs={3} style={{minWidth: smallScreen ? "300px" : "600px"}}>
                <ProductCard 
                  productname={props.productName}
                  productimage={props.productCID}
                  productprice={props.productPrice} 
                  productfairprice={props.productFairPrice} 
                  participantsnames={props.participantsNames}
                  participantsroles={props.participantsRoles}
                  participantscountries={props.participantsCountries}
                  participantsproportions={props.participantsProportions}
                  productparticipants={props.productParticipants}
                  productconfirmed={props.productConfirmed}
                  buyingproduct={true}
                  action={props.action}
                  getparticipants={props.getParticipants}
                />
              </Grid>
              <Typography paddingTop="15px">
              <Link href="https://rinkeby.etherscan.io/tx/0xa14307682a92d33d5226692cebdbd9f2aff5935d2f4a5eae9e3c9a05ea34ce98" variant="body1" target="_blank" style={{display: "none"}} id="showtransaction">Show Transaction</Link>
              </Typography>
              <CircularProgress id="loadingscreen" style={{display: "none"}}/>
              <Typography id="distributiontext" style={{display: "none"}} variant="h5" color="inherit">Thanks for your fair purchase! This is the fair payment distribution: </Typography>
              <Chart id="distributionchart"  style={{display: "block", visibility:"visible"}} options={options} series={series} type="pie" width={380}/>
              <Chart style={{display: "block", visibility:"hidden"}} options={options2} series={series2} type="bar" width={350}/>
              <Chart style={{display: "block", visibility:"hidden"}} options={options3} series={series2} type="bar" width={350}/>
            </Grid>
        </div>
    )
}

export default ProductPage
