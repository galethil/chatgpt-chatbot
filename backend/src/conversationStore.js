/**
 * @description Simple data store to maintain state of conversation thread
 */
const store = {};

const initConversation = (conversationId) => {
  if (!store[conversationId]) {
    store[conversationId] = {
      conversation: [],
      attributes: {}
    };
  }
};

// /**
//  *
//  * @param {*} conversationId
//  * @param {*} message
//  * @param {('system'|'user'|'assistant')} role
//  */
// const addMessage = (conversationId, message, role = 'assistant') => {
//   if (!conversationId || !message) {
//     console.error('"conversationId" and "message" are required', conversationId, message, role);
//     throw Error('"conversationId" and "message" are required');
//   }

//   initConversation(conversationId);

//   const messageObject = { role, content: message };
//   store[conversationId].conversation.push(messageObject);
// };

// const getConversation = (conversationId) => store[conversationId].conversation;

// const getLatestConversation = (conversationId, messageCount = 6) => {
//   if (!store[conversationId]) {
//     return [];
//   }

//   // Check if the array has at least three elements
//   if (store[conversationId].conversation.length < messageCount) {
//     return store[conversationId].conversation; // Return the entire array if it has less than three elements
//   }

//   // Use slice to get the last three items
//   return store[conversationId].conversation.slice(-messageCount);
// };

const saveAttribute = (conversationId, attributeId, attributeValue) => {
  if (!conversationId || !attributeId) {
    console.log('saveAttribute', conversationId, attributeId, attributeValue);
    throw Error('conversationId, attributeId are required');
  }

  initConversation(conversationId);
  store[conversationId].attributes[attributeId] = attributeValue;
};

const getAttribute = (conversationId, attributeId) => store[conversationId]?.attributes?.[attributeId];

module.exports = {
  getAttribute,
  saveAttribute
};
