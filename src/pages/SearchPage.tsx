
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { useProducts } from '@/context/ProductContext';
import { Search } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const { products, searchProducts } = useProducts();
  const [searchResults, setSearchResults] = useState(products);
  
  const query = searchParams.get('q') || '';
  
  useEffect(() => {
    if (query) {
      const results = searchProducts(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query, searchProducts]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {query ? (
            <div>
              <h1 className="text-3xl font-bold mb-2">Résultats de recherche pour : "{query}"</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                {searchResults.length} résultats trouvés
              </p>
              
              {searchResults.length > 0 ? (
                <ProductGrid products={searchResults} showFilters={true} />
              ) : (
                <div className="text-center py-16">
                  <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h2>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    Nous n'avons pas trouvé de produits correspondant à votre recherche. Essayez avec d'autres termes ou parcourez nos catégories.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold mb-8">Rechercher des produits</h1>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Utilisez la barre de recherche en haut pour trouver des produits par nom, description ou catégorie.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
