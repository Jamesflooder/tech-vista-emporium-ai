
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <motion.div
      className="product-card overflow-hidden flex flex-col h-full"
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        <div className="relative overflow-hidden h-48 bg-gray-100 dark:bg-gray-800 rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          />
          <div className="absolute top-2 right-2 flex gap-1">
            <span className="flex items-center bg-white dark:bg-techVista-black px-2 py-1 rounded-full text-xs font-medium">
              <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
              {product.rating}
            </span>
          </div>
        </div>
        
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">{product.category}</p>
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">{product.description}</p>
          </div>
          
          <div className="mt-auto">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-primary">{product.price.toFixed(2)} €</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleAddToCart}
                  className="rounded-full"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  <span>Ajouter</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
