
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  LogOut,
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Home
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-techVista-black border-b border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gradient">TechVista</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-6">
              <Link to="/" className="nav-link px-3 py-2 text-sm font-medium">
                Accueil
              </Link>
              <Link to="/products/smartphone" className="nav-link px-3 py-2 text-sm font-medium">
                Smartphones
              </Link>
              <Link to="/products/laptop" className="nav-link px-3 py-2 text-sm font-medium">
                Ordinateurs
              </Link>
              <Link to="/products/tablet" className="nav-link px-3 py-2 text-sm font-medium">
                Tablettes
              </Link>
              <Link to="/products/accessory" className="nav-link px-3 py-2 text-sm font-medium">
                Accessoires
              </Link>
              <Link to="/ai-assistant" className="nav-link px-3 py-2 text-sm font-medium">
                IA Assistant
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end max-w-lg">
            <form onSubmit={handleSearch} className="w-full lg:max-w-xs flex">
              <Input
                className="w-full"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon" className="ml-1">
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>

          {/* Right navigation */}
          <div className="flex items-center">
            <Link to="/cart" className="ml-4 relative">
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-3">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      Administration
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    Mes Commandes
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="ml-3"
                onClick={() => navigate('/login')}
              >
                Connexion
              </Button>
            )}
            
            {/* Mobile Menu */}
            <div className="ml-3 md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="py-4 space-y-4">
                    <div className="flex items-center mb-6">
                      <span className="text-xl font-bold text-gradient">TechVista</span>
                    </div>
                    <nav className="flex flex-col space-y-2">
                      <Link to="/" className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Home className="mr-3 h-5 w-5" />
                        Accueil
                      </Link>
                      <Link to="/products/smartphone" className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Smartphone className="mr-3 h-5 w-5" />
                        Smartphones
                      </Link>
                      <Link to="/products/laptop" className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Laptop className="mr-3 h-5 w-5" />
                        Ordinateurs
                      </Link>
                      <Link to="/products/tablet" className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Tablet className="mr-3 h-5 w-5" />
                        Tablettes
                      </Link>
                      <Link to="/products/accessory" className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Headphones className="mr-3 h-5 w-5" />
                        Accessoires
                      </Link>
                      <Link to="/ai-assistant" className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        Assistance IA
                      </Link>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
