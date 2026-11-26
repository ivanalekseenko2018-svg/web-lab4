const STORAGE_KEY = 'web_lab4_dom_quiz_history';

// Вибір основних DOM-елементів
const startSection = document.getElementById('start-section');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');

const startForm = document.getElementById('start-form');
const nameInput = document.getElementById('user-name');
const groupInput = document.getElementById('user-group');
const nameError = document.getElementById('name-error');
const groupError = document.getElementById('group-error');

const historyContainer = document.getElementById('history-container');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history-btn');

const quizProgress = document.getElementById('quiz-progress');
const quizScoreLive = document.getElementById('quiz-score-live');
const questionContainer = document.getElementById('question-container');
const nextBtn = document.getElementById('next-btn');

const resultSummary = document.getElementById('result-summary');
const resultDetails = document.getElementById('result-details');
const restartBtn = document.getElementById('restart-btn');

// Створюємо екземпляр тесту з банком питань із data.js
const quiz = new Quiz(QUESTION_BANK);

// Звичайна функція для перемикання активного екрана
function showSection(sectionToShow) {
    [startSection, quizSection, resultSection].forEach((sec) => {
        sec.classList.add('hidden');
    });
    sectionToShow.classList.remove('hidden');
}

// Валідація 
function validateStartForm() {
    let isValid = true;
    nameInput.value = nameInput.value.trim();
    groupInput.value = groupInput.value.trim().toUpperCase();

    // Перевірка імені
    if (nameInput.validity.valueMissing) {
        nameError.textContent = "Поле ім'я є обов'язковим";
        nameInput.classList.add('input-error');
        isValid = false;
    } else if (nameInput.validity.tooShort) {
        nameError.textContent = "Ім'я має містити мінімум 2 символи";
        nameInput.classList.add('input-error');
        isValid = false;
    } else {
        nameError.textContent = '';
        nameInput.classList.remove('input-error');
    }

    // Перевірка групи 
    if (groupInput.validity.valueMissing) {
        groupError.textContent = "Поле група є обов'язковим";
        groupInput.classList.add('input-error');
        isValid = false;
    } else if (groupInput.validity.patternMismatch) {
        groupError.textContent = 'Формат групи: 2 літери, дефіс, 2 цифри (наприклад, ТР-51)';
        groupInput.classList.add('input-error');
        isValid = false;
    } else {
        groupError.textContent = '';
        groupInput.classList.remove('input-error');
    }

    return isValid;
}

// Відображення поточного питання
function renderCurrentQuestion() {
    const question = quiz.getCurrentQuestion();
    if (!question) return;

    const total = quiz.selectedQuestions.length;
    quizProgress.textContent = `Питання ${quiz.currentIndex + 1} з ${total}`;
    quizScoreLive.textContent = `Бали: ${quiz.score}`;
    nextBtn.textContent = quiz.currentIndex === total - 1 ? 'Завершити тест' : 'Далі';

    questionContainer.innerHTML = '';
    questionContainer.appendChild(question.render());
}

// Виведення підсумків тесту
function showResults() {
    const summary = quiz.getSummary();
    saveResultToStorage(summary);

    const { userName, userGroup, difficulty, score, maxScore, percent, details } = summary;
    const diffNames = { easy: 'Початковий', medium: 'Середній', hard: 'Складний' };

    resultSummary.innerHTML = `
        <p><strong>Студент:</strong> ${userName} (${userGroup})</p>
        <p><strong>Рівень складності:</strong> ${diffNames[difficulty]}</p>
        <p><strong>Результат:</strong> ${score} з ${maxScore} балів (${percent}%)</p>
    `;

    resultDetails.innerHTML = '';
    details.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('result-item', item.isCorrect ? 'is-correct' : 'is-wrong');

        const title = document.createElement('p');
        title.innerHTML = `<strong>${index + 1}. [${item.typeLabel}]</strong> `;
        title.appendChild(document.createTextNode(item.questionText));

        const status = document.createElement('p');
        status.textContent = item.isCorrect
            ? `Правильно (+${item.earnedPoints} б.)`
            : `Неправильно (0 / ${item.maxPoints} б.). Правильна відповідь: ${item.correctAnswer}`;

        div.appendChild(title);
        div.appendChild(status);
        resultDetails.appendChild(div);
    });

    showSection(resultSection);
}

// Робота з localStorage (збереження, читання, відображення)
function loadHistory() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveResultToStorage(summary) {
    const history = loadHistory();
    history.unshift({
        userName: summary.userName,
        userGroup: summary.userGroup,
        difficulty: summary.difficulty,
        score: summary.score,
        maxScore: summary.maxScore,
        percent: summary.percent,
        date: summary.date
    });
    //останні 8 спроб
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 8)));
}

function renderHistory() {
    const history = loadHistory();
    if (history.length === 0) {
        historyContainer.classList.add('hidden');
        return;
    }

    historyContainer.classList.remove('hidden');
    historyList.innerHTML = '';

    const diffNames = { easy: 'Початковий', medium: 'Середній', hard: 'Складний' };

    history.forEach((entry) => {
        const li = document.createElement('li');
        li.textContent = `${entry.date} — ${entry.userName} (${entry.userGroup}) | ${diffNames[entry.difficulty]} | ${entry.score}/${entry.maxScore} (${entry.percent}%)`;
        historyList.appendChild(li);
    });
}

// 1. Відправка стартової форми (використання FormData + деструктуризація)
startForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateStartForm()) return;

    const formData = new FormData(startForm);
    const { userName, userGroup, difficulty } = Object.fromEntries(formData);

    quiz.start({ userName: userName.trim(), userGroup: userGroup.trim().toUpperCase() }, difficulty);
    showSection(quizSection);
    renderCurrentQuestion();
});

// 2. Делегування події input на формі для миттєвого прибирання червоної рамки
startForm.addEventListener('input', (event) => {
    if (event.target.matches('input')) {
        event.target.classList.remove('input-error');
    }
});

// 3. Делегування події change у контейнері питань для підсвічування обраних карток
questionContainer.addEventListener('change', (event) => {
    if (event.target.matches('input[type="radio"]')) {
        questionContainer.querySelectorAll('.option-item').forEach((item) => {
            item.style.borderColor = '#cbd5e1';
            item.style.backgroundColor = '#fff';
        });
        const parentLabel = event.target.closest('.option-item');
        if (parentLabel) {
            parentLabel.style.borderColor = '#0284c7';
            parentLabel.style.backgroundColor = '#f0f9ff';
        }
    } else if (event.target.matches('input[type="checkbox"]')) {
        const parentLabel = event.target.closest('.option-item');
        if (parentLabel) {
            parentLabel.style.borderColor = event.target.checked ? '#0284c7' : '#cbd5e1';
            parentLabel.style.backgroundColor = event.target.checked ? '#f0f9ff' : '#fff';
        }
    }
});

// 4. Перехід до наступного питання або завершення тесту
nextBtn.addEventListener('click', () => {
    const hasNext = quiz.submitAnswer(questionContainer);
    if (hasNext) {
        renderCurrentQuestion();
    } else {
        showResults();
    }
});

// 5. Повторне проходження тесту
restartBtn.addEventListener('click', () => {
    renderHistory();
    showSection(startSection);
});

// 6. Очищення історії у localStorage
clearHistoryBtn.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    renderHistory();
});

// Початкове завантаження історії після побудови DOM
document.addEventListener('DOMContentLoaded', renderHistory);