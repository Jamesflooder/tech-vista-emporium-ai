
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Languages } from 'lucide-react';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useAuth();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleLanguage}
      title={language === "fr" ? "Switch to English" : "Passer en français"}
      aria-label={language === "fr" ? "Switch to English" : "Passer en français"}
    >
      <Languages className="h-5 w-5" />
      <span className="ml-2 hidden md:inline">{language === "fr" ? "FR" : "EN"}</span>
    </Button>
  );
};

export default LanguageToggle;
