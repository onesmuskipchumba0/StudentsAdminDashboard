import express from 'express';
import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';

const router = express.Router();

// Get user's conversations
router.get('/conversations', async (req, res) => {
  try {
    const userId = req.query.userId;
    const conversations = await Conversation.find({
      'participants.userId': userId
    }).sort({ updatedAt: -1 });
    
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conversations', error });
  }
});

// Get messages for a conversation
router.get('/:conversationId', async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId
    }).sort({ createdAt: 1 });
    
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
});

// Create new conversation
router.post('/conversations', async (req, res) => {
  try {
    const newConversation = new Conversation({
      participants: req.body.participants,
      lastMessage: {
        content: req.body.initialMessage,
        timestamp: new Date(),
        senderId: req.body.senderId
      },
      unreadCount: new Map([[req.body.recipientId, 1]])
    });
    
    await newConversation.save();
    
    // Create initial message
    const message = new Message({
      conversationId: newConversation._id,
      senderId: req.body.senderId,
      content: req.body.initialMessage
    });
    
    await message.save();
    
    res.status(201).json(newConversation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating conversation', error });
  }
});

export default router;