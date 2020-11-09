import { arrayOfParts } from "./index"
import { createElement } from "./htmlUtils"
import { backgroundUrl, fetGetRequest, fullUrl, getImagesUrls, getRandomLink, getUnusedPartsOfFullImage, getPartsUrl, searchByFullImg, compareArrays, randomFromRange, getModels, getRandomModel, } from "./utils"
import { Project } from "./ProjectModel"
const dataPath = "/images/"

export async function renderMainPage(rootElement: HTMLElement) {
    const headerName = "header"
    const arrayOfProjectsModel: Array<Project> = await getImagesUrls(getModels)
    const projectModel = getRandomModel(arrayOfProjectsModel)
    const artefact: string = projectModel.projectNumber
    createHeader(headerName, artefact)
    singlePartImageRender(rootElement, projectModel)
} 

const singlePartImageRender = (rootElement: HTMLElement, projectModel: Project) => {
    createBackground(rootElement, backgroundUrl)
    const singlePartUrl: string = dataPath + projectModel.partsOfImage[0]
    const partOfImg = createPartImage(singlePartUrl, 0, 0)
    partOfImg.addEventListener("click", () => {
        multiPartImagesRender(rootElement, projectModel)
    })
    rootElement.append(partOfImg)
}

const multiPartImagesRender = (rootElement: HTMLElement, projectModel: Project) => {
    createBackground(rootElement, backgroundUrl)
    const partsUrls: Array<string> = projectModel.partsOfImage.slice(1)
    console.log(partsUrls)
    const minRadiusPx = 180
    const maxRadiusPx = 200
    const minAngleRad = 0
    const maxAngleRad = Math.PI * 2
    partsUrls.forEach(partUrl => {
        partUrl = dataPath + partUrl
        const radiusPx = Math.round(randomFromRange(minRadiusPx, maxRadiusPx))
        const angleRad = randomFromRange(minAngleRad, maxAngleRad)
        const partImg = createPartImage(partUrl, radiusPx, angleRad)
        partImg.addEventListener("click", () => {
            fullImageRender(rootElement, projectModel)
        })
        rootElement.appendChild(partImg)
    })

}

const fullImageRender = (rootElement: HTMLElement, projectModel: Project) => {
    rootElement.innerHTML = ""
    createBackground(rootElement, backgroundUrl)
    const fullImageUrl: string = dataPath + projectModel.fullImage
    const fullImg = createPartImage(fullImageUrl, 0, 0)
    fullImg.setAttribute("class", "fullImg")
    fullImg.addEventListener("click", () => {
        sameProjectsImagesRender(rootElement, projectModel)
    })
    rootElement.appendChild(fullImg)
}

const sameProjectsImagesRender = (rootElement: HTMLElement, projectModel: Project) => {
    createBackground(rootElement, backgroundUrl)
    let usedImages: Array<string>
    const sameProjects: Array<string> = projectModel.projectsFromSameCollection
    const minRadiusPx = 200
    const maxRadiusPx = 400
    const minAngleRad = 0
    const maxAngleRad = Math.PI * 2
    sameProjects.forEach(projectUrl => {
        projectUrl = dataPath + projectUrl
        const radiusPx = Math.round(randomFromRange(minRadiusPx, maxRadiusPx))
        const angleRad = randomFromRange(minAngleRad, maxAngleRad)
        const projectImg = createPartImage(projectUrl, radiusPx, angleRad)
        projectImg.addEventListener("click", () => {
            descriptionImageRender(rootElement, projectModel)
        })
        rootElement.appendChild(projectImg)
    })
}


const descriptionImageRender = (rootElement: HTMLElement, projectModel: Project) => {
    rootElement.innerHTML = ""
    createBackground(rootElement, backgroundUrl)
    const projectDescription: string = dataPath + projectModel.projectDescription
    const descriptionImg = createPartImage(projectDescription, 0, 0)
    descriptionImg.setAttribute("class", "projectDescription")
    descriptionImg.addEventListener("click", () => {

    })
    rootElement.appendChild(descriptionImg)
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
