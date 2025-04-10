
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/CheckoutForm';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const translations = {
  fr: {
    redirectMessage: "Vous devez être connecté pour accéder à la page de paiement."
  },
  en: {
    redirectMessage: "You must be logged in to access the checkout page."
  }
};

const CheckoutPage = () => {
  const { user, language } = useAuth();
  const t = translations[language];
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: '/checkout' }} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <CheckoutForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
