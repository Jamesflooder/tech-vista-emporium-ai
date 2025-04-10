
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';

const AIAssistantPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-center">Assistant IA TechVista</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-2xl mx-auto">
            Notre assistant IA peut vous aider à choisir les meilleurs produits, répondre à vos questions techniques ou analyser des images de produits.
          </p>
          
          <AIAssistant />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIAssistantPage;
