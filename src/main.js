"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PianoKey {
    note;
    keyboardKey;
    elementId;
    constructor(note, keyboardKey, elementId) {
        this.note = note;
        this.keyboardKey = keyboardKey;
        this.elementId = elementId;
    }
    visualFeedback() {
        const el = document.getElementById(this.elementId);
        if (el) {
            el.classList.add("active");
            setTimeout(() => el.classList.remove("active"), 200);
        }
    }
}
const pianoKeys = [
    new PianoKey("C5", "a", "keyC"),
    new PianoKey("D5", "s", "keyD"),
    new PianoKey("E5", "d", "keyE"),
    new PianoKey("F5", "f", "keyF"),
    new PianoKey("G5", "g", "keyG"),
    new PianoKey("A4", "h", "keyA"),
    new PianoKey("B", "j", "keyB")
];
let allSongs = [];
let loadedNotes = [];
const melodyDisplay = document.getElementById("melody-display");
const songSelect = document.getElementById("song-select");
const resetBtn = document.getElementById("btn-reset");
function playSound(noteName) {
    const audio = new Audio(`sounds/${noteName}.mp3`);
    audio.play().catch(err => console.error("Audio Fehler:", err));
    const keyConfig = pianoKeys.find(k => k.note === noteName);
    if (keyConfig) {
        keyConfig.visualFeedback();
    }
}
async function initApp() {
    try {
        const response = await fetch('song.json');
        if (!response.ok)
            throw new Error("JSON Fehler");
        const data = await response.json();
        allSongs = data.songs;
    }
    catch (error) {
        console.error("Initialisierungsfehler:", error);
    }
}
function renderMelody() {
    if (!melodyDisplay)
        return;
    melodyDisplay.innerHTML = "";
    loadedNotes.forEach((note) => {
        const btn = document.createElement("button");
        btn.innerText = note;
        btn.className = "btn btn-info m-1";
        btn.addEventListener("click", () => playSound(note));
        melodyDisplay.appendChild(btn);
    });
}
function resetGame() {
    loadedNotes = [];
    if (melodyDisplay)
        melodyDisplay.innerHTML = "";
    if (songSelect)
        songSelect.value = "";
    const infoText = document.querySelector("#melody-container p");
    if (infoText) {
        infoText.innerText = "Noch kein Song geladen. Wähle ein Lied aus.";
        infoText.classList.add("text-muted");
        infoText.style.fontWeight = "normal";
    }
}
songSelect?.addEventListener("change", (event) => {
    const target = event.target;
    const songIndex = Number(target.value);
    if (Number.isInteger(songIndex) && songIndex >= 0 && songIndex < allSongs.length) {
        const selectedSong = allSongs[songIndex];
        if (!selectedSong) {
            resetGame();
            return;
        }
        loadedNotes = selectedSong.notes;
        const infoText = document.querySelector("#melody-container p");
        if (infoText) {
            infoText.innerText = "Aktuelles Lied: " + selectedSong.title;
            infoText.classList.remove("text-muted");
            infoText.style.fontWeight = "bold";
        }
        renderMelody();
    }
    else {
        resetGame();
    }
});
document.addEventListener("keydown", (event) => {
    const pressedKey = event.key.toLowerCase();
    const foundKey = pianoKeys.find(k => k.keyboardKey === pressedKey);
    if (foundKey)
        playSound(foundKey.note);
    if (pressedKey === "r")
        resetGame();
});
pianoKeys.forEach(keyObj => {
    const el = document.getElementById(keyObj.elementId);
    el?.addEventListener("click", () => playSound(keyObj.note));
});
resetBtn?.addEventListener("click", resetGame);
initApp();
//# sourceMappingURL=main.js.map