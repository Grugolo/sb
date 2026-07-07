# SecondBrain
Personal Storage to Track Everything

 

## Costituzione del progetto

### Premessa

SecondBrain è un sistema personale di gestione della conoscenza e della memoria digitale.

Il suo scopo non è semplicemente archiviare documenti, ma permettere di ricostruire nel tempo fatti, decisioni, relazioni e informazioni della mia vita attraverso dati strutturati e documentazione associata.

Il sistema è progettato per essere utilizzabile quotidianamente, crescere negli anni e mantenere il pieno controllo dei dati senza dipendere da servizi o piattaforme proprietarie.




### Articolo 1 – Proprietà dei dati

Tutti i dati appartengono all'utente.

L'utente deve poter accedere in qualsiasi momento ai propri documenti e ai propri database senza dipendere dal software che li ha creati.

I dati devono essere memorizzati in formati aperti, documentati e facilmente esportabili.




### Articolo 2 – Una sola fonte di verità

Ogni informazione deve esistere una sola volta.

Le informazioni duplicate devono essere evitate.

Ogni elemento del sistema ha un solo luogo in cui viene memorizzato.

Le relazioni collegano i dati senza copiarli.




### Articolo 3 – Separazione tra documenti e conoscenza

I documenti rappresentano prove documentali.

I database rappresentano conoscenza strutturata.

I documenti non sostituiscono i database.

I database non sostituiscono i documenti.

Quando necessario, i due vengono collegati tramite riferimenti espliciti.




### Articolo 4 – Centralità degli eventi

Il sistema descrive principalmente eventi.

Un evento rappresenta qualcosa che è accaduto in un determinato momento o intervallo temporale.

Gli eventi possono essere:

transazioni economiche;

eventi sanitari;

manutenzioni;

decisioni;

altri eventi futuri.


Oggetti, persone e luoghi costituiscono il contesto degli eventi.




### Articolo 5 – Organizzazione tramite tag e collegamenti

I tag descrivono il significato delle informazioni.

I collegamenti rappresentano relazioni esplicite tra elementi del sistema.

Le cartelle fisiche non rappresentano categorie logiche.

L'organizzazione logica è costruita esclusivamente da database, tag e collegamenti.




### Articolo 6 - Offline first

Il sistema deve funzionare integralmente senza connessione Internet.

La connessione è utilizzata esclusivamente per sincronizzazione, backup e aggiornamenti.




### Articolo 7 – Sincronizzazione trasparente

La sincronizzazione deve essere completamente automatica.

L'utente non deve eseguire backup manuali.

Lo smartphone rappresenta il dispositivo principale.

Il PC mantiene una copia completa e aggiornata del sistema.




### Articolo 8 – Conservazione nel tempo

Il sistema deve poter essere utilizzato per decenni.

Ogni scelta tecnica deve privilegiare:

semplicità;

robustezza;

compatibilità futura.


I dati devono rimanere leggibili anche senza il software originale.




### Articolo 9 – Interfaccia orientata alle domande

L'obiettivo dell'interfaccia non è mostrare tabelle o file.

L'obiettivo è rispondere a domande.

Esempi:

Quando è successo?

Quanto mi è costato?

Dove è successo?

Chi era coinvolto?

Quali documenti lo dimostrano?

Quali eventi sono collegati?


Ogni nuova funzione dovrà contribuire a rispondere meglio a domande reali.




### Articolo 10 – Inserimento delle informazioni

Le informazioni possono entrare nel sistema attraverso due percorsi indipendenti:

1. caricamento di un documento;


2. creazione di un record in uno dei database.



Entrambi i percorsi possono generare collegamenti reciproci, ma nessuno dei due dipende obbligatoriamente dall'altro.




### Articolo 11 – Automazione assistita

L'automazione deve ridurre il lavoro dell'utente, non sostituirne il giudizio.

Il sistema può:

suggerire tag;

suggerire collegamenti;

proporre nuovi record;

riconoscere persone, luoghi e date.


La conferma finale spetta sempre all'utente.




### Articolo 12 – Evoluzione del sistema

Nuovi database, nuovi moduli e nuove funzionalità possono essere aggiunti senza modificare la struttura fondamentale del progetto.

L'architettura deve rimanere stabile anche durante l'evoluzione del software.




### Articolo 13 – Principio guida

Ogni scelta progettuale deve poter rispondere affermativamente alla seguente domanda:

"Questa funzione rende più semplice trovare, comprendere o collegare informazioni utili nel tempo?"

Se la risposta è negativa, la funzione non appartiene al progetto SecondBrain.





## Manifesto Architetturale

### 1. Visione

SecondBrain è un sistema personale di gestione della conoscenza progettato per durare nel tempo.

L'architettura separa rigorosamente:

- i documenti originali;
- la conoscenza strutturata;
- la logica dell'applicazione.

Ogni componente ha una responsabilità unica e ben definita.



### 2. Architettura generale


SecondBrain/

│

├── SecondBrain.db

│

├── Inbox/

│

├── Archivio/

│

├── History/

│

├── Temp/

│

└── Core/




### 3. Componenti

#### 3.1 SecondBrain.db

È il cuore informativo del sistema.

Contiene esclusivamente dati strutturati.

Non contiene documenti.

Comprende tutti i database necessari al funzionamento del sistema:

- Archivio documentale
- Finanze
- Persone
- Luoghi
- Eventi sanitari
- Decisioni
- Manutenzioni
- Tag
- Relazioni
- eventuali moduli futuri

Il database rappresenta l'unica fonte di verità per tutte le informazioni strutturate.



#### 3.2 Inbox

È il punto di ingresso dei nuovi documenti.

Qualunque file destinato all'archivio deve transitare dalla Inbox.

La presenza di un documento nella Inbox indica che il documento non è ancora stato elaborato.

La Inbox deve essere sempre vuota al termine dell'elaborazione.



#### 3.3 Archivio

Contiene tutti i documenti originali.

Sono ammessi qualunque formato utile:

- PDF
- immagini
- video
- audio
- fogli elettronici
- presentazioni
- documenti di testo
- altri file

L'Archivio costituisce la memoria documentale del sistema.

I file non vengono modificati durante la loro permanenza nell'Archivio.

Ogni documento è identificato nel database tramite il proprio percorso.



#### 3.4 History

Conserva copie storiche del sistema.

Comprende:

- snapshot del database;
- esportazioni periodiche;
- eventuali log di migrazione.

La History ha esclusivamente funzione di sicurezza e recupero.

Non viene utilizzata durante il normale funzionamento.



#### 3.5 Temp

Area temporanea utilizzata dal Core.

Può contenere:

- OCR intermedi;
- miniature;
- file temporanei;
- conversioni.

Il suo contenuto può essere eliminato in qualsiasi momento.



#### 3.6 Core

È il motore operativo del sistema.

Ha il compito di:

- monitorare la Inbox;
- elaborare i documenti;
- gestire OCR;
- suggerire metadati;
- aggiornare il database;
- eseguire sincronizzazioni;
- creare backup;
- mantenere la coerenza del sistema.

Il Core rappresenta l'unica componente autorizzata a modificare automaticamente il database.



### 4. Flussi fondamentali

Esistono solamente due modalità di inserimento delle informazioni.

#### Flusso A – Documento

Nuovo documento

↓

Inbox

↓

Elaborazione

↓

Indicizzazione

↓

Conferma utente

↓

Aggiornamento database

↓

Archivio



#### Flusso B – Record

Nuovo record

↓

Compilazione

↓

Conferma

↓

Aggiornamento database

↓

Eventuale collegamento a documenti esistenti

I due flussi sono indipendenti.



### 5. Principio di collegamento

Le informazioni sono collegate mediante:

- tag;
- collegamenti espliciti.

I tag rappresentano classificazioni semantiche.

I collegamenti rappresentano relazioni tra elementi del sistema.

Un documento può essere collegato contemporaneamente a più record appartenenti a database differenti.



### 6. Organizzazione fisica

L'organizzazione delle cartelle non rappresenta la struttura logica del sistema.

La struttura logica è definita esclusivamente dal database.

Le cartelle esistono solo per esigenze tecniche.



### 7. Sincronizzazione

Il sistema opera in modalità offline-first.

Lo smartphone costituisce il dispositivo principale.

Ogni modifica viene automaticamente sincronizzata.

Devono essere sincronizzati:

- il database;
- l'Archivio;
- la History.

Il cloud rappresenta esclusivamente un mezzo di sincronizzazione e protezione.

La copia locale costituisce sempre il riferimento operativo.



### 8. Integrità

Il sistema deve poter verificare automaticamente:

- documenti orfani;
- collegamenti non validi;
- riferimenti mancanti;
- duplicati;
- errori di sincronizzazione.

L'integrità del database è una responsabilità del Core.



### 9. Estendibilità

Ogni nuovo modulo deve poter essere aggiunto senza modificare l'architettura esistente.

L'aggiunta di un database non deve richiedere modifiche ai database già presenti.

Il sistema deve crescere in maniera modulare.



### 10. Interrogazione

Il sistema non è progettato per mostrare dati.

È progettato per rispondere a domande.

Ogni funzione del software deve contribuire a:

- trovare informazioni;
- ricostruire eventi;
- collegare conoscenze;
- effettuare analisi;
- supportare decisioni.



### 11. Responsabilità dell'utente

L'utente decide il significato delle informazioni.

Il sistema assiste l'utente ma non sostituisce il suo giudizio.

Ogni suggerimento automatico deve poter essere modificato o rifiutato.



### 12. Evoluzione

Le tecnologie utilizzate possono cambiare.

L'architettura concettuale deve rimanere stabile.

La longevità del progetto dipende dalla stabilità del modello, non dagli strumenti utilizzati.
