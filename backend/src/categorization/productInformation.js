const { request } = require('../chatGptApi');
const { delimiter } = require('../constants');
const { categorizationProductInformationPrompt } = require('../prompts');

const productInformation = async (cleanedUserMessage) => {
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
  return 'Product information from DB';
};

module.exports = productInformation;
