// main.js

const API_URL = 'http://localhost:3000/api/chatbot';
const DSIN_INTRO_URL = 'http://localhost:3000/api/dsin-intro';

async function afficherIntroDsin(numeroEpreuve) {
  const dsinBox = document.getElementById('messages-dsin');

  try {
    const res = await fetch(`${DSIN_INTRO_URL}/${numeroEpreuve}`);

    if (!res.ok) {
      const text = await res.text();
      const msg = document.createElement('div');
      msg.className = 'msg msg-dsin';
      msg.textContent = `Erreur HTTP intro ${res.status} :\n${text}`;
      dsinBox.appendChild(msg);
      dsinBox.scrollTop = dsinBox.scrollHeight;
      return;
    }

    const data = await res.json();

    const msg = document.createElement('div');
    msg.className = 'msg msg-dsin';
    msg.textContent =
      `Épreuve ${data.numeroEpreuve} – ${data.titre}\n` +
      `Intro DSIN :\n${data.messageBot}`;

    dsinBox.appendChild(msg);
    dsinBox.scrollTop = dsinBox.scrollHeight;
  } catch (err) {
    console.error(err);
    const msg = document.createElement('div');
    msg.className = 'msg msg-dsin';
    msg.textContent = 'Erreur réseau ou serveur (intro DSIN).';
    dsinBox.appendChild(msg);
    dsinBox.scrollTop = dsinBox.scrollHeight;
  }
}

async function appelerChatbot(numeroEpreuve, status) {
  const lumenBox = document.getElementById('messages-lumen');
  const dsinBox = document.getElementById('messages-dsin');

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numeroEpreuve, status }),
    });

    if (!res.ok) {
      const text = await res.text();
      const msg = document.createElement('div');
      msg.className = 'msg msg-dsin';
      msg.textContent = `Erreur HTTP ${res.status} :\n${text}`;
      dsinBox.appendChild(msg);
      dsinBox.scrollTop = dsinBox.scrollHeight;
      return;
    }

    const data = await res.json();

    const msg = document.createElement('div');
    msg.className =
      'msg ' + (data.speaker === 'LUMEN' ? 'msg-lumen' : 'msg-dsin');

    msg.textContent =
      `Épreuve ${data.numeroEpreuve} – ${data.titre}\n` +
      `Status : ${data.status ? 'succès' : 'échec'}\n\n` +
      `${data.speaker} :\n${data.messageBot}`;

    if (data.speaker === 'LUMEN') {
      lumenBox.appendChild(msg);
      lumenBox.scrollTop = lumenBox.scrollHeight;
    } else {
      dsinBox.appendChild(msg);
      dsinBox.scrollTop = dsinBox.scrollHeight;
    }
  } catch (err) {
    console.error(err);
    const msg = document.createElement('div');
    msg.className = 'msg msg-dsin';
    msg.textContent = 'Erreur réseau ou serveur.';
    dsinBox.appendChild(msg);
    dsinBox.scrollTop = dsinBox.scrollHeight;
  }
}

// Branchement des boutons après chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('boutons-epreuves');
  container.querySelectorAll('.epreuve').forEach((bloc) => {
    const numero = Number(bloc.getAttribute('data-numero'));
    const btnStart = bloc.querySelector('.btn-start');
    const btnOk = bloc.querySelector('.btn-ok');
    const btnKo = bloc.querySelector('.btn-ko');

    let introDejaAffichee = false;

    async function handleStart() {
      if (!introDejaAffichee) {
        introDejaAffichee = true;
        await afficherIntroDsin(numero);
      }
    }

    async function handleClick(status) {
      if (!introDejaAffichee) {
        introDejaAffichee = true;
        await afficherIntroDsin(numero);
      }
      await appelerChatbot(numero, status);
    }

    if (btnStart) {
      btnStart.addEventListener('click', handleStart);
    }
    btnOk.addEventListener('click', () => handleClick(true));
    btnKo.addEventListener('click', () => handleClick(false));
  });
});
