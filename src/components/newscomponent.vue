<template>
  <div class="newslist">
    <md-list>
      <md-list-item v-for="article in articles" :key="article.url">
        
        <md-card class="news-card" md-with-hover>
          <md-layout md-gutter>
            <md-layout md-flex="20">
              <md-card-media>
                <img v-bind:src="article.urlToImage" alt="Skyscraper">
              </md-card-media>
            </md-layout>
            <md-layout>
              <md-card-header>
                <div class="md-title"> {{ article.title }} </div>
                <div class="md-subhead"> {{ article.author}} </div>
              </md-card-header>

              <md-card-content> {{ article.description }}</md-card-content>
            </md-layout>
          </md-layout>
        </md-card>
      
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  import { Vue, Component, Data, Lifecycle, Prop, p, Watch } from 'av-ts'
  import { NewsArticleViewModel } from '../data/viewmodels/NewsArticleViewModel.ts'
  import { NewsService } from '../services/NewsService.ts'

  @Component
  class NewsComponent extends Vue {

    articles : NewsArticleViewModel[]

    @Prop
    source = p({
      type: String
    })

    @Data data() {
      return {
        articles: []
      }
    }

    updateSource(source: string) {
      NewsService.getNewsArticles(source)
        .then(
        res => {
          this.articles = res;
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
    handler(newval,oldval) {
      this.updateSource(newval)
    }
  }

  export default NewsComponent

</script>

<style scoped>
  .newslist {
    margin-top: 1%
  }

  .news-card {
    margin-top: 1%
  }
</style>