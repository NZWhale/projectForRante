import { createElement, createBackground, createAdminAccessButton } from "./htmlUtils"
import LoginPageModel from "./LoginPageModel"
import { renderMainPage } from "./mainPageView"
import { backgroundUrl } from "./utils"
export const loginHandler: string = "http://127.0.0.1:3000/login"



window.addEventListener("load", async () => {
    const rootElement: HTMLElement = document.getElementById("root")
    renderMainPage(rootElement, backgroundUrl)
})