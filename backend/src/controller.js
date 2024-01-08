const { request, moderation } = require('./chatGptApi');
const { delimiter, moderationFailMessage, outputModerationFailMessage, delimiterBackTick } = require('./constants');
const {
  categorizationPrompt,
  inputModerationPrompt,
  shippingPrompt,
  outputValidationPrompt,
  outputValidationQAPrompt,
  generalPrompt,
  categorizationProductInformationPrompt
} = require('./prompts');

const prompt = async (message, sessionId) => {
  // moderation replacement of delimiters
  const cleanedUserMessage = message.replace(delimiter, '').replace(delimiterBackTick, '');

  // moderation check of message
  /*
  if (cleanedUserMessage.length > 1000) {
    return 'Your request is too long. Try shorter request or contact out support.';
  }
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
  */
  // categorize user prompt
  const categorizationMessages = [
    { role: 'system', content: categorizationPrompt },
    { role: 'user', content: `${delimiter}${cleanedUserMessage}${delimiter}` }
  ];
  const categorizationOutput = await request(categorizationMessages);

  // process prompt based on category
  let output = 'We were not able to process your request. Please change it and try it again.';
  let categorization = { primary: 'General Inquiry', secondary: 'Speak to a human' };
  let input = '';
  try {
    categorization = JSON.parse(categorizationOutput);
  } catch (e) {
    console.error('Error during category JSON parsing.', e);
  }
  // Shipping
  if (categorization.primary === 'General Inquiry' && categorization.secondary === 'Shipping') {
    input = shippingPrompt;
    const messages = [
      {
        role: 'system',
        content: `${generalPrompt}
  ${shippingPrompt}`
      },
      { role: 'user', content: `${delimiter}${cleanedUserMessage}${delimiter}` }
    ];
    output = await request(messages);
  } else if (categorization.secondary === 'Product information') {
    const productInfoCategorizationMessages = [
      {
        role: 'system',
        content: categorizationProductInformationPrompt
      },
      { role: 'user', content: `${delimiter}${cleanedUserMessage}${delimiter}` }
    ];
    productInfoCategorizationOutput = await request(productInfoCategorizationMessages);

    if (productInfoCategorizationOutput === '1') {
    } else if (productInfoCategorizationOutput === '2') {
    }
  } else {
    return `Answering category (primary: ${categorization.primary}, secondary: ${categorization.secondary}) not implemented.`;
  }

  // moderation check for output
  /*
  const outputModerationResult = await moderation(output);
  if (outputModerationResult.flagged) {
    return outputModerationFailMessage;
  }
  */
  // validation check for output
  /*
  const outputValidationMessages = [
    { role: 'system', content: outputValidationPrompt },
    { role: 'user', content: outputValidationQAPrompt(cleanedUserMessage, input, output) }
  ];
  const outputValidationOutput = await request(outputValidationMessages);
  if (outputValidationOutput !== 'Y') {
    output = `${output} If we were not able to fulfill your request fully, feel free to contact out support department here...`;
  }
  */

  addMessage(sessionId, output, 'assistant');
  return output;
};

module.exports = {
  prompt
};
