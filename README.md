# Multi-Turn Conversational AI Validator

An automated Quality Engineering testing suite designed to validate the logic, Natural Language Processing (NLP) intent recognition, and session memory of stateful AI chatbots. 

## Architectural Highlights

*   **Stateful Conversation Testing:** Simulates multi-step user interactions to ensure the LLM backend successfully carries historical context (session memory) across 3+ conversational turns.
*   **Intent Switch Validation:** Programmatically verifies the chatbot's ability to gracefully handle edge cases, such as a user abruptly changing their objective mid-workflow, without losing previously gathered entity data.
*   **Deterministic AI Testing:** Employs Cypress API interception (`cy.intercept()`) on inference endpoints to mock LLM responses. This creates a highly stable, deterministic test environment free from AI hallucination variations, perfect for CI/CD pipelines.
*   **Dynamic UI Assertions:** Validates that the frontend correctly renders dynamic elements (like confirmation buttons or adaptive forms) triggered by the backend intent engine.

## Tech Stack
*   **Framework:** Cypress
*   **Language:** JavaScript (Node.js)
*   **Focus Area:** AI Prompt Flow Validation, Context Retention, Intent Recognition

## Quick Start
1. `npm install`
2. `npm run cypress:open`
