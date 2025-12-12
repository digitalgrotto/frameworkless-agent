import type { FunctionDeclaration } from '@google/genai';
import { Type } from '@google/genai';
import { getOrder } from './db.ts';

/**
 * Validate an order by customer email and order ID
 * @param email - The customer email
 * @param orderId - The order ID
 * @returns True if the order is valid, false otherwise
 */
function validateOrder(email: string, orderId: string): boolean {
  console.log(`Validating order: ${email} - order ID: ${orderId}`);
  const order = getOrder(orderId);
  if (order?.email === email) {
    return true;
  }
  return false;
}

/**
 * Function declaration passed to the LLM.
 */
const validateOrderFD: FunctionDeclaration = {
  name: 'validateOrder',
  description: 'Validate an order by customer email and order ID.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      email: { type: Type.STRING },
      orderId: { type: Type.STRING },
    },
    required: ['email', 'orderId'],
  },
};
export { validateOrderFD, validateOrder };
