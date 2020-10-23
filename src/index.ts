import { createImageInput, createElement, createBackground, createAdminAccessButton } from "./htmlUtils"
import LoginPageModel from "./LoginPageModel"
import { backgroundUrl } from "./utils"
export const loginHandler: string = "http://127.0.0.1:3000/login"



window.addEventListener("load", async () => {
    const rootElement: HTMLElement = document.getElementById('root')
    const loginPageModelInstance = new LoginPageModel()
    const adminAccessButton: HTMLElement = createAdminAccessButton(rootElement, loginPageModelInstance, loginHandler)
        await createBackground(backgroundUrl)
        rootElement.append(adminAccessButton)
})