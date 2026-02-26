const activeSounds = {};

function playSound(note) {

    if (activeSounds[note]) return;

    console.log("Playing:", note);
    let audio = new Audio(`sounds/${note}.mp3`);
    
    audio.loop = true; 
    audio.play();

    activeSounds[note] = audio;
}

function stopSound(note) {
    if (activeSounds[note]) {
        console.log("Stopping:", note);
        activeSounds[note].pause();
        activeSounds[note].currentTime = 0; 
        delete activeSounds[note]; 
    }
}

document.getElementById("keyC").addEventListener("mousedown", function() { 
    this.classList.add("active"); 
    playSound("C5"); 
});
document.getElementById("keyD").addEventListener("mousedown", function() { 
    this.classList.add("active"); 
    playSound("D5"); 
});
document.getElementById("keyE").addEventListener("mouseup", function() { 
    this.classList.remove("active"); 
    stopSound("E5"); 
});
document.getElementById("keyF").addEventListener("mouseup", function() { 
    this.classList.remove("active"); 
    stopSound("F5"); 
});
document.getElementById("keyG").addEventListener("mouseup", function() { 
    this.classList.remove("active"); 
    stopSound("G5"); 
});
document.getElementById("keyA").addEventListener("mouseup", function() { 
    this.classList.remove("active"); 
    stopSound("A4"); 
});
document.getElementById("keyB").addEventListener("mouseup", function() { 
    this.classList.remove("active"); 
    stopSound("B"); 
});

document.addEventListener("keydown", function(event) {
    if (event.repeat) return; 
    if (event.key === "a") {
        playSound("C5");
        document.getElementById("keyC").classList.add("active");
    } else if (event.key === "s") {
        playSound("D5");
        document.getElementById("keyD").classList.add("active");
    } else if (event.key === "d") {
        playSound("E5");
        document.getElementById("keyE").classList.add("active");
    } else if (event.key === "f") {
        playSound("F5");
        document.getElementById("keyF").classList.add("active");
    } else if (event.key === "g") {
        playSound("G5");
        document.getElementById("keyG").classList.add("active");
    } else if (event.key === "h") {
        playSound("A4");
        document.getElementById("keyA").classList.add("active");
    } else if (event.key === "j") {
        playSound("B");
        document.getElementById("keyB").classList.add("active");
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key === "a") {
        stopSound("C5");
        document.getElementById("keyC").classList.remove("active");
    } else if (event.key === "s") {
        stopSound("D5");
        document.getElementById("keyD").classList.remove("active");
    } else if (event.key === "d") {
        stopSound("E5");
        document.getElementById("keyE").classList.remove("active");
    } else if (event.key === "f") {
        stopSound("F5");
        document.getElementById("keyF").classList.remove("active");
    } else if (event.key === "g") {
        stopSound("G5");
        document.getElementById("keyG").classList.remove("active");
    } else if (event.key === "h") {
        stopSound("A4");
        document.getElementById("keyA").classList.remove("active");
    } else if (event.key === "j") {
        stopSound("B");
        document.getElementById("keyB").classList.remove("active");
    }
});