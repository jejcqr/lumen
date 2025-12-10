// src/routes/chatbot.routes.js
import express from 'express';
import { EPREUVES } from '../data/epreuves.js';
import { PROMPTS_EPRES } from '../data/promptsEpreuves.js';
import { MESSAGES_DSIN_SUCCESS } from '../data/messagesDsin.js';
import { appelerGrok } from '../services/grok.service.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { numeroEpreuve, status } = req.body;

    if (typeof numeroEpreuve !== 'number') {
      return res.status(400).json({ error: 'numeroEpreuve doit être un nombre' });
    }
    if (typeof status !== 'boolean') {
      return res.status(400).json({ error: 'status doit être un booléen' });
    }

    const epreuve = EPREUVES[numeroEpreuve];
    if (!epreuve) {
      return res.status(404).json({ error: 'Épreuve inconnue' });
    }

    let messageBot;
    let speaker;

    if (status === true) {
      // ✅ Succès → DSIN
      const msgDsin =
        MESSAGES_DSIN_SUCCESS[numeroEpreuve] ??
        'DSIN : Étape validée. Vous pouvez passer à la suite.';

      messageBot = msgDsin;
      speaker = 'DSIN';
    } else {
      // ❌ Échec → LUMEN
      const buildPrompt = PROMPTS_EPRES[numeroEpreuve];
      if (!buildPrompt) {
        return res.status(500).json({ error: 'Prompt non défini pour cette épreuve' });
      }

      const prompt = buildPrompt({ contexte: epreuve.contexte });
      const reponseLumen = await appelerGrok(prompt);

      // On force le préfixe LUMEN :
      
      let texte = reponseLumen;

       // Si ça commence et finit par des guillemets, on les enlève
      if (typeof texte === 'string' && texte.startsWith('"') && texte.endsWith('"')) {
        texte = texte.slice(1, -1);
      }
      messageBot = texte;
      speaker = 'LUMEN';
    }

    return res.json({
      numeroEpreuve,
      status,
      titre: epreuve.titre,
      contexte: epreuve.contexte,
      messageBot,
      speaker
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
