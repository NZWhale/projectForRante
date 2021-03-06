import { error } from "console"
import { url } from "inspector"
import { arrayOfParts } from "."
import { renderAdminPage } from "./adminPageView"
import LoginPageModel from "./LoginPageModel"
import { PartOfWork, Project } from "./ProjectModel"

export const backgroundUrl: string = "http://127.0.0.1:3000/getbackground"
export const fullUrl: string = "http://127.0.0.1:3000/getfull"
export const loginHandler: string = "http://127.0.0.1:3000/login"
export const backendCheckLoginUrl: string = "http://127.0.0.1:3000/check-login"
export const postPartsUrl: string = "http://127.0.0.1:3000/sendarrayofparts"
export const getPartsUrl: string = "http://127.0.0.1:3000/getArrayOfParts"
export const sendProject: string = "http://127.0.0.1:3000/sendproject"
export const sendBackground: string = "http://127.0.0.1:3000/background"
export const getModels: string = "http://127.0.0.1:3000/getprojectsmodel"

export const arrayOfCoordinates = ["(268.368px, -155.902px)", "(-336.931px, 155.302px)", "(-260.831px, -46.8233px)", "(-324.611px, 122.624px)", "(309.284px, -21.0505px)", "(-194.68px, -191.387px)", "(-301.94px, 49.6814px)", "(296.896px, 159.727px)", "(-353.183px, -155.749px)", "(-256.846px, -164.485px)", "(323.093px, -120.978px)", "(-361.618px, 49.5731px)"]

export const randomFromRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}


export const getRandomFromArray = (array: any): any => {
    const randomNumber = Math.floor(Math.random() * array.length)
    const randomLink = array[randomNumber]
    return randomLink
}

export const getRandomModel = (array: any): Project => {
    const randomNumber = Math.floor(Math.random() * array.length)
    const randomModel = array[randomNumber]
    return randomModel
}

export async function getImagesUrls(backgroundUrl: string) {
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

export const sendArrayOfParts = (url: string, body: Array<string>): Promise<any> => {
    const headers = {
        "Content-Type": "application/json"
    }

    const response = fetch(url, {
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




export const getUnusedPartsOfFullImage = (arrayOfUsedParts: Array<PartOfWork>, arrayOfParts: Array<PartOfWork>): Array<PartOfWork> => {
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

export const getUnusedRandomPartsOfFullImage = (arrayOfUsedParts: Array<string>, arrayOfParts: Array<string>) => {
    let partOfImage
    if (arrayOfUsedParts.length === 0) {
        partOfImage = arrayOfParts
        return partOfImage
    } else {
        let result: Array<string> = arrayOfParts.filter((item) => {
            for (let j = 0; j < arrayOfUsedParts.length; j++) {
                item != arrayOfUsedParts[j]
                return true
            }
        })
        partOfImage = result
    }
    return partOfImage
}

export function fetGetRequest(url: string) {
    return fetch(url).then(response => {
        return response.json()
    })
}

export const compareArrays = (a: Array<PartOfWork>, b: Array<PartOfWork>) => a.length === b.length && a.every((n, i) => n === b[i])




export const uploadImage = (file: FormData, url: string) => {
    fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        body: file
    }).then(
        response => response.json()
    ).then(
        success => console.log(success)
    ).catch(
        error => console.log(error)
    );
};

export const uploadModel = (body: object) => {
    fetch("http://127.0.0.1:3000/sendprojectmodel", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify(body)
    }).then(
        response => response.json()
    ).then(
        success => console.log(success)
    ).catch(
        error => console.log(error)
    )
}

export const deleteProject = (body: any) => {
    fetch("http://127.0.0.1:3000/deleteproject", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"projectNumber": body})
    })
    .then(
        response => {
            console.log(response.status)
            if(response.status === 200) {
                window.location.reload()
            }
        }
    ).catch(
        error => console.log(error)
    )
}