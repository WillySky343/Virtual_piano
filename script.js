function playSound(note) {
    console.log("Playing:", note);
    let audio = new Audio(`sounds/${note}.mp3`);
    audio.play();
}

document.getElementById("keyC").addEventListener("click", function() {
    this.classList.add("active");
    playSound("C5");
    setTimeout(() => { this.classList.remove("active"); }, 150);
});

document.getElementById("keyD").addEventListener("click", function() {
    this.classList.add("active");
    playSound("D5");
    setTimeout(() => { this.classList.remove("active"); }, 150);
});

document.getElementById("keyE").addEventListener("click", function() {
    this.classList.add("active");
    playSound("E5");
    setTimeout(() => { this.classList.remove("active"); }, 150);
});

document.getElementById("keyF").addEventListener("click", function() {
    this.classList.add("active");
    playSound("F5");
    setTimeout(() => { this.classList.remove("active"); }, 150);
});

document.getElementById("keyG").addEventListener("click", function() {
    this.classList.add("active");
    playSound("G5");
    setTimeout(() => { this.classList.remove("active"); }, 150);
});

document.getElementById("keyA").addEventListener("click", function() {
    this.classList.add("active");
    playSound("A4");
    setTimeout(() => { this.classList.remove("active"); }, 150);
});

document.getElementById("keyB").addEventListener("click", function() {
    this.classList.add("active");
    playSound("B");
    setTimeout(() => { this.classList.remove("active"); }, 150);
});

document.addEventListener("keydown", function(event) {
    if (event.key === "a") {
        playSound("C5");
        const el = document.getElementById("keyC");
        el.classList.add("active");
        setTimeout(() => el.classList.remove("active"), 150);
    } else if (event.key === "s") {
        playSound("D5");
        const el = document.getElementById("keyD");
        el.classList.add("active");
        setTimeout(() => el.classList.remove("active"), 150);
    } else if (event.key === "d") {
        playSound("E5");
        const el = document.getElementById("keyE");
        el.classList.add("active");
        setTimeout(() => el.classList.remove("active"), 150);
    } else if (event.key === "f") {
        playSound("F5");
        const el = document.getElementById("keyF");
        el.classList.add("active");
        setTimeout(() => el.classList.remove("active"), 150);
    } else if (event.key === "g") {
        playSound("G5");
        const el = document.getElementById("keyG");
        el.classList.add("active");
        setTimeout(() => el.classList.remove("active"), 150);
    } else if (event.key === "h") {
        playSound("A4");
        const el = document.getElementById("keyA");
        el.classList.add("active");
        setTimeout(() => el.classList.remove("active"), 150);
    } else if (event.key === "j") {
        playSound("B");
        const el = document.getElementById("keyB");
        el.classList.add("active");
        setTimeout(() => el.classList.remove("active"), 150);
    }
}); 