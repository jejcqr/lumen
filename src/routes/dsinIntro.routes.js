import express from 'express';
import { EPREUVES } from '../data/epreuves.js';
import { MESSAGES_DSIN_INTRO } from '../data/messagesDsinIntro.js';

const router = express.Router();

router.get('/:numeroEpreuve', (req, res) => {
  const numeroEpreuve = Number(req.params.numeroEpreuve);

  if (!Number.isInteger(numeroEpreuve)) {
    return res.status(400).json({ error: 'numeroEpreuve doit être un entier' });
  }

  const epreuve = EPREUVES[numeroEpreuve];
  if (!epreuve) {
    return res.status(404).json({ error: 'Épreuve inconnue' });
  }

  const messageBot =
    MESSAGES_DSIN_INTRO[numeroEpreuve] ??
    "[DSIN] Début d'épreuve. Suivez attentivement les consignes.";

  return res.json({
    numeroEpreuve,
    titre: epreuve.titre,
    contexte: epreuve.contexte,
    messageBot,
    speaker: 'DSIN'
  });
});

export default router;
