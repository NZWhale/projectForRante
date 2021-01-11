import { deleteCookie } from "./deleteCookies"
import { createElement, createFormElement, createH3Element, createInputElement, createSubmitElement, imageOnClick, } from "./htmlUtils"
import LoginPageModel from "./LoginPageModel"
import { Project } from "./ProjectModel"
import { deleteProject, getImagesUrls, getModels, login, sendBackground, sendProject, uploadImage, uploadModel } from "./utils"

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
    loginButton.setAttribute("class", "btn btn-outline-secondary")
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
    exitButton.setAttribute("value",  "Exit")
    const projectForm = <HTMLFormElement> createFormElement("sendproject")
    projectForm.id = "projectForm"
    const backgroundForm = <HTMLFormElement> createFormElement("background")
    backgroundForm.id = "backgroundForm"
    const mainDiv: HTMLElement = createElement("div", "mainDiv")
    mainDiv.setAttribute("class", "mainDiv")
    const projectsDiv: HTMLElement = createElement("div", "projectsDiv")
    const backgroundDiv: HTMLElement = createElement("div", "backgroundDiv")
    const projectNumberInput: HTMLElement = createElement("input", "projectNumberInput")
    projectNumberInput.setAttribute("class", "input-group-text")
    projectNumberInput.setAttribute("style", "margin-bottom: 12px")
    projectNumberInput.setAttribute("placeholder", "Enter project number")
    let fullArtefact: any
    let partsArtefacts: Array<string> = []
    let projectsFromSameCollectionArtefacts: Array<string> = []
    const button = createElement("button")
    button.addEventListener("click", () => {
        console.log(fullArtefact)
    })
    const fullInput = <HTMLInputElement>createInputElement("fullInput")
    fullInput.addEventListener('change', function(e: any){
        const file: any = document.getElementById("fullInput")
        const fileName: any = []
        const files = file.files
        for (let i = 0; i < files.length; i++){
            fileName.push(files[i].name)
        }
        fileName.forEach((file: string) => {
           fullArtefact = prompt(`Enter artefact for ${file}`)
        })
        const nextSibling = e.target.nextElementSibling
        nextSibling.innerText = fileName
      })
    const partsInput = <HTMLInputElement>createInputElement("partsInput", true)
    partsInput.addEventListener('change', function(e: any){
        const file: any = document.getElementById("partsInput")
        const fileName: any = []
        const files = file.files
        for (let i = 0; i < files.length; i++){
            fileName.push(files[i].name)
        }
        fileName.forEach((file: string) => {
           let partArtefact = prompt(`Enter artefact for ${file}`)
           partsArtefacts.push(partArtefact)
        })
        const nextSibling = e.target.nextElementSibling
        nextSibling.innerText = fileName
      })
    const descriptionInput = <HTMLInputElement>createInputElement("descriptionInput")
    descriptionInput.addEventListener('change', function(e: any){
        const file: any = document.getElementById("descriptionInput")
        const fileName: any = []
        const files = file.files
        for (let i = 0; i < files.length; i++){
            fileName.push(files[i].name)
        }
        const nextSibling = e.target.nextElementSibling
        nextSibling.innerText = fileName
      })
    const projectsFromSameCollection = <HTMLInputElement>createInputElement("projectsFromSameCollection", true)
    projectsFromSameCollection.addEventListener('change', function(e: any){
        const file: any = document.getElementById("projectsFromSameCollection")
        const fileName: any = []
        const files = file.files
        for (let i = 0; i < files.length; i++){
            fileName.push(files[i].name)
        }
        fileName.forEach((file: string) => {
           let projectsFromSameCollectionArtefact = prompt(`Enter artefact for ${file}`)
           projectsFromSameCollectionArtefacts.push(projectsFromSameCollectionArtefact)
        })
        const nextSibling = e.target.nextElementSibling
        nextSibling.innerText = fileName
      })
    const backgroundInput = <HTMLInputElement>createInputElement("backgroundInput", true)
    const backgroundSubmit: HTMLElement = createSubmitElement("backgroundSubmit")
    const projectSubmit: HTMLElement = createSubmitElement("projectSubmit")
    projectSubmit.setAttribute("class", "btn btn-outline-secondary")
    const numberH3: HTMLElement = createH3Element("numberH3", "Project number")
    const fullH3: HTMLElement = createH3Element("fullH3", "Full work")
    const partsH3: HTMLElement = createH3Element("partsH3", "Parts of work")
    const descriptionH3: HTMLElement = createH3Element("descriptionH3", "Project description")
    const projectsFromSameCollectionH3: HTMLElement = createH3Element("projectsFromSameCollectionH3", "Other works from the same project")
    const backgroundH3: HTMLElement = createH3Element("backgroundH3", "Background images")
    exitButton.setAttribute("type", "button")
    exitButton.setAttribute("class", "btn btn-outline-secondary")
    exitButton.setAttribute("style", "height: 40px")
    exitButton.innerText = "exit"
    exitButton.addEventListener("click", () => {
        rootElement.innerHTML = ""
        loginPageModelInstance.setLoginStatus(false)
        deleteCookie("auth-token")
    })
    projectSubmit.addEventListener("click", async () => {
        const fullFileName = getFilesNames("fullInput")
        const partsOfFilesNames = getFilesNames("partsInput")
        const partsOfWork = partsOfFilesNames.map((part: any, index) => {
           part = {
                name: part,
                artefact: partsArtefacts[index]
            }
            return part
        })
        let projectDescription = getFilesNames("descriptionInput")
        let projectsFromSameCollection = getFilesNames("projectsFromSameCollection")
        const projectNumberInput = <HTMLInputElement>document.getElementById("projectNumberInput")
        const projectNumber: string = projectNumberInput.value
        const projectModel: Project = {
            projectNumber: projectNumber,
            fullImage: {
                name: fullFileName[0],
                artefact: fullArtefact
            },
            partsOfImage: partsOfWork,
        }
        if(projectDescription){projectModel.projectDescription = projectDescription[0]}
        if(projectsFromSameCollection){
            const sameProjects = projectsFromSameCollection.map((project: any, index) => {
                project = {
                    name: project,
                    artefact: projectsFromSameCollectionArtefacts[index]
                }
                return project
            })
            projectModel.projectsFromSameCollection = sameProjects}
        console.log(projectModel)
        const form = <HTMLFormElement> document.getElementById("projectForm")
        const formData: FormData = new FormData(form)
        uploadImage(formData, sendProject)
        uploadModel(projectModel)
    })
    backgroundSubmit.setAttribute("class", "btn btn-outline-secondary")
    backgroundSubmit.addEventListener("click", async () => {
        const form = <HTMLFormElement> document.getElementById("backgroundForm")
        const formData: FormData = new FormData(form)
        uploadImage(formData, sendBackground)

    })
    projectsDiv.append(numberH3, projectNumberInput, fullH3, fullInput, partsH3, partsInput, descriptionH3, descriptionInput, projectsFromSameCollectionH3, projectsFromSameCollection, projectSubmit)
    backgroundDiv.append(backgroundH3, backgroundInput, backgroundSubmit)
    projectForm.append(projectsDiv)
    backgroundForm.append(backgroundDiv)
    mainDiv.append(projectForm, backgroundForm, exitButton, button)
    rootElement.append(mainDiv)
}

export async function renderImagesControlPanel (rootElement: HTMLElement) {
    const arrayOfProjectsModel: Array<Project> = await getImagesUrls(getModels)
    const accordionDiv = createElement('div', "accordion");
    accordionDiv.setAttribute('class', "accordion")
    const imagesPath = "images/"
    arrayOfProjectsModel.forEach((project, index) => {
        const div = createElement('div')
        div.setAttribute("class", "card")
        const modal = imageOnClick(index, project.projectNumber)
        const secondDiv = createElement("div")
        secondDiv.setAttribute("id", `collapse${index}`)
        secondDiv.setAttribute("class", "collapse")
        secondDiv.setAttribute("aria-labelledby", `heading${index}`)
        secondDiv.setAttribute("data-parent", "#accordion")
        const accordionButton = createAccordionButton(index, project.projectNumber)
        const fullImgDiv = createElement('div')
        fullImgDiv.setAttribute("class", "border-bottom")
        const projectDiv = createElement('div')
        const projectNumber = createElement('div')
        const partsDiv = createElement("div")
        partsDiv.setAttribute("class", "border-bottom")
        const projectsFromSameCollectionDiv = createElement("div")
        projectsFromSameCollectionDiv.setAttribute("class", "border-bottom")
        const projectDescriptionDiv = createElement("div", "projectDescriptionDiv")
        projectNumber.innerHTML = project.projectNumber
        createImageElement(project.fullImage.name, fullImgDiv, imagesPath)
        projectDiv.append(fullImgDiv)
        project.partsOfImage.forEach((image) => {
        createImageElement(image.name, partsDiv, imagesPath)
        })
        projectDiv.append(partsDiv)
        project.projectsFromSameCollection.forEach(project => {
        createImageElement(project.name, projectsFromSameCollectionDiv, imagesPath)
        })
        projectDiv.append(projectsFromSameCollectionDiv)
        createImageElement(project.projectDescription, projectDescriptionDiv, imagesPath)
        projectDiv.append(projectDescriptionDiv)
        secondDiv.append(projectDiv)
        div.append(accordionButton, secondDiv, modal)
        accordionDiv.append(div)
    })
    rootElement.append(accordionDiv)
}


const createAccordionButton = (index: number, projectNumber: string) => {
    const div = createElement("div", `heading${index}`)
    div.setAttribute("class", "card-header")
    const h5 = createElement("h5")
    h5.setAttribute("class", "mb-0")
    h5.setAttribute("style", "display: flex; flex-direction: row; justify-content: space-between")
    const deleteButton = createElement("button")
    deleteButton.setAttribute("class", 'btn btn-outline-secondary')
    deleteButton.setAttribute("data-toggle", "modal")
    deleteButton.setAttribute("value", 'Delete project')
    deleteButton.innerHTML = "Delete project"
    deleteButton.setAttribute("data-target", `#modal${index}`)
    const button = createElement("button")
    button.setAttribute("class", "btn btn-link")
    button.setAttribute("type", "button")
    button.setAttribute("data-toggle", "collapse")
    button.setAttribute("data-target", `#collapse${index}`)
    button.setAttribute("aria-expanded", "true")
    button.setAttribute("aria-controls", `collapse${index}`)
    button.innerHTML = projectNumber
    h5.append(button, deleteButton)
    div.append(h5)
    return div
}


const createImageElement = (element: string, appendingTo: HTMLElement, imagePath: string) => {
    const image = createElement('img')
    image.src = imagePath + element
    image.setAttribute("width", "150px")
    appendingTo.append(image)
}

