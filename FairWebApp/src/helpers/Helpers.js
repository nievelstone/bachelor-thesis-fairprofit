import Web3 from 'web3';

export function metamaskPermission(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    }
}

export function shortenAddress(address){
    return address.substring(0,6) + "..." + address.substring(36,42);
}

export function hasStakeholderConfirmed(myAddresss, confirmations, addresses){
  console.log(myAddresss);
  console.log(confirmations);
  console.log(addresses);
  for(var i=0;i<confirmations.length;i++){
    if(addresses[i] == myAddresss){
      return confirmations[i];
    }
  }
}

export function startLoading(){
  try{
    document.getElementById("loadingscreen").style.display = "block";
  }catch(e){

  }
}

export function stopLoading(){
  try{
    document.getElementById("loadingscreen").style.display = "none";
  }catch(e){

  }
}