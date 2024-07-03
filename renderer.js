const buttonSend = document.getElementById("button-send");
let reponse = "";
let questions = "";
buttonSend.addEventListener('click', () => {
    window.electronAPI.getQuestions();
    window.electronAPI.getLoadedQuestions(getQuestions);
})


function getQuestions(data) {
    questions = data;
    console.log(questions)
}
