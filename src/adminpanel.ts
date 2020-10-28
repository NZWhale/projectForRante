import { renderAdminLoginPage } from "./adminPageView"
import { loginHandler } from "./utils"
import LoginPageModel from "./LoginPageModel"



window.addEventListener("load", () => {
    const loginPageModelInstance = new LoginPageModel()
    const rootElement = document.getElementById("admin_root")
    renderAdminLoginPage(rootElement, loginPageModelInstance, loginHandler)
})