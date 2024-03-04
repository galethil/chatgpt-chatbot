const { requestWithHistory } = require('../chatGptApi');
const { delimiter } = require('../constants');
const { getAttribute, saveAttribute } = require('../conversationStore');
const { categorizationPrompt } = require('../prompts');

const categorizePrompt = async (cleanedUserMessage, sessionId) => {
  const lastCategory = getAttribute(sessionId, 'lastCategory');
  const categorizationMessages = [
    { role: 'system', content: categorizationPrompt(lastCategory) },
    { role: 'user', content: `${delimiter}${cleanedUserMessage}${delimiter}` }
  ];
  const categorizationOutput = await requestWithHistory(categorizationMessages, sessionId, 1);

  // check if we are expecting special request from user
  const userRequestType = getAttribute(sessionId, 'userRequestType');
  saveAttribute(sessionId, 'userRequestType', null);
  if (userRequestType) {
    return { primary: 'User request', secondary: userRequestType };
  }

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
