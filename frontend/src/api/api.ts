import axios, { AxiosError } from 'axios';
import type { User, Transaction } from '../types';

const API_BASE_URL = 'https://payment-app-backend-dulq.onrender.com';


interface BalanceResponse {
  balance: {
    balance: number;
  };
}

interface UserResponse {
  user: User;
}

interface UsersResponse {
  users: User[];
}

interface TransactionsResponse {
  transactions: Transaction[];
}

const getAuthHeader = (): Record<string, string> => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
});
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<UsersResponse>(
      `${API_BASE_URL}/user/all-users`,
      { headers: getAuthHeader() }
    );
    return response.data.users;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error('Error fetching users:', axiosError.message);
    throw axiosError;
  }
};

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get<TransactionsResponse>(
      `${API_BASE_URL}/transaction/my-transactions`,
      { headers: getAuthHeader() }
    );
    return response.data.transactions;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error('Error fetching transactions:', axiosError.message);
    throw axiosError;
  }
};

export const getBalance = async (): Promise<number> => {
  try {
    const response = await axios.get<BalanceResponse>(
      `${API_BASE_URL}/user/my-balance`,
      { headers: getAuthHeader() }
    );
    return response.data.balance.balance;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error('Error fetching balance:', axiosError.message);
    throw axiosError;
  }
};

export const getMyDetails = async (): Promise<User> => {
  try {
    const response = await axios.get<UserResponse>(
      `${API_BASE_URL}/user/me`,
      { headers: getAuthHeader() }
    );
    return response.data.user;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error('Error fetching user details:', axiosError.message);
    throw axiosError;
  }
};

// Enhanced reusable API request function with proper typing
interface ApiRequestOptions<T = any> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: T;
}

export const apiRequest = async <T, U = any>(
  options: ApiRequestOptions<U>
): Promise<T> => {
  const { url, method, body } = options;
  const headers = getAuthHeader();
  
  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${url}`, config);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
};

// Example of using the reusable function with proper typing:
// interface TransferData {
//   amount: number;
//   receiverUpiId: string;
//   note?: string;
// }

// export const sendMoney = async (transferData: TransferData): Promise<Transaction> => {
//   return apiRequest<Transaction>({
//     url: '/transactions/send',
//     method: 'POST',
//     body: transferData
//   });
// };