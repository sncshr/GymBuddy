import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONFIG } from '../utils/constants';

export interface User {
  id: string;
  email: string;
  name: string;
  fitnessGoals?: string;
  age?: number;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  fitnessGoals?: string;
  age?: number;
}

class AuthService {
  private user: User | null = null;
  private token: string | null = null;

  constructor() {
    this.loadUserFromStorage();
  }

  private async loadUserFromStorage() {
    try {
      const userJson = await AsyncStorage.getItem(APP_CONFIG.AUTH.USER_KEY);
      const token = await AsyncStorage.getItem(APP_CONFIG.AUTH.TOKEN_KEY);

      if (userJson) {
        this.user = JSON.parse(userJson);
      }

      if (token) {
        this.token = token;
      }
    } catch (error) {
      console.error('Failed to load user from storage', error);
    }
  }

  public async login(credentials: LoginCredentials): Promise<User> {
    try {
      // In a real app, this would make an API call to authenticate
      // For now, we'll simulate a successful login
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'Demo User',
        fitnessGoals: 'Build muscle',
        age: 30,
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'mock-jwt-token';

      // Save to storage
      await AsyncStorage.setItem(APP_CONFIG.AUTH.USER_KEY, JSON.stringify(mockUser));
      await AsyncStorage.setItem(APP_CONFIG.AUTH.TOKEN_KEY, mockToken);

      // Update state
      this.user = mockUser;
      this.token = mockToken;

      return mockUser;
    } catch (error) {
      console.error('Login failed', error);
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  }

  public async register(data: RegisterData): Promise<User> {
    try {
      // In a real app, this would make an API call to register
      // For now, we'll simulate a successful registration
      const mockUser: User = {
        id: '1',
        email: data.email,
        name: data.name,
        fitnessGoals: data.fitnessGoals,
        age: data.age,
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'mock-jwt-token';

      // Save to storage
      await AsyncStorage.setItem(APP_CONFIG.AUTH.USER_KEY, JSON.stringify(mockUser));
      await AsyncStorage.setItem(APP_CONFIG.AUTH.TOKEN_KEY, mockToken);

      // Update state
      this.user = mockUser;
      this.token = mockToken;

      return mockUser;
    } catch (error) {
      console.error('Registration failed', error);
      throw new Error('Registration failed. Please try again.');
    }
  }

  public async logout(): Promise<void> {
    try {
      // Clear storage
      await AsyncStorage.removeItem(APP_CONFIG.AUTH.USER_KEY);
      await AsyncStorage.removeItem(APP_CONFIG.AUTH.TOKEN_KEY);

      // Clear state
      this.user = null;
      this.token = null;
    } catch (error) {
      console.error('Logout failed', error);
      throw new Error('Logout failed. Please try again.');
    }
  }

  public getUser(): User | null {
    return this.user;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public getToken(): string | null {
    return this.token;
  }
}

export default new AuthService(); 