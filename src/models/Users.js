export const UserSchema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'string',
      username: 'string',
      password: 'string', // Note: In a real app, passwords should be hashed
      email: 'string?',
      lastSyncDate: 'date?'
    }
  };