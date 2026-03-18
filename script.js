// TASK 1: Piano Keys als Objekte definieren
const pianoKeys = [
    { note: "C5", keyboardKey: "a", elementId: "keyC" },
    { note: "D5", keyboardKey: "s", elementId: "keyD" },
    { note: "E5", keyboardKey: "d", elementId: "keyE" },
    { note: "F5", keyboardKey: "f", elementId: "keyF" },
    { note: "G5", keyboardKey: "g", elementId: "keyG" },
    { note: "A4", keyboardKey: "h", elementId: "keyA" },
    { note: "B",  keyboardKey: "j", elementId: "keyB" }
];

let loadedNotes = []; // Hier speichern wir die Noten aus der JSON

// --- FUNKTIONEN ---

// Sound abspielen & Visuelles Feedback
function playSound(noteName) {
    const audio = new Audio(`sounds/${noteName}.mp3`);
    audio.play();

    // Finde das zugehörige Objekt für das visuelle Feedback
    const keyConfig = pianoKeys.find(k => k.note === noteName);
    if (keyConfig) {
        const el = document.getElementById(keyConfig.elementId);
        if (el) {
            el.classList.add("active");
            setTimeout(() => el.classList.remove("active"), 200);
        }
    }
}

// TASK 2: Dynamic Note Loading (Fetch API)
async function loadMelody() {
    try {
        const response = await fetch('song.json');
        const data = await response.json();
        loadedNotes = data.notes;
        renderMelody(); // Anzeige aktualisieren
    } catch (error) {
        console.error("Fehler beim Laden der JSON:", error);
    }
}

// TASK 3: User Interaction (Clickable Notes)
function renderMelody() {
    const container = document.getElementById("melody-display");
    container.innerHTML = ""; // Container leeren

    loadedNotes.forEach((note) => {
        const btn = document.createElement("button");
        btn.innerText = note;
        btn.className = "btn btn-outline-dark m-1";
        // Klick auf Note in der Liste spielt Sound ab
        btn.addEventListener("click", () => playSound(note));
        container.appendChild(btn);
    });
}

// TASK 4: Reset Functionality
function resetGame() {
    loadedNotes = [];
    document.getElementById("melody-display").innerHTML = "Melodie gelöscht.";
    
    // Alle Tasten visuell zurücksetzen (falls noch was leuchtet)
    pianoKeys.forEach(k => {
        const el = document.getElementById(k.elementId);
        if (el) el.classList.remove("active");
    });
    
    console.log("Spiel zurückgesetzt.");
}

// --- EVENT LISTENERS ---

// Maus-Klicks auf das Klavier
pianoKeys.forEach(keyObj => {
    const el = document.getElementById(keyObj.elementId);
    if (el) {
        el.addEventListener("click", () => playSound(keyObj.note));
    }
});

// Tastatur-Eingaben
document.addEventListener("keydown", (event) => {
    const keyName = event.key.toLowerCase();
    
    // 1. Piano spielen (Task 1 & 3)
    const foundKey = pianoKeys.find(k => k.keyboardKey === keyName);
    if (foundKey) {
        playSound(foundKey.note);
    }

    // 2. Shortcuts für Steuerung (Task 3)
    if (keyName === "r") resetGame();
    if (keyName === "l") loadMelody(); // 'L' zum Laden der Melodie
});

// Reset-Button im HTML verknüpfen
document.getElementById("btn-reset").addEventListener("click", resetGame);
document.getElementById("btn-load").addEventListener("click", loadMelody);