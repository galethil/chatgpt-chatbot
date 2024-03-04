const { request } = require('./chatGptApi');

const prompt = async (message) => {
  const messages = [
    { role: 'system', content: '' },
    { role: 'user', content: message }
  ];
  const output = await request(messages);

  return output;
};

module.exports = {
  prompt
};
