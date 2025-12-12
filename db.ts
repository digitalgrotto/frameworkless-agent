type Order = {
  email: string;
  orderTotal: number;
};

const ORDERS: Record<string, Order> = {
  '11111': {
    email: 'jane.doe@email.com',
    orderTotal: 100.0,
  },
  '22222': {
    email: 'john.doe@email.com',
    orderTotal: 200.0,
  },
  '33333': {
    email: 'jane.smith@email.com',
    orderTotal: 300.0,
  },
};

function getOrder(orderId: string): Order | undefined {
  return ORDERS[orderId];
}

export { getOrder };
