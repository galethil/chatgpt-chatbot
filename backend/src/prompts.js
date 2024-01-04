const { delimiter, delimiterBackTick } = require('./constants');

const categorizationPrompt = `You will be provided with customer service queries. The customer service query will be delimited with ${delimiter} characters.
Classify each query into a primary category and a secondary category. 
Provide your output in json format with the keys: primary and secondary.

Primary categories: Billing, Technical Support, Account Management, or General Inquiry.

Billing secondary categories:
Unsubscribe or upgrade
Add a payment method
Explanation for charge
Dispute a charge

Technical Support secondary categories:
General troubleshooting
Device compatibility
Software updates

Account Management secondary categories:
Password reset
Update personal information
Close account
Account security

General Inquiry secondary categories:
Product information
Pricing
Feedback
Speak to a human
`;

const outputValidationPrompt = `You are an assistant that evaluates whether customer service agent responses sufficiently answer customer questions, and also validates that all the facts the assistant cites from the product \
information are correct.
The product information and user and customer service agent messages will be delimited by 3 backticks, i.e. ${delimiterBackTick}.
Respond with a Y or N character, with no punctuation:
Y - if the output sufficiently answers the question AND the response correctly uses product information
N - otherwise

Output a single letter only.`;

module.exports = {
  categorizationPrompt,
  outputValidationPrompt
}