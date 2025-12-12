import type { Content, FunctionResponse } from '@google/genai';
import { GoogleGenAI } from '@google/genai';
import fs from 'node:fs/promises';
import inquirer from 'inquirer';
import 'dotenv/config';
import { validateOrder, validateOrderFD } from './validate-order.ts';
import {
  raiseRefundRequest,
  raiseRefundRequestFD,
} from './raise-refund-request.ts';

const MODEL = 'gemini-2.5-flash';
const SYSTEM_PROMPT = await fs.readFile('system-prompt.md', 'utf8');
const GOOGLE_GENAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * The conversation thread - stores the contents of the current conversation
 */
const THREAD: { contents: Content[] } = {
  contents: [],
};

/**
 * Get user input from the console - blocks the main thread until the user enters a message
 * @returns The user's message
 */
async function getUserInput() {
  const { userMessage } = await inquirer.prompt([
    {
      type: 'input',
      name: 'userMessage',
      message: 'User:',
    },
  ]);
  return userMessage;
}

/**
 * Get a response from the AI model - blocks the main thread until the response is received
 * @param userMessage - The user's input message
 * @returns The AI's response
 */
async function getResponseText(userMessage?: string) {
  if (userMessage) {
    THREAD.contents.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });
  }

  const response = await GOOGLE_GENAI.models.generateContent({
    model: MODEL,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      tools: [
        { functionDeclarations: [validateOrderFD, raiseRefundRequestFD] },
      ],
    },
    contents: THREAD.contents,
  });

  // parse out and handle the function calls
  const functionCalls = response.functionCalls || [];
  for (const functionCall of functionCalls) {
    THREAD.contents.push(response?.candidates?.[0].content as Content);
    if (functionCall.name === 'validateOrder') {
      const { email, orderId } = functionCall.args as {
        email: string;
        orderId: string;
      };
      const isValid = validateOrder(email, orderId); // call our function
      // ask the LLM for a final generation
      const final_response = await sendFunctionResponseToLLM({
        name: functionCall.name,
        response: { result: isValid ? 'Order is valid' : 'Order is invalid' },
      });
      return final_response;
    }
    if (functionCall.name === 'raiseRefundRequest') {
      const { orderId, reason } = functionCall.args as {
        orderId: string;
        reason: string;
      };
      raiseRefundRequest(orderId, reason, THREAD.contents);
      // ask the LLM for a final generation
      const final_response = await sendFunctionResponseToLLM({
        name: functionCall.name,
        response: { result: true },
      });
      return final_response;
    }
  }

  THREAD.contents.push({
    role: 'model',
    parts: [{ text: response.text }],
  });
  return response.text;
}

async function sendFunctionResponseToLLM(functionResponse: FunctionResponse) {
  THREAD.contents.push({
    role: 'user',
    parts: [{ functionResponse: functionResponse }],
  });
  const response = await getResponseText();
  return response;
}

async function main() {
  while (true) {
    const userMessage = await getUserInput();

    if (userMessage?.trim() === '') process.exit(0);

    const responseText = await getResponseText(userMessage);
    console.log(responseText);
  }
}

main();
