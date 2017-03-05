import {NewsSourceViewModel } from './../data/viewmodels/NewsSourceViewModel'
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
}