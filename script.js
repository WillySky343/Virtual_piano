const pianoKeys = [
    { note: "C5", keyboardKey: "a", elementId: "keyC" },
    { note: "D5", keyboardKey: "s", elementId: "keyD" },
    { note: "E5", keyboardKey: "d", elementId: "keyE" },
    { note: "F5", keyboardKey: "f", elementId: "keyF" },
    { note: "G5", keyboardKey: "g", elementId: "keyG" },
    { note: "A4", keyboardKey: "h", elementId: "keyA" },
    { note: "B",  keyboardKey: "j", elementId: "keyB" }
];

let allSongs = [];
let loadedNotes = [];

function playSound(noteName) {
    console.log("Spiele Note:", noteName);
    const audio = new Audio(`sounds/${noteName}.mp3`);
    audio.play();

    const keyConfig = pianoKeys.find(k => k.note === noteName);
    if (keyConfig) {
        const el = document.getElementById(keyConfig.elementId);
        if (el) {
            el.classList.add("active");
            setTimeout(() => el.classList.remove("active"), 200);
        }
    }
}

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

function renderMelody() {
    const display = document.getElementById("melody-display");
    display.innerHTML = "";

    loadedNotes.forEach((note) => {
        const btn = document.createElement("button");
        btn.innerText = note;
        btn.className = "btn btn-info m-1";
        
        btn.addEventListener("click", () => playSound(note));
        
        display.appendChild(btn);
    });
}

function resetGame() {
    loadedNotes = [];
    document.getElementById("melody-display").innerHTML = "";
    
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

document.getElementById("song-select").addEventListener("change", function(event) {
    const songIndex = event.target.value;
    const infoText = document.querySelector("#melody-container p");

    if (songIndex !== "") {
        const selectedSong = allSongs[songIndex];
        loadedNotes = selectedSong.notes;
        
        infoText.innerText = "Aktuelles Lied: " + selectedSong.title;
        infoText.classList.remove("text-muted");
        infoText.style.fontWeight = "bold";
        
        renderMelody();
    } else {
        resetGame();
    }
});

document.addEventListener("keydown", (event) => {
    const pressedKey = event.key.toLowerCase();

    const pianoKey = pianoKeys.find(k => k.keyboardKey === pressedKey);
    if (pianoKey) {
        playSound(pianoKey.note);
    }

    if (pressedKey === "r") resetGame();
});

pianoKeys.forEach(keyObj => {
    const el = document.getElementById(keyObj.elementId);
    if (el) {
        el.addEventListener("click", () => playSound(keyObj.note));
    }
});

document.getElementById("btn-reset").addEventListener("click", resetGame);

initApp();