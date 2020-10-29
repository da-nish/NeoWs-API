<template>
    <div>
        <h2>Search </h2><br>        
        
        <div class="ui form">
            <div class="field">
                <label>Asteroid ID</label>
                <input name="Search" type="text" v-model="searchid" placeholder="Asteroid ID" style="width:40%; margin-right:5px;">
                <button class="ui button"  @click="doSearch"> Search </button>
            </div>
        </div>
        <br>
        
        <div v-if="searchdata!=''">
            <item v-bind:item_i="searchdata"></item> 
        </div>

    </div>
</template>

<script>

import axios from "axios"
import Item from './Item.vue'

export default {
    name: "Search",
    components:{
        Item
    },
    data(){
        return{ 
            searchid:"", 
            searchdata:""
            }
    },
    methods:{
        async doSearch(){
            if (this.searchid=="") return ;
            try{
                const res = await axios.get('https://api.nasa.gov/neo/rest/v1/neo/'+this.searchid+'?api_key=t6Q87GVfFVy3QXYFSMNg2aqIuVWBhPXpnbfNd7ix')
                this.searchdata = res.data
                console.log(this.searchdata)
            }
            catch(e){
                console.log('error'+e)
            }
        }
    }
}
</script>
<style scoped>

</style>