interface IPianoKey {
    note: string;
    keyboardKey: string;
    elementId: string;
}

class PianoKey implements IPianoKey {
    public note: string;
    public keyboardKey: string;
    public elementId: string;

    constructor(note: string, keyboardKey: string, elementId: string) {
        this.note = note;
        this.keyboardKey = keyboardKey;
        this.elementId = elementId;
    }

    public triggerVisual(): void {
        const el = document.getElementById(this.elementId);
        if (el) {
            el.classList.add("active");
            setTimeout(() => el.classList.remove("active"), 200);
        }
    }
}

const pianoKeys: PianoKey[] = [
    new PianoKey("C5", "a", "keyC"),
    new PianoKey("D5", "s", "keyD"),
    new PianoKey("E5", "d", "keyE"),
    new PianoKey("F5", "f", "keyF"),
    new PianoKey("G5", "g", "keyG"),
    new PianoKey("A4", "h", "keyA"),
    new PianoKey("B",  "j", "keyB")
];

function playSound(noteName: string): void {
    const audio = new Audio(`sounds/${noteName}.mp3`);
    audio.play().catch(() => console.warn(`Sound für ${noteName} fehlt.`));

    const keyConfig = pianoKeys.find(k => k.note === noteName);
    if (keyConfig) {
        keyConfig.triggerVisual();
    }
}

document.addEventListener("keydown", (event: KeyboardEvent): void => {
    const pressedKey = event.key.toLowerCase();
    const found = pianoKeys.find(k => k.keyboardKey === pressedKey);
    if (found) {
        playSound(found.note);
    }
});

pianoKeys.forEach(key => {
    const el = document.getElementById(key.elementId);
    if (el) {
        el.addEventListener("click", (): void => playSound(key.note));
    }
});

console.log("Piano Initialized.");