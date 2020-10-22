import { renderAdminPage } from "./adminPageView";
import { loginHandler } from "./utils";
export var createImageInput = function (rootElement) {
    var form = document.createElement('form');
    var fileInput = document.createElement('input');
    var submitInput = document.createElement('input');
    form.setAttribute("action", "/upload");
    form.setAttribute("method", "POST");
    form.setAttribute("enctype", "multipart/form-data");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("name", "filedata");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("value", "Send file");
    form.append(fileInput, submitInput);
    rootElement.append(form);
};
export var createElement = function (type, id) {
    var element = document.createElement(type);
    element.setAttribute("id", id);
    return element;
};
export var createAdminAccessButton = function (rootElement, loginPageModelInstance) {
    var adminAccessButton = createElement("input", "adminAccess");
    adminAccessButton.setAttribute("type", "button");
    adminAccessButton.setAttribute("value", "admin access");
    adminAccessButton.addEventListener("click", function () {
        document.body.style.backgroundImage = "";
        rootElement.innerHTML = "";
        renderAdminPage(rootElement, loginPageModelInstance, loginHandler);
    });
    return adminAccessButton;
};
export var createAdminAuthForm = function (rootElement) {
};
