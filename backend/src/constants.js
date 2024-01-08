const delimiter = '####';
const delimiterBackTick = '```';

const moderationFailMessage =
  'We are sorry, but your message was flagged as inapropriate. Please modify your message and try it again. In case you believe this is a mistake feel free to contact us.';

const outputModerationFailMessage =
  'We are sorry, but there was an unexpected issue with processing of your query. Please try different message';

module.exports = {
  delimiter,
  delimiterBackTick,
  moderationFailMessage,
  outputModerationFailMessage
};
