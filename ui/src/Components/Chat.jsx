import React, { useCallback, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import ChatBubble from './ChatBubble';

const Chat = () => {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    axios
      .post('http://localhost:4500/prompt')
      .then(function (response) {
        // handle success
        console.log(response);

        setChats((ch) => [
          ...ch,
          {
            message: response.data,
            time: `${now.getHours()}:${now.getMinutes()}`,
            isMessageFromMe: false,
          },
        ]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);

        setChats((ch) => [
          ...ch,
          {
            message: error.message,
            time: `${now.getHours()}:${now.getMinutes()}`,
            isMessageFromMe: false,
          },
        ]);
      })
      .finally(function () {
        // always executed
        setIsLoading(false);
      });
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
          {isLoading && (
            <Box>
              <CircularProgress sx={{ mx: 'auto' }} />
            </Box>
          )}
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
              <Fab color="primary" aria-label="add" disabled={message.length === 0 || isLoading}>
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
