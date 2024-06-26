import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

// const loginValidationRules = {
//   email: [validasaur.required, validasaur.isEmail],
//   password: [validasaur.required, validasaur.minLength(4)],  
// };

// const getLoginData = async (request) => {
//   const body = request.body({ type: "form" });
//   const params = await body.value;
//   const data = {
//       email: params.get("email"),
//       password: params.get("password"),
//       validationErrors: {},
//   };
//   return data;
// };

const processLogin = async ({ request, response, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await userService.findUserByEmail(
    params.get("email"),
  );
  if (userFromDatabase.length != 1) {
    response.redirect("/auth/login");
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    response.redirect("/auth/login");
    return;
  }

  await state.session.set("user", user);
  response.redirect("/topics");
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};

export { processLogin, showLoginForm };