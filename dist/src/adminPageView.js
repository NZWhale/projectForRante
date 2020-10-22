import { createElement } from "./htmlUtils";
import { login } from "./utils";
export var renderAdminPage = function (rootElement, loginPageModelInstance, loginHandler) {
    var loginDiv = createElement("div", "loginDiv");
    var loginForm = createElement("input", "loginForm");
    var passwordForm = createElement("input", "passwordForm");
    var loginButton = createElement("input", "loginButton");
    loginButton.addEventListener("click", function (e) {
        var loginValue = document.getElementById("loginForm").value;
        var passwordValue = document.getElementById("passwordForm").value;
        if (e.keyCode === 13) {
            if (!loginValue) {
                alert("Please enter login");
            }
            else {
                if (!passwordValue) {
                    alert("Please enter password");
                }
                else {
                    login(loginValue, passwordValue, loginPageModelInstance, loginHandler);
                }
            }
        }
        else {
            login(loginValue, passwordValue, loginPageModelInstance, loginHandler);
        }
    });
    passwordForm.setAttribute("type", "password");
    loginButton.setAttribute("type", "submit");
    loginDiv.append(loginForm, passwordForm, loginButton);
    rootElement.append(loginDiv);
};
