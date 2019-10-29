export interface VolOpportunity {
    jobID: string,
    jobTitle: string,
    jobDescription: string
}

export interface Organization {
    creatorEmail: string,
    href: string,
    imageThumbnailURL: string,
    title: string,
    mission: string,
    homepage: string,
    volOpportunities: Array<VolOpportunity>
}