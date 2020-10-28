import { renderAdminLoginPage } from "./adminPageView"
import LoginPageModel from "./LoginPageModel"
import { loginHandler, getImagesUrls, getRandomLink, partsUrl, backgroundUrl, fullUrl } from "./utils"

export const createElement = (type: string, id: string): any => {
    const element = document.createElement(type)
    element.setAttribute("id", id)
    return element
}

export async function createBackground(rootElement: HTMLElement, backgroundUrl: string): Promise<void> {
    const arrayOfBackgroundUrls = await getImagesUrls(backgroundUrl)
    const singleBackgroundUrl = getRandomLink(arrayOfBackgroundUrls)
    // const backgroundImg = createElement("img", "backgroundImg")
    // backgroundImg.setAttribute("src", `${singleBackgroundUrl}`)
    document.body.style.backgroundImage = `url(http://127.0.0.1:3000${singleBackgroundUrl})`
    document.body.style.backgroundSize = "110%"
    document.body.style.backgroundRepeat = "no-repeat"
    // rootElement.append(backgroundImg)
}

export async function createImageFull(rootElement: HTMLElement, fullUrl: string, partsUrl: string): Promise<void> {
    const arrayOfImagesUrls = await getImagesUrls(fullUrl)
    const singleImageUrl = getRandomLink(arrayOfImagesUrls)
    const fullDiv = createElement("div", "fullDiv")
    const fullImg = createElement("img", "fullImg")
    fullImg.addEventListener("click", async() => {
       await createImagePart(rootElement, partsUrl)
    })
    fullImg.src = singleImageUrl
    fullDiv.append(fullImg)
    rootElement.append(fullDiv)
}

export async function createImagePart(rootElement: HTMLElement, partsUrl: string): Promise<void>{
    const arrayOfPartsUrls = await getImagesUrls(partsUrl)
    const singlePartUrl = getRandomLink(arrayOfPartsUrls)
    const partOfImg = createElement("img", "partOfImg")
    partOfImg.src = singlePartUrl
    if(document.getElementById("partsDiv")) {
        const partsDiv = document.getElementById("partsDiv")
        partsDiv.append(partOfImg)
        rootElement.append(partsDiv)
    } else {
        const partsDiv = createElement("div", "partsDiv")
        partsDiv.append(partOfImg)
        rootElement.append(partsDiv)
    }
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