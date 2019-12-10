import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendMessage } from '../../actions/message';

const MessageForm = ({ sendMessage }) => {
    const [text, setText] = useState('');
    const [toUser, setUser] = useState('');

    return (
        <div className="post-form">
            <form className="form my-1" onSubmit={e => {
                e.preventDefault();
                sendMessage({ text, toUser });
                setText('');
            
            }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Send a message..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                ></textarea>
                <textarea
                    name="toUser"
                    cols="30"
                    rows="1"
                    placeholder="Who do you want to send your message to?"
                    value={toUser}
                    onChange={e => setUser(e.target.value)}
                    required
                ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Send" />
            </form>
        </div>
    )
};

MessageForm.propTypes = {
    sendMessage: PropTypes.func.isRequired
};

export default connect(null, { sendMessage })(MessageForm);
