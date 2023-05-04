// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BadgeShop {
    mapping (address => uint256) public balances;
    mapping (uint256 => bool) public badges;
    address payable public owner;
    uint256 public badgePrice;

    event BoughtBadge(address buyer, uint256 badgeId);

    constructor() {
        owner = payable(msg.sender);
        badgePrice = 1 ether; // prix en ether
    }

    function buyBadge(uint256 badgeId) public payable {
        require(msg.value == badgePrice, "Prix du badge incorrect");
        require(!badges[badgeId], "Badge deja achete");
        owner.transfer(msg.value);
        badges[badgeId] = true;
        balances[msg.sender]++;
        emit BoughtBadge(msg.sender, badgeId);
    }

    function withdraw() public {
        require(msg.sender == owner, "Vous n'etes pas le proprietaire");
        payable(msg.sender).transfer(address(this).balance);
    }
}
