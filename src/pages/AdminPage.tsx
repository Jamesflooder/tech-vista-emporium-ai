
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';
import { useOrders } from '@/context/OrderContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Edit, 
  Trash, 
  Plus, 
  Package, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  BarChart2, 
  Truck 
} from 'lucide-react';
import { ProductCategory } from '@/types';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const AdminPage = () => {
  const { user } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { orders, getAllOrders, updateOrderStatus } = useOrders();
  const navigate = useNavigate();
  
  // Redirect if not admin
  if (!user?.isAdmin) {
    navigate('/');
    return null;
  }
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'smartphone' as ProductCategory,
    subcategory: '',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=2329&auto=format&fit=crop',
    specifications: {} as Record<string, string>,
    stock: '',
    rating: '4.5',
  });
  
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  
  const handleAddSpec = () => {
    if (specKey.trim() && specValue.trim()) {
      setNewProduct({
        ...newProduct,
        specifications: {
          ...newProduct.specifications,
          [specKey]: specValue,
        },
      });
      setSpecKey('');
      setSpecValue('');
    }
  };
  
  const handleRemoveSpec = (key: string) => {
    const updatedSpecs = { ...newProduct.specifications };
    delete updatedSpecs[key];
    
    setNewProduct({
      ...newProduct,
      specifications: updatedSpecs,
    });
  };
  
  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };
  
  const handleAddProduct = () => {
    // Validate form
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.category ||
      !newProduct.stock
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    try {
      addProduct({
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
        subcategory: newProduct.subcategory,
        image: newProduct.image,
        specifications: newProduct.specifications,
        stock: parseInt(newProduct.stock),
        rating: parseFloat(newProduct.rating),
      });
      
      // Reset form
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: 'smartphone',
        subcategory: '',
        image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=2329&auto=format&fit=crop',
        specifications: {},
        stock: '',
        rating: '4.5',
      });
      
      toast.success("Produit ajouté avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'ajout du produit");
      console.error(error);
    }
  };
  
  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit?")) {
      deleteProduct(id);
      toast.success("Produit supprimé avec succès");
    }
  };
  
  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status as any);
  };
  
  // Calculate stats
  const allOrders = getAllOrders();
  const totalRevenue = allOrders.reduce((total, order) => total + order.total, 0);
  const pendingOrders = allOrders.filter(order => order.status === 'pending').length;
  const productsByCategory = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Panneau d'administration</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Gérez vos produits, commandes et utilisateurs
          </p>
          
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Revenus totaux</p>
                    <p className="text-2xl font-bold">{totalRevenue.toFixed(2)} €</p>
                  </div>
                  <div className="bg-green-100 text-green-800 p-3 rounded-full">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Commandes totales</p>
                    <p className="text-2xl font-bold">{allOrders.length}</p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 p-3 rounded-full">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Produits</p>
                    <p className="text-2xl font-bold">{products.length}</p>
                  </div>
                  <div className="bg-purple-100 text-purple-800 p-3 rounded-full">
                    <Package className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Commandes en attente</p>
                    <p className="text-2xl font-bold">{pendingOrders}</p>
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 p-3 rounded-full">
                    <Truck className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="products">
            <TabsList className="mb-8">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>Produits</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Commandes</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                <span>Statistiques</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Products Tab */}
            <TabsContent value="products">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Liste des produits</CardTitle>
                      <CardDescription>
                        Gérez votre catalogue de produits
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border overflow-auto max-h-[600px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nom</TableHead>
                              <TableHead>Catégorie</TableHead>
                              <TableHead>Prix</TableHead>
                              <TableHead>Stock</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {products.map((product) => (
                              <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell className="capitalize">{product.category}</TableCell>
                                <TableCell>{product.price.toFixed(2)} €</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                      onClick={() => handleDeleteProduct(product.id)}
                                    >
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Ajouter un produit</CardTitle>
                      <CardDescription>
                        Créez un nouveau produit dans votre catalogue
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom du produit</Label>
                          <Input
                            id="name"
                            name="name"
                            value={newProduct.name}
                            onChange={handleProductChange}
                            placeholder="Nom du produit"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={newProduct.description}
                            onChange={handleProductChange}
                            placeholder="Description du produit"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="price">Prix (€)</Label>
                            <Input
                              id="price"
                              name="price"
                              type="number"
                              step="0.01"
                              min="0"
                              value={newProduct.price}
                              onChange={handleProductChange}
                              placeholder="99.99"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                              id="stock"
                              name="stock"
                              type="number"
                              min="0"
                              value={newProduct.stock}
                              onChange={handleProductChange}
                              placeholder="10"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="category">Catégorie</Label>
                            <Select
                              name="category"
                              value={newProduct.category}
                              onValueChange={(value) => 
                                setNewProduct({...newProduct, category: value as ProductCategory})
                              }
                            >
                              <SelectTrigger id="category">
                                <SelectValue placeholder="Sélectionner" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="smartphone">Smartphone</SelectItem>
                                <SelectItem value="laptop">Ordinateur</SelectItem>
                                <SelectItem value="tablet">Tablette</SelectItem>
                                <SelectItem value="accessory">Accessoire</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subcategory">Sous-catégorie</Label>
                            <Input
                              id="subcategory"
                              name="subcategory"
                              value={newProduct.subcategory}
                              onChange={handleProductChange}
                              placeholder="ex: haut de gamme"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="image">URL de l'image</Label>
                          <Input
                            id="image"
                            name="image"
                            value={newProduct.image}
                            onChange={handleProductChange}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-end">
                            <Label>Spécifications</Label>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={handleAddSpec}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Ajouter
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-5 gap-2">
                            <Input
                              className="col-span-2"
                              placeholder="Clé (ex: écran)"
                              value={specKey}
                              onChange={(e) => setSpecKey(e.target.value)}
                            />
                            <Input
                              className="col-span-3"
                              placeholder="Valeur (ex: 6.7 pouces AMOLED)"
                              value={specValue}
                              onChange={(e) => setSpecValue(e.target.value)}
                            />
                          </div>
                          
                          {Object.entries(newProduct.specifications).length > 0 && (
                            <div className="mt-2 border rounded-md divide-y">
                              {Object.entries(newProduct.specifications).map(([key, value]) => (
                                <div 
                                  key={key} 
                                  className="flex justify-between items-center p-2 text-sm"
                                >
                                  <div>
                                    <span className="font-medium">{key}:</span> {value}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-red-500"
                                    onClick={() => handleRemoveSpec(key)}
                                  >
                                    <Trash className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          className="w-full" 
                          onClick={handleAddProduct}
                        >
                          Ajouter le produit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des commandes</CardTitle>
                  <CardDescription>
                    Gérez et suivez toutes les commandes des clients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-auto max-h-[600px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allOrders
                          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                          .map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">#{order.id.slice(-8)}</TableCell>
                              <TableCell>{order.userId}</TableCell>
                              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                              <TableCell>{order.total.toFixed(2)} €</TableCell>
                              <TableCell>
                                <Badge 
                                  variant="outline" 
                                  className={
                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                                    order.status === 'delivered' ? 'bg-green-100 text-green-800 border-green-200' :
                                    'bg-red-100 text-red-800 border-red-200'
                                  }
                                >
                                  {order.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Select
                                  value={order.status}
                                  onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}
                                >
                                  <SelectTrigger className="w-32 h-8 text-xs">
                                    <SelectValue placeholder="Modifier" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">En attente</SelectItem>
                                    <SelectItem value="processing">En traitement</SelectItem>
                                    <SelectItem value="shipped">Expédiée</SelectItem>
                                    <SelectItem value="delivered">Livrée</SelectItem>
                                    <SelectItem value="cancelled">Annulée</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Stats Tab */}
            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Produits par catégorie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(productsByCategory).map(([category, count]) => (
                        <div key={category} className="flex items-center">
                          <div className="flex-1">
                            <p className="capitalize">{category}</p>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                              <div 
                                className="bg-primary h-2.5 rounded-full" 
                                style={{ width: `${(count / products.length) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="ml-4 font-medium">{count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Statuts des commandes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => {
                        const count = allOrders.filter(order => order.status === status).length;
                        return (
                          <div key={status} className="flex items-center">
                            <div className="flex-1">
                              <p className="capitalize">{status}</p>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                                <div 
                                  className={
                                    status === 'pending' ? 'bg-yellow-500 h-2.5 rounded-full' :
                                    status === 'processing' ? 'bg-blue-500 h-2.5 rounded-full' :
                                    status === 'shipped' ? 'bg-purple-500 h-2.5 rounded-full' :
                                    status === 'delivered' ? 'bg-green-500 h-2.5 rounded-full' :
                                    'bg-red-500 h-2.5 rounded-full'
                                  }
                                  style={{ width: allOrders.length ? `${(count / allOrders.length) * 100}%` : '0%' }}
                                ></div>
                              </div>
                            </div>
                            <span className="ml-4 font-medium">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
