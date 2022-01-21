import './App.css';
import React, {useEffect, Component} from 'react';
import Navbar from "./components/Navbar/Navbar";
import "@fontsource/roboto";
import { Grid } from '@mui/material';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import Web3 from "web3";
import {TEST_ABI, TEST_ADDRESS, BLOXBERG_ADDRESS} from "./metamask/config";
import { getCurContract } from './metamask/Verification';

import ProductCard from './components/ProductCard/ProductCard';

import { metamaskPermission, shortenAddress, hasStakeholderConfirmed, startLoading, stopLoading } from './helpers/Helpers';
import ProductPage from './screens/ProductPage';
import StakeholderPage from './screens/StakeholderPage';
import AddingNewProduct from './screens/AddingNewProduct';
import ConfirmProduct from './screens/ConfirmProduct';
import UnconfirmProduct from './screens/UnconfirmProduct';
import AddStakeholder from './screens/AddStakeholder';
import RemoveStakeholder from './screens/RemoveStakeholder';
import LoginPage from './screens/LoginPage';
import ChooseRole from './screens/ChooseRole';
import CertificationPage from './screens/CertificationPage';
import CustomerPage from './screens/CustomerPage';
import QRCodeScanning from './screens/QRCodeScanning';
import UnverifiedPage from './screens/UnverifiedPage';

const BLOXBERG_CHAIN_ID = "0x2323";
const RINKEBY_CHAIN_ID = "0x4";

function App() {
  const {useState} = React;

  const[pubKey, setPubKey] = useState("");
  const[error, setError] = useState(false);

  const[isBloxberg, setIsBloxberg] = useState(false);

  const[isConnected, setIsConnected] = useState(false);
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const[isCustomer, setIsCustomer] = useState(false);
  const[isStakeholder, setIsStakeholder] = useState(false);
  const[isUnverified, setIsUnverified] = useState(false);
  const[isCertification, setIsCertification] = useState(false);

  const[addStakeholder, setAddStakeholder] = useState(false);
  const[removeStakeholder, setRemoveStakeholder] = useState(false);
  const[stakeholderName, setStakeholderName] = useState("");
  const[stakeholderRole, setStakeholderRole] = useState("");
  const[stakeholderCountry, setStakeholderCountry] = useState("");

  const[addProduct, setAddProduct] = useState(false);
  const[confirmProduct, setConfirmProduct] = useState(false);
  const[unconfirmProduct, setUnconfirmProduct] = useState(false);
  const[myConfirmationList, setMyConfirmationList] = useState(
    <Grid item xs={12} md={3}>
      <ProductCard
        productname={"You have no products"}
        productimage={"QmYUpJ6Yv8mbDWD8qUsa4vmqjedBA8X6y1zo1BMJC9Fnhw"}
        productprice={0}
        productfairprice={0} 
        participantsnames={["NaN"]}
        participantsroles={["NaN"]}
        participantscountries={["NaN"]}
        participantsproportions={[0]}
        productparticipants={1}
        productconfirmed={false}
        buyingproduct={true}
        action={null}
        getparticipants={() => "NaN"}
      />
  </Grid>
  );

  const[stakeholderRows, setStakeholderRows] = useState(2);

  const[buyScreen, setBuyScreen] = useState(false);
  //Save product data
  const[productId, setProductId] = useState(0);
  const[productName, setProductName] = useState("");
  const[productCID, setProductCID] = useState("");
  const[productPrice, setProductPrice] = useState("");
  const[productFairPrice, setProductFairPrice] = useState(0);
  const[productParticipants, setProductParticipants] = useState(0);
  const[participantsNames, setParticipantsNames] = useState([]);
  const[participantsRoles, setParticipantsRoles] = useState([]);
  const[participantsCountries, setParticipantsCountries] = useState([]);
  const[participantsProportions, setParticipantsProportions] = useState([]);
  const[productConfirmed, setProductConfirmed] = useState(false);
  const[unfairProduct, setUnfairProduct] = useState(false);
  const[productList, setProductList] = useState(
    <Grid item xs={12} md={3}>
      <ProductCard
        productname={"loading"}
        productimage={"QmYUpJ6Yv8mbDWD8qUsa4vmqjedBA8X6y1zo1BMJC9Fnhw"}
        productprice={0} 
        productfairprice={0} 
        participantsnames={["NaN"]}
        participantsroles={["NaN"]}
        participantscountries={["NaN"]}
        participantsproportions={[0]}
        productparticipants={1}
        productconfirmed={false}
        buyingproduct={true}
        action={null}
        getparticipants={() => "NaN"}
      />
  </Grid>);

  const[qrResult, setQrResult] = useState("No result");
  const[scanningQrCode, setScanningQrCode] = useState(false);

  function handleScan(data){
    if(data){
      setQrResult(data);
      setScanningQrCode(false);
      checkProduct(data);
    }
  }

  function handleError(err){
    console.log(err);
  }

  function certificationAction(action) {
    if(action == 1){ //add a new stakeholder
      setAddStakeholder(true);
    }else if(action == 2){ //remove an old stakeholder
      setRemoveStakeholder(true);
    }else{ //choose new
      setAddStakeholder(false);
      setRemoveStakeholder(false);
    }
  }

  async function userAction(action){
    if(action == 1){
      setIsCustomer(true);
      setIsLoggedIn(true);
      var content = await returnAllConfirmedProducts();
      if(content != -1){
        setProductList(content);
      }
    }else if(action == 2){
      verifyStakeholder();
    }else if(action == 3){
      setBuyScreen(false);
      setScanningQrCode(false);
    }else{
      setIsCustomer(false);
      setIsStakeholder(false);
      setIsLoggedIn(false);
    }
  }


  async function stakeholderAction(action){
    if(action == 1){
      setAddProduct(true);
    }else if(action == 2){
      setConfirmProduct(true);
    }else if(action == 3){
      setUnconfirmProduct(true);
    }else{
      setAddProduct(false);
      setUnconfirmProduct(false);
      setConfirmProduct(false);
      setStakeholderRows(2);
    }
  }

  function moreStakeholderInput(){
    if(stakeholderRows < 6){
      document.getElementById("box" + stakeholderRows).style.display = "block";
      setStakeholderRows(stakeholderRows + 1);
    }
  }

  function getParticipants(names, roles, countries, priceDistribution ,participantscounter){
    var res = [];
    for(var i=0;i<participantscounter;i++){
      res.push((
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          {i+1 + ") " + names[i]}
        </TimelineOppositeContent>
        <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>{roles[i]} | {priceDistribution[i]/100 + " €"}</TimelineContent>
      </TimelineItem>
      ))
    }
    return res;
  }

  //MetaMask Wallet interaction

  async function connectAccount(isBloxberg){
    var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    if(accounts[0] == undefined){
      setError(true);
      metamaskPermission();
    }else if((await window.ethereum.request({ method: 'eth_chainId' }) == BLOXBERG_CHAIN_ID) == isBloxberg 
    && (await window.ethereum.request({ method: 'eth_chainId' }) == RINKEBY_CHAIN_ID) == !isBloxberg){ //User has selected the right chain
      setPubKey(accounts[0]);
      setIsConnected(true);
      setIsBloxberg(isBloxberg);
      checkIfCertificationOrg(accounts[0], isBloxberg);
    }else{
      alert("Please select the right chain in your wallet before logging in!");
    }
  }

  async function checkIfCertificationOrg(userAddress, isBloxberg){
    const curContract = getCurContract(isBloxberg);
    const certificationOrganization = await curContract.methods.certificationOrganization().call();
    if(certificationOrganization == userAddress){
      setIsLoggedIn(true);
      setIsCertification(true);
    }
  }

  async function addNewStakeholder(){
    var stakeholderAddress = document.getElementById('stakeholderaddress').value;
    var stakeholderName = document.getElementById('stakeholdername').value;
    var stakeholderRole = document.getElementById('stakeholderrole').value;
    var stakeholderCountry = document.getElementById('stakeholdercountry').value;


    var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const curContract = isBloxberg ? new web3.eth.Contract(TEST_ABI, BLOXBERG_ADDRESS) : new web3.eth.Contract(TEST_ABI, TEST_ADDRESS);
    if(!web3.utils.isAddress(stakeholderAddress)){
      alert("Please enter a correct Ethereum wallet address");
    }else{
      startLoading();
      curContract.methods.addStakeholder(stakeholderAddress, stakeholderName, stakeholderRole, stakeholderCountry).send({from: pubKey})
      .then(function(response){
        document.getElementById('stakeholderaddress').value = "";
        document.getElementById('stakeholdername').value = "";
        document.getElementById('stakeholderrole').value = "";
        document.getElementById('stakeholdercountry').value = "";
        stopLoading();
        alert("Added new Stakeholder")
      })
      .catch(function(e){
        stopLoading();
        alert("An error occuerd");
      })
  }
  }

  async function removeOldStakeholder(){
    var stakeholderAddress = document.getElementById('removestakeholderaddress').value;

    var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const curContract = isBloxberg ? new web3.eth.Contract(TEST_ABI, BLOXBERG_ADDRESS) : new web3.eth.Contract(TEST_ABI, TEST_ADDRESS);
    if(!web3.utils.isAddress(stakeholderAddress)){
      alert("Please enter a correct Ethereum wallet address");
    }else{
      startLoading();
      curContract.methods.removeStakeholderAndProducts(stakeholderAddress).send({from: pubKey})
    .then(function(response){
      document.getElementById('removestakeholderaddress').value = "";
      stopLoading();
      alert("Removed Old Stakeholder");
    })
    .catch(function(e){
      stopLoading();
      alert("An error occured");
    })
    }
  }

  async function confirmTheProduct(id){
    startLoading();
    var productID;
    if(id == -1){
      productID = document.getElementById("confirmid").value;
    }else{
      productID = id;
    }

    const curContract = getCurContract(isBloxberg);
    curContract.methods.confirmProduct(productID).send({from: pubKey})
    .then(function(response){
      stopLoading();
      alert("Confirmed Product");
    })
    .catch(function(e){
      stopLoading();
      alert("An error occured.");
    })
  }

  async function unconfirmTheProduct(id){
    startLoading();
    var productID;
    if(id == -1){
      productID = document.getElementById("unconfirmid").value;
    }else{
      productID = id;
    }

    const curContract = getCurContract(isBloxberg);
    curContract.methods.unconfirmProduct(productID).send({from: pubKey})
    .then(function(response){
      stopLoading();
      alert("Unconfirmed Product");
    })
    .catch(function(e){
      stopLoading();
      alert("An error occured");
    })
  }

  async function addNewProduct(){
    var productName = document.getElementById("productname").value;
    var productPrice = document.getElementById("productprice").value;
    var productFairprice = document.getElementById("productfairprice").value;
    var productCID = document.getElementById("productcid").value;

    var participants = [];
    var fairProportions = [];
    for(var i=1;i<stakeholderRows;i++){
      participants.push(document.getElementById("stakeholder" + i).value);
      fairProportions.push(document.getElementById("stakeholderprice" + i).value);
    }

    var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    if(!web3.utils.isAddress(participants[0])){
      alert("Please enter a correct Ethereum wallet address format.");
    }else{
      startLoading();
      const curContract = isBloxberg ? new web3.eth.Contract(TEST_ABI, BLOXBERG_ADDRESS) : new web3.eth.Contract(TEST_ABI, TEST_ADDRESS);
      curContract.methods.addProduct(productName, productCID, productPrice, productFairprice, participants, fairProportions).send({from: pubKey})
      .then(function(response){
        stopLoading();
        alert("Added new Product!");
      })
      .catch(function(e){
        stopLoading();
        alert("An error occured");
      })
    }
  }

  async function checkProduct(productId){
    setUnfairProduct(false);
    var scannedId = null;
    if(productId == -1){ //Called from scanned productId function
      scannedId = document.getElementById("productidinput").value;
    }else{ //Called directly from a product
      scannedId = productId;
    }

    const curContract = getCurContract(isBloxberg);

    try{
      var res = await curContract.methods.getAllProductInfo(scannedId).call();
      var productName = res[0];
      var cid = res[1];
      var participants = res[5].length;
      var totalPrice = parseFloat(res[2]);
      var fairPrice = parseFloat(res[3]);
      var participantsNames = [];
      var participantsRoles = [];
      var participantsCountries = [];
      var participantsProportions = [];
      for(var i=0;i<participants;i++){
        participantsNames.push(res[4][0+3*i]);
        participantsRoles.push(res[4][1+3*i]);
        participantsCountries.push(res[4][2+3*i]);
        participantsProportions.push(res[5][i]);
      }
      //Save the data in application state
      setProductName(productName);
      setProductCID(cid);
      setProductPrice(totalPrice);
      setProductFairPrice(fairPrice);
      setProductParticipants(participants);
      setParticipantsNames(participantsNames);
      setParticipantsRoles(participantsRoles);
      setParticipantsCountries(participantsCountries);
      setParticipantsProportions(participantsProportions);
      setBuyScreen(true);
      setProductId(scannedId);

      if(await isProductConfirmed(scannedId)){
        setProductConfirmed(true);
      }

    } catch(e){
      setUnfairProduct(true);
    }
  }

  async function returnStakeholderProducts(){
    const curContract = getCurContract(isBloxberg);

    var myProducts = await curContract.methods.myProducts().call({from: pubKey});

    var toReturn= [];
    
    if(myProducts.length == 0){
      return -1;
    }

    for(var j=0;j<myProducts.length;j++){
      var res = await curContract.methods.getAllProductInfo(myProducts[j]).call();
      var productName = res[0];
      var cid = res[1];
      var participants = res[5].length;
      var totalPrice = parseFloat(res[2]);
      var fairPrice = parseFloat(res[3]);
      var participantsNames = [];
      var participantsRoles = [];
      var participantsCountries = [];
      var participantsProportions = [];
      var participantsConfirmations = await curContract.methods.getProductConfirmations(myProducts[j]).call();
      var participantsAddresses = await curContract.methods.getProductStakeholders(myProducts[j]).call();
      for(var i=0;i<participants;i++){
        participantsNames.push(res[4][0+3*i]);
        participantsRoles.push(res[4][1+3*i]);
        participantsCountries.push(res[4][2+3*i]);
        participantsProportions.push(res[5][i]);

      }
      var isConfirmed = await hasStakeholderConfirmed(pubKey, participantsConfirmations, participantsAddresses);
      toReturn.push((
        <>
      <Grid item xs={12} md={3}>
        <ProductCard
          productname={productName} 
          productimage={cid}
          productprice={totalPrice} 
          productfairprice={fairPrice} 
          participantsnames={participantsNames}
          participantsroles={participantsRoles}
          participantscountries={participantsCountries}
          participantsproportions={participantsProportions}
          productparticipants={participants}
          productconfirmed={isConfirmed}
          buyproduct={false}
          action={isConfirmed ? (y) => unconfirmTheProduct(y) : (y) => confirmTheProduct(y)}
          myid={myProducts[j]}
          getparticipants={getParticipants}
        />
      </Grid>
      </>
      ));
  }
  return toReturn;
    
  }

  async function returnAllConfirmedProducts(){

    const curContract = getCurContract(isBloxberg);
    var amountOfProducts = await curContract.methods.getProductAmount().call(); //Add call to smart contract here later on

    var toReturn = [];
    
    if(amountOfProducts == 0){
      return -1;
    }

    for(var x=0;x<amountOfProducts;x++){
      if(await isProductConfirmed(x)){
        var res = await curContract.methods.getAllProductInfo(x).call();
        var productName = res[0];
        var cid = res[1];
        var totalPrice = parseFloat(res[2]);
        var fairPrice = parseFloat(res[3]);
        var participants = res[5].length;
        var participantsNames = [];
        var participantsRoles = [];
        var participantsCountries = [];
        var participantsProportions = [];
        for(var i=0;i<participants;i++){
          participantsNames.push(res[4][0+3*i]);
          participantsRoles.push(res[4][1+3*i]);
          participantsCountries.push(res[4][2+3*i]);
          participantsProportions.push(res[5][i]);
        }
        toReturn.push((
          <>
        <Grid item xs={12} md={3}>
          <ProductCard
            productname={productName} 
            productimage={cid}
            productprice={totalPrice} 
            productfairprice={fairPrice} 
            participantsnames={participantsNames}
            participantsroles={participantsRoles}
            participantscountries={participantsCountries}
            participantsproportions={participantsProportions}
            productparticipants={participants}
            productconfirmed={true}
            buyingproduct={true}
            action={(y) => checkProduct(y)}
            myid={x}
            getparticipants={getParticipants}
          />
        </Grid>
        </>
        ));
      }
    }

    return toReturn;
  }

  async function buyProduct(){
    startLoading();
    var buyId = productId;
    var buyPrice = productPrice;
    var etherscanURL = "https://rinkeby.etherscan.io/tx/";

    const curContract = getCurContract(isBloxberg);
    curContract.methods.buyProduct(productId).send({from: pubKey, value: buyPrice})
    .then(function(response){
      var transactionHash = response["transactionHash"];
      stopLoading();
      alert("Product bought!");

      document.getElementById("showtransaction").style.display = "block";
      document.getElementById("showtransaction").href = etherscanURL + transactionHash;
      document.getElementById("distributionchart").style.visibility = "visible";
      document.getElementById("distributiontext").style.display = "block";
    })
    .catch(function(e){
      stopLoading();
      alert("An error occured");
    })
  }

  async function verifyStakeholder(){
    const curContract = getCurContract(isBloxberg);
    var res = await curContract.methods.isVerified(pubKey).call();

    if(res){
      setIsStakeholder(true);
      setIsLoggedIn(true);
      setStakeholderInfo();
      var content = await returnStakeholderProducts();
      if(content != -1){
        setMyConfirmationList(content);
      }
    }else{
      setIsUnverified(true);
    }
  }

  async function setStakeholderInfo(){
    const curContract = getCurContract(isBloxberg);
    var res = await curContract.methods.getStakeholderinfo(pubKey).call();
    setStakeholderName(res[0]);
    setStakeholderRole(res[1]);
    setStakeholderCountry(res[2]);
  }

  async function isProductConfirmed(productid){
    setProductConfirmed(false);
    const curContract = getCurContract(isBloxberg);
    var res = await curContract.methods.isProductConfirmed(productid).call();

    return res;
  }

  useEffect(() => {
    metamaskPermission();
  })

  return (
    <>
      <Navbar></Navbar>
      
      <div className="main">
        {!isConnected && (
          <LoginPage
            connectAccount={connectAccount}
          />
        )}


        {isConnected && !isLoggedIn && !isUnverified && (
            <ChooseRole
              pubKey={pubKey}
              userAction={userAction}
              shortenAddress={shortenAddress}
              error={error}
            />
        )}

        {isCertification && isLoggedIn && !addStakeholder && !removeStakeholder && (
          <CertificationPage
            certificationAction={certificationAction}
          />
        )}

        {isCertification && isLoggedIn && addStakeholder && (
            <AddStakeholder
              certificationAction={certificationAction}
              addNewStakeholder={addNewStakeholder}
            />
        )}

        {isCertification && isLoggedIn && removeStakeholder && (
            <RemoveStakeholder
              certificationAction={certificationAction}
              removeOldStakeholder={removeOldStakeholder}
            />
        )}

        {isConnected && isLoggedIn && isCustomer && !buyScreen && !scanningQrCode &&(
            <CustomerPage
              userAction={userAction}
              shortenAddress={shortenAddress}
              pubKey={pubKey}
              checkProduct={checkProduct}
              setScanningQrCode={setScanningQrCode}
              unfairProduct={unfairProduct}
              productList={productList}
            />
        )}

        {isConnected && isLoggedIn && isCustomer && !buyScreen && scanningQrCode &&(
          <QRCodeScanning
            userAction={userAction}
            handleError={handleError}
            handleScan={handleScan}
          />
        )}

        {isConnected && isLoggedIn && isCustomer && buyScreen && (         
            <ProductPage
              userAction={userAction}
              productName={productName}
              productCID={productCID}
              productPrice={productPrice} 
              productFairPrice={productFairPrice} 
              participantsNames={participantsNames}
              participantsRoles={participantsRoles}
              participantsCountries={participantsCountries}
              participantsProportions={participantsProportions}
              productParticipants={productParticipants}
              productConfirmed={productConfirmed}
              action={buyProduct}
              getParticipants={getParticipants}
            />        
        )}

        {isConnected && isLoggedIn && isStakeholder && !addProduct && !unconfirmProduct && !confirmProduct &&(
            <StakeholderPage
              userAction={userAction}
              stakeholderAction={stakeholderAction}
              stakeholderName={stakeholderName}
              stakeholderRole={stakeholderRole}
              stakeholderCountry={stakeholderCountry}
              myConfirmationList={myConfirmationList}
            />
        )}

        {isConnected && isLoggedIn && isStakeholder && addProduct && (
            <AddingNewProduct
              stakeholderAction={stakeholderAction}
              addNewProduct={addNewProduct}
              moreStakeholderInput={moreStakeholderInput}
            />
        )}

        {isConnected && isLoggedIn && confirmProduct && (
            <ConfirmProduct
              stakeholderAction={stakeholderAction}
              confirmTheProduct={confirmTheProduct}
            />
        )}

        {isConnected && isLoggedIn && unconfirmProduct && (
            <UnconfirmProduct
              stakeholderAction={stakeholderAction}
              unconfirmTheProduct={unconfirmTheProduct}
            />
        )}

        {isConnected && isUnverified && (
          <UnverifiedPage/>
        )}

      </div>
    </>
  );
}

export default App;