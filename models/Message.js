const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    fromUser: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    toUser: {
        type: String,
        ref: 'users',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    fromName: {
        type: String
    },
    fromAvatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Message = mongoose.model('message', MessageSchema);