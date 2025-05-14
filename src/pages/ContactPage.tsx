
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  subject: z.string().min(5, {
    message: "Le sujet doit comporter au moins 5 caractères.",
  }),
  message: z.string().min(10, {
    message: "Le message doit comporter au moins 10 caractères.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    // Create mailto URL with form data
    const mailtoUrl = `mailto:kakudja0@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
      `De: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
    )}`;
    
    // Open the mailto URL in a new window
    window.open(mailtoUrl, '_blank');
    
    // Show success toast
    toast({
      title: "Formulaire prêt à être envoyé",
      description: "Votre client mail s'est ouvert avec votre message.",
    });
    
    // Reset the form
    form.reset();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-center">Contactez-nous</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-center">
              Vous avez des questions? N'hésitez pas à nous contacter.
            </p>
            
            <Card>
              <CardHeader>
                <CardTitle>Formulaire de contact</CardTitle>
                <CardDescription>
                  Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="votre@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sujet</FormLabel>
                          <FormControl>
                            <Input placeholder="Sujet de votre message" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Votre message..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">Envoyer le message</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-gray-500 dark:text-gray-400">kakudja0@gmail.com</p>
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-2">Téléphone</h3>
                <p className="text-gray-500 dark:text-gray-400">+33 1 23 45 67 89</p>
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-2">Adresse</h3>
                <p className="text-gray-500 dark:text-gray-400">123 Rue du Commerce, Paris</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
