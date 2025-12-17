# AI Agent From Scratch (No Frameworks)

This repository contains the source code for a functional AI support agent built _without_ external agent frameworks.

The project is designed to illustrate the core mechanics of an AI agent, focusing on implementing the **Agent Loop**, **Memory (Conversation History)**, and **Function Calling (Tools)** using only the native Google Gen AI SDK.

## Key Features

- **Core Agent Loop:** Handles conversation flow and decision-making.
- **FAQ Handling:** Answers static questions efficiently using the system prompt.
- **Order Validation:** Uses a custom tool (`validateOrder`) to check order details.
- **Refund Escalation:** Uses a custom tool (`raiseRefundRequest`) to simulate internal communication.

## Technology Stack

- **Language:** TypeScript
- **LLM SDK:** Google Gen AI SDK
- **Model:** Gemini-2.5-Flash

## How to Use

1.  Ensure you have **Node.js 25** and **pnpm** installed.
2.  **API Key Setup:**
    - You need a Gemini API key. Follow [this guide](https://ai.google.dev/gemini-api/docs/api-key) to get one if you don't have one already.
    - Copy the example environment file and replace the placeholder API key.
      ```bash
      cp env-example .env
      # update the .env file contents with your own API key
      ```
3.  Install the project dependencies

    ```bash
    pnpm install
    ```

4.  Start the agent loop

    ```bash
    pnpm start
    ```

## 💡 Learn More

A detailed, step-by-step explanation of this implementation is available in the accompanying blog post:

[Building an AI agent from scratch](https://dennisstanoev.com/building-an-ai-agent-from-scratch-without-frameworks/)
