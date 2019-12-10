const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Message = require('../../models/Message');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/messages
// @desc    Create a message
// @access  Private
router.post('/', 
    [
        auth,
        [
            check('text', 'Text is required').not().isEmpty(),
            check('toUser', 'Recipient is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const fromUser = await User.findById(req.user.id).select('-password');

            // Pull out receive user info
            const toEmail = req.body.toUser;
            const toUser = await User.findOne({"email": toEmail})
 
            const newMessage = new Message({
                fromUser: req.user.id,
                toUser: toUser._id,
                text: req.body.text,
                fromName: fromUser.name,
                fromAvatar: fromUser.avatar
            })

            const message = await newMessage.save();

            res.send(message);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   GET api/messages
// @desc    Get all messages
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const messages = await Message.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/messages/:id
// @desc    Get messages for User ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const messages = await Message.find({"toUser": req.params.id});
        
        if(!messages) {
            console.error('No messages found');
            return res.status(404).json({ msg: 'No messages found' });
        }

        res.json(messages);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server error');
    }
});

module.exports = router;