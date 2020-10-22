import LoginPageModel from "./LoginPageModel"

export const backgroundUrl: string = "http://127.0.0.1:3000/uploads"
export const loginHandler: string = "http://127.0.0.1:3000/login"

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

function fetchRequest(method: string, url: string, body: object = {}): Promise<any> {
    const headers = {
        "Content-Type": "application/json"
    }

    const responsePromise = fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers,
        credentials: "same-origin"
    }).then(response => {
        return response.json()
    }, err => {
        console.log(err, "data wasn't wrote")
    })
    return responsePromise
}

export const login = (login: string, password: string, loginPageModelInstance: LoginPageModel, loginHandler: string) => {
    const user = {
        login: login,
        password: password
    }
    const loginPromise = fetchRequest("POST", loginHandler, user)
    loginPromise.then((response) => {
        if(response.status === 200) {
            loginPageModelInstance.setLoginStatus(true)
            return response
        }
    })
}