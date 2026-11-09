# LUMEN — chatbot d'un CyberEscape

Serveur et page de test d'un **CyberEscape** (jeu d'évasion numérique) dans lequel une IA fictive, **L.U.M.E.N.**
(« Logiciel Universitaire de Modération et d'Enseignement Numérique »), a pris le contrôle des systèmes d'une université.
Face à elle, la **DSIN** guide les joueurs.

Le serveur produit les messages des deux personnages, épreuve par épreuve :

- quand les joueurs **réussissent** une épreuve, la **DSIN** répond avec un message de validation (texte prévu à l'avance) ;
- quand ils **échouent**, **L.U.M.E.N.** réagit : sa réplique, froide, sarcastique et hostile, est générée par un modèle de
  langage ([Groq](https://groq.com), modèle `llama-3.3-70b-versatile`) à partir d'un prompt propre à chaque épreuve.

## Les dix épreuves

1. Mail suspect / phishing
2. Mot de passe du compte compromis
3. Captcha instable saboté
4. QCM « test provocateur »
5. Pop-ups malveillants
6. Décryptage des logs réseau
7. Rétablissement du réseau
8. LightOut et message de la DSIN
9. Accès physique au dispositif
10. Désactivation finale de L.U.M.E.N.

## Prérequis

- [Node.js](https://nodejs.org) (avec npm)
- Une clé d'API [Groq](https://console.groq.com)

## Lancer le projet

1. Installer les dépendances du serveur :

```bash
cd server
npm install
```

2. Créer `server/.env` à partir du modèle `server/.env.example` et renseigner la clé :

```
PORT=3000
GROK_API_KEY=votre_cle_groq
```

> Le nom de la variable `GROK_API_KEY` est historique : la clé attendue est bien une clé **Groq**.

3. Démarrer le serveur :

```bash
npm run dev
```

4. Ouvrir `client/index.html` dans un navigateur : la page de test propose, pour chaque épreuve, des boutons
   **Commencer**, **OK** (réussite) et **KO** (échec) qui appellent l'API.

## API

| Méthode et route | Corps / paramètre | Réponse |
|---|---|---|
| `POST /api/chatbot` | `{ "numeroEpreuve": 3, "status": false }` | message de L.U.M.E.N. (échec) ou de la DSIN (réussite) |
| `GET /api/dsin-intro/:numeroEpreuve` | numéro de l'épreuve | titre de l'épreuve et message d'introduction de la DSIN |

## Structure

```
server/src/server.js       démarrage de l'API Express
server/src/routes/         routes /api/chatbot et /api/dsin-intro
server/src/services/       appel à l'API Groq
server/src/data/           épreuves, prompts de L.U.M.E.N., messages de la DSIN
client/                    page de test (index.html, main.js)
client/versions with css (not connected)/   anciennes maquettes, non reliées à l'API
```

## Licence

Code sous [licence MIT](LICENSE).
