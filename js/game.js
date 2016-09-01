$(document).ready(function(){

    quiz.reset();


    $('#start').on("click", function(){ 
        timer.start();
        quiz.displayQuestion(quiz.index);
        showQuestion = setInterval(quiz.nextQuestion, 10000);
    })

    $(document).on('click', '.option', quiz.displayAnswer);


    $('#start-over').on("click", function(){
        quiz.reset(); 
        $('#question-contaner').show();
        timer.start();
        quiz.displayQuestion(quiz.index);
        showQuestion = setInterval(quiz.nextQuestion, 10000);
    })

});

var timer = {
    start: function() {
        counter = setInterval(timer.countDown, 1000); // here timer should be counting    
    },
    stop: function() {
        clearInterval(counter);
    },
    countDown: function() {
        
        $('#timer').show();
        $('#timer').html('Time remaining: ' + quiz.time + ' sec.');
        quiz.time--;
    }    
}

var quiz = {
    quizList: [{
                question: "First question?",
                choices: ["485", "634", "408", "528"],
                correctAnswer: 2 },
            {
                question: "Second question?",
                choices: ["Grand Central, NY", "Shibuya, Tokyo", "Beijing Central, Chine", "Gard du Nord, Paris"],
                correctAnswer: 1 },
            {
                question: "Third question?",
                choices: ["Nile", "Amazon", "Mississippi", "Yangtze"],
                correctAnswer: 0 }, 
            {
                question: "Fouth question?",
                choices: ["Waterloo", "Baker Street", "Kings Cross", "Victoria"],
                correctAnswer: 0 }
        ],  
    time: 20,
    index: 0,
    correct: 0,
    incorrect: 0,
    timesUp: 0,
    reset: function() {
        quiz.time = 20;
        quiz.index = 0;  
        quiz.correct = 0;
        quiz.incorrect = 0;
        quiz.timesUp = 0;
        $('#timer'). hide();
        $('#question').hide();
        $('#answer').hide();
        $('#choices').hide();
        $('#game-over-contaner').hide();
        $('#start-over').hide();        
    },

    displayQuestion: function(index){
        //$('#timer').show();
       // console.log('time from display: ' + quiz.time);
        $('#start').hide();
        $('#answer').hide();

        $('#question').show();
        $('#choices').show();

        $('#question').html(''+ quiz.quizList[index].question + ' ');
        $('#choices').empty();
        
        for (var i = 0; i < quiz.quizList[index].choices.length; i++ ) {

            $('#choices').append('<li id="' + i + '" class="list-group-item list-group-item-info option">' + quiz.quizList[index].choices[i] + '</li>');
        
            console.log(quiz.quizList[index].choices[i]);
        }


    },

    nextQuestion() {
        timer.start();
        quiz.index++;

        quiz.displayQuestion(quiz.index);

        if (quiz.index == (quiz.quizList[quiz.index].choices.length - 1)) {
            //quiz.index = 0;
            clearInterval(showQuestion);
            quiz.quizOver();
        }

    },

    displayAnswer() {
        timer.stop();
        $('#question-contaner').hide();
        $('#answer-contaner').show();
        $('#answer').show();

        var answerIndx = $('#choices li').index(this);
        console.log('My answer: ' + answerIndx + ' | Right one: ' + quiz.quizList[quiz.index].choices[quiz.quizList[quiz.index].correctAnswer]);
        console.log('Quiz index: ' + quiz.index);

        var myAnswer = $('<div>');
        myAnswer.attr('id', 'answer');   

        if (answerIndx === quiz.quizList[quiz.index].correctAnswer) {
            quiz.correct++;

            myAnswer.text(' Correct! It is '+ quiz.quizList[quiz.index].choices[quiz.quizList[quiz.index].correctAnswer] + '!');
        }
        //incorrect answer
        if (answerIndx != quiz.quizList[quiz.index].correctAnswer) {
            quiz.incorrect++;

            //if answer is not correct

            myAnswer.text(' No :( The correct answer: '+ quiz.quizList[quiz.index].choices[quiz.quizList[quiz.index].correctAnswer] + ' ');            
        }
        //time is up
        if ((quiz.time * 100) === 10000) {
            quiz.timesUp++;

            myAnswer.text(' Your time is up! Correct answer: '+ quiz.quizList[quiz.index].choices[quiz.quizList[quiz.index].correctAnswer] + ' ');
        }

        $('#answer-contaner').append(myAnswer);
        
        clearInterval(showQuestion);
        quiz.nextQuestion();
    },

    quizOver: function() {
        timer.stop();
        $('#answer-contaner').hide();
        $('#question-contaner').hide();        
        $('#game-over-contaner').show();
        $('#correct-answers').html('Correct answers: ' + quiz.correct);
        $('#incorrect-answers').html('Incorrect answers: ' + quiz.incorrect);
        $('#unanswered').html('Unanswered questions: ' + quiz.timesUp);  
        $('#start-over').show();      
    }
};


