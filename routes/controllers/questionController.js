import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    question_text: [validasaur.required, validasaur.minLength(1)],  
};

const answerValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],  
};

const getQuestionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    const data = {
        question_text: params.get("question_text"),
        validationErrors: {},
    };
    return data;
};

const getAnswerData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    const data = {
        option_text: params.get("option_text"),
        isCorrect: params.has("is_correct"),
        validationErrors: {},
    };
    return data;
};

const validationData = {
    name: "",
    validationErrors: {},
};

const addQuestion = async ({ params, request, response, user }) => {
    const data = await getQuestionData(request);
    const id = params.id;
    console.log("this is data{} from addQuestion() -->", typeof data, data);
    const [passes, errors] = await validasaur.validate(data, questionValidationRules);

    if (!passes) {
        console.log(errors);
        data.validationErrors = errors;
        validationData.name = data.question_text;
        validationData.validationErrors = data.validationErrors;
        
    } else {
            await questionService.addQuestion(user.id, id, data.question_text);
            validationData.name = "";
            validationData.validationErrors = {};
            console.log("form submit from addTopic -->", user);
           
    }

    response.redirect(`/topics/${id}`);
};
// const addQuestion = async ({ params, request, response, user }) => {
//     const body = request.body({ type: "form"});
//     const formData = await body.value;
//     const id = params.id;
//     await questionService.addQuestion(
//         // userId is set to 1 change later
//         user.id,
//         id,
//         formData.get("question_text"),
//     );
//     response.redirect(`/topics/${id}`); 
// }

const listQuestions = async ({ params, render }) => {
    const id = params.id;
    console.log("Topic ID from listQuestions:", id);
    render("questions.eta", { 
        topicId: id,
        questions: await questionService.listQuestions(id),
        name: validationData.name,
        validationErrors: validationData.validationErrors, 
    });
};

const addAnswer = async ({ params, request, response, user }) => {
    const data = await getAnswerData(request);
    console.log("this is data{} from addAnswer() -->", typeof data, data);
    const [passes, errors] = await validasaur.validate(data, answerValidationRules);

    if (!passes) {
        console.log(errors);
        data.validationErrors = errors;
        validationData.name = data.option_text;
        validationData.validationErrors = data.validationErrors;
        
    } else {
            await questionService.addAnswer(data.option_text, data.isCorrect, params.qId);
            validationData.name = "";
            validationData.validationErrors = {};
            console.log("form submit from addTopic -->", user);
           
    }

    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};

// const addAnswer = async ({ params, request, response }) => {
//     const body = request.body({ type: "form" });
//     const formData = await body.value;
//     const qId = params.qId;
//     const topicId = params.id;

//     const optionText = formData.get("option_text") || ''; // Default to an empty string if not provided
//     const isCorrect = formData.has("is_correct"); // Check if the checkbox is present
     
//     await questionService.addAnswer(optionText, isCorrect, qId);

//     response.redirect(`/topics/${topicId}/questions/${qId}`);
// }

const listAnswers = async ({ params, render }) => {
    const topicId = params.id;
    const qId = params.qId;
    render("singleQuestion.eta", { 
        topicId: topicId,
        questionId: qId,
        answers: await questionService.listAnswers(qId),
        thisTopicId: topicId,
        question: await questionService.listSingleQuestion(qId),
        name: validationData.name,
        validationErrors: validationData.validationErrors,  
    });
};

const deleteAnswerOption = async ({ params, response, user }) => {
    const optionId = params.oId;
    const topicId = params.tId;
    const qId = params.qId;
    if (user) {
        await questionService.deleteAnswerOption(optionId);
        console.log("answer deleted from deleteAnswerOptions", user)
    } else {
        console.log("only authenticated users can delete answers", user)
    }
    
    response.redirect(`/topics/${topicId}/questions/${qId}`);   
}

const deleteQuestion= async ({ params, response, user }) => {
    const topicId = params.tId;
    const qId = params.qId;
    if (user) {
        await questionService.deleteQuestion(qId);
        console.log("question deleted from deleteAnswerOptions", user)
    } else {
        console.log("only authenticated users can delete questions", user)
    }
    
    response.redirect(`/topics/${topicId}`);   
}

export {
    addQuestion,
    listQuestions,
    addAnswer,
    listAnswers,
    deleteAnswerOption,
    deleteQuestion,
}