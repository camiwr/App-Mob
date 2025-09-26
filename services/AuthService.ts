import api from './api';
import { LoginDto, LoginResponse, CreateUserDto } from '../types/auth';


const login = async (credentials: LoginDto): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login-password', credentials);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Credenciais inválidas ou erro no servidor.';
    if (Array.isArray(errorMessage)) {
      throw new Error(errorMessage.join(', '));
    }
    throw new Error(errorMessage);
  }
};

const register = async (userData: CreateUserDto): Promise<void> => {
  try {
    await api.post('/auth/create-user', userData);
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erro ao tentar registar.';
    if (Array.isArray(errorMessage)) {
      throw new Error(errorMessage.join(', '));
    }
    throw new Error(errorMessage);
  }
};

export const AuthService = {
  login,
  register,
};