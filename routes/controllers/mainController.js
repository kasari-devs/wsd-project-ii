import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";

const showMain = async ({ render }) => {
  const topicsNum = await topicService.totalNumberOfTopics();
  const questionsNum = await questionService.totalNumberOfQuestions();
  const numberOfUserAnswers = await questionService.totalNumberOfUserAnswers();
  render("main.eta", {
    totalTopicNumber: topicsNum[0].total_rows,
    totalNumberOfQuestions: questionsNum[0].total_rows,
    numberOfUserAnswers: numberOfUserAnswers[0].total_rows,
  });
  console.log("result from showMain", topicsNum[0].total_rows);
};

export { showMain };
