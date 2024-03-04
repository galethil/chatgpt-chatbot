const { request } = require('../chatGptApi');
const { delimiter } = require('../constants');
const { saveAttribute } = require('../conversationStore');
const { updatePersonalInformationPrompt } = require('../prompts');

const updatePersonalInformation = async (cleanedUserMessage, sessionId) => {
  const messages = [
    {
      role: 'system',
      content: `${updatePersonalInformationPrompt}`
    },
    { role: 'user', content: `${delimiter}${cleanedUserMessage}${delimiter}` }
  ];
  const categoryResult = await request(messages);

  if (categoryResult === '1') {
    saveAttribute(sessionId, 'userRequestType', 'email-change');
    return 'Type your new email';
  } else if (categoryResult === '2') {
    saveAttribute(sessionId, 'userRequestType', 'phone-change');
    return 'Type your new pnone number';
  } else if (categoryResult === '3') {
    return 'You can update your address here <link address>';
  }
  return 'You can update personal info in your profile <link profile>';
};

module.exports = updatePersonalInformation;
