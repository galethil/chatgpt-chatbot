const { request, moderation } = require('./chatGptApi');
const {
  delimiter,
  moderationFailMessage,
  delimiterBackTick,
  failMessage
} = require('./constants');
const {
  inputModerationPrompt,
  shippingPrompt,
} = require('./prompts');
const { ENABLE_INPUT_MODERATION, ENABLE_OUTPUT_MODERATION, ENABLE_OUTPUT_VALIDATION } = require('../config');
const shipping = require('./categorization/shipping');
const categorizePrompt = require('./categorization');

const prompt = async (message, sessionId) => {
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

  let output = failMessage;
  let input = '';
  // categorize user prompt
  const categorization = await categorizePrompt(cleanedUserMessage, sessionId);

  // Get outputs of specific category of prompt
  if (categorization.primary === 'General Inquiry' && categorization.secondary === 'Shipping') {
    input = shippingPrompt;
    output = await shipping(cleanedUserMessage, sessionId);
  } else if (categorization.primary === 'Error') {
    return failMessage;
  } else {
    return `Answering category (primary: ${categorization.primary}, secondary: ${categorization.secondary}) not implemented.`;
  }


  return output;
};

module.exports = {
  prompt
};
