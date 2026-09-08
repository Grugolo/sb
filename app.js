// Registrazione del Service Worker per l'Offline-first (Articolo 6)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(reg => {
            console.log('Service Worker registrato', reg);
        });
    });
}

// Configurazione di SecondBrain.db tramite IndexedDB (Articolo 3.1)
const DB_NAME = 'SecondBrain_DB';
const DB_VERSION = 1;
let db;

const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onupgradeneeded = (event) => {
            db = event.target.result;
            // Tabella 1: Archivio Documenti
            if (!db.objectStoreNames.contains('archivio')) {
                db.createObjectStore('archivio', { keyPath: 'id' });
            }
            // Tabella 2: Eventi/Conoscenza Strutturata (Articolo 4)
            if (!db.objectStoreNames.contains('eventi')) {
                const eventiStore = db.createObjectStore('eventi', { keyPath: 'id' });
                eventiStore.createIndex('data', 'data', { unique: false });
            }
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve();
            loadArchivio();
            loadKnowledge();
        };
        request.onerror = (event) => reject(event.target.error);
    });
};

// Generatore ID univoco
const generateId = () => '_' + Math.random().toString(36).substr(2, 9) + Date.now();

// --- FLUSSO A: Salvataggio Documento ---
document.getElementById('btn-save-doc').addEventListener('click', async () => {
    const fileInput = document.getElementById('doc-input');
    const tagsInput = document.getElementById('doc-tags').value;
    
    if (fileInput.files.length === 0) return alert('Seleziona un file per la Inbox');
    const file = fileInput.files[0];
    
    const docData = {
        id: generateId(),
        nome: file.name,
        tipo: file.type,
        blob: file,
        tags: tagsInput.split(',').map(t => t.trim()),
        timestamp: new Date().toISOString()
    };

    const tx = db.transaction('archivio', 'readwrite');
    tx.objectStore('archivio').add(docData);
    tx.oncomplete = () => {
        alert('Documento archiviato con successo!');
        fileInput.value = '';
        document.getElementById('doc-tags').value = '';
        loadArchivio();
    };
});

// --- FLUSSO B: Salvataggio Evento/Conoscenza ---
document.getElementById('btn-save-record').addEventListener('click', () => {
    const titolo = document.getElementById('record-title').value;
    const data = document.getElementById('record-date').value;
    const desc = document.getElementById('record-desc').value;

    if (!titolo || !data) return alert('Titolo e Data sono obbligatori per un Evento.');

    const evento = {
        id: generateId(),
        titolo: titolo,
        data: data,
        descrizione: desc,
        timestamp: new Date().toISOString()
    };

    const tx = db.transaction('eventi', 'readwrite');
    tx.objectStore('eventi').add(evento);
    tx.oncomplete = () => {
        alert('Evento registrato nella Conoscenza!');
        document.getElementById('record-title').value = '';
        document.getElementById('record-date').value = '';
        document.getElementById('record-desc').value = '';
        loadKnowledge();
    };
});

// --- UI LOGIC & RENDER ---
const loadArchivio = () => {
    const tx = db.transaction('archivio', 'readonly');
    const store = tx.objectStore('archivio');
    const request = store.getAll();
    request.onsuccess = () => {
        const list = document.getElementById('archive-list');
        list.innerHTML = '';
        request.result.forEach(doc => {
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <strong>${doc.nome}</strong><br>
                <small>Tag: ${doc.tags.join(', ')}</small><br>
                <button onclick="downloadDoc('${doc.id}')" style="margin-top:10px; padding:5px;">Apri Originale</button>
            `;
            list.appendChild(div);
        });
    };
};

const loadKnowledge = () => {
    const tx = db.transaction('eventi', 'readonly');
    const store = tx.objectStore('eventi');
    const request = store.getAll();
    request.onsuccess = () => {
        const list = document.getElementById('knowledge-list');
        list.innerHTML = '';
        // Ordina per data (Event-centric)
        const eventi = request.result.sort((a,b) => new Date(b.data) - new Date(a.data));
        eventi.forEach(ev => {
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <strong>${ev.titolo}</strong> (${ev.data})<br>
                <p>${ev.descrizione}</p>
            `;
            list.appendChild(div);
        });
    };
};

// Funzione globale per scaricare/vedere file (Blob)
window.downloadDoc = (id) => {
    const tx = db.transaction('archivio', 'readonly');
    const req = tx.objectStore('archivio').get(id);
    req.onsuccess = () => {
        const doc = req.result;
        const url = URL.createObjectURL(doc.blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.nome;
        a.click();
        URL.revokeObjectURL(url);
    };
};

// Navigazione Menu Inferiore
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        e.target.classList.add('active');
        document.getElementById(e.target.dataset.target).classList.add('active');
    });
});

// Init DB all'avvio
initDB();
