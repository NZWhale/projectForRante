import { renderAdminPage } from "./adminPageView"
import LoginPageModel from "./LoginPageModel"

export const backgroundUrl: string = "http://127.0.0.1:3000/getbackground"
export const partsUrl: string = "http://127.0.0.1:3000/getpart"
export const fullUrl: string = "http://127.0.0.1:3000/getfull"
export const loginHandler: string = "http://127.0.0.1:3000/login"

const rootElement: HTMLElement = document.getElementById("root")

export const getRandomLink = (array: any): string => {
    const randomNumber = Math.floor(Math.random() * array.length)
    const randomLink = array[randomNumber]
    return randomLink
}

export async function getImagesUrls(backgroundUrl: string): Promise<string[]> {
    const response = await fetch(backgroundUrl)
    const urls = await response.json()
    return urls
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
    }).then((response) => {
        return response
    }, err => {
        console.log(err, "data wasn't wrote")
    })
    return responsePromise
}



export const login = (login: string, password: string, loginHandler: string, loginPageModelInstance: LoginPageModel) => {
    const user = {
        login: login,
        password: password
    }
    const loginPromise = fetchRequest("POST", loginHandler, user)
    loginPromise.then((response) => {
        if(response.status === 200) {
            loginPageModelInstance.setLoginStatus(true)
            renderAdminPage(rootElement, loginPageModelInstance)
            return response
        }
    })
}