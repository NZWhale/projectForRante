import { arrayOfParts } from "."
import { renderAdminPage } from "./adminPageView"
import LoginPageModel from "./LoginPageModel"

export const backgroundUrl: string = "http://127.0.0.1:3000/getbackground"
export const partsUrl: string = "http://127.0.0.1:3000/getpart"
export const fullUrl: string = "http://127.0.0.1:3000/getfull"
export const loginHandler: string = "http://127.0.0.1:3000/login"
export const backendCheckLoginUrl = "http://127.0.0.1:3000/check-login"

// const rootElement: HTMLElement = document.getElementById("root")

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


export function fetchRequest(method: string, url: string, body: object = {}): Promise<any> {
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



export const login = (login: string, password: string, loginHandler: string, loginPageModelInstance: LoginPageModel, rootElement: HTMLElement, arrayOfParts: Array<any>) => {
    const user = {
        login: login,
        password: password
    }
    const loginPromise = fetchRequest("POST", loginHandler, user)
    loginPromise.then((response) => {
        if (response.status === 200) {
            loginPageModelInstance.setLoginStatus(true)
            renderAdminPage(rootElement, loginPageModelInstance, arrayOfParts)
            return response
        }
    })
}


function searchByFullImg(array: Array<Array<string>>, item: string): Array<string> {
    const result: Array<string> = []
    array.filter(el => {
        el.forEach(element => {
            if (element.includes(item)) {
                result.push(element)
            }
        });
    })
    return result
}
