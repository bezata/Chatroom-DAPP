// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CeloChat {
    address private owner;
    mapping(address => bool) private members;
    mapping(uint256 => Message) private messages;
    uint256 private messageCount;
    uint256 private membershipFee;
    uint256 private constant MESSAGE_LIMIT = 20;

    event NewMember(address member);
    event NewMessage(uint256 id, address sender, string message);
    event Withdrawal(address to, uint256 amount);

    struct Message {
        uint256 id;
        address sender;
        string message;
    }

    /**
     * @dev Initializes the contract with the specified membership fee.
     * @param fee The membership fee in wei.
     */
    constructor(uint256 fee) {
        owner = msg.sender;
        messageCount = 0;
        membershipFee = fee;
    }

    /**
     * @dev Checks if the specified address is a member of the chat room.
     * @param member The address to check for membership.
     * @return True if the specified address is a member, false otherwise.
     */
    function checkMembership(address member) public view returns (bool) {
        return members[member];
    }

    /**
     * @dev Allows a user to join the chat room by paying the membership fee.
     * Emits a `NewMember` event on success.
     */
    function joinChatRoom() public payable {
        require(!members[msg.sender], "You have already joined the chat room");
        require(
            msg.value >= membershipFee,
            "You need to pay the membership fee to join the chat room"
        );
        members[msg.sender] = true;
        emit NewMember(msg.sender);
    }

    /**
     * @dev Gets the owner of the contract.
     * @return The address of the owner.
     */
    function getOwner() public view returns (address) {
        return owner;
    }

    /**
     * @dev Allows the owner to withdraw celo from the contract.
     * @param to The address to withdraw the celo to.
     * @param amount The amount of celo to withdraw.
     */
    function withdrawCelo(address payable to, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can withdraw Celo");
        require(amount <= address(this).balance, "Insufficient balance");
        to.transfer(amount);
        emit Withdrawal(to, amount);
    }

    /**
     * @dev Allows a member to send a message to the chat room.
     * Emits a `NewMessage` event on success.
     * Deletes the oldest message if the message count exceeds the limit.
     * @param message The message to send.
     */
    function sendMessage(string memory message) public {
        require(members[msg.sender], "You are not a member of the chat room");
        require(bytes(message).length > 0, "Message cannot be empty");

        messageCount++;
        messages[messageCount] = Message(messageCount, msg.sender, message);
        emit NewMessage(messageCount, msg.sender, message);

        // Delete oldest message if message count exceeds limit
        if (messageCount > MESSAGE_LIMIT) {
            delete messages[messageCount - MESSAGE_LIMIT];
        }
    }

    /**
     * @dev Gets the total number of messages sent in the chat room.
     * @return The message count.
     */
    function getMessageCount() public view returns (uint256) {
        return messageCount;
    }

    /**
     * @dev Gets the message with the specified ID.
     * @param id The ID of the message to get.
     * @return The message ID, sender address, message content, and timestamp of the message.
     */
    function getMessage(uint256 id)
        public
        view
        returns (
            uint256,
            address,
            string memory
        )
    {
        require(id > 0 && id <= messageCount, "Invalid message ID");
        Message memory message = messages[id];
        return (message.id, message.sender, message.message);
    }

    /**
     * @dev Gets all the messages sent in the chat room.
     * @return An array of all the messages.
     */
    function getAllMessages() public view returns (Message[] memory) {
        Message[] memory allMessages = new Message[](messageCount);
        for (uint256 i = 1; i <= messageCount; i++) {
            allMessages[i - 1] = messages[i];
        }
        return allMessages;
    }

    /**
     * @dev Sets the membership fee to the specified amount.
     * @param fee The new membership fee in wei.
     */
    function setMembershipFee(uint256 fee) public {
        require(
            msg.sender == owner,
            "Only the owner can set the membership fee"
        );
        membershipFee = fee;
    }

    function getMembershipFee() public view returns (uint256) {
        return membershipFee;
    }
}
