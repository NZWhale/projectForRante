import { arrayOfParts } from "./index"
import { createElement } from "./htmlUtils"
import { backgroundUrl, getImagesUrls, getUnusedPartsOfFullImage, randomFromRange, getModels, getRandomModel, compareArrays, getRandomFromArray, arrayOfCoordinates, getUnusedRandomPartsOfFullImage, } from "./utils"
import { PartOfWork, Project } from "./ProjectModel"
const dataPath = "/images/"

export async function renderMainPage(rootElement: HTMLElement,) {
    rootElement.innerHTML = ""
    let arrayOfBackgroundUrls: Array<string> = []
    if (arrayOfBackgroundUrls.length == 0) { arrayOfBackgroundUrls = await getImagesUrls(backgroundUrl) }
    await singlePartImageRender(rootElement, arrayOfBackgroundUrls)
}

async function singlePartImageRender(rootElement: HTMLElement, arrayOfBackgroundUrls: Array<string>) {
    updateBackground(rootElement, arrayOfBackgroundUrls)
    const arrayOfProjectsModel: Array<Project> = await getImagesUrls(getModels)
    console.log(arrayOfProjectsModel)
    const projectModel = getRandomModel(arrayOfProjectsModel)
    let partsOfImage = projectModel.partsOfImage
    let usedPartsOfImage: Array<string> = []
    const singlePartUrl = getRandomFromArray(partsOfImage)
    const artefact: string = projectModel.projectNumber
    const headerArtefact = document.getElementById("artefact")
    headerArtefact.innerHTML = singlePartUrl.artefact
    const partOfImg = createPartImage(dataPath+singlePartUrl.name, 0, 0)
    partOfImg.addEventListener("click", () => {
        // console.log(singlePartUrl)
        // console.log(usedPartsOfImage)
        rootElement.innerHTML = ""
        partsOfImage = partsOfImage.filter(partOfImg => partOfImg.name != singlePartUrl.name)
        drawOtherPartOfImage(rootElement, projectModel, arrayOfBackgroundUrls, partsOfImage, headerArtefact)
    })
    rootElement.append(partOfImg)
} 
function drawOtherPartOfImage(rootElement: HTMLElement, projectModel: Project, arrayOfBackgroundUrls: Array<string>, partsOfImage: Array<PartOfWork>, headerArtefact: HTMLElement) {
    if (partsOfImage.length) {
        updateBackground(rootElement, arrayOfBackgroundUrls)
        const randomPartOfImage = getRandomFromArray(partsOfImage)
        headerArtefact.innerHTML = randomPartOfImage.artefact
        const partImg = createPartImage(dataPath + randomPartOfImage.name, 0, 0)
        partImg.addEventListener("click", () => { 
            partsOfImage = partsOfImage.filter(part => part != randomPartOfImage)
            rootElement.innerHTML = ""
            drawOtherPartOfImage(rootElement, projectModel, arrayOfBackgroundUrls, partsOfImage, headerArtefact)
        })
        rootElement.appendChild(partImg)
    } else {
        fullImageRender(rootElement, projectModel, arrayOfBackgroundUrls, headerArtefact)
    }
}

const multiPartImagesRender = (rootElement: HTMLElement, projectModel: Project, partsOfImage: Array<string>, arrayOfBackgroundUrls: Array<string>) => {
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
                // fullImageRender(rootElement, projectModel, arrayOfBackgroundUrls, headerArtefact)
            })
            rootElement.appendChild(partImg)
        })
    } else {
        // fullImageRender(rootElement, projectModel, arrayOfBackgroundUrls)
    }

}


const fullImageRender = (rootElement: HTMLElement, projectModel: Project, arrayOfBackgroundUrls: Array<string>, headerArtefact: HTMLElement) => {
    rootElement.innerHTML = ""
    updateBackground(rootElement, arrayOfBackgroundUrls)
    const fullImageUrl: string = dataPath + projectModel.fullImage.name
    headerArtefact.innerHTML = projectModel.fullImage.artefact
    const fullImg = createPartImage(fullImageUrl, 0, 0)
    fullImg.setAttribute("class", "fullImg")
    fullImg.addEventListener("click", () => {
        if (projectModel.projectsFromSameCollection) {
            rootElement.innerHTML = ""
            sameProjectsImagesRender(rootElement, projectModel, arrayOfBackgroundUrls, headerArtefact)
        } else if (projectModel.projectDescription) {
            descriptionImageRender(rootElement, projectModel, arrayOfBackgroundUrls)
        } else {
            renderMainPage(rootElement)
        }
    })
    rootElement.appendChild(fullImg)
}

const sameProjectsImagesRender = (rootElement: HTMLElement, projectModel: Project, arrayOfBackgroundUrls: Array<string>, headerArtefact: HTMLElement) => {
    updateBackground(rootElement, arrayOfBackgroundUrls)
    const sameProjects: Array<PartOfWork> = projectModel.projectsFromSameCollection
    let usedProjects: Array<PartOfWork> = []
    const projectUrl = sameProjects[0]
    headerArtefact.innerHTML = projectUrl.artefact
    usedProjects.push(projectUrl)
    const projectImg = createPartImage(dataPath + projectUrl.name, 0, 0)
    projectImg.addEventListener('click', () => {
        rootElement.innerHTML = ""
        drawImageFromTheSameCollection(rootElement, projectModel, arrayOfBackgroundUrls, usedProjects, sameProjects, headerArtefact)
    })
    rootElement.appendChild(projectImg)
}

function drawImageFromTheSameCollection(rootElement: HTMLElement, projectModel: Project, arrayOfBackgroundUrls: Array<string>, usedProjects: Array<PartOfWork>, sameProjects: Array<PartOfWork>, headerArtefact: HTMLElement) {
    if (!compareArrays(usedProjects, sameProjects)) {
        updateBackground(rootElement, arrayOfBackgroundUrls)
        const unusedProjects = getUnusedPartsOfFullImage(usedProjects, sameProjects)
        const projectImg = createPartImage(dataPath + unusedProjects[0].name, 0, 0)
        headerArtefact.innerHTML = unusedProjects[0].artefact
        projectImg.addEventListener("click", () => { 
            rootElement.innerHTML = ""
            drawImageFromTheSameCollection(rootElement, projectModel, arrayOfBackgroundUrls, usedProjects, sameProjects, headerArtefact)
        })
        usedProjects.push(unusedProjects[0])
        rootElement.appendChild(projectImg)
    } else {
        updateBackground(rootElement, arrayOfBackgroundUrls)
        descriptionImageRender(rootElement, projectModel, arrayOfBackgroundUrls)
    }
}

const descriptionImageRender = (rootElement: HTMLElement, projectModel: Project, arrayOfBackgroundUrls: Array<string>) => {
    rootElement.innerHTML = ""
    const projectDescription: string = dataPath + projectModel.projectDescription
    const descriptionImg = createPartImage(projectDescription, 0, 0)
    descriptionImg.setAttribute("class", "projectDescription")
    descriptionImg.addEventListener("click", () => {
        rootElement.innerHTML = ""
        renderMainPage(rootElement)
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

async function updateBackground(rootElement: HTMLElement, arrayOfBackgroundUrls: Array<string>): Promise<void> {
    // rootElement.innerHTML = ""
    // header.innerHTML = ""
    const singleBackgroundUrl = getRandomFromArray(arrayOfBackgroundUrls)
    const backgroundImage = document.getElementById("backgroundImg")
    backgroundImage.setAttribute("src", singleBackgroundUrl)
    backgroundImage.onclick = () => {
        renderMainPage(rootElement)
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


