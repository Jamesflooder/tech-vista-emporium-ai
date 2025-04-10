
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Star, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Minus, 
  Truck,
  ShieldCheck,
  Info 
} from 'lucide-react';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Get product data
  const product = getProductById(id || '');
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    if (!product) {
      toast.error("Produit non trouvé");
      navigate('/products');
    }
  }, [product, navigate]);
  
  if (!product) return null;
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.warning(`Désolé, nous n'avons que ${product.stock} unités en stock.`);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Generate similar products - products from the same category
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  // For demo purposes, we'll use the same image with different crop ratios to simulate a gallery
  const productImages = [
    product.image,
    product.image + "&crop=entropy",
    product.image + "&crop=focalpoint",
    product.image + "&crop=top"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-6 text-gray-500 dark:text-gray-400">
            <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">
              Accueil
            </button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <button 
              onClick={() => navigate(`/products/${product.category}`)} 
              className="hover:text-primary transition-colors capitalize"
            >
              {product.category}
            </button>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="truncate max-w-[200px]">{product.name}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <motion.img 
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={productImages[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((img, index) => (
                  <div 
                    key={index}
                    className={`aspect-square bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden cursor-pointer border-2 ${
                      index === activeImageIndex 
                        ? 'border-primary' 
                        : 'border-transparent'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-5 w-5" 
                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                        color={i < Math.floor(product.rating) ? "#f59e0b" : "#d1d5db"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {product.rating.toFixed(1)} • En stock ({product.stock} unités)
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">
                  {product.price.toFixed(2)} €
                </span>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Livraison gratuite
                </span>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 dark:text-gray-300">Quantité:</span>
                  <div className="flex items-center border rounded-md">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-4 flex-wrap">
                  <Button 
                    className="flex-1" 
                    size="lg" 
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Ajouter au panier
                  </Button>
                  <Button 
                    className="flex-1" 
                    variant="outline" 
                    size="lg"
                    onClick={() => {
                      addToCart(product, quantity);
                      navigate('/cart');
                    }}
                  >
                    Acheter maintenant
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Truck className="h-4 w-4 mr-2 text-primary" />
                  <span>Livraison gratuite</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                  <span>Garantie 2 ans</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Info className="h-4 w-4 mr-2 text-primary" />
                  <span>Support 24/7</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <Tabs defaultValue="specifications" className="mb-12">
            <TabsList className="w-full justify-start border-b rounded-none px-0 h-auto">
              <TabsTrigger value="specifications" className="rounded-none pb-2 data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Caractéristiques
              </TabsTrigger>
              <TabsTrigger value="description" className="rounded-none pb-2 data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Description détaillée
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none pb-2 data-[state=active]:border-b-2 data-[state=active]:border-primary">
                Avis clients
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Spécifications techniques</h3>
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 py-2 border-b border-gray-100 dark:border-gray-800">
                        <span className="text-gray-500 dark:text-gray-400 capitalize">{key}</span>
                        <span className="col-span-2">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Points forts</h3>
                  <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                    <li>Design élégant et ergonomique</li>
                    <li>Performances exceptionnelles</li>
                    <li>Excellente autonomie</li>
                    <li>Fonctionnalités innovantes</li>
                    <li>Support technique dédié</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="description" className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  {product.description} Ce produit a été conçu pour offrir une expérience utilisateur exceptionnelle, avec une attention particulière portée aux détails et à la qualité des matériaux.
                </p>
                <p>
                  Chaque {product.category} de notre gamme est soumis à des tests rigoureux pour garantir sa durabilité et ses performances. Nous utilisons les technologies les plus récentes pour vous offrir une expérience utilisateur optimale.
                </p>
                <p>
                  Notre engagement envers la qualité et l'innovation se reflète dans chaque aspect de ce produit, de sa conception à sa fabrication. Nous sommes fiers de proposer des produits qui répondent aux normes les plus élevées de l'industrie.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Avis clients</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Note moyenne: {product.rating.toFixed(1)}/5
                  </span>
                </div>
                
                <div className="space-y-4">
                  {/* Simulated reviews */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white">
                          S
                        </div>
                        <div>
                          <p className="font-medium">Sophie L.</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Il y a 2 semaines</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="h-4 w-4" 
                            fill={i < 5 ? "currentColor" : "none"}
                            color={i < 5 ? "#f59e0b" : "#d1d5db"}
                          />
                        ))}
                      </div>
                    </div>
                    <p>Excellent produit! Je l'utilise tous les jours et j'en suis très satisfaite. La qualité est au rendez-vous et les fonctionnalités sont intuitives.</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white">
                          T
                        </div>
                        <div>
                          <p className="font-medium">Thomas R.</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Il y a 1 mois</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="h-4 w-4" 
                            fill={i < 4 ? "currentColor" : "none"}
                            color={i < 4 ? "#f59e0b" : "#d1d5db"}
                          />
                        ))}
                      </div>
                    </div>
                    <p>Très bon rapport qualité-prix. Je recommande ce produit pour sa fiabilité et ses performances. La livraison a été rapide et le service client réactif.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {similarProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
