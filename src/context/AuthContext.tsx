
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  language: "fr" | "en";
  theme: "light" | "dark" | "auto";
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  toggleLanguage: () => void;
  setTheme: (theme: "light" | "dark" | "auto") => void;
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
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  const [theme, setThemeState] = useState<"light" | "dark" | "auto">("light");

  useEffect(() => {
    // On mount, check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Check saved language preference
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
    
    // Check saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark" || savedTheme === "auto")) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("light");
    }
    
    setLoading(false);
  }, []);

  const applyTheme = (selectedTheme: "light" | "dark" | "auto") => {
    const root = window.document.documentElement;
    
    if (selectedTheme === "auto") {
      // Check system preference
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.remove("light", "dark");
      root.classList.add(systemPreference);
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(selectedTheme);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === "fr" ? "en" : "fr";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    
    // Notify user
    toast.success(newLanguage === "fr" ? "Langue changée en français" : "Language changed to English");
  };

  const setTheme = (newTheme: "light" | "dark" | "auto") => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    
    // Notify user
    const message = language === "fr" 
      ? (newTheme === "light" ? "Thème clair activé" : newTheme === "dark" ? "Thème sombre activé" : "Thème automatique activé")
      : (newTheme === "light" ? "Light theme enabled" : newTheme === "dark" ? "Dark theme enabled" : "Auto theme enabled");
    
    toast.success(message);
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Admin login check
      if (email === "admin" && password === "motherboard") {
        const adminUser: User = {
          id: "admin-special",
          email: "admin@techvista.com",
          name: "Administrator",
          isAdmin: true,
          createdAt: new Date().toISOString(),
        };
        setUser(adminUser);
        localStorage.setItem("user", JSON.stringify(adminUser));
        const successMessage = language === "fr" ? "Connexion réussie en tant qu'administrateur" : "Successfully logged in as administrator";
        toast.success(successMessage);
        return;
      }
      // Regular admin check
      else if (email === "admin@techvista.com" && password === "admin123") {
        const adminUser: User = {
          id: "admin-1",
          email: "admin@techvista.com",
          name: "Admin User",
          isAdmin: true,
          createdAt: new Date().toISOString(),
        };
        setUser(adminUser);
        localStorage.setItem("user", JSON.stringify(adminUser));
        const successMessage = language === "fr" ? "Connexion réussie en tant qu'administrateur" : "Successfully logged in as administrator";
        toast.success(successMessage);
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
        const successMessage = language === "fr" ? "Connexion réussie" : "Successfully logged in";
        toast.success(successMessage);
        return;
      }
      
      const errorMessage = language === "fr" ? "Identifiants invalides" : "Invalid credentials";
      throw new Error(errorMessage);
    } catch (error) {
      const errorMessage = language === "fr" 
        ? "Échec de la connexion: " + (error as Error).message
        : "Login failed: " + (error as Error).message;
      toast.error(errorMessage);
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
      const successMessage = language === "fr" ? "Inscription réussie" : "Registration successful";
      toast.success(successMessage);
    } catch (error) {
      const errorMessage = language === "fr" 
        ? "Échec de l'inscription: " + (error as Error).message
        : "Registration failed: " + (error as Error).message;
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    const successMessage = language === "fr" ? "Déconnexion réussie" : "Successfully logged out";
    toast.success(successMessage);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      language,
      theme,
      login,
      register,
      logout,
      isAdmin: user?.isAdmin || false,
      toggleLanguage,
      setTheme,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
