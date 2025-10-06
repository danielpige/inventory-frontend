export interface Audit {
  id: string;
  entity: Entity;
  entityId: string;
  action: Action;
  before: null;
  after: any;
  userId: string;
  createdAt: Date;
}

export enum Action {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE',
}

export enum Entity {
  Product = 'Product',
  User = 'User',
}
