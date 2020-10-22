import {createImageInput, createElement, createAdminAccessButton} from "./htmlUtils"
import { createBackground, backgroundUrl} from "./utils"

const rootElement: HTMLElement = document.getElementById('root')
const adminAccessButton: HTMLElement = createAdminAccessButton(rootElement)


window.addEventListener("load", async() => {
    await createBackground(backgroundUrl)
    rootElement.append(adminAccessButton)
})