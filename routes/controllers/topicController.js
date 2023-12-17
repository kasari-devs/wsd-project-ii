import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
    name: [validasaur.required, validasaur.minLength(1)],  
  };

const getTopicData = async (request) => {
    const body = await request.body({ type: "form" });
    const params = await body.value || new URLSearchParams();
    const data = {
        name: params.get("name") || "",
        validationErrors: {},
    };
    return data;
};

export const overrideGetTopicData = async (request) => {
    return getTopicData(request);
  };
  
const validationData = {
    name: "",
    validationErrors: {},
};
const addTopic = async ({ request, response, user }) => {
    const data = await getTopicData(request);

    //console.log("this is data{} from topicController -->", typeof data, data);
    const [passes, errors] = await validasaur.validate(data, topicValidationRules);

    if (!passes) {
        console.log(errors);
        data.validationErrors = errors;
        validationData.name = data.name;
        validationData.validationErrors = data.validationErrors;
        
    } else {
        if (user.admin === true) {
            await topicService.addTopic(user.id, data.name);
            validationData.name = "";
            validationData.validationErrors = {};
            //console.log("form submit from addTopic -->", user);
            } else {
            console.log("User does not have admin privileges. Cannot add topic.");
            }
    }

    response.redirect("/topics");
};
  
const listTopics = async ({ render, user }) => {
    if (user.admin === true) {
        render("topicsAdmin.eta", {
        topics: await topicService.listTopics(),
        name: validationData.name,
        validationErrors: validationData.validationErrors,
        });
    } else {
        render("topics.eta", {
        topics: await topicService.listTopics(),
        });
    }
};
  

const deleteTopic = async ({ params, response, user }) => {
    if (user.admin === true) {
        await topicService.DeleteTopic(params.id);
    } else {
        console.log("only admin can delete topics --> ", user);
    }
    response.redirect("/topics");
};
export {
    addTopic,
    listTopics,
    deleteTopic,
    getTopicData,
}