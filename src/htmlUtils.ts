export const createImageInput = (rootElement: HTMLElement): void => {
    const form: HTMLElement = document.createElement('form')
    const fileInput: HTMLElement = document.createElement('input')
    const submitInput: HTMLElement = document.createElement('input')
    form.setAttribute("action", "/upload")
    form.setAttribute("method", "POST")
    form.setAttribute("enctype", "multipart/form-data")
    fileInput.setAttribute("type", "file")
    fileInput.setAttribute("name", "filedata")
    submitInput.setAttribute("type", "submit")
    submitInput.setAttribute("value", "Send file")
    form.append(fileInput, submitInput)
    rootElement.append(form)
}

export const createElement = (type: string, id: string): HTMLElement => {
    const element = document.createElement(type)
    element.setAttribute("id", id)
    return element
}

export const createAdminAccessButton = (rootElement: HTMLElement) => {
    const adminAccessButton: HTMLElement = createElement("input", "adminAccess")
    adminAccessButton.setAttribute("type", "button")
    adminAccessButton.setAttribute("value", "admin access")
    adminAccessButton.addEventListener("click", function () {
        document.body.style.backgroundImage = ""
        rootElement.innerHTML = ""
        createImageInput(rootElement)
    })
    return adminAccessButton
}