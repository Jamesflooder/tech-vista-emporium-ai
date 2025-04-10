
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'inscription à la newsletter
    alert('Merci de vous être inscrit à notre newsletter!');
  };

  return (
    <footer className="bg-techVista-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <span className="text-2xl font-bold text-gradient">TechVista</span>
            </Link>
            <p className="text-gray-400">
              Votre destination pour les dernières technologies à des prix compétitifs. 
              Smartphones, ordinateurs, tablettes et accessoires de qualité.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products/smartphone" className="text-gray-400 hover:text-primary transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link to="/products/laptop" className="text-gray-400 hover:text-primary transition-colors">
                  Ordinateurs
                </Link>
              </li>
              <li>
                <Link to="/products/tablet" className="text-gray-400 hover:text-primary transition-colors">
                  Tablettes
                </Link>
              </li>
              <li>
                <Link to="/products/accessory" className="text-gray-400 hover:text-primary transition-colors">
                  Accessoires
                </Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="text-gray-400 hover:text-primary transition-colors">
                  Assistant IA
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <MapPin size={18} className="mr-2" />
                <span>123 Avenue Technologie, Paris 75000</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={18} className="mr-2" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={18} className="mr-2" />
                <span>contact@techvista.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Inscrivez-vous pour recevoir les dernières offres et nouveautés
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Votre email"
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button type="submit" className="w-full">
                S'inscrire
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TechVista Emporium. Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-primary text-sm transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-primary text-sm transition-colors">
              Conditions d'utilisation
            </Link>
            <Link to="/shipping" className="text-gray-400 hover:text-primary text-sm transition-colors">
              Livraison & Retours
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
