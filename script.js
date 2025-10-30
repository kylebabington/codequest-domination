// Plan the Data (Questions & Answers)
const quizData = [  
    {   question: "What is the capital of France?",    options: ["Berlin", "Madrid", "Paris", "Rome"],    answer: 2},
    
    {   question: "What Color is created by mixing red and white?",    options: ["Pink", "Purple", "Orange", "Brown"],    answer: 0},
    
    {   question: "What is the capital of Japan?",    options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],    answer: 1},
    
    {   question: "Which planet is known as the Red Planet?",    options: ["Earth", "Venus", "Mars", "Jupiter"],    answer: 2},
    
    {   question: "What is the largest mammal in the world?",    options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],    answer: 1},

    {   question: "What is 5 + 7?",    options: ["10", "11", "12", "13"],    answer: 2},

    {   question: "Which element has the chemical symbol 'O'?",    options: ["Gold", "Oxygen", "Osmium", "Zinc"],    answer: 1},

    {   question: "What is the hardest natural substance on Earth?",    options: ["Gold", "Iron", "Diamond", "Quartz"],    answer: 2},

    {   question: "What is the chemical symbol for gold?",    options: ["Au", "Ag", "Pb", "Fe"],    answer: 0},

    {   question: "What is the chemical symbol for silver?",    options: ["Au", "Ag", "Pb", "Fe"],    answer: 1},

    {   question: "What is the chemical symbol for lead?",    options: ["Au", "Ag", "Pb", "Fe"],    answer: 2},

    {   question: "Who wrote 'Green eggs and Ham'?",    options: ["Dr. Seuss", "J.K. Rowling", "Roald Dahl", "Beatrix Potter"],    answer: 0},

    {   question: "Which one is a horcrux?",    options: ["The Elder Wand", "The Sorting Hat", "The Diary of Tom Riddle", "The Invisibility Cloak"],    answer: 2},

    {   question: "Who is Mr. Beast?",    options: ["A famous chef", "A popular YouTuber", "A movie director", "A professional gamer"],    answer: 1},

    {   question: "What is the capital of Italy?",    options: ["Berlin", "Madrid", "Paris", "Rome"],    answer: 3},

    {   question: "What is the largest ocean on Earth?",    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],    answer: 3},

    {   question: "What is the smallest planet in our solar system?",    options: ["Earth", "Mars", "Mercury", "Venus"],    answer: 2},

    {   question: "What is the largest desert on Earth?",    options: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Kalahari Desert"],    answer: 0},

    {   question: "What is the largest country in the world?",    options: ["China", "Canada", "Russia", "United States"],    answer: 2},

    {   question: "What is the longest river in the world?",    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],    answer: 1},

    {   question: "What is the largest island in the world?",    options: ["Greenland", "New Guinea", "Borneo", "Madagascar"],    answer: 0},

    {   question: "What is the capital of Australia?",    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],    answer: 2},

    {   question: "What movie features the song 'Let It Go'?",    options: ["Moana", "Tangled", "Frozen", "Coco"],    answer: 2},

    {   question: "What is the main ingredient in guacamole?",    options: ["Tomato", "Avocado", "Onion", "Pepper"],    answer: 1},

    {   question: "What is the main ingredient in hummus?",    options: ["Chickpeas", "Lentils", "Beans", "Peas"],    answer: 0},
];

// Shuffle questions to ensure randomness Fisher-Yates Algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j],array[i]];
    }
    return array;
}

function shuffleinPlace(array) {
    for (let i = array.length - 1; i>0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle the questions before use
shuffleArray(quizData);

// State Variables
let currentQuestionIndex = 0;
let score= 0;

//DOM Elements & Event Listeners
window.addEventListener("DOMContentLoaded", () => {
    //DOM
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const nextBtn = document.getElementById("next-btn");
    const scoreText = document.getElementById("score");
    const restartBtn = document.getElementById("restart-btn");
    // Sound effects removed per request (click/correct/wrong)
    
    scoreText.classList.add("reveal");
    scoreText.textContent = "0 / 0";



//Show one Question
function showQuestion() {
    const q = quizData[currentQuestionIndex];

    //Shuffle options
    const originalOptions = [...q.options];
    shuffleinPlace(q.options);

    //Update answer index based on shuffled options
    q.answer = q.options.indexOf(originalOptions[q.answer]); 

   //Update question text and restart fade-in animation
    questionContainer.textContent = q.question;
    questionContainer.classList.remove("fade-in");
    void questionContainer.offsetWidth;
    questionContainer.classList.add("fade-in");

    //Update progress text
    const progress = document.getElementById("progress");
    progress.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;

    //clear old options and render new ones
    optionsContainer.innerHTML = "";
    q.options.forEach((opt, i) => {
        const b = document.createElement("button");
        b.textContent = opt;
        b.className = "option-btn";
        b.onclick = () => handleAnswer(i);
        optionsContainer.appendChild(b);
    });

    nextBtn.disabled = true;
}

//Disable buttons and check answer
function handleAnswer(selectedIndex) {
    const q = quizData[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll(".option-btn");
    const progress = document.getElementById("progress");

    // Click sound removed

    //correct/score
    if (selectedIndex === q.answer) {score++ 
        buttons[selectedIndex].classList.add("correct");
    } else {
        buttons[selectedIndex].classList.add("wrong");
        buttons[q.answer].classList.add("correct");}
        scoreText.textContent = `${score} / ${currentQuestionIndex + 1}`;
    
      //Disable all buttons
        buttons.forEach(b => (b.disabled = true));
    
    //Highlight correct answer
    if (selectedIndex === q.answer) {
        progress.style.color = "mediumspringgreen";
    } else {
        progress.style.color = "tomato";
    }
    
    //Animate progress text
    progress.style.animation = "progressPulse 0.4s ease";
    
    //Reset color after animation
    setTimeout(() => {
        progress.style.animation = "none";
        progress.style.color = "";
    }, 800);

    nextBtn.disabled = false;
    nextBtn.focus();
    nextBtn.style.animation = "none";
    void nextBtn.offsetWidth;
    nextBtn.style.animation = "progressPulse 0.5s ease";
}
    //Next Question logic
function nextQuestion() {

    //advance the index
    currentQuestionIndex++;

    //If there is another question, load it
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {

    //If no more questions, show score
    scoreText.textContent = `${score} / ${quizData.length} correct!`;
    scoreText.classList.add("reveal");
    scoreText.classList.add("sparkle");

    }
    nextBtn.disabled = true;

    }

//Restart Quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreText.textContent = "0 / 0";
    shuffleArray(quizData);
    scoreText.classList.remove("sparkle");
    showQuestion();
    nextBtn.disabled = false;
}

//Wire next button
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

//Initial call to show first question
showQuestion();
});
