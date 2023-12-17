import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const registrationValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)],  
};

const getRegistrationData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    const data = {
        email: params.get("email"),
        password: params.get("password"),
        validationErrors: {},
    };
    return data;
};

const validationData = {
    email: "",
    password: "",
    validationErrors: {},
};

const registerUser = async ({ params, request, response, user }) => {
    const data = await getRegistrationData(request);
    const [passes, errors] = await validasaur.validate(data, registrationValidationRules);

    if (!passes) {
        console.log(errors);
        data.validationErrors = errors;

        validationData.email = data.email;
        validationData.password = data.password;
        validationData.validationErrors = data.validationErrors;
        response.redirect("/auth/Register");
        
    } else {
            await userService.addUser(
                data.email,
                await bcrypt.hash(data.password),
            );
            validationData.email = "";
            validationData.password = "";
            validationData.validationErrors = {};
            console.log("form submit from addTopic -->", user);
            response.redirect("/auth/login");
           
    }

};
// const registerUser = async ({ request, response }) => {
//     const body = request.body({ type: "form"});
//     const formData = await body.value;

//     await userService.addUser(
//         formData.get("email"),
//         await bcrypt.hash(formData.get("password"))
//     );

//     response.redirect("/auth/login");
// };

const showRegistrationForm = ({ render }) => {
    render("registration.eta", {
        email: validationData.email,
        password: validationData.password,
        validationErrors: validationData.validationErrors, 
    });
};


export { registerUser, showRegistrationForm };