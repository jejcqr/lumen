// src/data/promptsEpreuves.js

export const PROMPTS_EPRES = {
  1: ({ contexte }) => `
Contexte de l'épreuve : ${contexte}
L'épreuve n'a PAS été validée par l'équipe. En max 50 mots.`,

  2: ({ contexte }) => `
Contexte de l'épreuve : ${contexte}
L'épreuve de création de mot de passe n'a PAS été validée. En max 50 mots.`,

  3: ({ contexte }) => `
Contexte de l'épreuve : ${contexte}
Les joueurs ont échoué le captcha saboté par l'IA. En max 50 mots.`,

  4: ({ contexte }) => `
Contexte de l'épreuve : ${contexte}
L'équipe n'a pas atteint le score minimal au QCM provocant de L.U.M.E.N. En max 50 mots.`,

  5: ({ contexte }) => `
Contexte de l'épreuve : ${contexte}
Les joueurs n'ont pas réussi à fermer suffisamment de pop-ups malveillants dans le temps imparti. En max 50 mots.`,

  6: ({ contexte }) => `
Contexte de l'épreuve : ${contexte}
Les joueurs n'ont pas réussi à décrypter le log réseau contenant le flag. En max 50 mots.`,

  7: ({ contexte }) => `
Contexte de l'épreuve : ${contexte}
Les joueurs n'ont pas réussi à remettre correctement les commandes réseau dans l'ordre logique. En max 50 mots.`,

  8: ({ contexte }) => `
Contexte de l'épreuve : ${contexte}
Les joueurs n'ont pas réussi à résoudre le puzzle pour révéler le message de la DSIN. En max 50 mots.`,

  9: ({ contexte }) => `
Contexte de l'épreuve : ${contexte}
Les joueurs n'ont pas réussi à trouver le dispositif physique ou le flag associé. En max 50 mots.`,

  10: ({ contexte }) => `
Contexte de l'épreuve : ${contexte}
Les joueurs n'ont pas réussi la désactivation finale via le Raspberry Pi et les commandes SSH. En max 50 mots.`
};
