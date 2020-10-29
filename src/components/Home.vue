<template>
    <div>
        <h2>Home</h2><br>

            <div v-for="item_i in itemList" v-bind:key="item_i.id" >
                <item v-bind:item_i="item_i"></item>
            </div>
               
    </div>

</template>

<script>

import Item from './Item.vue'
import axios from 'axios'

export default {
        name: 'Home',

        data(){
        return {itemList:null}
    },
    components:{
        Item
    },
    created(){
        this.apiCall();
    },
    methods:{
        async apiCall(){

        try{
            const res = await axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=t6Q87GVfFVy3QXYFSMNg2aqIuVWBhPXpnbfNd7ix');
            this.itemList = res.data.near_earth_objects;
            console.log(this.itemList)
        }
        catch(e){
            console.error("error: "+e);
        }
    },
  }
}
</script>
<style scoped>

.ui.card{
    width: 100%;
}
</style>