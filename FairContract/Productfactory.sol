pragma solidity >=0.7.0 < 0.9.0;

import "./Stakeholderfactory.sol";

contract Productfactory is Stakeholderfactory{
    
    //@notice Maps every stakeholder to all products he is participating at
    mapping (address => uint[]) public stakeholderToProducts;
    
    //@notice Struct to save product information
    struct Product {
        string name; //The name of the product
        string cid; //Cid in the IPFS network of product
        uint totalPrice; //Total product price in cents
        uint fairPrice; //Proportion that is paid fairly and transparently in cents
        uint participants; //Store amount of participants
        address[] productStakeholders; //Save participating stakeholders with same index as in revenueProportion and confirmations
        uint[] revenueProportion; //Save the absolute fair revenue of each stakeholder
        bool[] confirmations; //Save the confirmations of all participating stakeholders
    }
    
    //@notice Save all products in this array
     Product[] public products;
     
     //@notice Adds a new product and its configuration
     //@param _name Name of the new product
     //@param _price Price of the new product
     //@param _fairPrice Fair Price of the new product
     //@param _productStakeholders Array of the product Stakeholders
     //@param _revenueProportion Sharing of the revenue
    function addProduct(string memory _name, string memory _cid ,uint _price, uint _fairPrice, address[] memory _productStakeholders, uint[] memory _revenueProportion) public onlyVerified{
        bool [] memory confirmations = new bool[](_productStakeholders.length);
        for(uint i=0;i<_productStakeholders.length;i++){
            if(_productStakeholders[i] == msg.sender){
                confirmations[i] = true;
            }
        }
        
        require(_price >= _fairPrice, "The total price has to be bigger or equal to the fair price");
        require(_productStakeholders.length == _revenueProportion.length, "The distribution is not given for every stakeholder");
        require(correctDistribution(_fairPrice, _revenueProportion), "Exactly the fair price needs to be distributed.");
        require(allStakeholdersVerified(_productStakeholders), "Every participating stakeholder needs to be verified");
        
        Product memory newProduct = Product(_name, _cid ,_price, _fairPrice, _productStakeholders.length, _productStakeholders, _revenueProportion, confirmations);
        products.push(newProduct);
        
        for(uint i=0;i<_productStakeholders.length; i++){
            stakeholderToProducts[_productStakeholders[i]].push(products.length - 1);
        }
    }
    
    //@notice Return all products where sender is participant
    //@return Returns list of all participating product ids
    function myProducts() public view returns(uint[] memory){
        return stakeholderToProducts[msg.sender];
    }
    
    //@notice Confirm product participation
    //@param _productId ID of the product which should be confirmed
    function confirmProduct(uint _productId) external onlyVerified{
        address[] memory curStakeholders = products[_productId].productStakeholders;
        for(uint i=0;i<curStakeholders.length; i++){
            if(curStakeholders[i] == msg.sender){
                products[_productId].confirmations[i] = true;
                break;
            }
        }
    }
    
   //@notice Unconfirm product participation
   //@param _productId ID of the product which should be unconfirmed
    function unconfirmProduct(uint _productId) external onlyVerified{
        address[] memory curStakeholders = products[_productId].productStakeholders;
        for(uint i=0;i<curStakeholders.length; i++){
            if(curStakeholders[i] == msg.sender){
                products[_productId].confirmations[i] = false;
                break;
            }
        }
    }
    
    //@notice Unconfirm product participation by productId and address
   //@param _productId ID of the product which should be unconfirmed
    function unconfirmProductByAddress(uint _productId, address _address) internal onlyVerified{
        address[] memory curStakeholders = products[_productId].productStakeholders;
        for(uint i=0;i<curStakeholders.length; i++){
            if(curStakeholders[i] == _address){
                products[_productId].confirmations[i] = false;
                break;
            }
        }
    }
    
    //@notice Returns true if all stakeholders have confirmed the product contract
    //@param _productId ID of the product to be checked
    //@return True if confirmed
    function isProductConfirmed(uint productID) public view returns(bool){
        bool[] memory confirmations = products[productID].confirmations;
        for(uint i=0;i<confirmations.length;i++){
            if(!confirmations[i]){
                return false;
            }
        }
        return true;
    }
    
    //@notice Remove stakeholder and unconfirm all according products. only executable by the owner/certificationOrganization
    //@param _removeStakeholder Address of the stakeholder who should be removed
    function removeStakeholderAndProducts(address _removeStakeholder) external isOwner{
        addressToStakeholder[_removeStakeholder] = 0;
        
        uint[] memory existingProducts = myProducts();
        for(uint i=0;i<existingProducts.length;i++){
            unconfirmProductByAddress(existingProducts[i], _removeStakeholder);
        }
        
    }
    
    //@notice Requests all product information of a product
    //@param _productId ID of product which is requested
    //@return Returns the name, totalPrice, fairPrice, participants, productstakeholders, revenue of the poduct
    function getAllProductInfo(uint _productId) external view returns(string memory, string memory ,uint, uint, string[] memory, uint[] memory){
        string memory name = products[_productId].name;
        string memory cid = products[_productId].cid;
        uint participants = products[_productId].participants;
        string[] memory stakeHoldersInfo = new string[](3*participants);
        for(uint i=0;i<(participants*3);i=i+3){
            string[3] memory vals = getStakeholderinfo(products[_productId].productStakeholders[i/3]);
            stakeHoldersInfo[i] = vals[0];
            stakeHoldersInfo[i+1] = vals[1];
            stakeHoldersInfo[i+2] = vals[2];
        }
        uint[] memory revenue = products[_productId].revenueProportion;
        return (name, cid,  products[_productId].totalPrice , products[_productId].fairPrice, stakeHoldersInfo, revenue);
    }
    
    //@notice Only allows execution if the product is confirmed
    //@param _productId ID of product to be checked
    modifier onlyConfirmed(uint _productId) {
        require(isProductConfirmed(_productId), "Product has to be confirmed");
        _;
    }
    
    //@notice Help function to check the revenue distribution of a product
    //@param _fairPrice Distributed fair price
    //@param _revenueProportion Array of distributions
    //@return Returns whether sum of distribution equal to total fair price
    function correctDistribution(uint _fairPrice, uint[] memory _revenueProportion) internal view returns(bool){
        uint totalSum = 0;
        for(uint i=0;i<_revenueProportion.length; i++){
            totalSum += _revenueProportion[i];
        }
        return totalSum == _fairPrice;
    }
    
    //@notice Help function to check whether all stakeholders are verified
    //@param _productStakeholders Array of stakeholder addresses
    //@return Returns true if all addresses are verified stakeholders
    function allStakeholdersVerified(address[] memory _productStakeholders) internal view returns(bool){
        for(uint i=0;i<_productStakeholders.length;i++){
            if(!isVerified(_productStakeholders[i])){
                return false;
            }
        }
        return true;
    }
    
    //@notice Returns the address of the product stakeholders
    //@param _productId ID of the product
    function getProductStakeholders(uint _productId) public view returns(address[] memory){
        return products[_productId].productStakeholders;
    }
    
    //@notice Returns the confirmations of a product
    //@param _productId ID of the product
    function getProductConfirmations(uint _productId) public view returns(bool[] memory){
        return products[_productId].confirmations;
    }
    
    //@notice Returns the revenueproportion of a product
    //@param _productId ID of the product
    function getProductRevenueProportions(uint _productId) public view returns(uint [] memory){
        return products[_productId].revenueProportion;
    }
    
     //@notice Returns the total price of a product
     //@param _productId ID of the product
    function getProductTotalPrice(uint _productId) public view returns(uint){
        return products[_productId].totalPrice;
    }
    
    //@notice Returns the fair price of a product
    //@param _productId ID of the product
    function getProductFairPrice(uint _productId) public view returns(uint){
        return products[_productId].fairPrice;
    }
    
    //@notice Returns the total amount of existing products
    //@param _productId ID of the product
    function getProductAmount() public view returns(uint){
        return products.length;
    }
    
}