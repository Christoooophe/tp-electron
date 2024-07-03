let questions = "";
let response = "";
let increment = 0;
let score = 0;
let name = "default-user"

const buttonName = document.getElementById("button-name");
const buttonSend = document.getElementById("button-send");
const game = document.getElementById("game");

buttonName.addEventListener('click', () => {
    const inputName = document.getElementById("text-input").value;
    name = inputName;
    document.getElementById('nameH1').textContent = name;
})

function launchGame() {
    window.electronAPI.getQuestions();
    window.electronAPI.getLoadedQuestions(getQuestions);
    getQuestionRenderer(questions[increment]);
}
buttonSend.addEventListener('click', () => {
    launchGame();
})

function getQuestionRenderer(data) {
    response = data.reponse;
    const balise = document.getElementById("bloc-question");
    if (balise) {
        game.removeChild(balise);
    }
    const divQuestion = document.createElement('div')
    const mappedQuestions = data.choices.map((item) => {
        return `<button class="btn btn-info" onclick="getResponse(this.textContent, response)" class="possible-answer">${item}</button>`;
    });
    divQuestion.id = "bloc-question";
    divQuestion.innerHTML += `<p class="text-center fs-1 m-2">${data.question}</p>`
    divQuestion.innerHTML += mappedQuestions;
    game.appendChild(divQuestion)
}

function getResponse(e, reponse) {
    if (e === reponse) {
        score++;
    }
    increment++;
    if (increment > questions.length - 1) {
        window.electronAPI.sendScore(name, score)
        return alert(score)
    }
    getQuestionRenderer(questions[increment])
}

function getQuestions(data) {
    questions = data;
}
