// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract KittyGame {
    address public owner;
    mapping(address => uint256) public scores;
    mapping(address => bool) public rewardsClaimed;
    uint256 public rewardAmount = 1; // 1 KITTY token

    event ScoreSaved(address indexed player, uint256 score);
    event RewardClaimed(address indexed player, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function saveScore(uint256 _score) public {
        require(scores[msg.sender] == 0, "Score already set");
        scores[msg.sender] = _score;
        emit ScoreSaved(msg.sender, _score);
    }

    function claimRewards() public {
        require(scores[msg.sender] > 0, "No score found");
        require(!rewardsClaimed[msg.sender], "Already claimed");

        rewardsClaimed[msg.sender] = true;
        // Here you should add ERC-20 token transfer logic.

        emit RewardClaimed(msg.sender, rewardAmount);
    }
}

