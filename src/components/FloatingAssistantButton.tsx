
import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const FloatingAssistantButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/ai-assistant" className="fixed bottom-6 right-6 z-50">
            <Button 
              size="lg" 
              className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
            >
              <Bot className="h-6 w-6" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Assistant IA</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FloatingAssistantButton;
