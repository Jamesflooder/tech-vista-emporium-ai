
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/CheckoutForm';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { user } = useAuth();
  
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
