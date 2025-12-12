import type { Content, FunctionDeclaration } from '@google/genai';
import { Type } from '@google/genai';

/**
 * Raise a refund request for an order.
 * @param orderId - The order ID
 * @param reason - The reason for the refund request
 * @param contents - The contents of the conversation thread
 */
function raiseRefundRequest(
  orderId: string,
  reason: string,
  contents: Content[],
): void {
  console.log(`!!! Raising refund request for order: ${orderId}: ${reason}`);
  // TODO: In a more realistic scenario, we would send an internal email to
  // customer support or call a backend API to raise a refund request.
}

/**
 * Function declaration passed to the LLM.
 */
const raiseRefundRequestFD: FunctionDeclaration = {
  name: 'raiseRefundRequest',
  description: `Raise a refund request for an order. Before calling this fuction, 
    always make sure to validate the customer order ID and also confirm with the user 
    that they want to raise a refund request for the order.
    NEVER RAISE A REFUND REQUEST FOR AN ORDER THAT HAS NOT BEEN VALIDATED SUCCESSFULLY.`,
  parameters: {
    type: Type.OBJECT,
    properties: {
      orderId: { type: Type.STRING },
      reason: { type: Type.STRING },
    },
    required: ['orderId', 'reason'],
  },
};

export { raiseRefundRequest, raiseRefundRequestFD };
