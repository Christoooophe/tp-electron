const buttonSend = document.getElementById("button-send");
let reponse = "";
let questions = "";
buttonSend.addEventListener('click', () => {
    window.electronAPI.getQuestions();
    window.electronAPI.getLoadedQuestions(getQuestions);
})


function getQuestions(questions) {
    questions = questions;
    console.log(questions)
}
