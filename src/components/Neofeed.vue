<template>
    <div>
        <h2>Neo Feed </h2><br>
          
        <div class="ui form">
            <div class="field">
                <label>Start Data</label>
                <input type="text" placeholder="YYYY-MM-DD" v-model="start_date" style="width:40%; margin-right:5px;" >
                <button class="ui button" @click="getFeed"> Submit </button>
                
            </div>
        </div>
           
        <div v-for="(key, v) in this.search_record" v-bind:key="key.id">
            <span v-if="key!=''">
            
            <h3 class="ui header">{{v}}</h3>

            <div v-for="key2 in key" v-bind:key="key2.id" >
                <item v-bind:item_i="key2"></item>
            </div>
            </span>
        </div>
        
        <br/>
    </div>
</template>

<script>

import axios from 'axios'
import Item from './Item.vue'

export default {
    name: 'Neofeed',
    components:{
        Item,
    },
    data(){
        return{ 
            start_date:"",
            end_date:"",
            search_record:""
        }
    },
    methods:{
        async getFeed(){
            
            if(this.start_date=="") return
            try{
             
                const res = await axios.get('https://api.nasa.gov/neo/rest/v1/feed?size=4&start_date='+this.start_date+'&api_key=t6Q87GVfFVy3QXYFSMNg2aqIuVWBhPXpnbfNd7ix')
                this.search_record = res.data.near_earth_objects 
                console.log(this.search_record)
                
            }
            catch(e){
                console.log(e)
            }
        },
    }
}
</script>

<style scoped>
.ui.header:first-child {
    float: left;
    margin: 20px;
}
</style>