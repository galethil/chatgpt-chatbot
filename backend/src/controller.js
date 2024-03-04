const { request, moderation } = require('./chatGptApi');
const {
  delimiter,
  moderationFailMessage,
  outputModerationFailMessage,
  delimiterBackTick,
  failMessage
} = require('./constants');
const {
  inputModerationPrompt,
  shippingPrompt,
  outputValidationPrompt,
  outputValidationQAPrompt
} = require('./prompts');
const { ENABLE_INPUT_MODERATION, ENABLE_OUTPUT_MODERATION, ENABLE_OUTPUT_VALIDATION } = require('../config');
const shipping = require('./categorization/shipping');
const productInformation = require('./categorization/productInformation');
const categorizePrompt = require('./categorization');
const { addMessage } = require('./conversationStore');
const updatePersonalInformation = require('./categorization/updatePersonalInformation');

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
  console.log('Categorization result', categorization);

  // Get outputs of specific category of prompt
  if (categorization.primary === 'General Inquiry' && categorization.secondary === 'Shipping') {
    input = shippingPrompt;
    output = await shipping(cleanedUserMessage, sessionId);
  } else if (categorization.secondary === 'Product information') {
    output = await productInformation(cleanedUserMessage);
  } else if (
    categorization.primary === 'Account Management' &&
    categorization.secondary === 'Update personal information'
  ) {
    output = await updatePersonalInformation(cleanedUserMessage, sessionId);
  } else if (categorization.primary === 'User request') {
    if (categorization.secondary === 'email-change') {
      // update email
      return 'Email was updated';
    } else if (categorization.secondary === 'phone-change') {
      // update phone
      return 'Phone number was updated';
    }
  } else if (categorization.primary === 'Error') {
    return failMessage;
  } else {
    return `Answering category (primary: ${categorization.primary}, secondary: ${categorization.secondary}) not implemented.`;
  }

  // moderation check for output
  if (ENABLE_OUTPUT_MODERATION) {
    const outputModerationResult = await moderation(output);
    if (outputModerationResult.flagged) {
      return outputModerationFailMessage;
    }
  }
  // validation check for output
  if (ENABLE_OUTPUT_VALIDATION) {
    const outputValidationMessages = [
      { role: 'system', content: outputValidationPrompt },
      { role: 'user', content: outputValidationQAPrompt(cleanedUserMessage, input, output) }
    ];
    const outputValidationOutput = await request(outputValidationMessages);
    if (outputValidationOutput !== 'Y') {
      output = `${output} If we were not able to fulfill your request fully, feel free to contact out support department here...`;
    }
  }

  // add output to history
  addMessage(sessionId, cleanedUserMessage, 'user');
  addMessage(sessionId, output, 'assistant');

  return output;
};

module.exports = {
  prompt
};
