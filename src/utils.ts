export const backgroundUrl: string = "http://127.0.0.1:3000/uploads"

const getRandomLink = (array: any): string => {
    const randomNumber = Math.floor(Math.random() * array.length)
    const randomLink = array[randomNumber]
    return randomLink
}

async function getBackgroundUrls(backgroundUrl: string): Promise<string[]> {
    const response = await fetch(backgroundUrl)
    const urls = await response.json()
    return urls
}

export async function createBackground(backgroundUrl: string) {
    const arrayOfBackgroundUrls = await getBackgroundUrls(backgroundUrl)
    const singleBackgroundUrl = getRandomLink(arrayOfBackgroundUrls)
    document.body.style.backgroundImage = `url(http://127.0.0.1:3000${singleBackgroundUrl})`
    document.body.style.backgroundSize = "110%"
    document.body.style.backgroundRepeat = "no-repeat"
}