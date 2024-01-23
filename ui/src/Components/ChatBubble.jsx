import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ChatBubble = ({ message, time, uniqueKey, isMessageFromMe = false }) => {
  const align = isMessageFromMe ? 'right' : 'left';

  return (
    <ListItem key={uniqueKey}>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align={align} primary={message} style={{ whiteSpace: 'pre-wrap' }}></ListItemText>
        </Grid>
        <Grid item xs={12}>
          <ListItemText align={align} secondary={time}></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ChatBubble;
