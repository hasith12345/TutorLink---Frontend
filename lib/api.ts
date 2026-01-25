// API configuration and utilities
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'

export interface SignupData {
  fullName: string
  email: string
  password: string
  role: 'student' | 'tutor'
  // Student-specific fields
  educationLevel?: string
  grade?: string
  subjects?: string[]
  learningMode?: string
  // Tutor-specific fields
  educationLevels?: string[]
  experience?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  role: 'student' | 'tutor'
  email?: string
  isEmailVerified?: boolean
  message?: string
}

export interface ApiError {
  message: string
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('An unexpected error occurred')
    }
  }

  // Authentication endpoints
  async signup(data: SignupData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async login(data: LoginData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async verifyEmail(email: string, code: string): Promise<{ verified: boolean; message: string }> {
    return this.request('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    })
  }

  async resendVerificationCode(email: string): Promise<{ sent: boolean; message: string }> {
    return this.request('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  // Add token to requests for authenticated endpoints
  setAuthToken(token: string) {
    // This can be used for future authenticated requests
    return token
  }
}

export const api = new ApiClient(API_BASE_URL)

// Helper functions for auth storage
export const authStorage = {
  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  },

  setRole(role: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('role', role)
    }
  },

  getRole(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('role')
    }
    return null
  },

  clear() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  },
}
