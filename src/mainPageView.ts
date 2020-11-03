import { arrayOfParts } from "./index"
import { createElement } from "./htmlUtils"
import { backgroundUrl, fetGetRequest, fullUrl, getImagesUrls, getRandomLink, getUnusedPartsOfFullImage, getPartsUrl, searchByFullImg, compareArrays, randomFromRange, getModels, getRandomModel, } from "./utils"
import { Project } from "./ProjectModel"
const dataPath = "/images/"

export async function renderMainPage(rootElement: HTMLElement, backgroundUrl: string) {
    const headerName = "header"
    const arrayOfProjectsModel: Array<Project> = await getImagesUrls(getModels)
    const projectModel = getRandomModel(arrayOfProjectsModel)
    const artefact = projectModel.projectNumber
    const projectFullImageUrl = dataPath+projectModel.fullImage
    const projectParts: Array<string> = projectModel.partOfImage
    const firstPart = dataPath+projectParts[0]
    const restOfTheParts = projectParts.slice(1)
    createHeader(headerName, artefact)
    
    while (true) {
        await waitSinglePartStateSwitch(rootElement, firstPart)
        await waitMultiPartStateSwitch(rootElement, restOfTheParts)
        await waitFullPageStateSwith(rootElement, projectFullImageUrl)
    }
}

async function waitSinglePartStateSwitch(rootElement: HTMLElement, singlePartUrl: string): Promise<void> {
    createBackground(rootElement, backgroundUrl)
    const partOfImg = createPartImage(singlePartUrl, 0, 0)

    rootElement.append(partOfImg)

    return new Promise((resolve) => {
        partOfImg.addEventListener("click", () => {
            resolve()
        })
    })
}

async function waitMultiPartStateSwitch(rootElement: HTMLElement, partsUrls: string[]) {
    createBackground(rootElement, backgroundUrl)

    const minRadiusPx = 180
    const maxRadiusPx = 200
    const minAngleRad = 0
    const maxAngleRad = Math.PI * 2
    return new Promise((resolve) => {
        partsUrls.forEach(partUrl => {
            partUrl = dataPath+partUrl
            const radiusPx = Math.round(randomFromRange(minRadiusPx, maxRadiusPx))
            console.log(radiusPx)
            const angleRad = randomFromRange(minAngleRad, maxAngleRad)
            const partImg = createPartImage(partUrl, radiusPx, angleRad)
            partImg.addEventListener("click", () => {
                resolve()
            })
            rootElement.appendChild(partImg)
        })
    })
}

async function waitFullPageStateSwith(rootElement: HTMLElement, singleImageUrl: string) {
    rootElement.innerHTML = ""
    createBackground(rootElement, backgroundUrl)
    const fullImg = createPartImage(singleImageUrl, 0, 0)
    fullImg.setAttribute("class", "fullImg")
    rootElement.appendChild(fullImg)
    return new Promise((resolve) => null)
}


const createHeader = (headerName: string, artefact: string) => {
    const header = document.getElementById(`${headerName}`)
    const bgH1 = createElement("h1")
    const artH1 = createElement("h1")
    const artNumH1 = createElement("h1", "artefact")
    bgH1.innerText = "Background / "
    artH1.innerText = "artefact"
    artNumH1.innerText = `${artefact}`
    bgH1.setAttribute("class", "bgH1")
    artH1.setAttribute("class", "artH1")
    artNumH1.setAttribute("class", "artNumH1")
    header.append(bgH1, artH1, artNumH1)
}

async function createBackground(rootElement: HTMLElement, backgroundUrl: string): Promise<void> {
    const arrayOfBackgroundUrls = await getImagesUrls(backgroundUrl)
    const singleBackgroundUrl = getRandomLink(arrayOfBackgroundUrls)
    const backgroundImage = document.getElementById("backgroundImg")
    backgroundImage.setAttribute("src", singleBackgroundUrl)
    backgroundImage.addEventListener("click", () => {
        window.location.reload()
    })
    // document.body.style.backgroundImage = `url(http://127.0.0.1:3000${singleBackgroundUrl})`
    // document.body.style.backgroundSize = "110%"
    // document.body.style.backgroundRepeat = "no-repeat"
}



function createPartImage(imageUrl: string, radiusPx: number, angleRad: number): HTMLElement {
    const partOfImg = createElement("img")
    partOfImg.src = imageUrl
    partOfImg.setAttribute("class", "partImg")
    const xShift = Math.cos(angleRad) * radiusPx
    const yShift = Math.sin(angleRad) * radiusPx
    partOfImg.style = `transform: translate(-50%, -50%) translate(${xShift}px, ${yShift}px)`
    return partOfImg
}
