
export class Endpoints {

    public static readonly baseUrl: string = "https://newsapi.org/v1";
    public static readonly apiKey: string = "b981ef2878d6479d91de9f68ac9be088";

    public static get newsSource(): string {
        return `${Endpoints.baseUrl}/sources?language=en`
    }

    public static newsArticle(source: string): string {
        return `${Endpoints.baseUrl}/articles?source=` + source + `&apiKey=` + `${Endpoints.apiKey}`;
    } 
}