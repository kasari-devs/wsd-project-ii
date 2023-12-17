import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";

const listTopics = async ({ render }) => {
    
    // const rows = await questionService.listQuestions(23);
    // const randomQuestion = rows[Math.floor(Math.random() * rows.length)];
    // const randomQuestionId = randomQuestion.id;
    // console.log("random question from listRandomQuestion: --> ", randomQuestionId);
   
        render("quiz.eta", {
        topics: await topicService.listTopics(),
        });
    
};

let randomQuestionObj = {
    id: null,
    topic_id: null,
    question_text: "",
    is_correct: "", 
}

const getRandomQuestion = async ({ params, render, response }) => {
    const topicId = params.tId;
    const rows = await questionService.listQuestions(topicId);
    const randomQuestion = rows[Math.floor(Math.random() * rows.length)];
    const randomQuestionId = randomQuestion.id;

    randomQuestionObj.id = randomQuestion.id;
    randomQuestionObj.topic_id = randomQuestion.topic_id;
    randomQuestionObj.question_text = randomQuestion.question_text;
    randomQuestionObj.is_correct = randomQuestion.is_correct;

    console.log("randomQuestion from getRandomQuestion: --> ", randomQuestion);
    console.log("getRandomQuestionObj: --> ", randomQuestionObj);

    response.redirect(`/quiz/${topicId}/questions/${randomQuestionId}`);
};


const listRandomQuestion = async ({ params, render, response }) => {
    console.log("randomQuestionObj from listRandomQuestion: --> ", randomQuestionObj);
    render("randomQuiz.eta", { 
        tId: randomQuestionObj.topic_id,
        qId: randomQuestionObj.id,
        question_text: randomQuestionObj.question_text,
        is_correct: randomQuestionObj.is_correct,
        answers: await questionService.listAnswers(randomQuestionObj.id),
    });
}

const processQuizResult = async ({ request, params,response, user}) => {

    //const body = request.body({ type: "form" });
    //const formData = await body.value;
    //const userSelection = formData.has("is_correct");

    const answerId = params.oId;
    const userId = user.id;
    const topicId = params.tId;
    const questionId = params.qId;
    console.log(`proccessQuizResult--> topicId: ${topicId}, questionId: ${questionId}, answerId: ${answerId}`);
    await questionService.insertQuizResult(userId, questionId, answerId);
    const results = await questionService.getCorrectQuestionAns(questionId, answerId);
    console.log("this is results from processQuizResult --> ", results);
    const userSelection = results[0].is_correct
    console.log(`userSelection: ${userSelection}`);
    var isTrue = userSelection
    switch (isTrue.toString()) {
        case 'true':
            response.redirect(`/quiz/${topicId}/questions/${questionId}/correct`);
            break;
        case 'false':
            response.redirect(`/quiz/${topicId}/questions/${questionId}/incorrect`);
            break;
    }
}

const showCorrectAnswer = async ({ render, params }) => {
    render("correctAns.eta", {
        topicId: params.tId,
    });
};

const showWrongAnswer = async ({ render, params }) => {
    const results = await questionService.getCorrectQuestionAnsText(params.qId);
    console.log("this is results from showWrongAnswer --> ", results);
    render("wrongAns.eta", {
        topicId: params.tId,
        answer: results[0].option_text,
    });
};


export { 
    listTopics,
    getRandomQuestion,
    listRandomQuestion,
    processQuizResult,
    showCorrectAnswer,
    showWrongAnswer,
}