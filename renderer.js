const buttonSend = document.getElementById("button-send");
let reponse = "";
let questions = "";

const game = document.getElementById("game");
buttonSend.addEventListener('click', () => {
    window.electronAPI.getQuestions();
    window.electronAPI.getLoadedQuestions(getQuestions);
    getQuestionRenderer(questions[0]);
    console.log("heeeeey ", questions[0]);
})

function getQuestionRenderer(data) {
    const balise = document.getElementById("bloc-question")
    if (balise) {
        game.removeChild(balise);
    }
    const divQuestion = document.createElement('p')
    divQuestion.id = "bloc-question"
    console.log(data)
    divQuestion.textContent = data.question
    game.appendChild(divQuestion)
}

function getQuestions(data) {
    questions = data;
}
