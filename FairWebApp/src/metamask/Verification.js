import Web3 from "web3";

import {TEST_ABI, TEST_ADDRESS, BLOXBERG_ADDRESS} from "./config";

export function getCurContract(isBloxberg){
    var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    if(isBloxberg){
        return new web3.eth.Contract(TEST_ABI, BLOXBERG_ADDRESS);
    }else{
        return new web3.eth.Contract(TEST_ABI, TEST_ADDRESS);
    }
}