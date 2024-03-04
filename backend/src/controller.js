const { request, moderation } = require('./chatGptApi');
const { delimiter, moderationFailMessage, delimiterBackTick } = require('./constants');
const { inputModerationPrompt } = require('./prompts');
const { ENABLE_INPUT_MODERATION } = require('../config');

const prompt = async (message) => {
  // moderation replacement of delimiters
  const cleanedUserMessage = message.replace(delimiter, '').replace(delimiterBackTick, '');

  // moderation check of message
  if (cleanedUserMessage.length > 1000) {
    return 'Your request is too long. Try shorter request or contact out support.';
  }
  if (ENABLE_INPUT_MODERATION) {
    const moderationResult = await moderation(cleanedUserMessage);
    if (moderationResult.flagged) {
      return moderationFailMessage;
    }
    const moderationMessages = [
      { role: 'system', content: inputModerationPrompt },
      { role: 'user', content: `${delimiter}${cleanedUserMessage}${delimiter}` }
    ];
    const moderationOutput = await request(moderationMessages);
    if (moderationOutput === 'Y') {
      return moderationFailMessage;
    }
  }

  const messages = [
    { role: 'system', content: '' },
    { role: 'user', content: `${delimiter}${cleanedUserMessage}${delimiter}` }
  ];
  const output = await request(messages);

  return output;
};

module.exports = {
  prompt
};
