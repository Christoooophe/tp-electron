const buttonSend = document.getElementById("button-send");
let reponse = "";
let questions = "";

const game = document.getElementById("game");
buttonSend.addEventListener('click', () => {
    window.electronAPI.getQuestions();
    window.electronAPI.getLoadedQuestions(getQuestions);
    getQuestionRenderer(questions[0]);
})

function getQuestionRenderer(data) {
    const balise = document.getElementById("bloc-question")
    if (balise) {
        game.removeChild(balise);
    }
    const divQuestion = document.createElement('div')
    const mappedQuestions = data.choices.map((item) => {
        return `<button className="possible-answer">${item}</button>`;
    });
    divQuestion.id = "bloc-question";
    divQuestion.innerHTML = `<p>${data.question}</p>`
    divQuestion.innerHTML += mappedQuestions;
    game.appendChild(divQuestion)
}

function getQuestions(data) {
    questions = data;
}
