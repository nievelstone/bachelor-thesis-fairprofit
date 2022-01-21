pragma solidity >=0.7.0 < 0.9.0;

import "contracts/2_Owner.sol";

contract Stakeholderfactory is Owner{
    
    event addedStakeholder(address _addedStakeholder, string _name, string _role, string _location);
    
    //@notice Saves the address of the certification Organization
    address public certificationOrganization;
    
    //@notice Maps an address to the according verified Stakeholder
    mapping (address => uint) public addressToStakeholder;
    
    //@notice Define a struct to represent the different stakeholders
    struct Stakeholder {
        string name;
        string role; 
        string location; 
    }

    //@notice Saves all stakeholders
    Stakeholder[] public stakeholders;
    
    //@notice Initalize the contract with the certificationOrganization address (creator of contract)
    constructor() {
        //Needs to be changed depending on use case
        certificationOrganization = msg.sender;
        stakeholders.push(Stakeholder("FairProfit", "CertOrg", "Germany"));
        addressToStakeholder[certificationOrganization] = stakeholders.length;
    }
    
    //@notice Check if an address/stakeholder is already verified
    //@param _address address you want to check if verified
    //@return If input address is verified
    function isVerified(address _address) public view returns(bool){
       return addressToStakeholder[_address] != 0;
    }
    
    //@notice Add/Verify a stakeholder, only executable by the owner/certificationOrganization
    //@param _newStakeholder Address of the stakeholder that is added
    //@param _name Name of the new stakeholder
    //@param _role Role of the new stakeholder
    //@param _location Location of the new stakeholder
    function addStakeholder(address _newStakeholder, string memory _name, string memory _role, string memory _location) external isOwner notExistingYet(_newStakeholder){
        Stakeholder memory newStakeholder = Stakeholder(_name, _role, _location);
        stakeholders.push(newStakeholder);
        addressToStakeholder[_newStakeholder] = stakeholders.length;
        
        emit addedStakeholder(_newStakeholder, _name, _role, _location);
    }
    
    
    //------------------------------------------------------Help fucntions ---------------------------------------------------------------------------
    
    //@notice Only allows execution if called by verified stakeholder
    modifier onlyVerified() {
        require(isVerified(msg.sender), "Caller is not verified stakeholder");
        _;
    }
    
    //@notice Returns true if the stakeholder is not verified yet
    //@param _address Address of the stakeholder
    modifier notExistingYet(address _address){
        require(!isVerified(_address), "The stakeholder does already exist");
        _;
    }
    
    //@notice Returns the stakeholderinformation as a string array by address
    //@param _address Adress of the stakeholder that we want information from as array of strings
    //@return Returns the stakeholder name, role and location
    function getStakeholderinfo(address _address) public view returns(string[3] memory){
        return [stakeholders[addressToStakeholder[_address] - 1].name,stakeholders[addressToStakeholder[_address] - 1].role, stakeholders[addressToStakeholder[_address] - 1].location];
    }
    
    //---------------------------------------------------------------------------------------------------------------------------------------------------
}