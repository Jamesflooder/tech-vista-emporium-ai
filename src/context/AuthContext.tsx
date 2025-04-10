
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // On mount, check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulate login logic - in reality this would verify against a backend
      if (email === "admin@techvista.com" && password === "admin123") {
        const adminUser: User = {
          id: "admin-1",
          email: "admin@techvista.com",
          name: "Admin User",
          isAdmin: true,
          createdAt: new Date().toISOString(),
        };
        setUser(adminUser);
        localStorage.setItem("user", JSON.stringify(adminUser));
        toast.success("Connexion réussie en tant qu'administrateur");
        return;
      } else if (email && password) {
        // For any other valid credentials, create a non-admin user
        const newUser: User = {
          id: `user-${Date.now()}`,
          email: email,
          name: email.split('@')[0],
          isAdmin: false,
          createdAt: new Date().toISOString(),
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        toast.success("Connexion réussie");
        return;
      }
      
      throw new Error("Identifiants invalides");
    } catch (error) {
      toast.error("Échec de la connexion: " + (error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to create an account
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        isAdmin: false,
        createdAt: new Date().toISOString(),
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Inscription réussie");
    } catch (error) {
      toast.error("Échec de l'inscription: " + (error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Déconnexion réussie");
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      isAdmin: user?.isAdmin || false,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
