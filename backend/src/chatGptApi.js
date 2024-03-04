const axios = require('axios');
const { OPENAI_API_KEY, DEBUG } = require('../config');
const { getLatestConversation } = require('./conversationStore');

/**
 * @docs https://platform.openai.com/docs/quickstart?context=curl
 * @returns {string}
 */
async function request(messages, temperature = 0.4, maxTokens = 500) {
  if (!messages) throw Error('Message is empty');

  // Send the input to the REST API using a POST request
  try {
    if (DEBUG) console.log(`REQUEST: ${JSON.stringify(messages, undefined, 2)}\n`);

    const apiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        temperature: temperature,
        max_tokens: maxTokens,
        messages
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    if (DEBUG) console.log(`RESPONSE: ${JSON.stringify(apiResponse.data, undefined, 2)}\n\n`);

    return apiResponse?.data?.choices[0]?.message?.content;
  } catch (error) {
    console.error('Error sending request to API:', error);
  }
}

/**
 * @docs https://platform.openai.com/docs/guides/moderation/quickstart
 * @description The value for category_scores is between 0 and 1
 * @returns {{
 *     flagged: boolean,
 *     categories: {
 *       sexual: boolean,
 *       hate: boolean,
 *       harassment: boolean,
 *       self-harm: boolean,
 *       'sexual/minors': boolean,
 *       'hate/threatening': boolean,
 *       'violence/graphic': boolean,
 *       'self-harm/intent': boolean,
 *       'self-harm/instructions': boolean,
 *       'harassment/threatening': boolean,
 *       violence: boolean,
 *     },
 *     category_scores: {
 *       sexual: number,
 *       hate: number,
 *       harassment: number,
 *       'self-harm': number,
 *       'sexual/minors': number,
 *       'hate/threatening': number,
 *       'violence/graphic': number,
 *       'self-harm/intent': number,
 *       'self-harm/instructions': number,
 *       'harassment/threatening': number,
 *       violence: number,
 *     }
 * }}
 */
async function moderation(message) {
  if (!message) throw Error('Message is empty');

  // Send the input to the REST API using a POST request
  try {
    if (DEBUG) console.log(`MODERATION REQUEST: ${message}\n`);

    const apiResponse = await axios.post(
      'https://api.openai.com/v1/moderations',
      {
        input: message
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    if (DEBUG) console.log(`MODERATION RESPONSE: ${JSON.stringify(apiResponse.data, undefined, 2)}\n\n`);

    return apiResponse?.data?.results[0];
  } catch (error) {
    console.error('Error sending request to moderation API:', error);
  }
}

module.exports = {
  request,
  moderation
};
