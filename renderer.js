const buttonSend = document.getElementById("button-send");
let questions = "";
let response = "";
let increment = 0;
const game = document.getElementById("game");
buttonSend.addEventListener('click', () => {
    window.electronAPI.getQuestions();
    window.electronAPI.getLoadedQuestions(getQuestions);
    getQuestionRenderer(questions[increment]);
})

function getQuestionRenderer(data) {
    response = data.reponse;
    const balise = document.getElementById("bloc-question");
    if (balise) {
        game.removeChild(balise);
    }
    const divQuestion = document.createElement('div')
    const mappedQuestions = data.choices.map((item) => {
        return `<button onclick="getResponse(this.textContent, response)" class="possible-answer">${item}</button>`;
    });
    divQuestion.id = "bloc-question";
    divQuestion.innerHTML = `<p>${data.question}</p>`
    divQuestion.innerHTML += mappedQuestions;
    game.appendChild(divQuestion)
}

function getResponse(e, reponse) {
    console.log(e, reponse)
    increment++;
    if (increment > questions.length - 1) {
        return alert("GG !")
    }
    getQuestionRenderer(questions[increment])
}

function getQuestions(data) {
    questions = data;
}
