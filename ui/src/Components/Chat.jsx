import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import ChatBubble from './ChatBubble';

const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
}));

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const Chat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [confirmButtonsVisible, setConfirmButtonsVisible] = useState(false);
  const [uuid] = useState(generateUUID());

  const sendMessage = useCallback(
    (m) => {
      if (m.length === 0) {
        return;
      }
      const now = new Date();
      setChats([
        ...chats,
        {
          message: m,
          time: `${now.getHours()}:${now.getMinutes()}`,
          isMessageFromMe: true,
        },
      ]);
      setMessage('');
      setIsLoading(true);

      axios
        .post(
          'http://localhost:4500/prompt',
          {
            message: m,
          },
          {
            headers: {
              sessionId: uuid,
            },
          },
        )
        .then(function (response) {
          // handle success
          console.log(response);

          setChats((ch) => [
            ...ch,
            {
              message: typeof response.data === 'string' ? response.data : JSON.stringify(response.data),
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
    },
    [chats],
  );

  const addMyMessage = () => {
    sendMessage(message);
  };

  const sendAccept = () => {
    sendMessage('Y');
  };

  const sendCancel = () => {
    sendMessage('N');
  };

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
                key={index}
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
          {!confirmButtonsVisible ? (
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
          ) : (
            <Grid container style={{ padding: '20px' }}>
              <Grid item xs={6}>
                <Item>
                  <Button variant="contained" onClick={sendAccept}>
                    Accept
                  </Button>
                </Item>
              </Grid>
              <Grid item xs={6} align="right">
                <Item>
                  <Button variant="outlined" onClick={sendCancel}>
                    Cancel
                  </Button>
                </Item>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
