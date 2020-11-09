

import { create } from "domain"
import { arrayOfParts } from "."
import { deleteCookie } from "./deleteCookies"
import { createElement, createFormElement, createH3Element, createInputElement, createSubmitElement, } from "./htmlUtils"
import LoginPageModel from "./LoginPageModel"
import { Project } from "./ProjectModel"
import { fetchRequest, login, postPartsUrl, sendArrayOfParts, sendBackground, sendProject, uploadImage, uploadModel } from "./utils"


export const renderAdminLoginPage = (rootElement: HTMLElement, loginPageModelInstance: LoginPageModel, loginHandler: string, arrayOfParts: Array<Array<string>>) => {
    const loginDiv: HTMLElement = createElement("div", "loginDiv")
    const loginForm: HTMLInputElement = createElement("input", "loginForm")
    const passwordForm: HTMLInputElement = createElement("input", "passwordForm")
    const loginButton: HTMLElement = createElement("input", "loginButton")
    loginButton.addEventListener("click", (e: KeyboardEvent) => {
        const loginValue: string = (document.getElementById("loginForm") as HTMLInputElement).value
        const passwordValue: string = (document.getElementById("passwordForm") as HTMLInputElement).value
        if (e.keyCode === 13) {
            if (!loginValue) {
                alert("Please enter login")
            } else {
                if (!passwordValue) {
                    alert("Please enter password")
                } else {
                    login(loginValue, passwordValue, loginHandler, loginPageModelInstance, rootElement, arrayOfParts)
                }
            }
        } else {
            login(loginValue, passwordValue, loginHandler, loginPageModelInstance, rootElement, arrayOfParts)
        }
    })
    passwordForm.setAttribute("type", "password")
    loginButton.setAttribute("type", "submit")
    loginDiv.append(loginForm, passwordForm, loginButton)
    rootElement.append(loginDiv)

}


function getFilesNames(id: string): Array<string> {
    const filesInput = <HTMLInputElement>document.getElementById(`${id}`)
    const files: FileList = filesInput.files
    const fileNamesArray: Array<string> = []
    Array.from(files).forEach(file => fileNamesArray.push(file.name))
    return fileNamesArray
}

export const renderAdminPage = (rootElement: HTMLElement, loginPageModelInstance: LoginPageModel) => {
    rootElement.innerHTML = ""
    const exitButton: HTMLElement = createElement("input", "exitButton")
    const projectForm = <HTMLFormElement> createFormElement("sendproject")
    projectForm.id = "projectForm"
    const backgroundForm = <HTMLFormElement> createFormElement("background")
    backgroundForm.id = "backgroundForm"
    const mainDiv: HTMLElement = createElement("div", "mainDiv")
    mainDiv.setAttribute("class", "mainDiv")
    const projectsDiv: HTMLElement = createElement("div", "projectsDiv")
    const backgroundDiv: HTMLElement = createElement("div", "backgroundDiv")
    const projectNumberInput: HTMLElement = createElement("input", "projectNumberInput")
    const fullInput = <HTMLInputElement>createInputElement("fullInput")
    const partsInput = <HTMLInputElement>createInputElement("partsInput")
    const descriptionInput = <HTMLInputElement>createInputElement("descriptionInput")
    const projectsFromSameCollection = <HTMLInputElement>createInputElement("projectsFromSameCollection")
    const backgroundInput = <HTMLInputElement>createInputElement("backgroundInput")
    const backgroundSubmit: HTMLElement = createSubmitElement("backgroundSubmit")
    const projectSubmit: HTMLElement = createSubmitElement("projectSubmit")
    const numberH3: HTMLElement = createH3Element("numberH3", "Project number")
    const fullH3: HTMLElement = createH3Element("fullH3", "Full image")
    const partsH3: HTMLElement = createH3Element("partsH3", "Parts images")
    const descriptionH3: HTMLElement = createH3Element("descriptionH3", "Desription of project")
    const projectsFromSameCollectionH3: HTMLElement = createH3Element("projectsFromSameCollectionH3", "Projects from the same collection")
    const backgroundH3: HTMLElement = createH3Element("backgroundH3", "Background image")
    partsInput.setAttribute("multiple", "true")
    backgroundInput.setAttribute("multiple", "true")
    projectsFromSameCollection.setAttribute("multiple", "true")
    exitButton.setAttribute("type", "button")
    exitButton.innerText = "exit"
    exitButton.addEventListener("click", () => {
        rootElement.innerHTML = ""
        loginPageModelInstance.setLoginStatus(false)
        deleteCookie("auth-token")
    })
    projectSubmit.addEventListener("click", async () => {
        const fullFileName = getFilesNames("fullInput")
        const partsOfFilesNames = getFilesNames("partsInput")
        const projectDescription = getFilesNames("descriptionInput")
        const projectsFromSameCollection = getFilesNames("projectsFromSameCollection")
        const projectNumberInput = <HTMLInputElement>document.getElementById("projectNumberInput")
        const projectNumber: string = projectNumberInput.value
        const projectModel: Project = {
            projectNumber: projectNumber,
            fullImage: fullFileName[0],
            partsOfImage: partsOfFilesNames,
            projectDescription: projectDescription[0],
            projectsFromSameCollection: projectsFromSameCollection
        }
        console.log(projectModel)
        const form = <HTMLFormElement> document.getElementById("projectForm")
        const formData: FormData = new FormData(form)
        uploadImage(formData, sendProject)
        uploadModel(projectModel)
    })
    backgroundSubmit.addEventListener("click", async () => {
        const form = <HTMLFormElement> document.getElementById("backgroundForm")
        const formData: FormData = new FormData(form)
        uploadImage(formData, sendBackground)

    })
    projectsDiv.append(numberH3, projectNumberInput, fullH3, fullInput, partsH3, partsInput, descriptionH3, descriptionInput, projectsFromSameCollectionH3, projectsFromSameCollection, projectSubmit)
    backgroundDiv.append(backgroundH3, backgroundInput, backgroundSubmit)
    projectForm.append(projectsDiv)
    backgroundForm.append(backgroundDiv)
    mainDiv.append(projectForm, backgroundForm)
    rootElement.append(mainDiv, exitButton)
}