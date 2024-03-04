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
    return 'Query DB for the product specific info.';
  } else if (productInfoCategorizationOutput === '2') {
    return 'Query DB for the cheapest product.';
  } else if (productInfoCategorizationOutput === '3') {
    return 'Query DB for the most expensive product.';
  } else if (productInfoCategorizationOutput === '4') {
    return 'Prepared response about the phone camera';
  }
  return 'Product information from DB';
};

module.exports = productInformation;
