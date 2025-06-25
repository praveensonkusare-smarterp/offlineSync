export const ContentSchema = {
    name: 'Content',
    primaryKey: 'id',
    properties: {
      id: 'string',
      title: 'string',
      description: 'string',
      createdAt: 'date',
      updatedAt: 'date',
      isDeleted: 'bool',
      isSynced: 'bool',
      userId: 'string'
    }
  };