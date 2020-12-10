import { deleteProject } from "./utils"

export const createElement = (type: string, id?: string): any => {
    const element = document.createElement(type)
    if (id) {
        element.setAttribute("id", id)
    }
    return element
}

export const createFormElement = (action: string): HTMLElement => {
    const form = document.createElement("form")
    form.action = action
    form.method = "POST"
    form.enctype = "multipart/form-data"
    return form
}

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export const createInputElement = (id: string, multiple: boolean = false): HTMLElement => {
    const div = createElement("div")
    div.setAttribute("style", "margin-bottom: 12px")
    const input = createElement("input")
    const label = createElement("label")
    div.setAttribute("class", "custom-file")
    input.setAttribute("class", "custom-file-input") 
    input.setAttribute("id", "customFile")
    input.setAttribute("multiple", multiple)
    label.setAttribute("class", "custom-file-label") 
    label.setAttribute("for", "customFile")
    label.innerHTML = "Choose a file"
    input.id = id
    input.type = "file"
    input.name = "full"
    div.append(input, label)
    input.addEventListener('change', function(e: any){
        const file: any = document.getElementById(id)
        const fileName: any = []
        const files = file.files
        for (let i = 0; i < files.length; i++){
            fileName.push(files[i].name)
        }
        var nextSibling = e.target.nextElementSibling
        nextSibling.innerText = fileName
      })
    return div
}

export const createSubmitElement = (id: string): HTMLElement => {
    const submit = document.createElement("input")
    submit.setAttribute("style", "margin-top: 12px")
    submit.id = id
    submit.type = "submit"
    return submit
}

export const createH3Element = (id: string, text: string): HTMLElement => {
    const h3 = document.createElement("h3")
    h3.id = id
    h3.innerText = text
    return h3
}

export const imageOnClick = (index: number, projectNumber: string) => {
    const divModalFade = createElement('div')
    divModalFade.setAttribute('class', 'modal fade')
    divModalFade.setAttribute('id', `modal${index}`)
    const divModalDialog = createElement('div')
    divModalDialog.setAttribute("class", 'modal-dialog')
    divModalDialog.setAttribute('role', 'document')
    const divModalContent = createElement('div')
    divModalContent.setAttribute('class', 'modal-content')
    const divModalHeader = createElement('div')
    divModalHeader.setAttribute('class', 'modal-header')
    const divModalBody = createElement('div')
    divModalBody.setAttribute('class', 'modal-body')
    divModalBody.innerHTML = `Delete project №${projectNumber} ?`
    const divModalFooter = createElement('div')
    divModalFooter.setAttribute('class', 'modal-footer')
    const closeButton = createElement('button')
    closeButton.setAttribute('type', 'button')
    closeButton.setAttribute('class', 'close')
    closeButton.setAttribute('data-dismiss', 'modal')
    closeButton.setAttribute('aria-label', 'Close')
    const cancelButton = createElement('button')
    cancelButton.setAttribute('type', 'button')
    cancelButton.setAttribute('class', 'btn btn-secondary')
    cancelButton.setAttribute('data-dismiss', 'modal')
    cancelButton.setAttribute('value', 'Cancel')
    cancelButton.innerHTML = "Cancel"
    const saveButton = createElement('button')
    saveButton.setAttribute('type', 'button')
    saveButton.setAttribute('class', 'btn btn-primary')
    saveButton.setAttribute('value', 'Delete')
    saveButton.addEventListener('click', () => {
        deleteProject(projectNumber)
    })
    saveButton.innerHTML = "Delete"
    const span = createElement('span')
    span.setAttribute('aria-hidden', 'true')
    const pTag = createElement('p')
    const h5Tag = createElement('h5')
    h5Tag.setAttribute('class', 'modal-title')
    h5Tag.innerHTML = "Delete Project"    
    divModalFade.append(divModalDialog)
    divModalDialog.append(divModalContent)
    divModalContent.append(divModalHeader, divModalBody, divModalFooter)
    divModalHeader.append(closeButton, h5Tag)
    closeButton.append(span)
    divModalBody.append(pTag)
    divModalFooter.append(cancelButton, saveButton)
    return divModalFade
}