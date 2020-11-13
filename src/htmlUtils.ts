import { renderAdminLoginPage } from "./adminPageView"
import LoginPageModel from "./LoginPageModel"
import { loginHandler, getImagesUrls, getPartsUrl, backgroundUrl, fullUrl } from "./utils"

export const createElement = (type: string, id?: string): any => {
    const element = document.createElement(type)
    if (id) {
        element.setAttribute("id", id)
    }
    return element
}

export const createFormElement = (action: string): HTMLElement => {
    const form = document.createElement("form")
    form.action = action
    form.method = "POST"
    form.enctype = "multipart/form-data"
    return form
}

export const createInputElement = (id: string): HTMLElement => {
    const input = document.createElement("input")
    input.id = id
    input.type = "file"
    input.name = "full"
    return input
}

export const createSubmitElement = (id: string): HTMLElement => {
    const submit = document.createElement("input")
    submit.id = id
    submit.type = "submit"
    return submit
}

export const createH3Element = (id: string, text: string): HTMLElement => {
    const h3 = document.createElement("h3")
    h3.id = id
    h3.innerText = text
    return h3
}