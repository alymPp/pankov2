let correctAnswers = 0;
let currentTask = 0; // Счетчик задач
const totalTasks = 10; // Всего задач
let correctAnswer; // Объявляем correctAnswer в глобальной области видимости

// Функция для генерации задачи
function generateTask() {
    // Генерация случайных чисел
    const num1 = Math.floor(Math.random() * 11) + 10; // Случайное число от 10 до 20 для сложения/вычитания
    const num2 = Math.floor(Math.random() * 11) + 10; // Случайное число от 10 до 20 для сложения/вычитания

    // Возможные операторы для сложения/вычитания
    const operator1 = Math.random() < 0.5 ? '+' : '-';
    // Возможные операторы для умножения/деления
    const operator2 = Math.random() < 0.5 ? '*' : '/';

    let result;
    let taskText;

    if (operator2 === '/') {
        // Для деления
        let possibleDivisors = [];
        // Ограничиваем диапазон делителей, чтобы они были меньше делимого
        for (let i = 2; i < num2; i++) {
            if (num2 % i === 0) {
                possibleDivisors.push(i);
            }
        }

        if (possibleDivisors.length === 0) {
            // Если делителей нет, генерируем новую задачу
            generateTask();
            return;
        }

        const divisor = possibleDivisors[Math.floor(Math.random() * possibleDivisors.length)];
        result = num2 / divisor;
        taskText = `${num1} ${operator1} ${num2} / ${divisor}`;
    } else {
        // Для умножения
        const num3 = Math.floor(Math.random() * 9) + 2;
        result = num2 * num3;
        taskText = `${num1} ${operator1} ${num2} * ${num3}`;
    }

    // Для сложения или вычитания
    switch (operator1) {
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
    if (isNaN(userAnswer)) {
        document.getElementById('result').textContent = 'Введите число!';
        return;
    }
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
        setTimeout(generateTask, 2000); // Генерация следующей задачи через 2 секунды
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
