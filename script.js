function playSound(note) {
            console.log("Playing:", note);
            let audio = new Audio(`sounds/${note}.mp3`);
            audio.play();
}

document.getElementById("keyC").addEventListener("click", function() { playSound("C5"); });
document.getElementById("keyD").addEventListener("click", function() { playSound("D5"); });
document.getElementById("keyE").addEventListener("click", function() { playSound("E5"); });
document.getElementById("keyF").addEventListener("click", function() { playSound("F5"); });
document.getElementById("keyG").addEventListener("click", function() { playSound("G5"); });
document.getElementById("keyA").addEventListener("click", function() { playSound("A4"); });
document.getElementById("keyB").addEventListener("click", function() { playSound("B"); });

document.addEventListener("keydown", function(event) {
    if (event.key === "a") {
        playSound("C5");
    } else if (event.key === "s") {
        playSound("D5");
    } else if (event.key === "d") {
        playSound("E5");
    } else if (event.key === "f") {
        playSound("F5");
    } else if (event.key === "g") {
        playSound("G5");
    } else if (event.key === "h") {
        playSound("A4");
    } else if (event.key === "j") {
        playSound("B");
    }
});