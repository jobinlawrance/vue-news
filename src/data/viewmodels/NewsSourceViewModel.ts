export class NewsSourceViewModel {
    id: string
    name: string
    description: string
    url:string
    urlsToLogos: Logo
}

export class Logo {
    small: string
    medium: string
    large: string
}