

import {createElement,} from "./htmlUtils"
import LoginPageModel from "./LoginPageModel"
import { login } from "./utils"


export const renderAdminLoginPage = (rootElement: HTMLElement, loginPageModelInstance: LoginPageModel, loginHandler: string) => {
    const loginDiv: HTMLElement = createElement("div", "loginDiv")
    const loginForm: HTMLInputElement = createElement("input", "loginForm")
    const passwordForm: HTMLInputElement = createElement("input", "passwordForm")
    const loginButton: HTMLElement = createElement("input", "loginButton")
    loginButton.addEventListener("click", (e: KeyboardEvent) => {
        const loginValue: string = (document.getElementById("loginForm") as HTMLInputElement).value
        const passwordValue: string = (document.getElementById("passwordForm") as HTMLInputElement).value
        if(e.keyCode === 13) {
            if(!loginValue) {
                alert("Please enter login")
            } else {
                if(!passwordValue) {
                    alert("Please enter password")
                } else {
                    login(loginValue, passwordValue, loginHandler, loginPageModelInstance, rootElement)
                }
            }
        } else {
            login(loginValue, passwordValue, loginHandler, loginPageModelInstance, rootElement)
        }
    })
    passwordForm.setAttribute("type", "password")
    loginButton.setAttribute("type", "submit")
    loginDiv.append(loginForm, passwordForm, loginButton)
    rootElement.append(loginDiv)

}

export const renderAdminPage = (rootElement: HTMLElement, loginPageModelInstance: LoginPageModel) => {
    rootElement.innerHTML = ""
    const exitButton: HTMLElement = createElement("input", "exitButton")
    const mainDiv = createElement("div", "mainDiv")
    const projectsDiv = createElement("div", "projectsDiv")
    const backgroundDiv = createElement("div", "backgroundDiv")
    const fullForm = createElement("form", "fullForm")
    const partsForm = createElement("form", "partsForm")
    const backgroundForm = createElement("form", "backgroundForm")
    const fullInput = createElement("input", "full")
    const partsInput = createElement("input", "parts")
    const backgroundInput = createElement("input", "background")
    const submit1 = createElement("input", "submit")
    const submit2 = createElement("input", "submit")
    const submit3 = createElement("input", "submit")
    const fullH3 = createElement("h3", "fullH3")
    const partsH3 = createElement("h3", "partsH3")
    const backgroundH3 = createElement("h3", "backgroundH3")
    fullForm.action = "full"
    fullForm.method = "POST"
    fullForm.enctype = "multipart/form-data"
    partsForm.action = "parts"
    partsForm.method = "POST"
    partsForm.enctype = "multipart/form-data"
    backgroundForm.action = "background"
    backgroundForm.method = "POST"
    backgroundForm.enctype = "multipart/form-data"
    fullInput.type = "file"
    fullInput.name = "full"
    partsInput.type = "file"
    partsInput.name = "full"
    backgroundInput.type = "file"
    backgroundInput.name = "full"
    submit1.type = "submit"
    submit2.type = "submit"
    submit3.type = "submit"
    fullForm.append(fullInput, submit1)
    partsForm.append(partsInput, submit2)
    backgroundForm.append(backgroundInput, submit3)
    projectsDiv.append(fullH3 ,fullForm, partsH3, partsForm)
    backgroundDiv.append(backgroundH3, backgroundForm)
    mainDiv.append(projectsDiv, backgroundDiv)
    rootElement.append(mainDiv)
    exitButton.setAttribute("type", "button")
    exitButton.innerText = "exit"
    exitButton.addEventListener("click", () => {
        loginPageModelInstance.setLoginStatus(false)
    })
}

// <div id="projectAndParts">
// <h3>Select grafic project</h3>
// <form action="full" method="post" enctype="multipart/form-data">
//     <input type="file" id="full" name="full"><br>
//     <input type="submit">
// </form>
// <h3>Select parts of grafic project</h3>
// <form action="parts" method="post" enctype="multipart/form-data">
//     <input type="file" id="parts" name="parts" multiple="true"><br>
//     <input type="submit">
// </form>
// </div>
// <div id="backgroundDiv">
// <h3>Select background image</h3>
// <form action="background" method="post" enctype="multipart/form-data">
//     <input type="file" id="background" name="background" multiple="true"><br>
//     <input type="submit">
// </form>
// </div> 