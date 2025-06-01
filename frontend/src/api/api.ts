import axios from 'axios'; // Using axios for cleaner syntax and error handling

const API_BASE_URL = 'https://payment-app-backend-dulq.onrender.com';

const getAuthHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/all-users`, { headers: getAuthHeader() });
    return response.data.users;
  } catch (error: any) {
    console.error('Error fetching users:', error);
    throw error; // Re-throw for component-level handling
  }
};

export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transaction/my-transactions`, { headers: getAuthHeader() });
    return response.data.transactions;
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const getBalance = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/my-balance`, { headers: getAuthHeader() });
    return response.data.balance.balance;
  } catch (error: any) {
    console.error('Error fetching balance:', error);
    // Optionally return a default or throw the error
    throw error;
  }
};

export const getMyDetails = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/me`, { headers: getAuthHeader() });
    return response.data.user;
  } catch (error: any) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

// Example of a reusable API request function (using fetch):
const apiRequest = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any) => {
  const headers = getAuthHeader();
  const config: RequestInit = {
    method,
    headers,
  };
  if (body) {
    headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(body);
  }
  const response = await fetch(`${API_BASE_URL}${url}`, config);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API request failed with status ${response.status}`);
  }
  return await response.json();
};

// Example of using the reusable function:
// export const sendMoney = async (transferData: any) => {
//   return apiRequest('/transactions/send', 'POST', transferData);
// };