import { renderAdminLoginPage } from "./adminPageView"
import LoginPageModel from "./LoginPageModel"
import { loginHandler, getImagesUrls, getRandomLink, partsUrl, backgroundUrl, fullUrl } from "./utils"

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