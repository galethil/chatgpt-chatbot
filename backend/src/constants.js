const delimiter = '####';
const delimiterBackTick = '```';

const failMessage = 'We were not able to process your request. Please change it and try again.';

const moderationFailMessage =
  'We are sorry, but your message was flagged as inapropriate. Please modify your message and try it again. In case you believe this is a mistake feel free to contact us.';

const outputModerationFailMessage =
  'We are sorry, but there was an unexpected issue with processing of your query. Please try different message';

module.exports = {
  delimiter,
  delimiterBackTick,
  failMessage,
  moderationFailMessage,
  outputModerationFailMessage
};
