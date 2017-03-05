export class Endpoints {
    public static readonly baseUrl: string = "https://newsapi.org";

    public static get newsSource(): string {
        return `${Endpoints.baseUrl}/v1/sources?language=en`
    } 
}