import { url } from "inspector"
import { arrayOfParts } from "."
import { renderAdminPage } from "./adminPageView"
import LoginPageModel from "./LoginPageModel"

export const backgroundUrl: string = "http://127.0.0.1:3000/getbackground"
export const fullUrl: string = "http://127.0.0.1:3000/getfull"
export const loginHandler: string = "http://127.0.0.1:3000/login"
export const backendCheckLoginUrl: string= "http://127.0.0.1:3000/check-login"
export const postPartsUrl: string = "http://127.0.0.1:3000/sendarrayofparts"
export const getPartsUrl: string = "http://127.0.0.1:3000/getArrayOfParts"


export const randomFromRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

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

export const sendArrayOfParts = (url: string, body: Array<string>): Promise<any> =>{
    const headers = {
        "Content-Type": "application/json"
    }

    const response = fetch (url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
        credentials: "same-origin"
    }).then((response) => {
        return response
    }, err => {
        console.log(err, "data was not wrote")
    })
    return response
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
            renderAdminPage(rootElement, loginPageModelInstance)
            return response
        }
    })
}


export const searchByFullImg = (array: Array<Array<string>>, item: string): Array<string> => {
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

export const getUnusedPartsOfFullImage = (arrayOfUsedParts: Array<string>, arrayOfParts: Array<string>):Array<string> => {
    let partOfImage
    if (arrayOfUsedParts.length === 0) {
        partOfImage = arrayOfParts
        return partOfImage
    } else {
        let result = arrayOfParts.filter((item, index) => item != arrayOfUsedParts[index])
        partOfImage = result
        }
        return partOfImage
    }

export function fetGetRequest(url: string){
    return fetch(url).then(response => {
        return response.json()
    })
}

export const compareArrays = (a: Array<string>, b: Array<string>) => a.length === b.length && a.every((n, i) => n === b[i])
