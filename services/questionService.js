import { sql} from "../database/database.js";

const addQuestion = async (userId,topicId, questionText) => {
    try {
        await sql`INSERT INTO questions (user_id, topic_id, question_text)
        VALUES (${userId}, ${topicId}, ${questionText});
        `;
        console.log("Question added successfully! --> ", questionText);
    } catch (error) {
        console.error("Error adding Question:", error.message);
        throw error;
    }
};

const listQuestions = async (id) => {
    const rows = await sql `SELECT * FROM questions WHERE topic_id = ${id}`;
    return rows;
};

const totalNumberOfQuestions = async () => {
    const rows = await sql `SELECT COUNT(*) AS total_rows FROM questions`;
    //console.log("number of rows in topic: ", rows)
    return rows;
};

const listAllQuestionsAndOptionsApi = async () => {
    const rows = await sql `SELECT * FROM questions JOIN question_answer_options ON questions.id = question_answer_options.question_id;`;
    return rows;
};

const listAllQuestions = async () => {
    const rows = await sql `SELECT * FROM questions`;
    return rows;
};

const listAllAnswers = async () => {
    const rows = await sql `SELECT * FROM question_answer_options`;
    return rows;
};


const listAnswers = async (id) => {
    try {
        const rows = await sql `SELECT * FROM question_answer_options WHERE question_id = ${id}`;
        console.log("rows from listAnswers --> ", rows);

        // Map rows to the desired structure
        const answers = rows.map(row => ({
            id: row.id,
            question_id: row.question_id,
            option_text: row.option_text,
            is_correct: row.is_correct,
            
        }));

        return answers;
    } catch (error) {
        console.error("Error in listAnswers:", error);
        throw error; // Rethrow the error or handle it appropriately
    }
};


const listSingleQuestion = async (id) => {
    //console.log("qid from questionServices -->", id)
    const rows = await sql `SELECT * FROM questions WHERE id = ${id}`;
    console.log("rows from questionServices -->", rows)
    return rows;
    
}

const addAnswer = async (text, isCorrect, qId) => {
    try {
        await sql`INSERT INTO question_answer_options (option_text, is_correct, question_id)
        VALUES (${text}, ${isCorrect}, ${qId});
        `;
        console.log("Answer option added successfully! --> ", text);
    } catch (error) {
        console.error("Error adding Answer Option:", error.message);
        throw error;
    }
}

 const deleteAnswerOption = async (id) => {
    try {
        // delete answer from question_answers based on option ID
        await sql `DELETE FROM question_answers WHERE question_answer_option_id IN (SELECT id FROM question_answer_options WHERE id = ${id})`;
        // delete option from question_answer_options
        await sql `DELETE FROM question_answer_options WHERE id = ${id}`
        console.log("option deleted successfully! -->", id);
    } catch (error) {
        console.log("Error deleting option", error.message);
        throw error;
    }
 }

 const deleteQuestion = async (id) => {
    try {
        // Delete from question_answers
        await sql `DELETE FROM question_answers WHERE question_id IN (SELECT id FROM questions WHERE id = ${id})`;
        // Delete from question_answer_options
        await sql `DELETE FROM question_answer_options WHERE question_id IN (SELECT id FROM questions WHERE id = ${id})`;
        // Delete from questions
        await sql `DELETE FROM questions WHERE id = ${id}`;   

        console.log("success! question deleted");

    } catch (error) {
        console.error("failed to delete question", error.message);
        throw error;
    }
 }

 const insertQuizResult = async (userId, questionId, answerId) => {
    try {
        await sql `INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${userId},${questionId}, ${answerId})`;
        console.log("user answer added successfully");
    } catch (error) {
        console.error("failed to add user answer", error.message);
    }
 }

 const getCorrectQuestionAns= async (questionId, answerId) => {
    try {
        const rows = await sql `SELECT is_correct
        FROM question_answer_options
        WHERE question_id = ${questionId} AND id = ${answerId}`;
        return rows;
    } catch (error) {
        console.error("failed to fetch results", error.message);
    }
 }

 const getCorrectQuestionAnsText = async (questionId) => {
    try {
        const rows = await sql `SELECT option_text
        FROM question_answer_options
        WHERE question_id = ${questionId} AND is_correct = true`;
        return rows;
    } catch (error) {
        console.error("failed to fetch results", error.message);
    }
 }

 
 const totalNumberOfUserAnswers = async () => {
    const rows = await sql `SELECT COUNT(*) AS total_rows FROM question_answers`;
    return rows;
};
export {

    addQuestion,
    listQuestions,
    listSingleQuestion,
    addAnswer,
    listAnswers,
    deleteAnswerOption,
    deleteQuestion,
    insertQuizResult,
    getCorrectQuestionAns,
    listAllQuestionsAndOptionsApi,
    listAllQuestions,
    listAllAnswers,
    totalNumberOfQuestions,
    totalNumberOfUserAnswers,
    getCorrectQuestionAnsText
}