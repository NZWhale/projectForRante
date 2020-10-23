import { renderAdminLoginPage } from "./adminPageView"
import LoginPageModel from "./LoginPageModel"
import { loginHandler, getImagesUrls, getRandomLink } from "./utils"


export const createImageInput = (rootElement: HTMLElement, name: string): HTMLElement => {
    const div: HTMLElement = document.createElement("div")
    const form: HTMLElement = document.createElement('form')
    const fileInput: HTMLElement = document.createElement('input')
    const submitInput: HTMLElement = document.createElement('input')
    form.setAttribute("action", `/${name}`)
    form.setAttribute("method", "POST")
    form.setAttribute("enctype", "multipart/form-data")
    fileInput.setAttribute("type", "file")
    fileInput.setAttribute("name", "images")
    fileInput.setAttribute("multiple", "true")
    submitInput.setAttribute("type", "submit")
    submitInput.setAttribute("value", "Send file")
    div.innerText = `${name}`
    form.append(fileInput, submitInput)
    div.append(form)
    return div
}

export const createElement = (type: string, id: string): any => {
    const element = document.createElement(type)
    element.setAttribute("id", id)
    return element
}

export const createAdminAccessButton = (rootElement: HTMLElement, loginPageModelInstance: LoginPageModel, loginHandler: string) => {
    const adminAccessButton: HTMLElement = createElement("input", "adminAccess")
    adminAccessButton.setAttribute("type", "button")
    adminAccessButton.setAttribute("value", "admin access")
    adminAccessButton.addEventListener("click", function () {
        document.body.style.backgroundImage = ""
        rootElement.innerHTML = ""
        renderAdminLoginPage(rootElement, loginPageModelInstance, loginHandler)
    })
    return adminAccessButton
}

export async function createBackground(backgroundUrl: string) {
    const arrayOfBackgroundUrls = await getImagesUrls(backgroundUrl)
    const singleBackgroundUrl = getRandomLink(arrayOfBackgroundUrls)
    document.body.style.backgroundImage = `url(http://127.0.0.1:3000${singleBackgroundUrl})`
    document.body.style.backgroundSize = "110%"
    document.body.style.backgroundRepeat = "no-repeat"
}

export async function createImageParts() {

}