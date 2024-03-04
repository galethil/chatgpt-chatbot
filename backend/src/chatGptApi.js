const axios = require('axios');
const { OPENAI_API_KEY, DEBUG } = require('../config');

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

module.exports = {
  request
};
