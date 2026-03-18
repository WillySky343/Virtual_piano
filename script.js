// ==========================================
// TASK 1: Piano Keys als Objekte definieren
// ==========================================
const pianoKeys = [
    { note: "C5", keyboardKey: "a", elementId: "keyC" },
    { note: "D5", keyboardKey: "s", elementId: "keyD" },
    { note: "E5", keyboardKey: "d", elementId: "keyE" },
    { note: "F5", keyboardKey: "f", elementId: "keyF" },
    { note: "G5", keyboardKey: "g", elementId: "keyG" },
    { note: "A4", keyboardKey: "h", elementId: "keyA" }, // Falls A5 vorhanden, hier ändern
    { note: "B",  keyboardKey: "j", elementId: "keyB" }
];

let allSongs = []; // Speicher für alle Lieder aus der JSON
let loadedNotes = []; // Die aktuell ausgewählten Noten

// ==========================================
// KERN-FUNKTIONEN
// ==========================================

// 1. Sound abspielen & Visuelles Feedback
function playSound(noteName) {
    console.log("Spiele Note:", noteName);
    const audio = new Audio(`sounds/${noteName}.mp3`);
    audio.play();

    // Visuelles Feedback: Finde die Taste im Klavier
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
async function initApp() {
    try {
        const response = await fetch('song.json');
        if (!response.ok) throw new Error("JSON konnte nicht geladen werden");
        
        const data = await response.json();
        allSongs = data.songs;
        console.log("Songs erfolgreich geladen:", allSongs);
    } catch (error) {
        console.error("Fehler beim Laden der JSON:", error);
        document.getElementById("melody-display").innerText = "Fehler beim Laden der Lieder.";
    }
}

// TASK 3: User Interaction (Anzeige der Noten-Buttons)
function renderMelody() {
    const display = document.getElementById("melody-display");
    display.innerHTML = ""; // Container leeren

    loadedNotes.forEach((note) => {
        const btn = document.createElement("button");
        btn.innerText = note;
        btn.className = "btn btn-info m-1"; // Blaue interaktive Buttons
        
        // Klick auf die Note in der Liste spielt den Sound ab
        btn.addEventListener("click", () => playSound(note));
        
        display.appendChild(btn);
    });
}

// TASK 4: Reset Functionality
function resetGame() {
    loadedNotes = [];
    document.getElementById("melody-display").innerHTML = "";
    
    // Den Text wieder auf den Standard-Zustand setzen
    const infoText = document.querySelector("#melody-container p");
    infoText.innerText = "Noch kein Song geladen. Wähle ein Lied aus.";
    infoText.classList.add("text-muted");
    infoText.style.fontWeight = "normal";

    document.getElementById("song-select").value = ""; 
    
    pianoKeys.forEach(k => {
        const el = document.getElementById(k.elementId);
        if (el) el.classList.remove("active");
    });
}

// ==========================================
// EVENT LISTENERS (Steuerung)
// ==========================================

// Dropdown-Auswahl (Lied laden)
document.getElementById("song-select").addEventListener("change", function(event) {
    const songIndex = event.target.value;
    const infoText = document.querySelector("#melody-container p"); // Den Text-Absatz finden

    if (songIndex !== "") {
        const selectedSong = allSongs[songIndex];
        loadedNotes = selectedSong.notes;
        
        // NEU: Zeige den Titel des ausgewählten Liedes an
        infoText.innerText = "Aktuelles Lied: " + selectedSong.title;
        infoText.classList.remove("text-muted"); // Grau entfernen
        infoText.style.fontWeight = "bold";      // Fett drucken
        
        renderMelody();
    } else {
        resetGame();
    }
});

// Tastatur-Steuerung (Task 3)
document.addEventListener("keydown", (event) => {
    const pressedKey = event.key.toLowerCase();

    // 1. Klavier spielen
    const pianoKey = pianoKeys.find(k => k.keyboardKey === pressedKey);
    if (pianoKey) {
        playSound(pianoKey.note);
    }

    // 2. Shortcuts
    if (pressedKey === "r") resetGame();
});

// Maus-Klick auf die Klaviertasten
pianoKeys.forEach(keyObj => {
    const el = document.getElementById(keyObj.elementId);
    if (el) {
        el.addEventListener("click", () => playSound(keyObj.note));
    }
});

// Reset-Button
document.getElementById("btn-reset").addEventListener("click", resetGame);

// START: App beim Laden initialisieren
initApp();