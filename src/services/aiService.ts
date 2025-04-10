
const GEMINI_API_KEY = "AIzaSyDxUPtVU9naSs865gQo6ydH-tHPVD_zzVw";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export interface AIResponse {
  text: string;
  error?: string;
}

export const askAI = async (prompt: string): Promise<AIResponse> => {
  try {
    // Ajouter des instructions pour limiter les réponses aux questions sur le site
    const enhancedPrompt = `Tu es l'assistant IA de TechVista, une boutique d'électronique vendant des smartphones, ordinateurs, tablettes et accessoires. 
    Tu dois UNIQUEMENT répondre aux questions concernant les produits, les services ou le fonctionnement du site e-commerce TechVista. 
    Si la question ne concerne pas le site ou les produits vendus, réponds poliment que tu ne peux répondre qu'aux questions relatives au site TechVista et ses produits.
    
    Question de l'utilisateur: ${prompt}`;
    
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: enhancedPrompt }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Gemini returns the response in a specific format, extract the text
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                  "Désolé, je n'ai pas pu générer une réponse. Veuillez réessayer.";
    
    return { text: aiText };
  } catch (error) {
    console.error("Error asking AI:", error);
    return { 
      text: "Désolé, une erreur s'est produite lors de la communication avec l'IA.", 
      error: (error as Error).message 
    };
  }
};

export const analyzeImage = async (imageUrl: string, prompt: string): Promise<AIResponse> => {
  try {
    // Ajouter des instructions pour limiter les réponses aux produits électroniques
    const enhancedPrompt = `Tu es l'assistant IA de TechVista, une boutique d'électronique vendant des smartphones, ordinateurs, tablettes et accessoires.
    Analyse cette image et donne des informations uniquement si elle montre un produit électronique ou un accessoire. 
    Si l'image ne montre pas un produit électronique ou un accessoire, indique poliment que tu ne peux analyser que les produits liés au site TechVista.
    
    ${prompt}`;
    
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: enhancedPrompt },
            { 
              inline_data: {
                mime_type: "image/jpeg",
                data: imageUrl.startsWith('data:') ? imageUrl.split(',')[1] : imageUrl
              } 
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                  "Désolé, je n'ai pas pu analyser cette image. Veuillez réessayer.";
    
    return { text: aiText };
  } catch (error) {
    console.error("Error analyzing image:", error);
    return { 
      text: "Désolé, une erreur s'est produite lors de l'analyse de l'image.", 
      error: (error as Error).message 
    };
  }
};
