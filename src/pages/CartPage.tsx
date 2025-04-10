
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ChevronRight,
  ArrowRight 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      toast.error("Veuillez entrer un code promo");
      return;
    }
    
    setIsApplyingPromo(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.error("Code promo invalide ou expiré");
      setIsApplyingPromo(false);
    }, 1000);
  };
  
  const handleCheckout = () => {
    if (!user) {
      toast.error("Veuillez vous connecter pour finaliser votre commande");
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center max-w-md mx-auto py-12">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Votre panier est vide</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Il semble que vous n'ayez pas encore ajouté d'articles à votre panier.
            </p>
            <Button asChild size="lg">
              <Link to="/products">Découvrir nos produits</Link>
            </Button>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center text-sm mb-6 text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-primary transition-colors">
            Accueil
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span>Panier</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Votre panier</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-techVista-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-800 text-sm font-medium">
                <div className="col-span-6">Produit</div>
                <div className="col-span-2 text-center">Prix</div>
                <div className="col-span-2 text-center">Quantité</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {cart.map((item) => (
                  <div key={item.product.id} className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-6 flex gap-4 items-center">
                      <div className="h-20 w-20 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <Link 
                          to={`/product/${item.product.id}`} 
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {item.product.category}
                        </p>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 text-left md:text-center">
                      <div className="md:hidden text-sm text-gray-500 dark:text-gray-400">Prix:</div>
                      <span>{item.product.price.toFixed(2)} €</span>
                    </div>
                    
                    <div className="md:col-span-2 flex md:justify-center">
                      <div className="md:hidden text-sm text-gray-500 dark:text-gray-400 md:mr-0 mr-2 mt-1">Quantité:</div>
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8" 
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8" 
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 flex justify-between md:justify-end items-center">
                      <div className="md:hidden text-sm text-gray-500 dark:text-gray-400">Total:</div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">
                          {(item.product.price * item.quantity).toFixed(2)} €
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
              >
                Continuer vos achats
              </Button>
              
              <Button 
                variant="destructive" 
                onClick={clearCart}
              >
                Vider le panier
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-techVista-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Récapitulatif</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Sous-total</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Frais de livraison</span>
                  <span className="text-green-600">Gratuit</span>
                </div>
                
                <div className="pt-3">
                  <div className="flex">
                    <Input
                      placeholder="Code promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button 
                      onClick={handleApplyPromoCode}
                      disabled={isApplyingPromo}
                      className="rounded-l-none"
                    >
                      Appliquer
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center text-lg font-bold mb-6">
                <span>Total</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
              
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleCheckout}
              >
                Passer à la caisse
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <p>Méthodes de paiement acceptées:</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded">Visa</div>
                  <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded">Mastercard</div>
                  <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded">PayPal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
