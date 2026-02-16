export interface Post {
    id: number;
    title: string;
    category: string;
    content: string;
    createdAt: string;
}

export interface User {
    username: string;
    password: string;
}

// Definierar vad AuthContext ska innehålla (token, login och logout funktioner, isAuthenticated och loading boolean)
export interface AuthContextType {
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}