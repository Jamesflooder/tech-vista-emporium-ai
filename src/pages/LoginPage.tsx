
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const translations = {
  fr: {
    login: "Connexion",
    register: "Inscription",
    loginTitle: "Connexion",
    loginDescription: "Connectez-vous à votre compte TechVista",
    registerTitle: "Inscription",
    registerDescription: "Créez un compte pour commencer à faire vos achats",
    email: "Email",
    password: "Mot de passe",
    forgotPassword: "Mot de passe oublié?",
    fullName: "Nom complet",
    confirmPassword: "Confirmer le mot de passe",
    loginButton: "Se connecter",
    registerButton: "S'inscrire",
    loggingIn: "Connexion en cours...",
    registering: "Inscription en cours...",
    adminTestTitle: "Pour tester en tant qu'administrateur:",
    adminTestEmail: "Email: admin@techvista.com",
    adminTestPassword: "Mot de passe: admin123",
    orUseAdmin: "Ou utilisez admin / motherboard",
  },
  en: {
    login: "Login",
    register: "Register",
    loginTitle: "Login",
    loginDescription: "Sign in to your TechVista account",
    registerTitle: "Register",
    registerDescription: "Create an account to start shopping",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot password?",
    fullName: "Full name",
    confirmPassword: "Confirm password",
    loginButton: "Login",
    registerButton: "Register",
    loggingIn: "Logging in...",
    registering: "Registering...",
    adminTestTitle: "To test as administrator:",
    adminTestEmail: "Email: admin@techvista.com",
    adminTestPassword: "Password: admin123",
    orUseAdmin: "Or use admin / motherboard",
  }
};

const LoginPage = () => {
  const { login, register: registerUser, user, language } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[language];
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from || '/';
      navigate(from);
    }
  }, [user, navigate, location.state]);
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast.error(language === "fr" ? "Veuillez remplir tous les champs" : "Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(loginData.email, loginData.password);
      
      // Navigate to the route the user was trying to access, or to home
      const from = location.state?.from || '/';
      navigate(from);
    } catch (error) {
      // Error handling is done in the login function
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      toast.error(language === "fr" ? "Veuillez remplir tous les champs" : "Please fill in all fields");
      return;
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      toast.error(language === "fr" ? "Les mots de passe ne correspondent pas" : "Passwords do not match");
      return;
    }
    
    if (registerData.password.length < 6) {
      toast.error(language === "fr" 
        ? "Le mot de passe doit contenir au moins 6 caractères" 
        : "Password must be at least 6 characters");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await registerUser(registerData.name, registerData.email, registerData.password);
      
      // Navigate to the route the user was trying to access, or to home
      const from = location.state?.from || '/';
      navigate(from);
    } catch (error) {
      // Error handling is done in the register function
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">{t.login}</TabsTrigger>
                <TabsTrigger value="register">{t.register}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.loginTitle}</CardTitle>
                    <CardDescription>
                      {t.loginDescription}
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t.email}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={language === "fr" ? "votre@email.com" : "your@email.com"}
                          value={loginData.email}
                          onChange={handleLoginChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">{t.password}</Label>
                          <Link 
                            to="/forgot-password" 
                            className="text-sm text-primary hover:underline"
                          >
                            {t.forgotPassword}
                          </Link>
                        </div>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          required
                        />
                      </div>
                      
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <p>{t.adminTestTitle}</p>
                        <p>{t.adminTestEmail}</p>
                        <p>{t.adminTestPassword}</p>
                        <p className="mt-1">{t.orUseAdmin}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t.loggingIn}
                          </>
                        ) : (
                          t.loginButton
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.registerTitle}</CardTitle>
                    <CardDescription>
                      {t.registerDescription}
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleRegister}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-name">{t.fullName}</Label>
                        <Input
                          id="register-name"
                          name="name"
                          placeholder={language === "fr" ? "Jean Dupont" : "John Doe"}
                          value={registerData.name}
                          onChange={handleRegisterChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">{t.email}</Label>
                        <Input
                          id="register-email"
                          name="email"
                          type="email"
                          placeholder={language === "fr" ? "votre@email.com" : "your@email.com"}
                          value={registerData.email}
                          onChange={handleRegisterChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">{t.password}</Label>
                        <Input
                          id="register-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={registerData.password}
                          onChange={handleRegisterChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-confirm-password">{t.confirmPassword}</Label>
                        <Input
                          id="register-confirm-password"
                          name="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={registerData.confirmPassword}
                          onChange={handleRegisterChange}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t.registering}
                          </>
                        ) : (
                          t.registerButton
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
