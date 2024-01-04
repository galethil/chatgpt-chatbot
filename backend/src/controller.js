const { request, moderation } = require('./chatGptApi');
const { delimiter, moedrationFailMessage } = require('./constants');
const { categorizationPrompt } = require('./prompts');

const prompt = async (message) => {
  // moderation replacement of delimiters
  const cleanedUserMessage = message.replace(delimiter, '');

  // moderation check for message
  const moderationResult = await moderation(cleanedUserMessage);
  if (moderationResult.flagged) {
    return moedrationFailMessage;
  }

  const messages = [
    { role: 'system', content: categorizationPrompt },
    { role: 'user', content: `${delimiter}${cleanedUserMessage}${delimiter}` }
  ];

  return await request(messages);
};

module.exports = {
  prompt
};
