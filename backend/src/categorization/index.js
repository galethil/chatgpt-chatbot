const { request } = require('../chatGptApi');
const { delimiter } = require('../constants');
const { getAttribute, saveAttribute } = require('../conversationStore');
const { categorizationPrompt } = require('../prompts');

const categorizePrompt = async (cleanedUserMessage, sessionId) => {
  const lastCategory = getAttribute(sessionId, 'lastCategory');
  const categorizationMessages = [
    { role: 'system', content: categorizationPrompt(lastCategory) },
    { role: 'user', content: `${delimiter}${cleanedUserMessage}${delimiter}` }
  ];
  const categorizationOutput = await request(categorizationMessages);

  // process prompt based on category
  let categorization;

  try {
    categorization = JSON.parse(categorizationOutput);
    saveAttribute(sessionId, 'lastCategory', categorization);
  } catch (e) {
    console.error('Error during category JSON parsing.', categorizationOutput, e);
    categorization = { primary: 'Error', secondary: 'Error' };
  }

  return categorization;
};

module.exports = categorizePrompt;
