pragma solidity >=0.7.0 < 0.9.0;

import "./Productfactory.sol";

contract Paymentfactory is Productfactory{
    
    //@notice Buy a confirmed product
    //@param _productId ID of product to be bought
    function buyProduct(uint _productId) public payable onlyConfirmed(_productId){
        uint totalPrice = getProductTotalPrice(_productId) * 1 wei;
        uint fairPrice = getProductFairPrice(_productId) * 1 wei;
        address[] memory stakeHolders = getProductStakeholders(_productId);
        uint[] memory revenueProportion = getProductRevenueProportions(_productId);
        require(msg.value == totalPrice, "You sent the wrong amount!");
        
        //Send money to all stakeholders as specified by fair distribution, send retailer extra price difference as he paid already other participants
        for(uint i=0;i<stakeHolders.length;i++){
            address payable curStakeholder = payable(stakeHolders[i]);
            uint curAmount = revenueProportion[i] * 1 wei;
            if(i == stakeHolders.length - 1){ //Retailer gets extra amount because of having bought product already
                curAmount = curAmount + (totalPrice - fairPrice);
            }
            curStakeholder.transfer(curAmount);
        }
    }
}