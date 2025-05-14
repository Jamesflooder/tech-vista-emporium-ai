
import { Bot } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AIAssistantDialog from './AIAssistantDialog';

const FloatingAssistantButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              size="lg" 
              className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all fixed bottom-6 right-6 z-50"
              onClick={() => setDialogOpen(true)}
            >
              <Bot className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Assistant IA</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <AIAssistantDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </>
  );
};

export default FloatingAssistantButton;
