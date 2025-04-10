
import { useState, useRef, useEffect } from 'react';
import { askAI, analyzeImage, AIResponse } from '@/services/aiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const AIAssistant = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string; image?: string }[]>([
    { 
      role: 'assistant', 
      content: "Bonjour ! Je suis l'assistant IA de TechVista. Je peux vous aider à choisir le meilleur produit électronique pour vos besoins, répondre à vos questions techniques, ou analyser une image de produit. Comment puis-je vous aider aujourd'hui ?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim() && !selectedImage) return;
    
    const userMessage = {
      role: 'user' as const,
      content: input,
      image: selectedImage || undefined
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      let response: AIResponse;
      
      if (selectedImage) {
        const prompt = input.trim() 
          ? `J'ai une image à analyser avec cette question: ${input}` 
          : "Analyse cette image et dis-moi ce que tu vois. S'il s'agit d'un produit électronique, donne-moi des informations sur ses caractéristiques possibles et sa qualité.";
        
        response = await analyzeImage(selectedImage, prompt);
        setSelectedImage(null);
      } else {
        response = await askAI(input);
      }
      
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response.text }
      ]);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Désolé, une erreur s'est produite. Veuillez réessayer.");
      setMessages((prev) => [
        ...prev,
        { 
          role: 'assistant', 
          content: "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          toast.success("Image chargée avec succès.");
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto bg-white dark:bg-techVista-black rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-techVista-green p-4 text-white">
        <h2 className="text-xl font-bold">Assistant IA TechVista</h2>
        <p className="text-sm opacity-80">Posez des questions sur nos produits ou analysez des images</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {message.image && (
                <div className="mb-2">
                  <img 
                    src={message.image} 
                    alt="Uploaded" 
                    className="max-h-40 rounded-md"
                  />
                </div>
              )}
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-secondary text-secondary-foreground max-w-[80%] p-3 rounded-lg flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <p>L'assistant réfléchit...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <Separator />
      
      {selectedImage && (
        <div className="p-2 bg-gray-100 dark:bg-gray-800 flex items-center gap-2">
          <img 
            src={selectedImage} 
            alt="Selected" 
            className="h-10 w-10 object-cover rounded"
          />
          <p className="text-sm flex-1 truncate">Image prête à être analysée</p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedImage(null)}
          >
            Retirer
          </Button>
        </div>
      )}
      
      <form onSubmit={handleSendMessage} className="p-4 flex items-end gap-2">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={triggerImageUpload}
          disabled={isLoading}
        >
          <ImageIcon className="h-5 w-5" />
        </Button>
        
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez une question ou décrivez votre besoin..."
          className="flex-1 resize-none"
          rows={1}
          disabled={isLoading}
        />
        
        <Button
          type="submit"
          disabled={(!input.trim() && !selectedImage) || isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default AIAssistant;
