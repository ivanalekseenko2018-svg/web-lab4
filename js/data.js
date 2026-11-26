// Банк питань для 8-го варіанту: "DOM: маніпуляції з елементами та атрибутами"
// 3 рівні складності (easy, medium, hard), по 15 питань у кожному (разом 45)
const QUESTION_BANK = [
    // початковий рівень (easy) — 15 питань
    new RadioQuestion({
        id: 1,
        type: 'radio',
        difficulty: 'easy',
        points: 1,
        text: 'Який метод використовується для створення нового HTML-елемента в DOM?',
        options: [
            'document.createElement()',
            'document.newElement()',
            'document.addTag()',
            'document.makeNode()'
        ],
        correctAnswer: 'document.createElement()'
    }),
    new RadioQuestion({
        id: 2,
        type: 'radio',
        difficulty: 'easy',
        points: 1,
        text: 'Яка властивість змінює лише звичайний текст елемента без обробки HTML-тегів?',
        options: ['textContent', 'innerHTML', 'outerHTML', 'tagName'],
        correctAnswer: 'textContent'
    }),
    new RadioQuestion({
        id: 3,
        type: 'radio',
        difficulty: 'easy',
        points: 1,
        text: 'Який метод додає новий дочірній вузол у кінець батьківського елемента?',
        options: [
            'parent.appendChild(el)',
            'parent.pushChild(el)',
            'parent.addNode(el)',
            'parent.insertEnd(el)'
        ],
        correctAnswer: 'parent.appendChild(el)'
    }),
    new CheckboxQuestion({
        id: 4,
        type: 'checkbox',
        difficulty: 'easy',
        points: 2,
        text: 'Оберіть методи, які належать до властивості element.classList:',
        options: ['add()', 'remove()', 'toggle()', 'push()'],
        correctAnswer: ['add()', 'remove()', 'toggle()']
    }),
    new CheckboxQuestion({
        id: 5,
        type: 'checkbox',
        difficulty: 'easy',
        points: 2,
        text: 'Які властивості дозволяють змінити вміст усередині DOM-елемента?',
        options: ['innerHTML', 'textContent', 'parentNode', 'nodeType'],
        correctAnswer: ['innerHTML', 'textContent']
    }),
    new SelectQuestion({
        id: 6,
        type: 'select',
        difficulty: 'easy',
        points: 1,
        text: 'Оберіть сучасний метод для видалення елемента з DOM-дерева без звернення до батька:',
        options: [
            'element.remove()',
            'element.delete()',
            'element.destroy()',
            'document.drop(element)'
        ],
        correctAnswer: 'element.remove()'
    }),
    new SelectQuestion({
        id: 7,
        type: 'select',
        difficulty: 'easy',
        points: 1,
        text: 'Який метод встановлює або оновлює значення HTML-атрибута елемента?',
        options: [
            'element.setAttribute()',
            'element.putAttribute()',
            'element.changeAttr()',
            'element.writeAttribute()'
        ],
        correctAnswer: 'element.setAttribute()'
    }),
    new DragDropQuestion({
        id: 8,
        type: 'drag-drop',
        difficulty: 'easy',
        points: 2,
        text: 'Перетягніть базові методи DOM до їхнього призначення:',
        pairs: [
            { term: 'createElement()', match: 'Створює новий вузол-елемент' },
            { term: 'createTextNode()', match: 'Створює окремий текстовий вузол' },
            { term: 'appendChild()', match: 'Додає вузол у кінець батьківського елемента' },
            { term: 'element.remove()', match: 'Видаляє елемент із документа' }
        ]
    }),
    new DragDropQuestion({
        id: 9,
        type: 'drag-drop',
        difficulty: 'easy',
        points: 2,
        text: 'Встановіть відповідність між методами classList та їхньою дією:',
        pairs: [
            { term: 'classList.add()', match: 'Додає вказаний CSS-клас' },
            { term: 'classList.remove()', match: 'Видаляє вказаний CSS-клас' },
            { term: 'classList.toggle()', match: 'Додає клас, якщо його немає, або видаляє, якщо є' },
            { term: 'classList.contains()', match: 'Повертає true або false щодо наявності класу' }
        ]
    }),
    new CodeQuestion({
        id: 10,
        type: 'code-write',
        difficulty: 'easy',
        points: 2,
        text: "Напишіть рядок JS, який створює новий елемент <div> та зберігає його у константу box:",
        placeholder: "const box = ...",
        acceptedAnswers: [
            "const box = document.createElement('div');",
            'const box = document.createElement("div");'
        ],
        requiredParts: ['const box', 'document.createElement', "'div'"],
        dynamicHint: "Використайте const box = document.createElement('div')",
        correctAnswer: "const box = document.createElement('div');"
    }),
    new CodeQuestion({
        id: 11,
        type: 'code-write',
        difficulty: 'easy',
        points: 2,
        text: "Напишіть рядок коду, який встановлює тексту елемента el значення 'Hello' через textContent:",
        placeholder: "el.textContent = ...",
        acceptedAnswers: [
            "el.textContent = 'Hello';",
            'el.textContent = "Hello";'
        ],
        requiredParts: ['el.textContent', "'Hello'"],
        dynamicHint: "Зверніться до el.textContent і присвойте рядок 'Hello'",
        correctAnswer: "el.textContent = 'Hello';"
    }),
    new CodeQuestion({
        id: 12,
        type: 'fill-blank',
        difficulty: 'easy',
        points: 1,
        text: "Заповніть пропуск (впишіть лише назву методу), щоб додати клас 'active' кнопці btn:",
        codeSnippet: "btn.classList.____('active');",
        inputTag: 'input',
        placeholder: 'Назва методу',
        acceptedAnswers: ['add'],
        dynamicHint: 'Потрібен метод classList для додавання класу',
        correctAnswer: 'add'
    }),
    new CodeQuestion({
        id: 13,
        type: 'fill-blank',
        difficulty: 'easy',
        points: 1,
        text: "Заповніть пропуск (впишіть лише назву методу), щоб прочитати значення атрибута 'href':",
        codeSnippet: "const url = link.____('href');",
        inputTag: 'input',
        placeholder: 'Назва методу',
        acceptedAnswers: ['getAttribute'],
        dynamicHint: 'Метод для отримання значення атрибута (camelCase)',
        correctAnswer: 'getAttribute'
    }),
    new CodeQuestion({
        id: 14,
        type: 'debug',
        difficulty: 'easy',
        points: 2,
        text: 'Виправте помилку в записі CSS-властивості через об’єкт style:',
        initialValue: "el.style.background-color = 'red';",
        acceptedAnswers: [
            "el.style.backgroundColor = 'red';",
            'el.style.backgroundColor = "red";'
        ],
        dynamicHint: 'У JS властивості style пишуться у стилі camelCase (без дефісу)',
        correctAnswer: "el.style.backgroundColor = 'red';"
    }),
    new CodeQuestion({
        id: 15,
        type: 'debug',
        difficulty: 'easy',
        points: 2,
        text: "Виправте помилку в назві методу для видалення атрибута 'disabled':",
        initialValue: "btn.deleteAttribute('disabled');",
        acceptedAnswers: [
            "btn.removeAttribute('disabled');",
            'btn.removeAttribute("disabled");'
        ],
        dynamicHint: 'Для видалення атрибута використовується слово remove, а не delete',
        correctAnswer: "btn.removeAttribute('disabled');"
    }),

    // середній рівень (medium) — 15 питань
    new RadioQuestion({
        id: 16,
        type: 'radio',
        difficulty: 'medium',
        points: 2,
        text: 'Який метод вставляє новий вузол newEl перед існуючим дочірнім елементом refEl?',
        options: [
            'parent.insertBefore(newEl, refEl)',
            'parent.appendBefore(newEl, refEl)',
            'parent.prependChild(refEl, newEl)',
            'refEl.putBefore(newEl)'
        ],
        correctAnswer: 'parent.insertBefore(newEl, refEl)'
    }),
    new RadioQuestion({
        id: 17,
        type: 'radio',
        difficulty: 'medium',
        points: 2,
        text: "Що поверне element.getAttribute('data-role'), якщо такого атрибута на елементі немає?",
        options: ['null', 'undefined', 'false', '"" (порожній рядок)'],
        correctAnswer: 'null'
    }),
    new RadioQuestion({
        id: 18,
        type: 'radio',
        difficulty: 'medium',
        points: 2,
        text: 'У чому головна різниця між innerHTML та textContent при записі рядка "<b>Test</b>"?',
        options: [
            'innerHTML створить жирний тег <b>, а textContent виведе символи <b> як звичайний текст',
            'textContent створить тег <b>, а innerHTML його проігнорує',
            'Обидві властивості працюють абсолютно однаково',
            'innerHTML працює лише для тегів <div>'
        ],
        correctAnswer: 'innerHTML створить жирний тег <b>, а textContent виведе символи <b> як звичайний текст'
    }),
    new CheckboxQuestion({
        id: 19,
        type: 'checkbox',
        difficulty: 'medium',
        points: 3,
        text: 'Оберіть існуючі методи для роботи з HTML-атрибутами DOM-елемента:',
        options: [
            'setAttribute()',
            'getAttribute()',
            'removeAttribute()',
            'clearAllAttributes()'
        ],
        correctAnswer: ['setAttribute()', 'getAttribute()', 'removeAttribute()']
    }),
    new CheckboxQuestion({
        id: 20,
        type: 'checkbox',
        difficulty: 'medium',
        points: 3,
        text: 'Які з наведених команд коректно змінять зовнішній вигляд елемента box у JS?',
        options: [
            "box.style.color = 'green'",
            "box.classList.add('active')",
            "box.css('color', 'green')",
            "box.setStyle('color: green')"
        ],
        correctAnswer: ["box.style.color = 'green'", "box.classList.add('active')"]
    }),
    new SelectQuestion({
        id: 21,
        type: 'select',
        difficulty: 'medium',
        points: 2,
        text: 'Який метод замінює дочірній елемент oldEl на новий newEl всередині parent?',
        options: [
            'parent.replaceChild(newEl, oldEl)',
            'parent.swapChild(oldEl, newEl)',
            'parent.changeChild(newEl, oldEl)',
            'oldEl.replaceParent(newEl)'
        ],
        correctAnswer: 'parent.replaceChild(newEl, oldEl)'
    }),
    new SelectQuestion({
        id: 22,
        type: 'select',
        difficulty: 'medium',
        points: 2,
        text: 'Як правильно звернутися в JS до HTML-атрибута data-user-id через властивість dataset?',
        options: [
            'el.dataset.userId',
            'el.dataset.user-id',
            'el.dataset.dataUserId',
            'el.data.userId'
        ],
        correctAnswer: 'el.dataset.userId'
    }),
    new DragDropQuestion({
        id: 23,
        type: 'drag-drop',
        difficulty: 'medium',
        points: 3,
        text: 'Зіставте методи керування атрибутами з їхньою дією:',
        pairs: [
            { term: 'setAttribute(name, val)', match: 'Задає нове значення атрибута' },
            { term: 'getAttribute(name)', match: 'Повертає поточне значення атрибута' },
            { term: 'removeAttribute(name)', match: 'Повністю видаляє атрибут з елемента' },
            { term: 'hasAttribute(name)', match: 'Перевіряє, чи існує атрибут на елементі' }
        ]
    }),
    new DragDropQuestion({
        id: 24,
        type: 'drag-drop',
        difficulty: 'medium',
        points: 3,
        text: 'Встановіть відповідність між методами зміни DOM-дерева та результатом:',
        pairs: [
            { term: 'insertBefore(newEl, refEl)', match: 'Вставляє вузол перед вказаним сусідом' },
            { term: 'replaceChild(newEl, oldEl)', match: 'Замінює існуючий дочірній вузол на новий' },
            { term: 'removeChild(el)', match: 'Видаляє дочірній вузол через батька' },
            { term: 'cloneNode(true)', match: 'Створює копію вузла разом із вкладеними елементами' }
        ]
    }),
    new CodeQuestion({
        id: 25,
        type: 'code-write',
        difficulty: 'medium',
        points: 3,
        text: "Напишіть рядок коду, щоб встановити елементу card атрибут 'data-id' зі значенням '42':",
        placeholder: "card.setAttribute(...)",
        acceptedAnswers: [
            "card.setAttribute('data-id', '42');",
            'card.setAttribute("data-id", "42");'
        ],
        requiredParts: ['card.setAttribute', "'data-id'", "'42'"],
        dynamicHint: "Викличте card.setAttribute('data-id', '42')",
        correctAnswer: "card.setAttribute('data-id', '42');"
    }),
    new CodeQuestion({
        id: 26,
        type: 'code-write',
        difficulty: 'medium',
        points: 3,
        text: "Напишіть рядок коду, який перемикає (додає або прибирає) клас 'open' на елементі menu:",
        placeholder: "menu.classList...",
        acceptedAnswers: [
            "menu.classList.toggle('open');",
            'menu.classList.toggle("open");'
        ],
        requiredParts: ['menu.classList.toggle', "'open'"],
        dynamicHint: "Використайте метод classList.toggle('open')",
        correctAnswer: "menu.classList.toggle('open');"
    }),
    new CodeQuestion({
        id: 27,
        type: 'fill-blank',
        difficulty: 'medium',
        points: 2,
        text: "Заповніть пропуск, щоб вставити HTML-розмітку '<p>OK</p>' всередину блоку box:",
        codeSnippet: "box.____ = '<p>OK</p>';",
        inputTag: 'input',
        placeholder: 'Назва властивості',
        acceptedAnswers: ['innerHTML'],
        dynamicHint: 'Властивість для запису HTML-вмісту (зверніть увагу на регістр HTML)',
        correctAnswer: 'innerHTML'
    }),
    new CodeQuestion({
        id: 28,
        type: 'fill-blank',
        difficulty: 'medium',
        points: 2,
        text: 'Заповніть пропуск, щоб додати створений елемент item у кінець списку list:',
        codeSnippet: 'list.____(item);',
        inputTag: 'input',
        placeholder: 'Назва методу',
        acceptedAnswers: ['appendChild', 'append'],
        dynamicHint: 'Метод додавання дочірнього вузла в кінець контейнера',
        correctAnswer: 'appendChild'
    }),
    new CodeQuestion({
        id: 29,
        type: 'debug',
        difficulty: 'medium',
        points: 3,
        text: 'Виправте помилку при отриманні обчислених CSS-стилів елемента box:',
        initialValue: 'const styles = box.getComputedStyle();',
        acceptedAnswers: [
            'const styles = getComputedStyle(box);',
            'const styles = window.getComputedStyle(box);'
        ],
        dynamicHint: 'getComputedStyle є глобальною функцією window і приймає елемент як аргумент',
        correctAnswer: 'const styles = getComputedStyle(box);'
    }),
    new CodeQuestion({
        id: 30,
        type: 'debug',
        difficulty: 'medium',
        points: 3,
        text: "Виправте помилку при перевірці наявності класу 'active' у елемента tab:",
        initialValue: "const isActive = tab.classList.has('active');",
        acceptedAnswers: [
            "const isActive = tab.classList.contains('active');",
            'const isActive = tab.classList.contains("active");'
        ],
        dynamicHint: 'У classList замість has() використовується метод contains()',
        correctAnswer: "const isActive = tab.classList.contains('active');"
    }),

    // складний рівень (hard) — 15 питань
    new RadioQuestion({
        id: 31,
        type: 'radio',
        difficulty: 'hard',
        points: 3,
        text: 'Що станеться, якщо передати у parent.appendChild(el) елемент el, який уже знаходиться в іншій частині DOM?',
        options: [
            'Елемент переміститься зі старого місця в нове без створення копії',
            'Створиться автоматична копія елемента',
            'Виникне помилка DuplicateNodeError',
            'Нічого не відбудеться'
        ],
        correctAnswer: 'Елемент переміститься зі старого місця в нове без створення копії'
    }),
    new RadioQuestion({
        id: 32,
        type: 'radio',
        difficulty: 'hard',
        points: 3,
        text: 'Чому при виведенні даних, введених користувачем, рекомендують textContent замість innerHTML?',
        options: [
            'textContent екранує теги й захищає сторінку від XSS-ін’єкцій',
            'innerHTML не підтримує кирилицю',
            'textContent автоматично стилізує текст через CSS',
            'innerHTML працює лише один раз на сторінці'
        ],
        correctAnswer: 'textContent екранує теги й захищає сторінку від XSS-ін’єкцій'
    }),
    new RadioQuestion({
        id: 33,
        type: 'radio',
        difficulty: 'hard',
        points: 3,
        text: "Що повертає виклик el.classList.toggle('active'), якщо після виклику клас 'active' ДОДАВСЯ до елемента?",
        options: ['true', 'false', 'undefined', "'active'"],
        correctAnswer: 'true'
    }),
    new CheckboxQuestion({
        id: 34,
        type: 'checkbox',
        difficulty: 'hard',
        points: 4,
        text: 'Які сучасні методи дозволяють вставляти кілька вузлів або звичайні рядки тексту одразу (на відміну від appendChild)?',
        options: ['append()', 'prepend()', 'after()', 'appendChild()'],
        correctAnswer: ['append()', 'prepend()', 'after()']
    }),
    new CheckboxQuestion({
        id: 35,
        type: 'checkbox',
        difficulty: 'hard',
        points: 4,
        text: 'Оберіть правильні твердження щодо методу element.cloneNode(deep):',
        options: [
            'cloneNode(true) копіює елемент разом із усіма його дочірніми вузлами',
            'cloneNode(false) копіює лише сам вузол без вкладених елементів',
            'cloneNode() автоматично видаляє оригінальний елемент із DOM',
            'cloneNode(true) копіює всі обробники, додані через addEventListener'
        ],
        correctAnswer: [
            'cloneNode(true) копіює елемент разом із усіма його дочірніми вузлами',
            'cloneNode(false) копіює лише сам вузол без вкладених елементів'
        ]
    }),
    new SelectQuestion({
        id: 36,
        type: 'select',
        difficulty: 'hard',
        points: 3,
        text: 'Який метод вставляє HTML-рядок у задану позицію відносно елемента без перезбірки існуючих дочірніх вузлів?',
        options: [
            'insertAdjacentHTML()',
            'appendHTMLString()',
            'innerHTMLInsert()',
            'addMarkupAt()'
        ],
        correctAnswer: 'insertAdjacentHTML()'
    }),
    new SelectQuestion({
        id: 37,
        type: 'select',
        difficulty: 'hard',
        points: 3,
        text: 'Яке значення параметра position у insertAdjacentHTML(position, html) вставляє код всередину елемента перед першим дочірнім вузлом?',
        options: ["'afterbegin'", "'beforebegin'", "'beforeend'", "'afterend'"],
        correctAnswer: "'afterbegin'"
    }),
    new DragDropQuestion({
        id: 38,
        type: 'drag-drop',
        difficulty: 'hard',
        points: 4,
        text: 'Зіставте позиції методу insertAdjacentHTML із місцем вставки розмітки:',
        pairs: [
            { term: 'beforebegin', match: 'Зовні, безпосередньо перед самим елементом' },
            { term: 'afterbegin', match: 'Всередині елемента, перед першим дочірнім вузлом' },
            { term: 'beforeend', match: 'Всередині елемента, після останнього дочірнього вузла' },
            { term: 'afterend', match: 'Зовні, безпосередньо після самого елемента' }
        ]
    }),
    new DragDropQuestion({
        id: 39,
        type: 'drag-drop',
        difficulty: 'hard',
        points: 4,
        text: 'Встановіть відповідність між інструментом DOM та його особливістю:',
        pairs: [
            { term: 'el.style', match: 'Читає і змінює лише інлайн-стилі в атрибуті style' },
            { term: 'getComputedStyle(el)', match: 'Повертає підсумкові стилі з урахуванням усіх CSS-файлів' },
            { term: 'el.dataset', match: 'Надає доступ до кастомних data-* атрибутів' },
            { term: 'DocumentFragment', match: 'Тимчасовий контейнер для пакетної вставки без зайвих reflow' }
        ]
    }),
    new CodeQuestion({
        id: 40,
        type: 'code-write',
        difficulty: 'hard',
        points: 4,
        text: 'Напишіть рядок коду для глибокого клонування елемента card (з усіма нащадками) у константу copy:',
        placeholder: 'const copy = ...',
        acceptedAnswers: ['const copy = card.cloneNode(true);'],
        requiredParts: ['const copy', 'card.cloneNode', 'true'],
        dynamicHint: 'Викличте card.cloneNode(true) і збережіть у const copy',
        correctAnswer: 'const copy = card.cloneNode(true);'
    }),
    new CodeQuestion({
        id: 41,
        type: 'code-write',
        difficulty: 'hard',
        points: 4,
        text: "Напишіть рядок коду, що вставляє '<span>Hi</span>' у кінець всередині елемента box через insertAdjacentHTML:",
        placeholder: "box.insertAdjacentHTML(...)",
        acceptedAnswers: [
            "box.insertAdjacentHTML('beforeend', '<span>Hi</span>');",
            'box.insertAdjacentHTML("beforeend", "<span>Hi</span>");'
        ],
        requiredParts: ['box.insertAdjacentHTML', "'beforeend'", "'<span>Hi</span>'"],
        dynamicHint: "Перший аргумент — 'beforeend', другий — '<span>Hi</span>'",
        correctAnswer: "box.insertAdjacentHTML('beforeend', '<span>Hi</span>');"
    }),
    new CodeQuestion({
        id: 42,
        type: 'fill-blank',
        difficulty: 'hard',
        points: 3,
        text: 'Заповніть пропуск, щоб створити легкий фрагмент документа для пакетного додавання вузлів:',
        codeSnippet: 'const fragment = document.____();',
        inputTag: 'input',
        placeholder: 'Назва методу',
        acceptedAnswers: ['createDocumentFragment'],
        dynamicHint: 'Метод об’єкта document для створення DocumentFragment',
        correctAnswer: 'createDocumentFragment'
    }),
    new CodeQuestion({
        id: 43,
        type: 'fill-blank',
        difficulty: 'hard',
        points: 3,
        text: 'Заповніть пропуск, щоб замінити старий вузол oldItem на newItem у контейнері list:',
        codeSnippet: 'list.____(newItem, oldItem);',
        inputTag: 'input',
        placeholder: 'Назва методу',
        acceptedAnswers: ['replaceChild'],
        dynamicHint: 'Класичний метод батьківського вузла для заміни дочірнього елемента',
        correctAnswer: 'replaceChild'
    }),
    new CodeQuestion({
        id: 44,
        type: 'debug',
        difficulty: 'hard',
        points: 4,
        text: 'Виправте помилку в порядку аргументів: потрібно вставити newEl перед опорним refEl усередині parent:',
        initialValue: 'parent.insertBefore(refEl, newEl);',
        acceptedAnswers: ['parent.insertBefore(newEl, refEl);'],
        dynamicHint: 'У insertBefore першим аргументом завжди йде новий вузол, а другим — опорний',
        correctAnswer: 'parent.insertBefore(newEl, refEl);'
    }),
    new CodeQuestion({
        id: 45,
        type: 'debug',
        difficulty: 'hard',
        points: 4,
        text: 'Виправте помилку при видаленні одразу двох класів (пробіл у рядку викликає SyntaxError):',
        initialValue: "el.classList.remove('active hidden');",
        acceptedAnswers: [
            "el.classList.remove('active', 'hidden');",
            'el.classList.remove("active", "hidden");'
        ],
        dynamicHint: 'Кілька класів у classList.remove() передаються окремими аргументами через кому',
        correctAnswer: "el.classList.remove('active', 'hidden');"
    })
];