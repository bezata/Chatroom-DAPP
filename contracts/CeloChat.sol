// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CeloChat {
    address private immutable i_owner;
    mapping(address => bool) private members;
    mapping(uint256 => Message) private messages;
    uint256 private messageCount;
    uint256 private membershipFee;
    uint256 private constant MESSAGE_LIMIT = 20; 

    event NewMember(address member);
    event NewMessage(uint256 id, address sender, string message);
    event DeleteMessage(uint256 id, address sender, string message);
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
        i_owner = msg.sender;
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
        return i_owner;
    }

    /**
     * @dev Allows the owner to withdraw celo from the contract.
     * @param to The address to withdraw the celo to.
     * @param amount The amount of celo to withdraw.
     */
    function withdrawCelo(address payable to, uint256 amount) public {
        require(msg.sender == i_owner, "Only the owner can withdraw Celo");
        require(amount <= address(this).balance, "Insufficient balance");
        require(to != address(0), "Invalid recipient address");

         (bool success, ) = to.call{value: amount}("");
          require(success, "Transfer failed");

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
     * @dev Gets a message with the specified ID and delete it the sender === msg.sender.
     * @param _id The ID of the message to get.
     */
   function deleteMyMessage(uint messageId) public {
    Message storage message = messages[messageId];
    require(message.sender == msg.sender, "You are not the sender of this message");
    delete messages[messageId];
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

        @notice Returns an array of Messages within a specified range

        @param startIndex The starting index of the range to retrieve Messages from

        @param limit The maximum number of Messages to retrieve

        @return An array of Message structs containing the Messages in the specified range

        @dev startIndex must be less than messagesCount

        - If endIndex exceeds the value of messagesCount, endIndex will be set to messagesCount.
        - This function is a view function and does not modify the contract state.
*/
    
    function getRangeMessages(uint256 startIndex, uint256 limit) public view returns (Message[] memory) 
    { 
    require(startIndex < messagesCount, "Invalid start index"); 
    uint256 endIndex = startIndex + limit; 
    if (endIndex > messagesCount) {
    endIndex = messagesCount; 
    } 
    Message[] memory result = new Message[](endIndex - startIndex); 
    for (uint256 i = startIndex; i < endIndex; i++) { 
    result[i - startIndex] = messages[i]; 
    } 
    return result; 
    }

    /**
     * @dev Sets the membership fee to the specified amount.
     * @param fee The new membership fee in wei.
     */
    function setMembershipFee(uint256 fee) public {
        require(
            msg.sender == i_owner,
            "Only the owner can set the membership fee"
        );
        membershipFee = fee;
    }

    function getMembershipFee() public view returns (uint256) {
        return membershipFee;
    }
}
