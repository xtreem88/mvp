export const defaultScope = {
  attributes: ['id',  'amountAvailable', 'cost', 'productName', 'sellerId', 'created_at', 'updated_at']
};

export const scopes = {
  full: {
    ...defaultScope
  },
  getProducts: {
    attributes: ['id',  'amountAvailable', 'cost', 'productName', 'sellerId']
  }
}
