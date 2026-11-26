// Базовий клас для всіх питань тесту
class Question {
    constructor({ id, type, difficulty, text, points = 1, correctAnswer }) {
        this.id = id;
        this.type = type;
        this.difficulty = difficulty;
        this.text = text;
        this.points = points;
        this.correctAnswer = correctAnswer;
    }

    // перемішування масиву (алгоритм Фішера - Єйтса)
    static shuffle(array) {
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    // нормалізація коду (ігнорує зайві пробіли, різні лапки та крапку з комою в кінці)
    static normalizeCode(str) {
        return String(str)
            .trim()
            .replace(/"/g, "'")
            .replace(/\s*([=(),;:.{}])\s*/g, '$1')
            .replace(/\s+/g, ' ')
            .replace(/;$/, '');
    }

    // назва типу питання на екрані
    get typeLabel() {
        const labels = {
            'radio': 'Одна відповідь',
            'checkbox': 'Кілька відповідей',
            'select': 'Випадаючий список',
            'drag-drop': 'Відповідність (Drag & Drop)',
            'code-write': 'Написання коду',
            'fill-blank': 'Заповнення пропуску',
            'debug': 'Виправлення помилки'
        };
        return labels[this.type] || 'Завдання';
    }

    // Створює спільну шапку питання (бейдж типу, бали та текст)
    createBaseWrapper() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('question-block');

        const meta = document.createElement('div');
        meta.classList.add('question-meta');

        const badge = document.createElement('span');
        badge.classList.add('question-badge');
        badge.textContent = this.typeLabel;

        const pts = document.createElement('span');
        pts.textContent = `Балів: ${this.points}`;

        meta.appendChild(badge);
        meta.appendChild(pts);

        const title = document.createElement('h3');
        title.classList.add('question-title');
        title.textContent = this.text;

        wrapper.appendChild(meta);
        wrapper.appendChild(title);
        return wrapper;
    }

    render() {
        return this.createBaseWrapper();
    }

    getUserAnswer() {
        return null;
    }

    checkAnswer(userAnswer) {
        return userAnswer === this.correctAnswer;
    }

    formatCorrectAnswer() {
        return String(this.correctAnswer);
    }
}

// 1. Запитання з однією правильною відповіддю
class RadioQuestion extends Question {
    constructor(config) {
        super(config);
        this.options = config.options;
    }

    render() {
        const wrapper = this.createBaseWrapper();
        const list = document.createElement('div');
        list.classList.add('options-list');

        // Перемішуємо варіанти відповідей при кожному рендері
        const shuffledOptions = Question.shuffle(this.options);

        shuffledOptions.forEach((optText) => {
            const label = document.createElement('label');
            label.classList.add('option-item');

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question_${this.id}`;
            input.value = optText;

            const span = document.createElement('span');
            span.textContent = optText;

            label.appendChild(input);
            label.appendChild(span);
            list.appendChild(label);
        });

        wrapper.appendChild(list);
        return wrapper;
    }

    getUserAnswer(container) {
        const checked = container.querySelector(`input[name="question_${this.id}"]:checked`);
        return checked ? checked.value : '';
    }
}

// 2. Запитання з кількома правильними відповідями (Checkboxes)
class CheckboxQuestion extends Question {
    constructor(config) {
        super(config);
        this.options = config.options;
    }

    render() {
        const wrapper = this.createBaseWrapper();
        const list = document.createElement('div');
        list.classList.add('options-list');

        const shuffledOptions = Question.shuffle(this.options);

        shuffledOptions.forEach((optText) => {
            const label = document.createElement('label');
            label.classList.add('option-item');

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.name = `question_${this.id}`;
            input.value = optText;

            const span = document.createElement('span');
            span.textContent = optText;

            label.appendChild(input);
            label.appendChild(span);
            list.appendChild(label);
        });

        wrapper.appendChild(list);
        return wrapper;
    }

    getUserAnswer(container) {
        const checkedInputs = container.querySelectorAll(`input[name="question_${this.id}"]:checked`);
        return Array.from(checkedInputs).map((input) => input.value);
    }

    checkAnswer(userAnswer) {
        if (!Array.isArray(userAnswer) || userAnswer.length !== this.correctAnswer.length) {
            return false;
        }
        const sortedUser = [...userAnswer].sort();
        const sortedCorrect = [...this.correctAnswer].sort();
        return sortedUser.every((val, idx) => val === sortedCorrect[idx]);
    }

    formatCorrectAnswer() {
        return this.correctAnswer.join('; ');
    }
}

// 3. Запитання з вибором із випадаючого списку (Select)
class SelectQuestion extends Question {
    constructor(config) {
        super(config);
        this.options = config.options;
    }

    render() {
        const wrapper = this.createBaseWrapper();
        const select = document.createElement('select');
        select.classList.add('answer-select');
        select.setAttribute('name', `question_${this.id}`);

        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = '-- Оберіть правильний варіант --';
        select.appendChild(defaultOpt);

        const shuffledOptions = Question.shuffle(this.options);
        shuffledOptions.forEach((optText) => {
            const option = document.createElement('option');
            option.value = optText;
            option.textContent = optText;
            select.appendChild(option);
        });

        wrapper.appendChild(select);
        return wrapper;
    }

    getUserAnswer(container) {
        const select = container.querySelector('select.answer-select');
        return select ? select.value : '';
    }
}

// 4. Встановлення відповідності
class DragDropQuestion extends Question {
    constructor(config) {
        super(config);
        this.pairs = config.pairs; 
    }

    render() {
        const wrapper = this.createBaseWrapper();
        const dndWrapper = document.createElement('div');
        dndWrapper.classList.add('dnd-wrapper');

        // Ліва колонка - перетягувані елементи
        const pool = document.createElement('div');
        pool.classList.add('dnd-pool');

        const shuffledTerms = Question.shuffle(this.pairs.map((p) => p.term));
        shuffledTerms.forEach((term, idx) => {
            const item = document.createElement('div');
            item.classList.add('dnd-item');
            item.setAttribute('draggable', 'true');
            item.id = `dnd-item-${this.id}-${idx}`;
            item.dataset.term = term;
            item.textContent = term;

            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.id);
            });

            pool.appendChild(item);
        });

        // повернення елемента назад якщо поза зоною скидання
        pool.addEventListener('dragover', (e) => e.preventDefault());
        pool.addEventListener('drop', (e) => {
            e.preventDefault();
            const itemId = e.dataTransfer.getData('text/plain');
            const draggedEl = document.getElementById(itemId);
            if (draggedEl) {
                pool.appendChild(draggedEl);
            }
        });

        // Права колонка - зони скидання 
        const targets = document.createElement('div');
        targets.classList.add('dnd-targets');

        const shuffledPairs = Question.shuffle(this.pairs);
        shuffledPairs.forEach((pair) => {
            const row = document.createElement('div');
            row.classList.add('dnd-target-row');

            const label = document.createElement('div');
            label.classList.add('dnd-label');
            label.textContent = pair.match;

            const dropzone = document.createElement('div');
            dropzone.classList.add('dnd-dropzone');
            dropzone.dataset.match = pair.match;

            dropzone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropzone.classList.add('drag-over');
            });

            dropzone.addEventListener('dragleave', () => {
                dropzone.classList.remove('drag-over');
            });

            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzone.classList.remove('drag-over');
                const itemId = e.dataTransfer.getData('text/plain');
                const draggedEl = document.getElementById(itemId);
                if (!draggedEl) return;

                // Якщо в зоні вже лежить інший елемент, повертаємо його в пул
                const existing = dropzone.querySelector('.dnd-item');
                if (existing && existing !== draggedEl) {
                    pool.appendChild(existing);
                }
                dropzone.appendChild(draggedEl);
            });

            row.appendChild(label);
            row.appendChild(dropzone);
            targets.appendChild(row);
        });

        dndWrapper.appendChild(pool);
        dndWrapper.appendChild(targets);
        wrapper.appendChild(dndWrapper);
        return wrapper;
    }

    getUserAnswer(container) {
        const result = {};
        const zones = container.querySelectorAll('.dnd-dropzone');
        zones.forEach((zone) => {
            const droppedItem = zone.querySelector('.dnd-item');
            result[zone.dataset.match] = droppedItem ? droppedItem.dataset.term : '';
        });
        return result;
    }

    checkAnswer(userAnswer) {
        if (!userAnswer || typeof userAnswer !== 'object') return false;
        return this.pairs.every((pair) => userAnswer[pair.match] === pair.term);
    }

    formatCorrectAnswer() {
        return this.pairs.map((p) => `${p.term} → ${p.match}`).join(' | ');
    }
}

// 5. Спільний клас для 3 текстових завдань: написання коду, пропуски, debugging
class CodeQuestion extends Question {
    constructor(config) {
        super(config);
        this.codeSnippet = config.codeSnippet || '';
        this.initialValue = config.initialValue || '';
        this.placeholder = config.placeholder || 'Введіть ваш код тут...';
        this.inputTag = config.inputTag || 'textarea'; // 'input' для fill-blank, 'textarea' для code-write/debug
        this.acceptedAnswers = config.acceptedAnswers || [];
        this.requiredParts = config.requiredParts || [];
        this.dynamicHint = config.dynamicHint || 'Перевірте синтаксис та назви методів DOM';
    }

    render() {
        const wrapper = this.createBaseWrapper();

        if (this.codeSnippet) {
            const pre = document.createElement('pre');
            pre.classList.add('code-snippet');
            pre.textContent = this.codeSnippet;
            wrapper.appendChild(pre);
        }

        const field = document.createElement(this.inputTag);
        field.classList.add('code-input');
        if (this.inputTag === 'input') {
            field.type = 'text';
        } else {
            field.rows = 3;
        }
        field.placeholder = this.placeholder;
        field.value = this.initialValue;

        const status = document.createElement('div');
        status.classList.add('dynamic-status');

        // Динамічна перевірка коду прямо під час набору тексту
        field.addEventListener('input', () => {
            const val = field.value.trim();
            status.classList.remove('status-ok', 'status-warn');

            if (!val) {
                status.textContent = '';
                return;
            }

            if (this.checkAnswer(val)) {
                status.textContent = 'Динамічна перевірка: синтаксис і логіка коректні';
                status.classList.add('status-ok');
            } else {
                status.textContent = 'Код ще неповний або містить помилку...';
                status.classList.add('status-warn');
            }
        });

        wrapper.appendChild(field);
        wrapper.appendChild(status);
        return wrapper;
    }

    getUserAnswer(container) {
        const field = container.querySelector('.code-input');
        return field ? field.value.trim() : '';
    }

    checkAnswer(userAnswer) {
        if (!userAnswer) return false;
        const normalizedUser = Question.normalizeCode(userAnswer);

        if (this.acceptedAnswers.length > 0) {
            const exactMatch = this.acceptedAnswers.some(
                (ans) => Question.normalizeCode(ans) === normalizedUser
            );
            if (exactMatch) return true;
        }

        if (this.requiredParts.length > 0) {
            return this.requiredParts.every((part) => {
                if (part instanceof RegExp) {
                    return part.test(normalizedUser);
                }
                return normalizedUser.includes(Question.normalizeCode(part));
            });
        }

        return false;
    }

    formatCorrectAnswer() {
        return this.correctAnswer;
    }
}

// Клас керування тестом
class Quiz {
    constructor(allQuestions) {
        this.allQuestions = allQuestions;
        this.selectedQuestions = [];
        this.currentIndex = 0;
        this.score = 0;
        this.maxScore = 0;
        this.user = null;
        this.difficulty = 'easy';
        this.resultsLog = [];
    }

    // Відбір 10 випадкових питань із гарантованою наявністю всіх 7 типів завдань
    start(user, difficulty) {
        this.user = user;
        this.difficulty = difficulty;
        this.currentIndex = 0;
        this.score = 0;
        this.resultsLog = [];

        const levelPool = Question.shuffle(
            this.allQuestions.filter((q) => q.difficulty === difficulty)
        );

        const mandatoryTypes = [
            'radio', 'checkbox', 'select', 'drag-drop',
            'code-write', 'fill-blank', 'debug'
        ];
        const chosen = [];
        mandatoryTypes.forEach((type) => {
            const found = levelPool.find((q) => q.type === type && !chosen.includes(q));
            if (found) {
                chosen.push(found);
            }
        });

        const rest = levelPool.filter((q) => !chosen.includes(q));
        const needed = Math.max(0, 10 - chosen.length);
        this.selectedQuestions = Question.shuffle([...chosen, ...rest.slice(0, needed)]);

        this.maxScore = this.selectedQuestions.reduce((acc, q) => acc + q.points, 0);
    }

    getCurrentQuestion() {
        return this.selectedQuestions[this.currentIndex] || null;
    }

    submitAnswer(container) {
        const question = this.getCurrentQuestion();
        if (!question) return false;

        const userAnswer = question.getUserAnswer(container);
        const isCorrect = question.checkAnswer(userAnswer);

        if (isCorrect) {
            this.score += question.points;
        }

        this.resultsLog.push({
            questionText: question.text,
            typeLabel: question.typeLabel,
            isCorrect,
            earnedPoints: isCorrect ? question.points : 0,
            maxPoints: question.points,
            correctAnswer: question.formatCorrectAnswer()
        });

        this.currentIndex++;
        return this.currentIndex < this.selectedQuestions.length;
    }

    getSummary() {
        const percent = this.maxScore > 0
            ? Math.round((this.score / this.maxScore) * 100)
            : 0;

        return {
            userName: this.user.userName,
            userGroup: this.user.userGroup,
            difficulty: this.difficulty,
            score: this.score,
            maxScore: this.maxScore,
            percent,
            date: new Date().toLocaleString('uk-UA'),
            details: this.resultsLog
        };
    }
}