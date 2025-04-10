
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProducts } from '@/context/ProductContext';
import { ShoppingBag, Zap, ShieldCheck, HeadphonesIcon, Cpu, Smartphone, Laptop, Tablet } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const { products, getProductsByCategory } = useProducts();
  
  const smartphones = getProductsByCategory('smartphone').slice(0, 4);
  const laptops = getProductsByCategory('laptop').slice(0, 4);
  const tablets = getProductsByCategory('tablet').slice(0, 4);
  const accessories = getProductsByCategory('accessory').slice(0, 4);
  
  const featuredProducts = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-techVista-black text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Découvrez la <span className="text-gradient">Technologie</span> de Demain
                </h1>
                <p className="text-lg text-gray-300">
                  Les derniers smartphones, ordinateurs et tablettes avec une assistance IA pour vous guider dans vos choix.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg">
                    <Link to="/products/smartphone">Explorer les produits</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/ai-assistant">Demander à l'IA</Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1620783770629-122b7f187703?q=80&w=3387&auto=format&fit=crop" 
                  alt="Latest Technology" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-12 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-techVista-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
              >
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Livraison gratuite</h3>
                <p className="text-gray-500 dark:text-gray-400">Sur toutes vos commandes en France métropolitaine</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-techVista-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
              >
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Paiement sécurisé</h3>
                <p className="text-gray-500 dark:text-gray-400">Vos transactions sont totalement protégées</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-techVista-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
              >
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Garantie 2 ans</h3>
                <p className="text-gray-500 dark:text-gray-400">Tous nos produits sont couverts pendant 24 mois</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-techVista-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
              >
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <HeadphonesIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Support 24/7</h3>
                <p className="text-gray-500 dark:text-gray-400">Notre équipe est là pour vous aider à tout moment</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Produits en vedette</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Découvrez notre sélection des produits les mieux notés
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button asChild>
                <Link to="/products">Voir tous les produits</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Product Categories */}
        <section className="py-12 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Catégories de produits</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Explorez notre large gamme de produits technologiques
              </p>
            </div>
            
            <Tabs defaultValue="smartphone">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="smartphone" className="flex flex-col items-center py-3">
                  <Smartphone className="h-5 w-5 mb-1" />
                  <span>Smartphones</span>
                </TabsTrigger>
                <TabsTrigger value="laptop" className="flex flex-col items-center py-3">
                  <Laptop className="h-5 w-5 mb-1" />
                  <span>Ordinateurs</span>
                </TabsTrigger>
                <TabsTrigger value="tablet" className="flex flex-col items-center py-3">
                  <Tablet className="h-5 w-5 mb-1" />
                  <span>Tablettes</span>
                </TabsTrigger>
                <TabsTrigger value="accessory" className="flex flex-col items-center py-3">
                  <HeadphonesIcon className="h-5 w-5 mb-1" />
                  <span>Accessoires</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="smartphone">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {smartphones.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button asChild variant="outline">
                    <Link to="/products/smartphone">Voir tous les smartphones</Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="laptop">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {laptops.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button asChild variant="outline">
                    <Link to="/products/laptop">Voir tous les ordinateurs</Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="tablet">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {tablets.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button asChild variant="outline">
                    <Link to="/products/tablet">Voir toutes les tablettes</Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="accessory">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {accessories.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button asChild variant="outline">
                    <Link to="/products/accessory">Voir tous les accessoires</Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* AI Assistant Promo */}
        <section className="py-16 bg-gradient-to-r from-techVista-black to-techVista-green/90 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=2673&auto=format&fit=crop" 
                  alt="AI Assistant" 
                  className="rounded-lg shadow-xl"
                />
              </div>
              
              <div className="order-1 md:order-2 space-y-6">
                <h2 className="text-3xl font-bold">
                  Besoin d'aide pour choisir ? Demandez à notre IA !
                </h2>
                <p className="text-lg text-gray-200">
                  Notre assistant alimenté par l'intelligence artificielle peut vous aider à trouver le produit parfait pour vos besoins, analyser des images et répondre à toutes vos questions techniques.
                </p>
                <Button asChild size="lg" variant="secondary">
                  <Link to="/ai-assistant">Consulter l'assistant IA</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
