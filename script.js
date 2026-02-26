function playSound(note) {
            console.log("Playing:", note);
            let audio = new Audio(`sounds/${note}.mp3`);
            audio.play();
}

document.getElementById("keyC").addEventListener("click", function() { playSound("C"); });
document.getElementById("keyD").addEventListener("click", function() { playSound("D"); });
document.getElementById("keyE").addEventListener("click", function() { playSound("E"); });
document.getElementById("keyF").addEventListener("click", function() { playSound("F"); });
document.getElementById("keyG").addEventListener("click", function() { playSound("G"); });
document.getElementById("keyA").addEventListener("click", function() { playSound("A"); });
document.getElementById("keyB").addEventListener("click", function() { playSound("B"); });

document.addEventListener("keydown", function(event) {
    if (event.key === "a") {
        playSound("C");
    } else if (event.key === "s") {
        playSound("D");
    } else if (event.key === "d") {
        playSound("E");
    } else if (event.key === "f") {
        playSound("F");
    } else if (event.key === "g") {
        playSound("G");
    } else if (event.key === "h") {
        playSound("A");
    } else if (event.key === "j") {
        playSound("B");
    }
});