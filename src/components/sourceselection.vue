<template>
    <section class="section">
        <div class="container">
            <div class="heading">
                <h1 class="title has-text-centered">News</h1>

                <div class="columns">
                    <div class="column is-half">
                        <div class="field">
                            <label class="label">Select a source</label>
                            <p class="control">
                                <span class="select is-medium">
                        <select name="news_source" id="news_source" v-model="selectedId" v-on:change="sourceChanged">
                            <option v-for="source in sources" :key="source.id" v-bind:value="source.id">{{source.name}}</option>
                        </select>
                        </span>
                            </p>
                        </div>
                    </div>
                    <div class="column">
                        <div class="box" v-if="source">
                            <article class="media">
                                <div class="media-left">
                                    <figure class="image is-64x64">
                                        <img v-bind:src="source.urlsToLogos.small" alt="Image">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            <strong>{{ source.name }}</strong> 
                                            <br> {{source.description}}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { Vue, Component, Data, Lifecycle } from 'av-ts'
    import { NewsSourceViewModel } from '../data/viewmodels/NewsSourceViewModel.ts'
    import { NewsService } from '../services/NewsService.ts'

    @Component
    class SourceSelection extends Vue {
        // sources:Array<any> = {3:4};

        selectedId: string;
        source: NewsSourceViewModel;
        sources: NewsSourceViewModel[];

        @Data
        data() {
            return {
                selectedId: null,
                source: null,
                sources: []
            }
        }

        @Lifecycle
        created() {
            console.log('called in lifecycle code!')
            NewsService.getNewsSources()
                .then(
                sources => {
                    this.sources = sources;
                }
                ).catch(

                )
        }

        sourceChanged() {

            for (var i = 0; i < this.sources.length; i++) {
                if (this.sources[i].id == this.selectedId) {
                    this.source = this.sources[i];
                }
            }
            this.$emit('sourceChanged', this.selectedId);
        }


    }

    export default SourceSelection

</script>
<style scoped>
    p{
        text-transform: none;
    }
</style>