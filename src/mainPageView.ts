import { arrayOfParts } from "./index"
import { createElement } from "./htmlUtils"
import { backgroundUrl, fetGetRequest, fullUrl, getImagesUrls, getRandomLink, getUnusedPartsOfFullImage, getPartsUrl, searchByFullImg, compareArrays, randomFromRange } from "./utils"

export async function renderMainPage(rootElement: HTMLElement, backgroundUrl: string) {
    const headerName = "header"
    const artefact = "1488"
    createHeader(headerName, artefact)
    return Promise.all([createBackground(rootElement, backgroundUrl), createImageFull(rootElement, fullUrl)])
}

const createHeader = (headerName: string, artefact: string) => {
    const header = document.getElementById(`${headerName}`)
    header.innerHTML = `Background / artefact: ${ artefact }`
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

async function createImageFull(rootElement: HTMLElement, fullUrl: string): Promise<void> {
    const arrayOfFullImages = await getImagesUrls(fullUrl)
    const singleImageUrl = getRandomLink(arrayOfFullImages)
    const singleFullImageUrl = singleImageUrl.split("/")[2].split(".")[0]
    const arrayOfParts = await fetGetRequest(getPartsUrl)

    const singlePartsUrl: Array<string> = 
        searchByFullImg(arrayOfParts, singleFullImageUrl)
            .map((url) => `parts/${url}`)

    const singlePartUrl = singlePartsUrl[0]
    const partsUrls = singlePartsUrl.slice(1);

    const partOfImg = createPartImage(singlePartUrl, 0, 0)

    partOfImg.addEventListener("click", () => {
        displayTheRestOfParts(rootElement, partsUrls, singleImageUrl);
    })

    rootElement.append(partOfImg)
}

function createPartImage(imageUrl: string, radiusPx: number, angleRad: number): HTMLElement {
    const partOfImg = createElement("img")
    partOfImg.src = imageUrl
    partOfImg.setAttribute("class", "partImg")
    const xShift = Math.cos(angleRad) * radiusPx;
    const yShift = Math.sin(angleRad) * radiusPx;
    partOfImg.style = `transform: translate(-50%, -50%) translate(${xShift}px, ${yShift}px)`
    return partOfImg;
}

function displayTheRestOfParts(rootElement: HTMLElement, partsUrls: string[], singleImageUrl: string) {
    createBackground(rootElement, backgroundUrl)
    
    const minRadiusPx = 380;
    const maxRadiusPx = 420;
    const minAngleRad = 0;
    const maxAngleRad = Math.PI * 2;
    partsUrls.forEach(partUrl => {
        const radiusPx = Math.round(randomFromRange(minRadiusPx, maxRadiusPx));
        console.log(radiusPx)
        const angleRad = randomFromRange(minAngleRad, maxAngleRad);
        const partImg = createPartImage(partUrl, radiusPx, angleRad);
        partImg.addEventListener("click", () => {
            displayFullImage(rootElement, singleImageUrl);
        })
        rootElement.appendChild(partImg)
    })
}

function displayFullImage(rootElement: HTMLElement, singleImageUrl: string) {
    rootElement.innerHTML = ""
    createBackground(rootElement, backgroundUrl)
    rootElement.appendChild(createPartImage(singleImageUrl, 0, 0))
}
