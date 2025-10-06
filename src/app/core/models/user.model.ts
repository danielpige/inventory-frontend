import { FormControl } from '@angular/forms';

export interface User {
  id?: string;
  username: string;
  name: string;
  enable: boolean;
  password?: string;
  role?: Role;
  email?: string;
  createdAt?: string;
}

export enum Role {
  ADMIN = 'admin',
  OPERATOR = 'operator',
  VIEWER = 'viewer',
  AUDITOR = 'auditor',
}

export interface UserResponse {
  access_token: string;
  user: User;
}

export type LoginValues = Pick<User, 'username' | 'password'>;

export type LoginForm = {
  [K in keyof LoginValues]?: FormControl<LoginValues[K] | null>;
};

export type RegisterValues = Pick<User, 'username' | 'password' | 'email' | 'name'> & {
  confirmPassword: string;
};

export type RegisterForm = {
  [K in keyof RegisterValues]?: FormControl<RegisterValues[K] | null>;
};
