
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center">À propos de TechVista</h1>
            
            <div className="aspect-video rounded-lg overflow-hidden mb-8">
              <img 
                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop"
                alt="TechVista Team" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="prose dark:prose-invert max-w-none mb-10">
              <h2 className="text-2xl font-semibold mb-4">Notre Histoire</h2>
              <p className="mb-6">
                Fondée en 2020, TechVista est née de la passion de deux ingénieurs pour la technologie et l'innovation. 
                Notre mission est de rendre la technologie accessible à tous, en offrant des produits de haute qualité 
                à des prix compétitifs, accompagnés d'un service client exceptionnel.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
              <p className="mb-6">
                Chez TechVista, nous croyons que la technologie devrait améliorer la vie quotidienne. 
                C'est pourquoi nous sélectionnons soigneusement chaque produit de notre catalogue, 
                en veillant à ce qu'il réponde à nos normes élevées de qualité, de performance et de durabilité. 
                De plus, notre équipe d'experts est toujours disponible pour vous guider dans vos choix et répondre à vos questions.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">Nos Valeurs</h2>
              <ul className="list-disc pl-6 mb-6">
                <li className="mb-2"><strong>Innovation</strong> - Nous restons à la pointe de la technologie pour vous offrir les dernières innovations.</li>
                <li className="mb-2"><strong>Qualité</strong> - Nous ne compromettrons jamais sur la qualité de nos produits.</li>
                <li className="mb-2"><strong>Service client</strong> - Votre satisfaction est notre priorité absolue.</li>
                <li className="mb-2"><strong>Durabilité</strong> - Nous nous engageons à réduire notre impact environnemental.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4">L'équipe TechVista</h2>
              <p className="mb-6">
                Notre équipe est composée de passionnés de technologie, d'experts en service client et de professionnels 
                du commerce électronique. Ensemble, nous travaillons chaque jour pour vous offrir la meilleure expérience 
                d'achat possible, que ce soit en ligne ou dans nos boutiques physiques.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button asChild className="mr-4">
                <Link to="/products">Découvrir nos produits</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
