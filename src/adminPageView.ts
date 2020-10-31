

import { arrayOfParts } from "."
import { deleteCookie } from "./deleteCookies"
import { createElement, createFormElement, createH3Element, createInputElement, createSubmitElement, } from "./htmlUtils"
import LoginPageModel from "./LoginPageModel"
import { fetchRequest, login, postPartsUrl, sendArrayOfParts } from "./utils"


export const renderAdminLoginPage = (rootElement: HTMLElement, loginPageModelInstance: LoginPageModel, loginHandler: string, arrayOfParts: Array<Array<string>>) => {
    const loginDiv: HTMLElement = createElement("div", "loginDiv")
    const loginForm: HTMLInputElement = createElement("input", "loginForm")
    const passwordForm: HTMLInputElement = createElement("input", "passwordForm")
    const loginButton: HTMLElement = createElement("input", "loginButton")
    loginButton.addEventListener("click", (e: KeyboardEvent) => {
        const loginValue: string = (document.getElementById("loginForm") as HTMLInputElement).value
        const passwordValue: string = (document.getElementById("passwordForm") as HTMLInputElement).value
        if (e.keyCode === 13) {
            if (!loginValue) {
                alert("Please enter login")
            } else {
                if (!passwordValue) {
                    alert("Please enter password")
                } else {
                    login(loginValue, passwordValue, loginHandler, loginPageModelInstance, rootElement, arrayOfParts)
                }
            }
        } else {
            login(loginValue, passwordValue, loginHandler, loginPageModelInstance, rootElement, arrayOfParts)
        }
    })
    passwordForm.setAttribute("type", "password")
    loginButton.setAttribute("type", "submit")
    loginDiv.append(loginForm, passwordForm, loginButton)
    rootElement.append(loginDiv)

}

export const renderAdminPage = (rootElement: HTMLElement, loginPageModelInstance: LoginPageModel) => {
    rootElement.innerHTML = ""
    let arrayOfParts:Array<string> = []
    const exitButton: HTMLElement = createElement("input", "exitButton")
    const mainDiv: HTMLElement = createElement("div", "mainDiv")
    const projectsDiv: HTMLElement = createElement("div", "projectsDiv")
    const backgroundDiv: HTMLElement = createElement("div", "backgroundDiv")
    const fullForm: HTMLElement = createFormElement("full")
    const partsForm: HTMLElement = createFormElement("parts")
    const backgroundForm: HTMLElement = createFormElement("background")
    const fullInput = <HTMLInputElement>createInputElement("fullInput")
    const partsInput = <HTMLInputElement>createInputElement("partsInput")
    const backgroundInput = <HTMLInputElement>createInputElement("backgroundInput")
    const fullSubmit: HTMLElement = createSubmitElement("fullSubmit")
    const partsSubmit: HTMLElement = createSubmitElement("partsSubmit")
    const backgroundSubmit: HTMLElement = createSubmitElement("backgroundSubmit")
    const fullH3: HTMLElement = createH3Element("fullH3", "Full image")
    const partsH3: HTMLElement = createH3Element("partsH3", "Parts images")
    const backgroundH3: HTMLElement = createH3Element("backgroundH3", "Background image")
    partsInput.setAttribute("multiple", "true")
    backgroundInput.setAttribute("multiple", "true")
    exitButton.setAttribute("type", "button")
    exitButton.innerText = "exit"
    exitButton.addEventListener("click", () => {
        rootElement.innerHTML = ""
        loginPageModelInstance.setLoginStatus(false)
        deleteCookie("auth-token")
    })
    partsForm.addEventListener("change", (): void => {
        const fileInput = <HTMLInputElement>document.getElementById("partsInput")
        const files: FileList = fileInput.files
        let file
        const arrayOfFiles = []
        for (let i = 0; i < files.length; i++) {
            file = files[i];
            arrayOfFiles.push(file.name);
        }
        arrayOfParts = arrayOfFiles
    })
    partsSubmit.addEventListener("click", async () => {
        await sendArrayOfParts(postPartsUrl, arrayOfParts)
    })
    fullForm.append(fullInput, fullSubmit)
    partsForm.append(partsInput, partsSubmit)
    backgroundForm.append(backgroundInput, backgroundSubmit)
    projectsDiv.append(fullH3, fullForm, partsH3, partsForm)
    backgroundDiv.append(backgroundH3, backgroundForm)
    mainDiv.append(projectsDiv, backgroundDiv)
    rootElement.append(mainDiv, exitButton)
}