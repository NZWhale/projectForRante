import { arrayOfParts } from "./index"
import { createElement } from "./htmlUtils"
import { backgroundUrl, getImagesUrls, getUnusedPartsOfFullImage, randomFromRange, getModels, getRandomModel, compareArrays, getRandomFromArray, arrayOfCoordinates, getUnusedRandomPartsOfFullImage, } from "./utils"
import { Project } from "./ProjectModel"
const dataPath = "/images/"

export async function renderMainPage(rootElement: HTMLElement, header: HTMLElement) {
    rootElement.innerHTML = ""
    header.innerHTML = ""
    let arrayOfBackgroundUrls: Array<string> = []
    if (arrayOfBackgroundUrls.length == 0) { arrayOfBackgroundUrls = await getImagesUrls(backgroundUrl) }
    await singlePartImageRender(rootElement, header, arrayOfBackgroundUrls)
}

async function singlePartImageRender(rootElement: HTMLElement, header: HTMLElement, arrayOfBackgroundUrls: Array<string>) {
    updateBackground(rootElement, header, arrayOfBackgroundUrls)
    const arrayOfProjectsModel: Array<Project> = await getImagesUrls(getModels)
    const projectModel = getRandomModel(arrayOfProjectsModel)
    const artefact: string = projectModel.projectNumber
    let partsOfImage = projectModel.partsOfImage
    let usedPartsOfImage: Array<string> = []
    const singlePartUrl = getRandomFromArray(partsOfImage)
    const headerName = "header"
    const partOfImg = createPartImage(dataPath+singlePartUrl, 0, 0)
    partOfImg.addEventListener("click", () => {
        console.log(singlePartUrl)
        console.log(usedPartsOfImage)
        rootElement.innerHTML = ""
        partsOfImage = partsOfImage.filter(partOfImg => partOfImg != singlePartUrl)
        drawOtherPartOfImage(rootElement, header, projectModel, arrayOfBackgroundUrls, partsOfImage)
    })
    createHeader(headerName, artefact)
    rootElement.append(partOfImg)
} 
function drawOtherPartOfImage(rootElement: HTMLElement, header: HTMLElement, projectModel: Project, arrayOfBackgroundUrls: Array<string>, partsOfImage: Array<string>) {
    if (partsOfImage.length) {
        updateBackground(rootElement, header, arrayOfBackgroundUrls)
        const randomPartOfImage = getRandomFromArray(partsOfImage)
        const partImg = createPartImage(dataPath + randomPartOfImage, 0, 0)
        partImg.addEventListener("click", () => { 
            partsOfImage = partsOfImage.filter(part => part != randomPartOfImage)
            rootElement.innerHTML = ""
            drawOtherPartOfImage(rootElement, header, projectModel, arrayOfBackgroundUrls, partsOfImage)
        })
        rootElement.appendChild(partImg)
    } else {
        fullImageRender(rootElement, header, projectModel, arrayOfBackgroundUrls)
    }
}

const multiPartImagesRender = (rootElement: HTMLElement, header: HTMLElement, projectModel: Project, partsOfImage: Array<string>, arrayOfBackgroundUrls: Array<string>) => {
    // updateBackground(rootElement, header, arrayOfBackgroundUrls)
    // const partsUrls: Array<string> = projectModel.partsOfImage.slice(1)
    if (partsOfImage) {
        const minRadiusPx = 180
        const maxRadiusPx = 200
        const minAngleRad = 0
        const maxAngleRad = Math.PI * 2
        partsOfImage.forEach(partUrl => {
            partUrl = dataPath + partUrl
            const radiusPx = Math.round(randomFromRange(minRadiusPx, maxRadiusPx))
            const angleRad = randomFromRange(minAngleRad, maxAngleRad)
            const partImg = createPartImage(partUrl, radiusPx, angleRad)
            partImg.addEventListener("click", () => {
                fullImageRender(rootElement, header, projectModel, arrayOfBackgroundUrls)
            })
            rootElement.appendChild(partImg)
        })
    } else {
        fullImageRender(rootElement, header, projectModel, arrayOfBackgroundUrls)
    }

}


const fullImageRender = (rootElement: HTMLElement, header: HTMLElement, projectModel: Project, arrayOfBackgroundUrls: Array<string>) => {
    rootElement.innerHTML = ""
    updateBackground(rootElement, header, arrayOfBackgroundUrls)
    const fullImageUrl: string = dataPath + projectModel.fullImage
    const fullImg = createPartImage(fullImageUrl, 0, 0)
    fullImg.setAttribute("class", "fullImg")
    fullImg.addEventListener("click", () => {
        if (projectModel.projectsFromSameCollection) {
            rootElement.innerHTML = ""
            sameProjectsImagesRender(rootElement, header, projectModel, arrayOfBackgroundUrls)
        } else if (projectModel.projectDescription) {
            descriptionImageRender(rootElement, header, projectModel, arrayOfBackgroundUrls)
        } else {
            renderMainPage(rootElement, header)
        }
    })
    rootElement.appendChild(fullImg)
}

const sameProjectsImagesRender = (rootElement: HTMLElement, header: HTMLElement, projectModel: Project, arrayOfBackgroundUrls: Array<string>) => {
    updateBackground(rootElement, header, arrayOfBackgroundUrls)
    const sameProjects: Array<string> = projectModel.projectsFromSameCollection
    let usedProjects: Array<string> = []
    const projectUrl = sameProjects[0]
    usedProjects.push(projectUrl)
    const projectImg = createPartImage(dataPath + projectUrl, 0, 0)
    projectImg.addEventListener('click', () => {
        rootElement.innerHTML = ""
        drawImageFromTheSameCollection(rootElement, header, projectModel, arrayOfBackgroundUrls, usedProjects, sameProjects)
    })
    rootElement.appendChild(projectImg)
}

function drawImageFromTheSameCollection(rootElement: HTMLElement, header: HTMLElement, projectModel: Project, arrayOfBackgroundUrls: Array<string>, usedProjects: Array<string>, sameProjects: Array<string>) {
    if (!compareArrays(usedProjects, sameProjects)) {
        updateBackground(rootElement, header, arrayOfBackgroundUrls)
        const unusedProjects = getUnusedPartsOfFullImage(usedProjects, sameProjects)
        const projectImg = createPartImage(dataPath + unusedProjects[0], 0, 0)
        projectImg.addEventListener("click", () => { 
            rootElement.innerHTML = ""
            drawImageFromTheSameCollection(rootElement, header, projectModel, arrayOfBackgroundUrls, usedProjects, sameProjects)
        })
        usedProjects.push(unusedProjects[0])
        rootElement.appendChild(projectImg)
    } else {
        updateBackground(rootElement, header, arrayOfBackgroundUrls)
        descriptionImageRender(rootElement, header, projectModel, arrayOfBackgroundUrls)
    }
}

const descriptionImageRender = (rootElement: HTMLElement, header: HTMLElement, projectModel: Project, arrayOfBackgroundUrls: Array<string>) => {
    rootElement.innerHTML = ""
    const projectDescription: string = dataPath + projectModel.projectDescription
    const descriptionImg = createPartImage(projectDescription, 0, 0)
    descriptionImg.setAttribute("class", "projectDescription")
    descriptionImg.addEventListener("click", () => {
        rootElement.innerHTML = ""
        renderMainPage(rootElement, header)
    })
    rootElement.appendChild(descriptionImg)
}

const createHeader = (headerName: string, artefact: string) => {
    const header = document.getElementById(`${headerName}`)
    const bgH1 = createElement("h1")
    const artH1 = createElement("h1")
    const artNumH1 = createElement("h1", "artefact")
    bgH1.innerText = "Background /"
    artH1.innerText = "artefact"
    artNumH1.innerText = `${artefact}`
    bgH1.setAttribute("class", "bgH1")
    artH1.setAttribute("class", "artH1")
    artNumH1.setAttribute("class", "artNumH1")
    header.append(bgH1, artH1, artNumH1)
}

async function updateBackground(rootElement: HTMLElement, header: HTMLElement, arrayOfBackgroundUrls: Array<string>): Promise<void> {
    // rootElement.innerHTML = ""
    // header.innerHTML = ""
    const singleBackgroundUrl = getRandomFromArray(arrayOfBackgroundUrls)
    const backgroundImage = document.getElementById("backgroundImg")
    backgroundImage.setAttribute("src", singleBackgroundUrl)
    backgroundImage.onclick = () => {
        renderMainPage(rootElement, header)
    }
}

function createImageFromTheSameCollection(imageUrl: string, array: Array<string>){
    const image = createElement("img")
    image.src = imageUrl
    image.setAttribute("class", "imageFromTheSameCollection")
    const translateArg = getRandomFromArray(array)
    image.style = `transform: translate(-50%, -50%) translate${translateArg}`
    return image
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


