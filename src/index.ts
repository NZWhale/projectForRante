import { createImageInput, createElement, createAdminAccessButton } from "./htmlUtils"
import LoginPageModel from "./LoginPageModel"
import { createBackground, backgroundUrl } from "./utils"



window.addEventListener("load", async () => {
    const rootElement: HTMLElement = document.getElementById('root')
    const loginPageModelInstance = new LoginPageModel()
    const adminAccessButton: HTMLElement = createAdminAccessButton(rootElement, loginPageModelInstance)
        await createBackground(backgroundUrl)
        rootElement.append(adminAccessButton)
})