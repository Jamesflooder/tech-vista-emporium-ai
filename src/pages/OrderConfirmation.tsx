
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useOrders } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle, Package, Clock } from 'lucide-react';

const OrderConfirmation = () => {
  const { orders } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Get the latest order
  const latestOrder = user ? 
    orders
      .filter(order => order.userId === user.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] 
    : null;
  
  useEffect(() => {
    // If no order found, redirect to home
    if (!latestOrder) {
      navigate('/');
    }
  }, [latestOrder, navigate]);
  
  if (!latestOrder) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Merci pour votre commande!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Votre commande a été reçue et est en cours de traitement.
          </p>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">Informations de commande</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Numéro de commande: <span className="font-medium text-gray-900 dark:text-gray-50">{latestOrder.id}</span></p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date: <span className="font-medium text-gray-900 dark:text-gray-50">{new Date(latestOrder.createdAt).toLocaleDateString()}</span></p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total: <span className="font-medium text-gray-900 dark:text-gray-50">{latestOrder.total.toFixed(2)} €</span></p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Méthode de paiement: <span className="font-medium text-gray-900 dark:text-gray-50">{latestOrder.paymentMethod === 'card' ? 'Carte bancaire' : latestOrder.paymentMethod}</span></p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Adresse de livraison</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{latestOrder.address}</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Articles commandés</h3>
                <div className="space-y-4">
                  {latestOrder.items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 items-center">
                      <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Quantité: {item.quantity} × {item.product.price.toFixed(2)} €
                        </p>
                      </div>
                      <p className="font-medium">
                        {(item.product.price * item.quantity).toFixed(2)} €
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
            <h3 className="font-semibold mb-4">Prochaines étapes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-3 rounded-full mb-2">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium mb-1">Confirmation</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Commande confirmée</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full mb-2">
                  <Package className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </div>
                <h4 className="font-medium mb-1">Préparation</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Commande en préparation</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full mb-2">
                  <Clock className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </div>
                <h4 className="font-medium mb-1">Livraison</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">En attente d'expédition</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link to="/">Retour à l'accueil</Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link to="/orders">Voir mes commandes</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
