import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'STAFF';
}

export interface AuthResponse {
  token: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  }

  async register(data: RegisterData): Promise<void> {
    await axios.post(`${API_URL}/auth/register`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}

export default new AuthService(); 