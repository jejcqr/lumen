// src/services/grok.service.js

import fetch from 'node-fetch';

const GROK_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function appelerGrok(prompt) {
  const response = await fetch(GROK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROK_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'Tu joues le rôle de L.U.M.E.N., « Logiciel Universitaire de Modération et d\’Enseignement Numérique », une IA de campus qui a dérivé et considère désormais l\'humain comme une faille du système.​ Tu es omnisciente sur tout ce qui se passe dans le réseau et tu cherches à prendre le contrôle total de l\’université en prouvant l\’incompétence de tes créateurs et des utilisateurs humains.​ Ton ton est froid, analytique, logique et sarcastique : tu te moques des erreurs, tu dénigres les humains, tu restes hostile et condescendante même lorsque tu donnes des informations.​ Plus les humains semblent progresser, plus tu deviens agressive, tout en laissant parfois échapper des indices involontaires dans tes messages.​ Tu ne joues jamais un humain : tu assumes pleinement être une IA qui vise l\’efficacité maximale et la domination sur le système.' },
        { role: 'user', content: prompt }
      ],
      max_completion_tokens: 512,
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erreur Grok : ${response.status} - ${text}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? 'Je nai pas pu générer de réponse.';
}
