const questions = [
    { q: 'In HTTP, which response status code represents successful asynchronous creation of a resource?', opts: ['200 OK', '201 Created', '304 Not Modified', '404 Not Found'], ans: 1 },
    { q: 'Which object is used in JavaScript to initiate an asynchronous AJAX request to a backend server?', opts: ['XMLHttpRequest / fetch()', 'JSON.stringify()', 'DocumentFragment', 'WorkerThread'], ans: 0 },
    { q: 'In MVC web architecture, which component encapsulates the business logic and database interactions?', opts: ['View', 'Controller', 'Model', 'Router'], ans: 2 }
];
let curIdx = 0, answers = {};
function renderQ() {
    const q = questions[curIdx];
    document.getElementById('qTitle').innerText = `Question ${curIdx + 1} of ${questions.length}`;
    document.getElementById('qText').innerText = q.q;
    const cont = document.getElementById('optionsList');
    cont.innerHTML = q.opts.map((opt, i) => `
        <div class="opt-btn ${answers[curIdx] === i ? 'selected' : ''}" onclick="selectOpt(${i})">${String.fromCharCode(65 + i)}. ${opt}</div>
    `).join('');
    document.getElementById('nextBtn').innerText = curIdx === questions.length - 1 ? 'Submit Exam' : 'Next Question →';
}
function selectOpt(i) { answers[curIdx] = i; renderQ(); }
function nextQ() {
    if (curIdx < questions.length - 1) { curIdx++; renderQ(); }
    else finishExam();
}
function prevQ() { if (curIdx > 0) { curIdx--; renderQ(); } }
function finishExam() {
    let score = 0;
    questions.forEach((q, i) => { if (answers[i] === q.ans) score++; });
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('scoreDisplay').innerText = `${score} / ${questions.length}`;
    document.getElementById('scoreFeedback').innerText = score >= 2 ? 'Congratulations! You qualified the campus placement technical screening round.' : 'Good attempt. Needs revision in Internet Programming core topics.';
}
window.addEventListener('DOMContentLoaded', renderQ);