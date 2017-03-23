import { NewsSourceViewModel } from './../data/viewmodels/NewsSourceViewModel'
import { NewsArticleViewModel } from './../data/viewmodels/NewsArticleViewModel'
import { Endpoints } from './../data/Endpoints.ts'
import axios from 'axios'

export class NewsService {

    /*
    * gets the list of NewsSources
    */

    public static getNewsSources(): Promise<NewsSourceViewModel[]> {

        return axios.get(Endpoints.newsSource)
            .then(
            (res) => {
                return Promise.resolve(res.data.sources as NewsSourceViewModel[])
            }
            ).catch(
            () => {
                return Promise.reject('');
            }
            )
    }

    public static getNewsArticles(source: string): Promise<NewsArticleViewModel[]> {

        var instance = axios.create({
            headers: {
                'Accept': 'text / html, application/xhtml+xml,application/xml;q=0.9, image/webp,*/*;q=0.8',
                'Cache-Control': 'max-age=0'
            }
        });

        return instance.get(Endpoints.newsArticle(source))
            .then(
            (res) => Promise.resolve(res.data.articles as NewsArticleViewModel[])
            ).catch(
            (error) => Promise.reject(error)
            )
    }
}