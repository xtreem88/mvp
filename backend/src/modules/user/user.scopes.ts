export const defaultScope = {
  attributes: ['id', 'name', 'username', 'role', 'deposit', 'created_at', 'updated_at', 'deleted_at']
};

export const scopes = {
  full: {
    ...defaultScope
  },
  withPassword: {
    attributes: ['id', 'name', 'username', 'role', 'password']
  },
  resetPassword: {
    attributes: ['id', 'username', 'reset_password_token', 'reset_password_expires']
  },
  getUsers: {
    attributes: ['id', 'name', 'username', 'role', 'deposit']
  },
}
