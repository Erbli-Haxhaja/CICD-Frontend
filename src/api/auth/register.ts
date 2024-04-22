import { AxiosResponse } from 'axios';
import { axiosClient, DefaultApiResponse } from '..';

export interface User {
  id: string;
  customerNumber: number;
  email: string;
  role: string;
  userName: string;
  firstName: string;
  lastName: string;
  isBio: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  userAllergenes: any[];
}

export interface CreateUser extends Omit<User,
  'id'
  | 'customerNumber'
  | 'role'
  | 'isBio'
  | 'isVegan'
  | 'isVegetarian'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'userAllergenes'
> {
  password: string;
  confirmPassword: string;
}

export interface UpdateUser extends Omit<User,
  'id'
  | 'customerNumber'
  | 'role'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'userAllergenes'
> {
}

export interface RegisterResponse {
  type: 'Bearer',
  token: string;
  user: User,
}

export function register(user: CreateUser): Promise<AxiosResponse<DefaultApiResponse<RegisterResponse[]>>>  {
  return axiosClient.post('/api/public/v1/register', {
    ...user,
  });
}
