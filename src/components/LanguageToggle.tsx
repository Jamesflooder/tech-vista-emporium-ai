
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Languages } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useAuth();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleLanguage}
          aria-label={language === "fr" ? "Switch to English" : "Passer en français"}
        >
          <Languages className="h-5 w-5" />
          <span className="ml-2 hidden md:inline">{language === "fr" ? "FR" : "EN"}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {language === "fr" ? "Switch to English" : "Passer en français"}
      </TooltipContent>
    </Tooltip>
  );
};

export default LanguageToggle;
