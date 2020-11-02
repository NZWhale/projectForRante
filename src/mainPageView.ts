import { arrayOfParts } from "./index"
import { createElement } from "./htmlUtils"
import { backgroundUrl, fetGetRequest, fullUrl, getImagesUrls, getRandomLink, getUnusedPartsOfFullImage, getPartsUrl, searchByFullImg, compareArrays, randomFromRange } from "./utils"
import { resolve } from "path";

export async function renderMainPage(rootElement: HTMLElement, backgroundUrl: string) {
    // const headerName = "header"
    // const artefact = "1488"
    // createHeader(headerName, artefact)
    // return Promise.all([createBackground(rootElement, backgroundUrl), createImageFull(rootElement, fullUrl)])

    const arrayOfFullImages = await getImagesUrls(fullUrl)
    const projectFullImageUrl = getRandomLink(arrayOfFullImages)
    const singleFullImageUrl = projectFullImageUrl.split("/")[2].split(".")[0]
    const arrayOfParts = await fetGetRequest(getPartsUrl)
    const projectParts: Array<string> =
        searchByFullImg(arrayOfParts, singleFullImageUrl)
            .map((url) => `parts/${url}`)
    const firstPart = projectParts[0]
    const restOfTheParts = projectParts.slice(1);

    while (true) {
        await waitSinglePartStateSwitch(rootElement, firstPart);
        await waitMultiPartStateSwitch(rootElement, restOfTheParts);
        await waitFullPageStateSwith(rootElement, projectFullImageUrl);
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

    const minRadiusPx = 280;
    const maxRadiusPx = 320;
    const minAngleRad = 0;
    const maxAngleRad = Math.PI * 2;
    return new Promise((resolve) => {
        partsUrls.forEach(partUrl => {
            const radiusPx = Math.round(randomFromRange(minRadiusPx, maxRadiusPx));
            console.log(radiusPx)
            const angleRad = randomFromRange(minAngleRad, maxAngleRad);
            const partImg = createPartImage(partUrl, radiusPx, angleRad);
            partImg.addEventListener("click", () => {
                resolve();
            })
            rootElement.appendChild(partImg)
        })
    });
}

async function waitFullPageStateSwith(rootElement: HTMLElement, singleImageUrl: string) {
    rootElement.innerHTML = ""
    createBackground(rootElement, backgroundUrl)
    rootElement.appendChild(createPartImage(singleImageUrl, 0, 0))
    return new Promise((resolve) => null);
}


const createHeader = (headerName: string, artefact: string) => {
    const header = document.getElementsByClassName(`${headerName}`)
    header[0].innerHTML = `Background / artefact: ${artefact}`
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
    const xShift = Math.cos(angleRad) * radiusPx;
    const yShift = Math.sin(angleRad) * radiusPx;
    partOfImg.style = `transform: translate(-50%, -50%) translate(${xShift}px, ${yShift}px)`
    return partOfImg;
}
