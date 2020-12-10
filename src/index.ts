import { renderMainPage } from "./mainPageView"
import { backgroundUrl } from "./utils"
export const arrayOfParts: Array<Array<string>> = []


window.addEventListener("load", async () => {
    const rootElement: HTMLElement = document.getElementById("root")
    
    renderMainPage(rootElement)
})