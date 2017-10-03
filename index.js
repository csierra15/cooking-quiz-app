const myQuestions = [{
    question: "(1 of 10) What type of cut is julienne?",
    answers: ["cubes", "shredded", "long, thin strips", "roughly chopped"],
    correctAnswer: 2
}, {
    
    question: "(2 of 10) Cutting cold fat into dry ingredients is known as the",
    answers: ["muffin method","biscuit method", "cookie method", "donut method"],
    correctAnswer: 1
}, {
    
    question: "(3 of 10) What are the four basic ingredients for bread?",
    answers: ["Flour, Water, Sugar, Eggs", "Flour, Milk, Eggs, Yeast", "Flour, Milk, Sugar, Yeast", "Flour, Water, Salt, Yeast"],
    correctAnswer: 3
}, {
    
    question: "(4 of 10) What does it mean to blanche a vegetable?",
    answers: ["soak in ice water", "heat over an open flame", "boil for a short amount of time", "rub with oil"],
    correctAnswer: 2
}, {
    
    question: "(5 of 10) Which of the following is the milk based Mother Sauce?",
    answers: ["Velouté", "Espagnole", "Béchamel", "Hollandaise"],
    correctAnswer: 2
}, {
    
    question: "(6 of 10) Caramelization is the browning of what?",
    answers: ["Fats", "Lipids", "Protiens", "Sugars"],
    correctAnswer: 3
}, {
    
    question: "(7 of 10) What are the three main spices in Pumpkin Spice?",
    answers: ["cinnamon, clove, allspice", "cinnamon, ginger, coriander", "cinnamon, cumin, cardamom", "cinnamon, pepper, clove"],
    correctAnswer: 0
}, {    
    
    question: "(8 of 10) How many teaspoons are in a tablespoon?",
    answers: ["2", "3", "4", "5"],
    correctAnswer: 1
}, {
  
    question: "(9 of 10) What 3 vegetables does a mirepoix consist of?",
    answers: ["mushroom, onion, tomato", "tomato, squash, potato", "carrot, onion, celery", "peppers, onions, mushrooms"],
    correctAnswer: 2
}, {
    
    question: "(10 of 10) What ingredient brings out the flavor in foods?",
    answers: ["salt", "sugar", "pepper", "garlic"],
    correctAnswer: 0
}];

let currentQuestion = 0;
let correctAnswerTotal = 0;
let quizFinished = false;

$(document).ready(function () {
  $("#js-start-page").on("click", ".js-start-button", event => {
      $("#js-start-page").hide();
      $(".js-quiz-container").show();
      doQuestionsPage();
      $(".js-start-over-button").hide();
      $(".js-answer-options").show();
      $(".js-submit-button").show();
      $('.js-question-container').show();
      quizFinished = false;
    });
    
  $(".js-start-over-button").on("click", resetQuiz);
  
  function doStartPage() {
    $(".js-quiz-container").hide();
  }
  
  doStartPage();
  
  function doQuestionsPage() {
    let question = myQuestions[currentQuestion].question;
    let questionClass = $(".js-question-container");
    let answerOptions = $(".js-answer-options");
    let numOptions = myQuestions[currentQuestion].answers.length;
    
    $(questionClass).text(question);
    
    $(answerOptions).find("li").remove();
    
    let option;
    for (let i=0; i<numOptions; i++) {
      option = myQuestions[currentQuestion].answers[i];
      $('<li><label for="radio"><input type="radio" role="radio" required value=' + i +' name = "myradio" />' + option + '</li>').appendTo(answerOptions);
    }
  }
  
  doQuestionsPage();
  $(".js-start-over-button").hide();
  $(".js-select-answer").hide();
  $(".js-next-question").hide();
    
    $(".js-submit-button").on("click", function () {
      if ($('.js-answer-options li [type=radio]:checked').length == 0) {
        $(".js-select-answer").text("Please choose an answer");
        $(".js-select-answer").show();
        
        return;
      }
      $(".js-select-answer").hide();
      if (!quizFinished) {
        doFeedback();
        let value = $("input[type='radio']:checked").val();
        
        if (value == myQuestions[currentQuestion].correctAnswer) {
          correctAnswerTotal++;
        }
        
        currentQuestion++;
        
        if (currentQuestion < myQuestions.length) {
          doQuestionsPage();
          
        } else {
          doResultsPage();
          $(".js-next-question").hide();
          $(".js-feedback-page").hide();
          quizFinished = true;
         }
          
      } else {
        console.log('hello');
        quizFinished = false;
        $(".js-submit-button").hide();
        $(".js-feedback-page").hide();
        $(".js-start-over-button").show();
        
        //resetQuiz();
        //doStartPage();
        //hideResultsPage();
      }
    });

  function doFeedback() {
      let userAnswer = $('.js-answer-options li [type=radio]:checked')[0].value;
      
      $(".js-next-question").show();
      $(".js-feedback-page").show();
      $(".js-question-container").hide();
      $(".js-answer-options").hide();
      $(".js-submit-button").hide();
      
      if (userAnswer == myQuestions[currentQuestion].correctAnswer) {
        $(".js-feedback-page").html("<span class = 'right'>That's right!</span>");
      } else {
        $(".js-feedback-page").html("<span class = 'wrong'>Not that one!</span>");
      }
      $(".js-next-question").on("click", function () {
        $(".js-question-container").show();
        $(".js-answer-options").show();
        $(".js-next-question").hide();
        $(".js-feedback-page").hide();
        $(".js-submit-button").show();
      });
  }
  
    
  function resetQuiz() {
    currentQuestion = 0;
    correctAnswerTotal = 0;
    hideResultsPage();
    doStartPage();
    $('#js-start-page').show();
  }
  
  function doResultsPage() {
    $(".js-start-over-button").show();
    $(".js-next-question").hide();
    $(".js-feedback-page").hide();
    $(".js-test-results").text("You got " + correctAnswerTotal + " out of " + myQuestions.length + " correct!");
    $(".js-test-results").show();
  }
  
  function hideResultsPage() {
    $(".js-test-results").hide();
  }

});