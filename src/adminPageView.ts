import { url } from "inspector"

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
                    login(loginValue, passwordValue, loginHandler, loginPageModelInstance)
                }
            }
        } else {
            login(loginValue, passwordValue, loginHandler, loginPageModelInstance)
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
    exitButton.setAttribute("type", "button")
    exitButton.innerText = "exit"
    exitButton.addEventListener("click", () => {
        loginPageModelInstance.setLoginStatus(false)
    })
}

