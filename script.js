function playSound(note) {
            console.log("Playing:", note);
            let audio = new Audio(`sounds/${note}.mp3`);
            audio.play();
}