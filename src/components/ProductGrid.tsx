
import { useState } from 'react';
import { Product, ProductCategory } from '@/types';
import ProductCard from './ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useDebounce } from '@/hooks/use-debounce';

interface ProductGridProps {
  products: Product[];
  title?: string;
  showFilters?: boolean;
}

const ProductGrid = ({ products, title, showFilters = false }: ProductGridProps) => {
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const getMinMaxPrice = () => {
    if (products.length === 0) return [0, 3000];
    const prices = products.map(p => p.price);
    return [Math.min(...prices), Math.max(...prices)];
  };

  const filteredProducts = products
    .filter(product => {
      // Filter by search term
      const matchesSearch = 
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      // Filter by category
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      // Filter by price range
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      
      {showFilters && (
        <div className="bg-white dark:bg-techVista-black p-4 rounded-lg shadow-sm mb-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Recherche</Label>
              <Input
                id="search"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value as ProductCategory | 'all')}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Toutes catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  <SelectItem value="smartphone">Smartphones</SelectItem>
                  <SelectItem value="laptop">Ordinateurs</SelectItem>
                  <SelectItem value="tablet">Tablettes</SelectItem>
                  <SelectItem value="accessory">Accessoires</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="sort">Trier par</Label>
              <Select
                value={sortBy}
                onValueChange={setSortBy}
              >
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Par défaut</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="name-asc">Nom A-Z</SelectItem>
                  <SelectItem value="name-desc">Nom Z-A</SelectItem>
                  <SelectItem value="rating-desc">Meilleures notes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Prix: {priceRange[0]}€ - {priceRange[1]}€</Label>
              <Slider
                defaultValue={getMinMaxPrice()}
                min={0}
                max={3000}
                step={10}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="mt-6"
              />
            </div>
          </div>
        </div>
      )}
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Aucun produit trouvé avec ces critères.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
