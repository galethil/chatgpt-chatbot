import React, { useCallback, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import ChatBubble from './ChatBubble';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);

  const addMyMessage = useCallback(() => {
    if (message.length === 0) {
      return;
    }
    const now = new Date();
    setChats([
      ...chats,
      {
        message,
        time: `${now.getHours()}:${now.getMinutes()}`,
        isMessageFromMe: true,
      },
    ]);
    setMessage('');
  }, [chats, message]);

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper}>
        <Grid item xs={12}>
          <List>
            {chats.map((chat, index) => (
              <ChatBubble
                message={chat.message}
                time={chat.time}
                uniqueKey={index}
                isMessageFromMe={chat.isMessageFromMe}
              />
            ))}
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                value={message}
                onChange={onMessageChange}
                fullWidth
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add" disabled={message.length === 0}>
                <SendIcon onClick={addMyMessage} />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
