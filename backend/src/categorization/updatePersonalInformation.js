// const { request } = require('../chatGptApi');
// const { delimiter } = require('../constants');
// const { saveAttribute } = require('../conversationStore');
// const { updatePersonalInformationPrompt } = require('../prompts');

const updatePersonalInformation = async (cleanedUserMessage, sessionId) => {
  // const messages = [
  //   {
  //     role: 'system',
  //     content: `${updatePersonalInformationPrompt}`
  //   },
  //   { role: 'user', content: `${delimiter}${cleanedUserMessage}${delimiter}` }
  // ];
  // const categoryResult = await request(messages);

  return 'You can update personal info in your profile <link profile>';
};

module.exports = updatePersonalInformation;
