let correctAnswers = 0;
let currentTask = 0; // Счетчик задач
const totalTasks = 10; // Всего задач

// Функция для генерации задачи
function generateTask() {
    // Генерация случайных чисел
    const num1 = Math.floor(Math.random() * 11) + 10; // Случайное число от 10 до 20 для сложения/вычитания
    const num2 = Math.floor(Math.random() * 11) + 10; // Случайное число от 10 до 20 для сложения/вычитания
    const num3 = Math.floor(Math.random() * 9) + 2;  // Случайное число от 2 до 10 для умножения/деления
    const num4 = Math.floor(Math.random() * 9) + 2;  // Случайное число от 2 до 10 для умножения/деления

    // Возможные операторы для сложения/вычитания
    const operator1 = Math.random() < 0.5 ? '+' : '-';
    // Возможные операторы для умножения/деления
    const operator2 = Math.random() < 0.5 ? '*' : '/';

    // Генерация выражения с двумя операциями
    let taskText = `${num1} ${operator1} ${num2} ${operator2} ${num3}`;

    // Вычисление правильного ответа
    let result;
    switch(operator2) {
        case '*':
            result = num2 * num3;
            break;
        case '/':
            result = num2 / num3;
            break;
    }

    // Для сложения или вычитания
    switch(operator1) {
        case '+':
            correctAnswer = num1 + result;
            break;
        case '-':
            correctAnswer = num1 - result;
            break;
    }

    // Показать задачу на экране
    document.getElementById('task').textContent = `Решите: ${taskText}`;
    document.getElementById('result').textContent = '';
    document.getElementById('answer').value = ''; // Очистить поле ввода
    document.getElementById('answer').disabled = false; // Включаем поле ввода
}

// Функция для проверки ответа
function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    if (userAnswer === correctAnswer) {
        document.getElementById('result').textContent = 'Правильный ответ!';
        correctAnswers++; // Увеличиваем количество правильных ответов
    } else {
        document.getElementById('result').textContent = 'Неправильный ответ!';
    }

    currentTask++; // Увеличиваем счетчик задач

    // Обновляем счет задач
    document.getElementById('score').textContent = `Задач решено: ${currentTask} из ${totalTasks}`;

    // Если решено 10 задач, показываем финальный результат
    if (currentTask >= totalTasks) {
        showFinalResult();
    } else {
        // После проверки ответа, блокируем поле ввода и не даем исправить ответ
        document.getElementById('answer').disabled = true; 

        // Переходим к следующей задаче через небольшую задержку
        setTimeout(generateTask, 2000); // Генерация следующей задачи через 1 секунду
    }
}

// Функция для отображения финального результата и оценки
function showFinalResult() {
    document.getElementById('task').textContent = 'Вы выполнили все задачи!';
    document.getElementById('result').textContent = `Ваш результат: ${correctAnswers} из ${totalTasks}.`;

    // Определение оценки
    let grade;
    if (correctAnswers >= 8) {
        grade = 5;
    } else if (correctAnswers >= 7) {
        grade = 4;
    } else if (correctAnswers >= 6) {
        grade = 3;
    } else {
        grade = 2;
    }

    document.getElementById('score').textContent += ` Оценка: ${grade}`;
    document.getElementById('answer').disabled = true; // Отключаем поле для ввода
    document.querySelector('button').disabled = true; // Отключаем кнопку "Проверить"
}

// Генерируем первую задачу при загрузке страницы
generateTask();