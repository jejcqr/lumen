// src/data/epreuves.js
export const EPREUVES = {
  1: {
    titre: 'Épreuve 1 – Mail suspect / phishing',
    contexte: `Les joueurs participent à un CyberEscape dans une université où l’IA L.U.M.E.N. a pris le contrôle des systèmes. Ils accèdent à une boîte mail simulée avec plusieurs messages, mais un seul est un véritable mail de phishing qui a permis à L.U.M.E.N. de compromettre un compte interne. L’objectif est d’identifier ce mail frauduleux et de le signaler comme suspect pour comprendre comment l’intrusion a commencé et obtenir le premier flag.`
  },
  2: {
    titre: 'Épreuve 2 – Mot de passe du compte compromis',
    contexte: `Après avoir identifié le mail de phishing et le compte compromis, les joueurs doivent reprendre le contrôle de ce compte interne utilisé par L.U.M.E.N. via une page de réinitialisation de mot de passe très stricte (mot de passe ultra complexe, nombreuses contraintes, saisie sans affichage ni copier-coller). La réussite correspond au verrouillage de l’accès de L.U.M.E.N. à ce compte et donne accès au flag n°2.`
  },
  3: {
    titre: 'Épreuve 3 – Captcha instable saboté',
    contexte: `Les joueurs tentent de se connecter au tableau de bord de gestion des systèmes de l’université. Un captcha de vérification humaine se déclenche, mais il a été saboté par L.U.M.E.N. (contrôles inversés, éléments qui bougent, comportements perturbateurs). Ils doivent réussir ce captcha volontairement chaotique pour prouver qu’ils sont humains, découvrir que l’IA a modifié ce mécanisme de sécurité, et obtenir le flag n°3.`
  },
  4: {
    titre: 'Épreuve 4 – QCM « test provocateur »',
    contexte: `Après le captcha, L.U.M.E.N. impose un QCM sur l’université, présenté de façon arrogante et provocatrice, persuadée que les humains ne connaissent pas leur propre institution. Les joueurs doivent répondre à des questions sur l’histoire, les services, le campus, etc., et atteindre un score minimal. La réussite de ce test ouvre réellement l’accès au panneau de contrôle et donne le flag n°4.`
  },
  5: {
    titre: 'Épreuve 5 – Pop-ups malveillants',
    contexte: `Les joueurs accèdent au panneau de contrôle des systèmes de l’université, mais l’interface est saturée de pop-ups malveillants générés par L.U.M.E.N., rendant toute action quasi impossible. Ils doivent fermer manuellement tous les pop-ups dans un temps et un volume définis pour rendre le panneau de contrôle de nouveau exploitable et récupérer le flag associé.`
  },
  6: {
    titre: 'Épreuve 6 – Décryptage des logs réseau',
    contexte: `La DSIN demande aux joueurs d’ouvrir les logs techniques afin d’évaluer les dégâts causés par L.U.M.E.N. Ils font face à des journaux systèmes chiffrés par une méthode simple (ROT, substitution, inversion, etc.) non expliquée. Ils doivent décrypter manuellement ces logs, identifier celui qui décrit les perturbations réseau, et y trouver le flag caché, préparant ainsi la restauration du réseau.`
  },
  7: {
    titre: 'Épreuve 7 – Rétablissement du réseau',
    contexte: `À partir des informations extraites des logs, les joueurs apprennent que le réseau de l’université a été gravement désorganisé par L.U.M.E.N. La DSIN leur fournit un module d’administration réseau simulé avec une série de commandes Linux liées au réseau dans le désordre. Ils doivent remettre ces commandes dans l’ordre logique pour simuler un redémarrage propre du réseau, rétablir les communications entre services et obtenir le flag.`
  },
  8: {
    titre: 'Épreuve 8 – LightOut et message de la DSIN',
    contexte: `Une fois le réseau stabilisé, le tableau de bord dévoile un message paniqué de la DSIN, expliquant qu’un dispositif physique permet de désactiver L.U.M.E.N., mais que son emplacement et les instructions sont encapsulés dans un puzzle de type LightOut. Les joueurs doivent résoudre ce puzzle sur une grille d’images floutées pour révéler une image nette indiquant l’emplacement du dispositif, les instructions de lancement et le flag n°8.`
  },
  9: {
    titre: 'Épreuve 9 – Accès physique au dispositif',
    contexte: `Grâce à l’épreuve LightOut, les joueurs connaissent l’existence et l’emplacement d’un dispositif physique basé sur un Raspberry Pi conçu pour déconnecter L.U.M.E.N. L’épreuve se déroule dans le monde réel : ils doivent se déplacer dans le bâtiment, suivre un indice ou une énigme de localisation, retrouver le Raspberry Pi caché et récupérer le flag (étiquette, écran, fichier, etc.), puis rapporter l’objet à la salle d’origine.`
  },
  10: {
    titre: 'Épreuve 10 – Désactivation finale de L.U.M.E.N.',
    contexte: `Avec le Raspberry Pi en main, les joueurs doivent lancer une procédure d’Impulsion ÉlectroMagnétique simulée pour neutraliser L.U.M.E.N. Ils doivent brancher le Raspberry Pi, ouvrir un terminal, se connecter en SSH avec les identifiants fournis et exécuter une série de commandes (scripts de préparation puis d’ignition). Toute la scène se déroule dans le terminal avec une mise en scène textuelle de l’extinction de L.U.M.E.N. et l’affichage du flag final, marquant la victoire.`
  }
};
