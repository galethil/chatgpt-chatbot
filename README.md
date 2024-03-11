# chatgpt-chatbot

## Checkout the correct session

Clone the repository and checkout the specific session e.g. `git checkout session/1-chatgpt-api`

**List of sessiosn:**

- session/1-chatgpt-api
- session/3-clasification
- session/4-input-sanitation
- session/5-moderation-api
- session/6-chaining
- session/7-check-outputs
- session/8-conversation-thread
- session/9-actionable-prompts
- session/10-external-data
- session/11-extending-output
- feature/final


## Start your local environment

0. Create `backend/.env` file by command `cp .env.example .env` and add OpenAI API key to the file like `OPENAI_API_KEY=sk_XXXXXX-XXXX-XXXX-XXXXXXX`
1. Run `sh start.sh` in root folder

or manually

0. Create `backend/.env` file and add OpenAI API key to the file like `OPENAI_API_KEY=sk_XXXXXX-XXXX-XXXX-XXXXXXX`
1. Go to folder `cd backend`
2. Run `npm i` 
3. Run `cp .env.example .env`
4. Then you can start backend by `npm run dev`
5. In new terminal window go to folder `cd ui`
6. Run `npm i` 
7. Run `cp .env.example .env`, if you want you can specify the UI port
8. Then you can start UI by `npm start`