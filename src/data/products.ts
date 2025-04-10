
import { Product } from "@/types";

const products: Product[] = [
  // Smartphones
  {
    id: "phone-1",
    name: "TechPhone Pro X",
    description: "Le smartphone le plus avancé avec un écran AMOLED 6.7 pouces et une caméra de 108MP.",
    price: 999.99,
    category: "smartphone",
    subcategory: "haut de gamme",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2342&auto=format&fit=crop",
    specifications: {
      screen: "6.7 pouces AMOLED 120Hz",
      processor: "OctaCore 3.2GHz",
      ram: "12GB",
      storage: "256GB",
      camera: "108MP + 48MP + 12MP",
      battery: "5000mAh",
      os: "Android 13"
    },
    stock: 42,
    rating: 4.8,
    createdAt: "2023-01-15T12:00:00Z"
  },
  {
    id: "phone-2",
    name: "TechPhone Lite",
    description: "Un smartphone abordable avec d'excellentes performances pour tous les jours.",
    price: 399.99,
    category: "smartphone",
    subcategory: "milieu de gamme",
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=2344&auto=format&fit=crop",
    specifications: {
      screen: "6.4 pouces LCD 90Hz",
      processor: "OctaCore 2.4GHz",
      ram: "6GB",
      storage: "128GB",
      camera: "64MP + 12MP",
      battery: "4500mAh",
      os: "Android 12"
    },
    stock: 78,
    rating: 4.3,
    createdAt: "2023-02-10T12:00:00Z"
  },
  {
    id: "phone-3",
    name: "TechPhone Fold",
    description: "Un smartphone pliable révolutionnaire avec un grand écran déplié de 7.6 pouces.",
    price: 1499.99,
    category: "smartphone",
    subcategory: "pliable",
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=2187&auto=format&fit=crop",
    specifications: {
      screen: "7.6 pouces AMOLED pliable + 6.2 pouces externe",
      processor: "OctaCore 3.4GHz",
      ram: "16GB",
      storage: "512GB",
      camera: "108MP + 48MP + 12MP + 10MP",
      battery: "4800mAh",
      os: "Android 13"
    },
    stock: 15,
    rating: 4.7,
    createdAt: "2023-03-05T12:00:00Z"
  },

  // Laptops
  {
    id: "laptop-1",
    name: "TechVista UltraBook",
    description: "Un ordinateur portable ultrafin et puissant pour les professionnels.",
    price: 1299.99,
    category: "laptop",
    subcategory: "ultrabook",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2342&auto=format&fit=crop",
    specifications: {
      screen: "14 pouces 4K",
      processor: "Intel Core i7-12800H",
      ram: "16GB",
      storage: "1TB SSD",
      graphics: "Intel Iris Xe",
      battery: "14 heures",
      os: "Windows 11 Pro"
    },
    stock: 23,
    rating: 4.9,
    createdAt: "2023-01-20T12:00:00Z"
  },
  {
    id: "laptop-2",
    name: "TechVista Gaming Beast",
    description: "Ordinateur portable pour les jeux avec une carte graphique RTX puissante.",
    price: 1899.99,
    category: "laptop",
    subcategory: "gaming",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2340&auto=format&fit=crop",
    specifications: {
      screen: "17.3 pouces 165Hz",
      processor: "AMD Ryzen 9 5900HX",
      ram: "32GB",
      storage: "2TB SSD",
      graphics: "NVIDIA RTX 4080",
      battery: "6 heures",
      os: "Windows 11"
    },
    stock: 12,
    rating: 4.7,
    createdAt: "2023-02-15T12:00:00Z"
  },
  {
    id: "laptop-3",
    name: "TechVista WorkStation",
    description: "Une station de travail mobile pour le développement et la création de contenu.",
    price: 2499.99,
    category: "laptop",
    subcategory: "workstation",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2340&auto=format&fit=crop",
    specifications: {
      screen: "15.6 pouces 4K",
      processor: "Intel Core i9-12900HK",
      ram: "64GB",
      storage: "4TB SSD",
      graphics: "NVIDIA RTX A5000",
      battery: "8 heures",
      os: "Windows 11 Pro"
    },
    stock: 8,
    rating: 4.9,
    createdAt: "2023-03-10T12:00:00Z"
  },

  // Tablets
  {
    id: "tablet-1",
    name: "TechTab Pro",
    description: "Tablette haut de gamme avec un écran lumineux et un stylet inclus.",
    price: 799.99,
    category: "tablet",
    subcategory: "premium",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2340&auto=format&fit=crop",
    specifications: {
      screen: "12.9 pouces Liquid Retina XDR",
      processor: "A16 Bionic",
      ram: "8GB",
      storage: "256GB",
      camera: "12MP arrière, 12MP avant",
      battery: "10 heures",
      os: "iPadOS 16"
    },
    stock: 35,
    rating: 4.8,
    createdAt: "2023-01-25T12:00:00Z"
  },
  {
    id: "tablet-2",
    name: "TechTab Mini",
    description: "Tablette compacte idéale pour la lecture et la navigation web.",
    price: 349.99,
    category: "tablet",
    subcategory: "compact",
    image: "https://images.unsplash.com/photo-1623126908032-b18570c4799d?q=80&w=2344&auto=format&fit=crop",
    specifications: {
      screen: "8.4 pouces IPS",
      processor: "OctaCore 2.2GHz",
      ram: "4GB",
      storage: "64GB",
      camera: "8MP arrière, 5MP avant",
      battery: "12 heures",
      os: "Android 12"
    },
    stock: 50,
    rating: 4.4,
    createdAt: "2023-02-20T12:00:00Z"
  },
  {
    id: "tablet-3",
    name: "TechTab Draw",
    description: "Tablette spécialement conçue pour les artistes et designers.",
    price: 899.99,
    category: "tablet",
    subcategory: "artistic",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=2487&auto=format&fit=crop",
    specifications: {
      screen: "13 pouces, sensible à la pression",
      processor: "OctaCore 3.0GHz",
      ram: "16GB",
      storage: "512GB",
      camera: "13MP arrière, 8MP avant",
      battery: "9 heures",
      os: "Windows 11"
    },
    stock: 18,
    rating: 4.9,
    createdAt: "2023-03-15T12:00:00Z"
  },

  // Accessories
  {
    id: "accessory-1",
    name: "TechHeadphones Pro",
    description: "Écouteurs sans fil avec réduction de bruit active et qualité audio supérieure.",
    price: 249.99,
    category: "accessory",
    subcategory: "audio",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2146&auto=format&fit=crop",
    specifications: {
      type: "Supra-auriculaire",
      connectivity: "Bluetooth 5.2",
      battery: "30 heures",
      features: "ANC, Transparence, Spatial Audio",
      color: "Noir"
    },
    stock: 65,
    rating: 4.7,
    createdAt: "2023-01-30T12:00:00Z"
  },
  {
    id: "accessory-2",
    name: "TechWatch Smart",
    description: "Montre connectée avec suivi fitness et notifications.",
    price: 199.99,
    category: "accessory",
    subcategory: "wearable",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2344&auto=format&fit=crop",
    specifications: {
      screen: "1.5 pouces AMOLED",
      sensors: "Cardiaque, SpO2, Accéléromètre",
      connectivity: "Bluetooth, WiFi",
      battery: "7 jours",
      waterproof: "5 ATM"
    },
    stock: 48,
    rating: 4.5,
    createdAt: "2023-02-25T12:00:00Z"
  },
  {
    id: "accessory-3",
    name: "TechPower Ultra",
    description: "Batterie externe haute capacité pour tous vos appareils.",
    price: 79.99,
    category: "accessory",
    subcategory: "power",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=2036&auto=format&fit=crop",
    specifications: {
      capacity: "20,000mAh",
      ports: "USB-C, USB-A x2",
      charging: "Charge rapide 30W",
      features: "Affichage LED, Charge sans fil"
    },
    stock: 100,
    rating: 4.6,
    createdAt: "2023-03-20T12:00:00Z"
  }
];

export const getProducts = (): Product[] => products;

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
