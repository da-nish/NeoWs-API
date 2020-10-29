<template>
    <div>
        <h3>Favorites - </h3>

        <div v-for="itm in favList" v-bind:key="itm.id">
            <item v-bind:item_i="itm"></item>
        </div>

    </div>

</template>

<script>

import firebase from "firebase";
import axios from "axios";
import Item from './Item.vue'

export default {
    name:"Secure",
    data(){
        return{
            favData:Object,//fav list id from firebase
            favList:[],//fav list json response
        }
    },
    components:{
        Item
    }
    ,
    created(){
        this.getRecord(),
        this.favList = []
    }
    ,
    methods:{
        async getRecord(){

            try{
                const fb_uid = firebase.auth().currentUser.uid
                const res = await axios.get('https://vuelogin-5567d.firebaseio.com/user/'+fb_uid+'/fav.json')
                this.favData = res.data
                this.getFavList()
            }
            catch(e){
                console.log('error'+e)
            }
        },
        async getFavList(){
            
            
            var d = ""
            for(var key in this.favData){
                try{
                    const res = await axios.get('https://api.nasa.gov/neo/rest/v1/neo/'+key+'?api_key=t6Q87GVfFVy3QXYFSMNg2aqIuVWBhPXpnbfNd7ix')
                    d=res.data
                    this.favList.push(d)
                    // console.log(d)   
                }
                catch(e){
                    console.log('error'+e)
                }
            }
            
        }
        
    }
}
</script>
