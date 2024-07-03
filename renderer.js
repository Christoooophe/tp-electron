const buttonSend = document.getElementById("button-send");
let reponse = "";
buttonSend.addEventListener('click', () => {
    const answer = document.getElementById("input-text").value;
    console.log(answer)
    window.electronAPI.saveAnswer(answer);
    window.electronAPI.sendResponse();
    window.electronAPI.loadResponse(setNotes);
})


function setNotes(notes) {
    note = notes;
    console.log(note)
}
