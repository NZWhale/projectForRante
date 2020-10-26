import { createBackground, createImageFull } from "./htmlUtils"
import { backgroundUrl, fullUrl, partsUrl } from "./utils"

export async function renderMainPage(rootElement: HTMLElement, backgroundUrl: string) {
    await createBackground(rootElement, backgroundUrl)
    await createImageFull(rootElement, fullUrl, partsUrl)
}