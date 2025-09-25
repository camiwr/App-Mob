export interface CreateUserDto {
  name: string;
  email: string;
  password?: string;
  cpf?: string;      
  phone?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}