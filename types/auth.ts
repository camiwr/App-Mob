export interface CreateUserDto {
  name: string;
  email: string;
  password_hash?: string;
  cpf?: string;
  phone?: string;
}

export interface LoginDto {
  email: string;
  password_hash: string;
}

export interface LoginResponse {
  accessToken: string;
}