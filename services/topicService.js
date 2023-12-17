import { sql} from "../database/database.js";

const addTopic = async (userId, name) => {
    try {
        await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${name})`;
        console.log("Topic added successfully! --> ", name);
    } catch (error) {
        console.error("Error adding topic:", error.message);
        throw error;
    }
};

const listTopics = async () => {
    const rows = await sql `SELECT * FROM topics`;
    return rows;
};

const totalNumberOfTopics = async () => {
    const rows = await sql `SELECT COUNT(*) AS total_rows FROM topics`;
    //console.log("number of rows in topic: ", rows)
    return rows;
};

const DeleteTopic = async (topicId) => {
    try {
        // Delete from question_answers
        await sql `DELETE FROM question_answers WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${topicId})`;
        // Delete from question_answer_options
        await sql `DELETE FROM question_answer_options WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${topicId})`;
        // Delete from questions
        await sql `DELETE FROM questions WHERE topic_id = ${topicId}`;   
        // Delete from topics
        await sql `DELETE FROM topics WHERE id = ${topicId}`;

        console.log("Success! Topic and related records deleted");

    } catch (error) {
        console.error("failed to delete topic", error.message);
        throw error;
    }
   
}

export {
    addTopic,
    listTopics,
    DeleteTopic,
    totalNumberOfTopics,
}