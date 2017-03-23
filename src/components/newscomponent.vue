<template>
  <div class="section">
    <div class="container">
      <div class="columns" v-for="n in Math.floor(articleSize/2)">
        <div class="column is-half" v-for="article in getGroupedArticles(n)">
          <div class="card">
        <div class="card-image">
          <figure class="image is-16by9">
            <img v-bind:src="article.urlToImage" alt="Image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-5">{{ article.title }}</p>
              <p class="subtitle is-6">{{ article.author }}</p>
            </div>
          </div>

          <div class="content">
            {{ article.description }}
            <br>
            <small>11:09 PM - 1 Jan 2016</small>
          </div>
        </div>
      </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Data, Lifecycle, Prop, p, Watch } from 'av-ts'
  import { NewsArticleViewModel } from '../data/viewmodels/NewsArticleViewModel.ts'
  import { NewsService } from '../services/NewsService.ts'

  @Component
  class NewsComponent extends Vue {

    articles: NewsArticleViewModel[]
    articleSize: number

    @Prop
    source = p({
      type: String
    })

    @Data data() {
      return {
        articles: [],
        articleSize: 0
      }
    }

    getGroupedArticles(n:number) :NewsArticleViewModel[]{
      
      //return articles grouped into 2 since each of our columns have 2 
      if((n*2)-1 <= this.articleSize) {
        return [this.articles[(n*2)-2],this.articles[(n*2)-1]]
      } else {
        return [this.articles[(n*2)-2]]
      }
    }

    updateSource(source: string) {
      NewsService.getNewsArticles(source)
        .then(
        res => {
          this.articles = res;
          this.articleSize = this.articles.length
          console.log("the size of result is "+ this.articleSize)
        }
        ).catch(
        error => console.log(error)
        )
    }

    @Lifecycle
    created() {
      this.updateSource('the-huffington-post')
    }

    @Watch('source')
    handler(newval, oldval) {
      this.updateSource(newval)
    }
  }

  export default NewsComponent

</script>

<style scoped>

</style>