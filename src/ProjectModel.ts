export interface Project {
    projectNumber: string,
    fullImage: PartOfWork,
    partsOfImage: Array<PartOfWork>
    projectDescription?: string,
    projectsFromSameCollection?: Array<PartOfWork>
}

export interface PartOfWork {
    name: string,
    artefact: string
}