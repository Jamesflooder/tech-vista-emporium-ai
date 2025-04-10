
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Package, 
  Clock, 
  Check, 
  Truck, 
  ShoppingBag, 
  AlertTriangle,
  ArrowRight,
  Eye
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const OrdersPage = () => {
  const { user } = useAuth();
  const { getOrdersByUser } = useOrders();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  if (!user) {
    navigate('/login', { state: { from: '/orders' } });
    return null;
  }
  
  const userOrders = getOrdersByUser(user.id);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'processing':
        return 'En traitement';
      case 'shipped':
        return 'Expédiée';
      case 'delivered':
        return 'Livrée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Mes commandes</h1>
          
          {userOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-gray-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Aucune commande</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Vous n'avez pas encore passé de commande. Parcourez notre catalogue pour trouver des produits qui vous plaisent.
              </p>
              <Button asChild>
                <a href="/products">Découvrir nos produits</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {userOrders
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 dark:bg-gray-800">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            Commande #{order.id.slice(-8)}
                          </CardTitle>
                          <CardDescription>
                            Passée le {new Date(order.createdAt).toLocaleDateString()} à {new Date(order.createdAt).toLocaleTimeString()}
                          </CardDescription>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(order.status)} flex items-center gap-1 px-3 py-1`}
                        >
                          {getStatusIcon(order.status)}
                          <span>{getStatusText(order.status)}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {order.items.slice(0, 3).map((item) => (
                          <div key={item.product.id} className="flex gap-4">
                            <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden shrink-0">
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
                          </div>
                        ))}
                        
                        {order.items.length > 3 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            + {order.items.length - 3} autres produits
                          </p>
                        )}
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Total: <span className="font-semibold text-gray-900 dark:text-gray-50 text-base">{order.total.toFixed(2)} €</span>
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {order.items.reduce((acc, item) => acc + item.quantity, 0)} articles
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => navigate(`/order/${order.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                          <span>Détails</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrdersPage;
