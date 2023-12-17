import * as questionService from "../../services/questionService.js";

let correctAnsforQuestion = {
    questionId: '',
    optionId: '',
};
const listRandomQuestion = async ({ response }) => {
    const questions = await questionService.listAllQuestions();
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    console.log("random question from API --> ",randomQuestion)
    const answers = await questionService.listAllAnswers();
    const matchingAnswers = answers.filter(answer => answer.question_id === randomQuestion.id);
    const result = {
        "questionId": randomQuestion.id,
        "questionText": randomQuestion.question_text,
        "answerOptions": matchingAnswers.map(answer => ({
            optionId: answer.id,
            optionText: answer.option_text,
            correct: answer.is_correct,
        })),  
    }
    // const result = randomQuestion.map(question => {
    //     const matchingAnswers = answers.filter(answer => answer.question_id === question.id);
    //     return {
    //         questionId: question.id,
    //         questionText: question.question_text,
    //         answerOptions: matchingAnswers.map(answer => ({
    //             optionId: answer.id,
    //             optionText: answer.option_text,
    //             correct: answer.is_correct,
    //         })),
    //     };
        
    // });

    response.body = result;
};

const findOptionIdByQuestionId = (data, targetQuestionId) => {
    for (const key in data) {
        if (data.hasOwnProperty(key) && data[key].questionId === targetQuestionId) {
            return data[key].optionId;
        }
    }
    return null; // Return null if no match is found
};

const validateResponse = async ({ response, request }) => {
    const questions = await questionService.listAllQuestions();
    const answers = await questionService.listAllAnswers();

    questions.map(question => {
        const matchingAnswers = answers.filter(answer => answer.question_id === question.id);
        const correctAnswer = matchingAnswers.find(answer => answer.is_correct === true);
        correctAnsforQuestion[question.id] = {
            questionId: question.id,
            optionId: correctAnswer ? correctAnswer.id : null,
        };
        
    });
    
   // here get the questionId from post request 

    const body = request.body({ type: "json" });
    const params = await body.value;
    const { questionId, optionId } = params;
    const correctOptionId = findOptionIdByQuestionId(correctAnsforQuestion, questionId);
    console.log(`questionId: ${questionId}, optionId: ${optionId}`);
    console.log(`correctOptionId: ${correctOptionId}`);
    if (optionId === correctOptionId) {
        response.body = {
            correct: true,
        }
    } else {
        response.body = {
            correct: false,
        }
    }
    //response.body = correctAnsforQuestion;
}



export { listRandomQuestion, validateResponse };