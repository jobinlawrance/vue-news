<template>
    <div id="source-selection">
        <md-whiteframe id="card" md-elevation="4">
            <div class="field-group">
                <h2>
                    <md-icon>list</md-icon>
                    </span>&nbsp;News List</h2>

                <md-input-container>
                    <label for="news_source">News Source</label>
                    <md-select name="news_source" id="news_source" v-model="selectedId" v-on:change="sourceChanged">
                        <md-option v-for="source in sources" :key="source.id" v-bind:value="source.id">{{source.name}}</md-option>
                    </md-select>
                </md-input-container>
                <div v-if="source">
                    <h6>{{source.description}}</h6>
                    <a v-bind:href="source.url" class="" target="_blank">Go To {{source.name}} Website</a>
                </div>
            </div>
        </md-whiteframe>
    </div>
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
    .field-group {
        width: 25%;
        text-align: center;
    }
    
    #card {
        padding: 1%;
    }
</style>