import { renderAdminLoginPage, renderAdminPage } from "./adminPageView"
import { loginHandler, backendCheckLoginUrl, fetchRequest } from "./utils"
import LoginPageModel from "./LoginPageModel"
import { arrayOfParts } from "./index"





window.addEventListener("load", async () => {
    const loginPageModelInstance = new LoginPageModel()
    const rootElement = document.getElementById("admin_root")
    loginPageModelInstance.addChangeEventListener(render)

    const resp = await fetchRequest("POST", backendCheckLoginUrl)
    if (resp.status === 200) {
        loginPageModelInstance.setLoginStatus(true)
    } else {
        loginPageModelInstance.setLoginStatus(false)
    }

    function render() {
        const loginStatus = loginPageModelInstance.getLoginStatus()
        if (loginStatus === true){
            renderAdminPage(rootElement, loginPageModelInstance)
        } else {
            renderAdminLoginPage(rootElement, loginPageModelInstance, loginHandler, arrayOfParts)
        }
    }
})