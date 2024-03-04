const { request } = require('../chatGptApi');
const { delimiter } = require('../constants');
const { saveAttribute } = require('../conversationStore');
const { categorizationProductInformationPrompt, productNamePrompt } = require('../prompts');

const productInformation = async (cleanedUserMessage, sessionId) => {
  const productInfoCategorizationMessages = [
    {
      role: 'system',
      content: categorizationProductInformationPrompt
    },
    { role: 'user', content: `${delimiter}${cleanedUserMessage}${delimiter}` }
  ];
  productInfoCategorizationOutput = await request(productInfoCategorizationMessages);

  if (productInfoCategorizationOutput === '1') {
    const productNameMessages = [
      {
        role: 'system',
        content: productNamePrompt
      },
      { role: 'user', content: `${delimiter}${cleanedUserMessage}${delimiter}` }
    ];
    const productName = await request(productNameMessages);

    // search for product name in DB
    const productDbID = 5;

    if (productDbID) {
      return 'Query DB for the product specific info.';
    } else {
      saveAttribute(sessionId, 'userRequestType', 'product-name-product-info');
      return 'Product was not found based on your question. Please provide just product ID or link to the product.';
    }
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
