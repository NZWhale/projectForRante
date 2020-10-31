import { arrayOfParts } from "./index"
import { createElement } from "./htmlUtils"
import { backgroundUrl, fetGetRequest, fullUrl, getImagesUrls, getRandomLink, getUnusedPartsOfFullImage, getPartsUrl, searchByFullImg, compareArrays } from "./utils"

export async function renderMainPage(rootElement: HTMLElement, backgroundUrl: string) {
    await createBackground(rootElement, backgroundUrl)
    await createImageFull(rootElement, fullUrl)
}

async function createBackground(rootElement: HTMLElement, backgroundUrl: string): Promise<void> {
    const arrayOfBackgroundUrls = await getImagesUrls(backgroundUrl)
    const singleBackgroundUrl = getRandomLink(arrayOfBackgroundUrls)
    // const backgroundImage = createElement("img", "backgroundImage")
    // backgroundImage.setAttribute("class", "background")
    // backgroundImage.src = singleBackgroundUrl
    // rootElement.append(backgroundImage)
    document.body.style.backgroundImage = `url(http://127.0.0.1:3000${singleBackgroundUrl})`
    document.body.style.backgroundSize = "110%"
    document.body.style.backgroundRepeat = "no-repeat"
}

async function createImageFull(rootElement: HTMLElement, fullUrl: string): Promise<void> {
    const arrayOfImagesUrls = await getImagesUrls(fullUrl)
    const singleImageUrl = getRandomLink(arrayOfImagesUrls)
    const singleFullImageUrl = singleImageUrl.split("/")[2].split(".")[0]
    const arrayOfParts = await fetGetRequest(getPartsUrl)
    const singlePartsUrl: Array<string> = searchByFullImg(arrayOfParts, singleFullImageUrl)
    const partOfImg = createElement("img", "partOfImg")
    const fullDiv = createElement("div", "fullDiv")
    const fullImg = createElement("img", "fullImg")
    const partsDiv = createElement("div", "partsDiv")
    let usedImagesParts: Array<string> = []
    partOfImg.addEventListener("click", async () => {
        createBackground(rootElement, backgroundUrl)
        const partOfImg = createElement("img", "partOfImg")
        if (compareArrays(usedImagesParts, singlePartsUrl)) {
            if (document.getElementById("partsDiv")) {
                const partsDiv = document.getElementById("partsDiv")
                partsDiv.innerHTML = ""
                fullImg.src = singleImageUrl
                fullDiv.append(fullImg)
                rootElement.append(fullDiv)
            } else {
                const partsDiv = createElement("div", "partsDiv")
                partsDiv.innerHTML = ""
                fullImg.src = singleImageUrl
                fullDiv.append(fullImg)
                rootElement.append(fullDiv)
            }
        } else {
            const singleUnusedPartsUrl: Array<string> = getUnusedPartsOfFullImage(usedImagesParts, singlePartsUrl)
            singleUnusedPartsUrl.forEach(partUrl => {
                const partOfImg = createElement("img", "partOfImg")
                partOfImg.src = "parts/" + partUrl
                usedImagesParts.push(partUrl)
                partsDiv.append(partOfImg)
                rootElement.append(partsDiv)
            })
        }
    })
    const singleUnusedPartsUrl: Array<string> = getUnusedPartsOfFullImage(usedImagesParts, singlePartsUrl)
    const singlePartUrl: string = singleUnusedPartsUrl[0]
    partOfImg.src = "parts/" + singlePartUrl
    usedImagesParts.push(singlePartUrl)
    partsDiv.append(partOfImg)
    rootElement.append(partsDiv)
}

