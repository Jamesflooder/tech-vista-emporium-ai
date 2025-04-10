
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { useProducts } from '@/context/ProductContext';
import { ProductCategory } from '@/types';

const ProductsPage = () => {
  const { category } = useParams<{ category?: string }>();
  const { products, getProductsByCategory } = useProducts();
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [category]);

  let filteredProducts = products;
  let pageTitle = 'Tous nos produits';
  
  if (category) {
    const validCategory = category as ProductCategory;
    filteredProducts = getProductsByCategory(validCategory);
    
    switch (category) {
      case 'smartphone':
        pageTitle = 'Smartphones';
        break;
      case 'laptop':
        pageTitle = 'Ordinateurs';
        break;
      case 'tablet':
        pageTitle = 'Tablettes';
        break;
      case 'accessory':
        pageTitle = 'Accessoires';
        break;
      default:
        pageTitle = 'Produits';
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">{pageTitle}</h1>
          
          <ProductGrid 
            products={filteredProducts} 
            showFilters={true}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
