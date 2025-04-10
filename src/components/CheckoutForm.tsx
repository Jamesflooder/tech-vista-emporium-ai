
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { CreditCard, Truck, DollarSign } from 'lucide-react';

const CheckoutForm = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zipCode: '',
    country: 'France',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Vous devez être connecté pour finaliser votre commande");
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    
    // Form validation
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.zipCode) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc) {
        toast.error("Veuillez remplir tous les champs de paiement");
        return;
      }
    }
    
    try {
      setIsProcessing(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create the order
      const fullAddress = `${formData.address}, ${formData.zipCode} ${formData.city}, ${formData.country}`;
      
      createOrder(cart, totalPrice, fullAddress, formData.paymentMethod);
      
      // Clear the cart
      clearCart();
      
      // Show success message
      toast.success("Votre commande a été traitée avec succès!");
      
      // Redirect to order confirmation page
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error("Une erreur s'est produite lors du traitement de votre paiement");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
        <p className="mb-6">Ajoutez des produits avant de procéder au paiement</p>
        <Button onClick={() => navigate('/')}>Continuer vos achats</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Finalisez votre commande</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Checkout Form */}
        <div className="md:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-techVista-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Code postal</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-techVista-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Méthode de paiement</h3>
              
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted cursor-pointer">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="cursor-pointer flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Carte bancaire</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted cursor-pointer opacity-50">
                  <RadioGroupItem value="paypal" id="paypal" disabled />
                  <Label htmlFor="paypal" className="cursor-pointer flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" />
                    <span>PayPal (indisponible)</span>
                  </Label>
                </div>
              </RadioGroup>
              
              {formData.paymentMethod === 'card' && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Numéro de carte</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardExpiry">Date d'expiration</Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardCvc">CVC</Label>
                      <Input
                        id="cardCvc"
                        name="cardCvc"
                        placeholder="123"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? 'Traitement en cours...' : 'Payer et confirmer la commande'}
            </Button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="md:col-span-5">
          <div className="bg-white dark:bg-techVista-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 sticky top-20">
            <h3 className="text-lg font-semibold mb-4">Récapitulatif de commande</h3>
            
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1">{item.product.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Quantité: {item.quantity}
                    </p>
                    <p className="font-semibold">
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span className="text-green-600">Gratuit</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
            </div>
            
            <div className="mt-6 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Truck className="h-4 w-4 mr-2" />
              <span>Livraison estimée sous 3-5 jours ouvrés</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
